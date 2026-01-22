#!/usr/bin/env node

/**
 * Platform Initialization Script
 * Creates initial platform owner user and required roles
 * Usage: node scripts/init-platform.js [email] [password] [firstName] [lastName]
 */

import 'dotenv/config';
import { connectMongoDB, disconnectMongoDB, logger } from '@superb/shared-common';

// Import mongoose first
import { mongoose } from '@superb/shared-common';

// Import Role model first (no conflicts)
import Role from '../services/platform-service/models/Role.js';

// Use dynamic imports to handle model conflicts
// Import Auth Service User Model first (for authentication with password)
const authUserModule = await import('../services/auth-service/models/User.js');
const AuthUserModel = authUserModule.default;
const authUserSchema = AuthUserModel.schema;

// Delete User model so we can import platform user model
if (mongoose.models.User) {
  mongoose.deleteModel('User');
  if (mongoose.modelSchemas && mongoose.modelSchemas.User) {
    delete mongoose.modelSchemas.User;
  }
}

// Import Platform Service User Model (for user profile)
const platformUserModule = await import('../services/platform-service/models/User.js');
const PlatformUserModel = platformUserModule.default;

// Re-register auth user model with a different name to avoid conflict
// Use 'users' collection (same as User model) but different model name
if (!mongoose.models.AuthUser) {
  mongoose.model('AuthUser', authUserSchema, 'users');
}
const AuthUser = mongoose.models.AuthUser;

// Colors for output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Create default platform roles
 */
async function createPlatformRoles() {
  log('\n[1/3] Creating platform roles...', 'yellow');

  const platformRoles = [
    {
      name: 'super_admin',
      scope: 'platform',
      organizationId: null,
      description: 'Super Administrator - Full system access',
      permissions: ['*'],
      isActive: true,
    },
    {
      name: 'admin',
      scope: 'platform',
      organizationId: null,
      description: 'Administrator - Can manage organizations and users',
      permissions: ['organizations.*', 'users.*', 'roles.*'],
      isActive: true,
    },
    {
      name: 'viewer',
      scope: 'platform',
      organizationId: null,
      description: 'Viewer - Read-only access',
      permissions: ['read'],
      isActive: true,
    },
  ];

  const createdRoles = [];
  for (const roleData of platformRoles) {
    try {
      // Check if role already exists
      const existingRole = await Role.findOne({
        name: roleData.name,
        scope: roleData.scope,
        organizationId: roleData.organizationId,
      });

      if (existingRole) {
        log(`  ⚠ Role '${roleData.name}' already exists, skipping...`, 'yellow');
        createdRoles.push(existingRole);
      } else {
        const role = new Role(roleData);
        await role.save();
        log(`  ✓ Created role: ${roleData.name}`, 'green');
        createdRoles.push(role);
      }
    } catch (error) {
      if (error.code === 11000) {
        log(`  ⚠ Role '${roleData.name}' already exists (duplicate key), skipping...`, 'yellow');
        const existingRole = await Role.findOne({
          name: roleData.name,
          scope: roleData.scope,
          organizationId: roleData.organizationId,
        });
        if (existingRole) createdRoles.push(existingRole);
      } else {
        log(`  ✗ Failed to create role '${roleData.name}': ${error.message}`, 'red');
        throw error;
      }
    }
  }

  return createdRoles;
}

/**
 * Create initial platform owner user
 */
