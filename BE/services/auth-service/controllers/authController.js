/**
 * Authentication Controller
 */
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Role from '../models/Role.js';
import config from '@superb/shared-config';
import { logger, cache, response } from '@superb/shared-common';

/**
 * Register new user
 */
const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, organizationId, roleIds, userType = 'customer' } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.error(res, 'User already exists', 409);
    }

    // Validate and convert organizationId for customer users
    let orgId = null;
    if (organizationId) {
      // Convert organizationId to ObjectId if it's a string
      if (typeof organizationId === 'string') {
        if (!mongoose.Types.ObjectId.isValid(organizationId)) {
          return response.error(res, 'Invalid organization ID format', 400);
        }
        orgId = new mongoose.Types.ObjectId(organizationId);
      } else if (organizationId instanceof mongoose.Types.ObjectId) {
        orgId = organizationId;
      } else {
        return response.error(res, 'Invalid organization ID format', 400);
      }
    }

    if (userType === 'customer' && !orgId) {
      return response.error(res, 'Organization ID is required for customer users', 400);
    }

    // Resolve role IDs - if roleIds provided, use them; otherwise find default role
    let roles = [];
    if (roleIds && roleIds.length > 0) {
      // Filter out any unresolved variables or invalid values
      const validRoleIds = roleIds.filter(roleId => {
        // Skip if roleId contains unresolved variable (Postman variable not set)
        if (typeof roleId === 'string' && (roleId.includes('{{') || roleId.includes('}}'))) {
          logger.warn(`Skipping unresolved role ID variable: ${roleId}`);
          return false;
        }
        // Skip empty strings or null values
        if (!roleId || roleId === '') {
          return false;
        }
        return true;
      });

      // If no valid role IDs after filtering, fall back to default role lookup
      if (validRoleIds.length === 0) {
        logger.info('No valid roleIds provided, falling back to default role lookup');
        // Fall through to default role lookup below
      } else {
        // Convert valid roleIds to ObjectIds
        try {
          roles = validRoleIds.map(roleId => {
            // If it's already an ObjectId, return as is
            if (roleId instanceof mongoose.Types.ObjectId) {
              return roleId;
            }
            // If it's a valid ObjectId string, convert it
            if (typeof roleId === 'string') {
              if (!mongoose.Types.ObjectId.isValid(roleId)) {
                throw new Error(`Invalid role ID format: ${roleId}`);
              }
              return new mongoose.Types.ObjectId(roleId);
            }
            // If it's an object with _id property
            if (typeof roleId === 'object' && roleId._id) {
              return new mongoose.Types.ObjectId(roleId._id);
            }
            // Invalid format, throw error
            throw new Error(`Invalid role ID format: ${roleId}`);
          });
        } catch (error) {
          logger.warn(`Error converting roleIds, falling back to default role: ${error.message}`);
          // Fall through to default role lookup
          roles = [];
        }
      }
    }
    
    // If no roles set yet, find default role
    if (roles.length === 0) {
      // Find default role based on userType
      const scope = userType === 'platform_owner' ? 'platform' : 'organization';
      const defaultRoleQuery = {
        scope,
        isActive: true,
      };
      if (scope === 'organization') {
        defaultRoleQuery.organizationId = orgId;
        defaultRoleQuery.name = 'viewer'; // Default to viewer role
      } else {
        defaultRoleQuery.name = 'viewer'; // Default to viewer role for platform
      }
      const defaultRole = await Role.findOne(defaultRoleQuery);
      if (defaultRole) {
        roles = [defaultRole._id];
      } else {
        return response.error(res, `Default role not found for ${userType}`, 400);
      }
    }

    // Create new user
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      userType,
      organizationId: orgId,
      roles,
    });

    await user.save();

    // Get user with populated roles using aggregate query
    const userWithRoles = await getUserWithRolesAggregate(user._id.toString(), false);
    if (!userWithRoles) {
      return response.error(res, 'Failed to retrieve user data', 500);
    }

    // Generate tokens and cache user session data
    const tokens = await generateTokens(userWithRoles);

    // Cache refresh token
    await cache.set(`refresh_token:${user._id}`, tokens.refreshToken, config.redis.ttl.token * 24);

    logger.info(`User registered: ${user.email}`);

    // Return user without password
    const userResponse = user.toJSON();
    delete userResponse.password;
    delete userResponse.refreshToken;

    return response.success(res, {
      user: userResponse,
      ...tokens,
    }, 'User registered successfully', 201);
  } catch (error) {
    logger.error('Registration error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Login user
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user with password
    const userDoc = await User.findOne({ email }).select('+password');
    if (!userDoc) {
      return response.error(res, 'Invalid credentials', 401);
    }

    // Verify password
    const isPasswordValid = await userDoc.comparePassword(password);
    if (!isPasswordValid) {
      return response.error(res, 'Invalid credentials', 401);
    }

    // Check if user is active
    if (!userDoc.isActive) {
      return response.error(res, 'Account is deactivated', 403);
    }

    // Update last login
    await User.updateOne({ _id: userDoc._id }, { lastLogin: new Date() });

    // Get user with populated roles using aggregate query
    const userWithRoles = await getUserWithRolesAggregate(userDoc._id.toString(), false);
    if (!userWithRoles) {
      return response.error(res, 'Failed to retrieve user data', 500);
    }

    // Generate tokens and cache user session data
    const tokens = await generateTokens(userWithRoles);

    // Cache refresh token
    await cache.set(`refresh_token:${userDoc._id}`, tokens.refreshToken, config.redis.ttl.token * 24);

    logger.info(`User logged in: ${userDoc.email}`);

    // Return user without password
    const userResponse = userWithRoles;
    delete userResponse.password;
    delete userResponse.refreshToken;

    return response.success(res, {
      user: userResponse,
      ...tokens,
    }, 'Login successful');
  } catch (error) {
    logger.error('Login error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Refresh access token
 */
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return response.error(res, 'Refresh token required', 400);
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, config.jwt.secret);
    
    // Check if refresh token exists in cache
    const cachedToken = await cache.get(`refresh_token:${decoded.userId}`);
    if (cachedToken !== refreshToken) {
      return response.error(res, 'Invalid refresh token', 401);
    }

    // Get user with populated roles using aggregate query
    const userWithRoles = await getUserWithRolesAggregate(decoded.userId, false);
    if (!userWithRoles || !userWithRoles.isActive) {
      return response.error(res, 'User not found or inactive', 401);
    }

    // Generate new tokens and update user session cache
    const tokens = await generateTokens(userWithRoles);

    // Update cached refresh token
    await cache.set(`refresh_token:${decoded.userId}`, tokens.refreshToken, config.redis.ttl.token * 24);

    return response.success(res, tokens, 'Token refreshed successfully');
  } catch (error) {
    logger.error('Refresh token error:', error);
    return response.error(res, 'Invalid refresh token', 401);
  }
};

