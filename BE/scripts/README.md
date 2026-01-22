# Platform Initialization Script

## Overview

The `init-platform.js` script initializes the platform by:
1. Creating default platform-scoped roles (super_admin, admin, viewer)
2. Creating the initial platform owner user
3. Verifying the initialization

## Usage

### Basic Usage

```bash
# Using npm script (recommended)
npm run init:platform

# Or directly with node
node scripts/init-platform.js

# With custom credentials
node scripts/init-platform.js admin@example.com SecurePassword123! Admin User
```

### Using Environment Variables

You can also set credentials via environment variables:

```bash
export PLATFORM_OWNER_EMAIL=admin@example.com
export PLATFORM_OWNER_PASSWORD=SecurePassword123!
export PLATFORM_OWNER_FIRST_NAME=Admin
export PLATFORM_OWNER_LAST_NAME=User

npm run init:platform
```

### Command Line Arguments

The script accepts the following arguments in order:
1. `email` - Platform owner email (default: `admin@platform.com`)
2. `password` - Platform owner password (default: `ChangeMe123!`)
3. `firstName` - First name (default: `Platform`)
4. `lastName` - Last name (default: `Admin`)

## What It Does

### 1. Creates Platform Roles

The script creates the following platform-scoped roles:

- **super_admin**: Full system access with all permissions
- **admin**: Can manage organizations and users
- **viewer**: Read-only access

### 2. Creates Platform Owner User

Creates a platform owner user with:
- Email and password (for authentication)
- User profile in platform service
- Assigned `super_admin` role
- `userType` set to `platform_owner`
- No organization association

### 3. Verification

Verifies that:
- Platform roles were created successfully
- Platform owner user was created successfully

## Prerequisites

1. MongoDB must be running and accessible
2. Environment variables must be set (or defaults will be used):
   - `MONGODB_URI` (default: `mongodb://localhost:27017/superb_db`)
3. All dependencies must be installed (`npm run install:all`)

## Example Output

```
========================================
Platform Initialization Script
========================================

Email: admin@platform.com
Name: Platform Admin

Connecting to MongoDB...
✓ Connected to MongoDB

[1/3] Creating platform roles...
  ✓ Created role: super_admin
  ✓ Created role: admin
  ✓ Created role: viewer

[2/3] Creating platform owner user...
  ✓ Created auth user: admin@platform.com
  ✓ Created platform user profile: admin@platform.com

[3/3] Verifying initialization...
  ✓ Platform roles: 3
  ✓ Platform owner users: 1

========================================
✓ Platform initialization completed!
========================================

Next steps:
1. Log in with the created platform owner credentials
2. Change the default password immediately
3. Create additional platform roles if needed

Disconnected from MongoDB
```

## Safety Features

- **Idempotent**: Running the script multiple times won't create duplicates
- **Validation**: Checks if roles/users already exist before creating
- **Password Validation**: Ensures password is at least 8 characters
- **Error Handling**: Provides clear error messages and exits gracefully

## Troubleshooting

### User Already Exists

If a user with the email already exists but is not a platform owner:
```
✗ User exists but is not a platform owner. Please use a different email.
```

Solution: Use a different email address or delete the existing user.

### Role Already Exists

If roles already exist, the script will skip creating them:
```
⚠ Role 'super_admin' already exists, skipping...
```

This is normal and safe - the script is idempotent.

### MongoDB Connection Failed

Ensure MongoDB is running:
```bash
# Check MongoDB status
mongosh --eval "db.adminCommand('ping')"

# Or if using Docker
docker ps | grep mongo
```

## Security Notes

⚠️ **Important**: 
- Change the default password immediately after first login
- Use strong passwords in production
- Store credentials securely (use environment variables or secrets manager)
- Never commit credentials to version control