async function createPlatformOwnerUser(userData, roles) {
  log('\n[2/3] Creating platform owner user...', 'yellow');

  const { email, password, firstName, lastName } = userData;

  // Check if user already exists in auth service
  const existingAuthUser = await AuthUser.findOne({ email });
  if (existingAuthUser) {
    log(`  ⚠ User with email '${email}' already exists in auth service`, 'yellow');
    
    // Check if it's a platform owner
    if (existingAuthUser.userType === 'platform_owner') {
      log(`  ℹ User is already a platform owner`, 'cyan');
      
      // Check if platform user profile exists
      const existingPlatformUser = await PlatformUserModel.findOne({ email });
      if (!existingPlatformUser) {
        log(`  ⚠ Platform user profile missing, creating...`, 'yellow');
        const superAdminRole = roles.find(r => r.name === 'super_admin');
        const platformUser = new PlatformUserModel({
          email,
          firstName: existingAuthUser.firstName,
          lastName: existingAuthUser.lastName,
          userType: 'platform_owner',
          organizationId: null,
          roles: [superAdminRole._id],
          isActive: true,
        });
        await platformUser.save();
        log(`  ✓ Created platform user profile`, 'green');
      }
      
      return { authUser: existingAuthUser, userProfile: existingPlatformUser || await PlatformUserModel.findOne({ email }) };
    } else {
      log(`  ✗ User exists but is not a platform owner. Please use a different email.`, 'red');
      throw new Error('User exists but is not a platform owner');
    }
  }

  // Find super_admin role
  const superAdminRole = roles.find(r => r.name === 'super_admin');
  if (!superAdminRole) {
    throw new Error('Super admin role not found');
  }

  // Create auth user (for authentication)
  const authUser = new AuthUser({
    email,
    password, // Will be hashed by pre-save hook
    firstName,
    lastName,
    userType: 'platform_owner',
    organizationId: null, // Platform owners don't belong to organizations
    roles: [superAdminRole._id],
    isActive: true,
  });

  await authUser.save();
  log(`  ✓ Created auth user: ${email}`, 'green');

  // Check if platform user profile already exists (they share the same collection)
  let platformUser = await PlatformUserModel.findOne({ email });
  
  if (!platformUser) {
    // Create platform service user profile
    platformUser = new PlatformUserModel({
      email,
      firstName,
      lastName,
      userType: 'platform_owner',
      organizationId: null,
      roles: [superAdminRole._id],
      isActive: true,
    });

    await platformUser.save();
    log(`  ✓ Created platform user profile: ${email}`, 'green');
  } else {
    // Update existing platform user profile
    platformUser.firstName = firstName;
    platformUser.lastName = lastName;
    platformUser.userType = 'platform_owner';
    platformUser.organizationId = null;
    platformUser.roles = [superAdminRole._id];
    platformUser.isActive = true;
    await platformUser.save();
    log(`  ✓ Updated platform user profile: ${email}`, 'green');
  }

  return { authUser, userProfile: platformUser };
}

/**
 * Verify initialization
 */
async function verifyInitialization() {
  log('\n[3/3] Verifying initialization...', 'yellow');

  const platformRoleCount = await Role.countDocuments({ scope: 'platform', isActive: true });
  const platformUserCount = await AuthUser.countDocuments({ userType: 'platform_owner', isActive: true });

  log(`  ✓ Platform roles: ${platformRoleCount}`, 'green');
  log(`  ✓ Platform owner users: ${platformUserCount}`, 'green');

  if (platformRoleCount < 3) {
    log(`  ⚠ Warning: Expected at least 3 platform roles, found ${platformRoleCount}`, 'yellow');
  }

  if (platformUserCount === 0) {
    log(`  ⚠ Warning: No platform owner users found`, 'yellow');
  }
}

/**
 * Main initialization function
 */
async function initializePlatform() {
  try {
    // Parse command line arguments
    const args = process.argv.slice(2);
    const email = args[0] || process.env.PLATFORM_OWNER_EMAIL || 'admin@platform.com';
    const password = args[1] || process.env.PLATFORM_OWNER_PASSWORD || 'ChangeMe123!';
    const firstName = args[2] || process.env.PLATFORM_OWNER_FIRST_NAME || 'Platform';
    const lastName = args[3] || process.env.PLATFORM_OWNER_LAST_NAME || 'Admin';

    log('========================================', 'blue');
    log('Platform Initialization Script', 'blue');
    log('========================================', 'blue');
    log('');
    log(`Email: ${email}`, 'cyan');
    log(`Name: ${firstName} ${lastName}`, 'cyan');
    log('');

    // Validate password strength
    if (password.length < 8) {
      log('✗ Error: Password must be at least 8 characters long', 'red');
      process.exit(1);
    }

    // Connect to MongoDB
    log('Connecting to MongoDB...', 'yellow');
    await connectMongoDB();
    log('✓ Connected to MongoDB', 'green');

    // Create platform roles
    const roles = await createPlatformRoles();

    // Create platform owner user
    const userData = { email, password, firstName, lastName };
    await createPlatformOwnerUser(userData, roles);

    // Verify initialization
    await verifyInitialization();

    log('');
    log('========================================', 'green');
    log('✓ Platform initialization completed!', 'green');
    log('========================================', 'green');
    log('');
    log('Next steps:', 'cyan');
    log('1. Log in with the created platform owner credentials', 'cyan');
    log('2. Change the default password immediately', 'cyan');
    log('3. Create additional platform roles if needed', 'cyan');
    log('');

  } catch (error) {
    log('');
    log('========================================', 'red');
    log('✗ Initialization failed!', 'red');
    log('========================================', 'red');
    log(`Error: ${error.message}`, 'red');
    logger.error('Initialization error:', error);
    process.exit(1);
  } finally {
    // Disconnect from MongoDB
    await disconnectMongoDB();
    log('Disconnected from MongoDB', 'yellow');
  }
}

// Run initialization
initializePlatform();