/**
 * Logout user
 */
const logout = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Remove refresh token and user session from cache
    await cache.del(`refresh_token:${userId}`);
    await cache.del(`user_session:${userId}`);

    logger.info(`User logged out: ${userId}`);

    return response.success(res, null, 'Logout successful');
  } catch (error) {
    logger.error('Logout error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Get current user profile
 */
const getProfile = async (req, res) => {
  try {
    // Get user with populated roles and organizationId using aggregate query
    // $match first for efficiency, then lookups, then reshape
    const pipeline = [
      { $match: { _id: new mongoose.Types.ObjectId(req.user.userId) } },
      {
        $lookup: {
          from: 'organizations',
          localField: 'organizationId',
          foreignField: '_id',
          as: 'organizationId',
        },
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'roles',
          foreignField: '_id',
          as: 'roles',
        },
      },
      {
        $addFields: {
          // organizationId is single ObjectId, so just get first element (or null)
          organizationId: { $arrayElemAt: ['$organizationId', 0] },
        },
      },
      {
        $project: {
          password: 0,
          refreshToken: 0,
        },
      },
    ];

    const result = await User.aggregate(pipeline);
    const user = result.length > 0 ? result[0] : null;

    if (!user) {
      return response.error(res, 'User not found', 404);
    }

    return response.success(res, user, 'Profile retrieved successfully');
  } catch (error) {
    logger.error('Get profile error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Generate JWT tokens and cache user data in Redis
 */
const generateTokens = async (user) => {
  // Extract role names from populated roles or role IDs
  const roleNames = user.roles?.map(role => {
    // If role is populated (object), use name; otherwise it's an ID
    return typeof role === 'object' && role.name ? role.name : role.toString();
  }) || [];

  const roleIds = user.roles?.map(role => typeof role === 'object' ? role._id.toString() : role.toString()) || [];

  // Handle organizationId - can be ObjectId, object from aggregate, or null
  let organizationId = null;
  if (user.organizationId) {
    if (typeof user.organizationId === 'object' && user.organizationId._id) {
      organizationId = user.organizationId._id.toString();
    } else if (typeof user.organizationId === 'object') {
      organizationId = user.organizationId.toString();
    } else {
      organizationId = user.organizationId.toString();
    }
  }

  // Prepare user session data for Redis cache
  const userSessionData = {
    userId: user._id.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userType: user.userType,
    organizationId: organizationId,
    roles: roleNames,
    roleIds: roleIds,
    isActive: user.isActive,
  };

  // Cache user session data in Redis (TTL matches JWT expiration)
  const jwtExpirationSeconds = parseJwtExpiration(config.jwt.expiresIn);
  await cache.set(`user_session:${user._id}`, userSessionData, jwtExpirationSeconds);

  const payload = {
    userId: user._id.toString(),
    email: user.email,
    userType: user.userType,
    organizationId: organizationId,
    roles: roleNames, // Store role names in JWT for backward compatibility
    roleIds: roleIds,
  };

  const accessToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });

  const refreshToken = jwt.sign(
    { userId: user._id.toString() },
    config.jwt.secret,
    { expiresIn: config.jwt.refreshExpiresIn }
  );

  return { accessToken, refreshToken };
};

/**
 * Get user with populated roles using aggregate query
 */
const getUserWithRolesAggregate = async (userId, includePassword = false) => {
  const pipeline = [
    { $match: { _id: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: 'roles',
        localField: 'roles',
        foreignField: '_id',
        as: 'roles',
      },
    },
    {
      $project: {
        password: includePassword ? 1 : 0,
        refreshToken: 0,
      },
    },
  ];

  const result = await User.aggregate(pipeline);
  return result.length > 0 ? result[0] : null;
};

/**
 * Parse JWT expiration string to seconds
 */
function parseJwtExpiration(expiration) {
  const match = expiration.match(/^(\d+)([smhd])$/);
  if (!match) return 86400; // Default to 24 hours

  const value = parseInt(match[1]);
  const unit = match[2];

  const multipliers = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400,
  };

  return value * (multipliers[unit] || 86400);
}

export {
  register,
  login,
  refreshToken,
  logout,
  getProfile,
};

