# Postman Collection for Superb Platform API Tests

This collection contains API requests to test the complete flow from super admin login to customer user creation.

## Files Included

1. **`postman-collection.json`** - Postman Collection with all 12 API requests
2. **`postman-environment.json`** - Postman Environment with variables

## Import Instructions

### Step 1: Import Collection
1. Open Postman
2. Click **Import** button (top left)
3. Select **`postman-collection.json`**
4. Click **Import**

### Step 2: Import Environment
1. In Postman, click the **Environments** icon (left sidebar)
2. Click **Import**
3. Select **`postman-environment.json`**
4. Click **Import**
5. Select **"Superb Platform - Local"** environment from the dropdown (top right)

## Test Flow

The collection includes the following requests in order:

1. **Login as Super Admin** - Authenticate with platform owner credentials
2. **Get Platform Roles** - Retrieve platform-scoped roles to find admin role ID
3. **Create Platform Admin User** - Register a new platform admin user
4. **Login as Platform Admin** - Authenticate as the newly created platform admin
5. **Onboard Organization** - Create a new organization with its admin user
6. **Get Organization Roles** - Retrieve organization-scoped roles to find viewer role ID
7. **Login as Organization Admin** - Authenticate as the organization admin
8. **Create Customer User** - Register a customer user under the organization
9. **Login as Customer User** - Authenticate as the customer user
10. **Get Customer User Profile** - Retrieve the customer user's profile
11. **Get Organization Details** - View organization details as customer user
12. **Get System Stats** - View system statistics as platform admin

## Running the Collection

### Option 1: Run Individual Requests
1. Select the **"Superb Platform - Local"** environment
2. Click on any request to run it individually
3. Check the **Test Results** tab to see if tests passed

### Option 2: Run Entire Collection
1. Right-click on the collection name
2. Select **Run collection**
3. Click **Run Superb Platform API Tests**
4. All requests will execute in order
5. View test results for each request

### Option 3: Use Collection Runner
1. Click on the collection
2. Click **Run** button
3. Review the test results
4. Check environment variables are being set correctly

## Environment Variables

The environment includes the following variables:

### Initial Variables (set manually or in environment):
- `baseUrl`: `http://localhost:3001` (Auth Service)
- `platformBaseUrl`: `http://localhost:3002` (Platform Service)
- `superAdminEmail`: `admin@platform.com`
- `superAdminPassword`: `ChangeMe123!`

### Auto-populated Variables (set by test scripts):
- `superAdminToken` - JWT token for super admin
- `platformAdminToken` - JWT token for platform admin
- `orgAdminToken` - JWT token for organization admin
- `customerToken` - JWT token for customer user
- `organizationId` - ID of the created organization
- `organizationCode` - Code of the created organization (ACME)
- `platformAdminRoleId` - ID of the platform admin role
- `viewerRoleId` - ID of the viewer role
- `orgAdminRoleId` - ID of the organization admin role
- `orgAdminEmail` - Email of organization admin
- `customerEmail` - Email of customer user

## Prerequisites

Before running the collection:

1. **Start the services:**
   ```bash
   npm run start:dev
   ```

2. **Initialize platform (if not done already):**
   ```bash
   npm run init:platform
   ```
   This creates the super admin user with email `admin@platform.com` and password `ChangeMe123!`

3. **Ensure MongoDB and Redis are running:**
   - MongoDB: `mongodb://localhost:27017/superb_db`
   - Redis: `localhost:6379`

## Expected Results

- All requests should return status codes 200 or 201
- Tokens should be automatically stored in environment variables
- Organization should be created with code "ACME"
- Customer user should be created under the organization
- All users should be able to authenticate successfully
- Test scripts should pass (green checkmarks)

## Troubleshooting

1. **401 Unauthorized**: 
   - Check if tokens are being stored correctly in environment variables
   - Verify the environment is selected in Postman

2. **404 Not Found**: 
   - Verify the service URLs are correct in environment variables
   - Ensure services are running on correct ports

3. **500 Internal Server Error**: 
   - Check MongoDB and Redis connections
   - Review server logs

4. **Role not found**: 
   - Ensure platform initialization script has been run
   - Check if roles exist in the database

5. **Variable not set**: 
   - Check Test Results tab to see if test scripts executed successfully
   - Verify environment is selected before running requests

## Notes

- Each request includes test scripts that automatically extract values from responses
- Tokens are automatically stored and reused in subsequent requests
- The collection uses environment variables for easy configuration
- You can modify the environment variables to test with different credentials or URLs
- All test assertions are included to verify API responses

