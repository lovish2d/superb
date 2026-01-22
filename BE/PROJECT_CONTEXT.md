# Superb Backend - Project Context

## Overview

This is a multi-service monorepo backend application built with Node.js, MongoDB, and Redis. The platform enables organizations to manage, maintain, and onboard customers so they can use pooled resources efficiently. The architecture is designed for scalability and low latency, with Redis caching and MongoDB for persistent storage.

## Architecture

### System Architecture

The platform follows a **microservices architecture** with the following components:

1. **Auth Service** (Port 3001) - Handles authentication and authorization
2. **Platform Service** (Port 3002) - Merged service managing users, organizations, and admin operations
3. **Resource Service** (Port 3004) - Manages pooled resources and allocations

**Note**: An external load balancer/router should be configured to route requests to the appropriate microservices.

### Technology Stack

- **Runtime**: Node.js
- **Database**: MongoDB (with Mongoose ODM)
- **Cache**: Redis
- **Process Manager**: PM2
- **API Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Architecture Pattern**: Microservices (routing handled by external load balancer/router)

## User Types and Multi-Tenancy Model

### User Types

The platform supports two types of users:

1. **Platform Owner Users** (`platform_owner`)
   - Platform-level users who manage the entire system
   - Do not belong to any organization
   - Have system-wide access
   - Multi-tenancy does NOT apply to platform owner users

2. **Customer Users** (`customer`)
   - Organization-specific users
   - Must belong to an organization
   - Multi-tenancy IS applied to customer users
   - Data isolation enforced at the organization level

### Organization Types

Organizations can be of the following types:
- **logistics** - Handles logistics operations
- **maintainer** - Maintains resources
- **customer** - Consumes resources
- **resource_provider** - Provides resources to the pool

### User Roles

Roles are stored in a separate `Role` collection with scoping:
- **Platform-scoped roles** (`scope: 'platform'`) - For platform_owner users
  - `super_admin` - System-wide super administrator
  - `admin` - System administrator (can onboard organizations)
  - `viewer` - Read-only access for platform users

- **Organization-scoped roles** (`scope: 'organization'`) - For customer users
  - `org_admin` - Organization administrator
  - `manager` - Organization manager
  - `operator` - Resource operator
  - `viewer` - Read-only access

Users reference roles via ObjectId references. Each organization can have its own set of roles, and platform roles are shared across all platform_owner users.

### Multi-Tenancy Implementation

- **Platform Owner Users**: 
  - No multi-tenancy restrictions
  - Can access all data across all organizations
  - Used for platform administration

- **Customer Users**:
  - Each customer user belongs to a **single organization**
  - Users can have **multiple roles** within their organization
  - Data isolation is enforced at the service level
  - Non-admin customer users can only access data from their organization
  - Super admins and admins (customer users) have cross-organization access within customer scope

## Service Details

### 1. Auth Service

**Purpose**: Handles user authentication and JWT token management

**Key Features**:
- User registration
- Login with JWT token generation
- Token refresh mechanism
- Logout (token invalidation)
- Profile retrieval

**Models**:
- `User` - Stores user credentials, userType (platform_owner/customer), organization reference (optional for platform_owner), and role references (ObjectIds)
- `Role` - Role definitions with scoping (platform/organization) and permissions

**Endpoints**:
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user (requires auth)
- `GET /api/v1/auth/profile` - Get current user profile (requires auth)

**Security**:
- Passwords are hashed using bcrypt
- JWT tokens with configurable expiration
- Refresh tokens stored in Redis cache
- User session data (roles, organizationId, userType) cached in Redis with JWT expiration TTL
- Session cache invalidated on user updates (roles, organizationId, userType, isActive changes)

**Authentication Flow**:
1. User logs in → JWT tokens generated
2. User session data (userId, email, firstName, lastName, userType, organizationId, roles, roleIds, isActive) cached in Redis
3. Subsequent requests retrieve user data from Redis cache (faster than DB lookup)
4. Cache expires with JWT token expiration
5. Cache invalidated when user data changes

### 2. Platform Service

**Purpose**: Merged service managing users, organizations, and admin operations with multi-tenancy support for customer users only

**Key Features**:
- User CRUD operations
- Organization CRUD operations
- Admin operations and organization onboarding
- Multi-tenancy filtering (customer users only)
- Role-based access control
- User preferences and metadata

**Models**:
- `User` - User profile data with userType field (platform_owner/customer) and role references
- `Organization` - Organization data with type, code, and settings
- `Role` - Role definitions with scoping (platform/organization), permissions, and organization reference

**Endpoints**:

**User Endpoints**:
- `GET /api/v1/users` - Get all users (with filters)
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user (requires org_admin+)
- `DELETE /api/v1/users/:id` - Deactivate user (requires org_admin+)

**Organization Endpoints**:
- `POST /api/v1/organizations` - Create organization (admin+)
- `GET /api/v1/organizations` - Get all organizations
- `GET /api/v1/organizations/:id` - Get organization by ID
- `PUT /api/v1/organizations/:id` - Update organization (org_admin+)
- `DELETE /api/v1/organizations/:id` - Deactivate organization (super_admin)

**Admin Endpoints**:
- `POST /api/v1/admin/onboard-organization` - Onboard new organization (admin+)
- `GET /api/v1/admin/stats` - Get system statistics (admin+)
- `POST /api/v1/admin/bulk` - Bulk operations (super_admin)

**Role Endpoints**:
- `POST /api/v1/roles` - Create role (admin+ for platform, org_admin+ for organization)
- `GET /api/v1/roles` - Get all roles (with filters: scope, organizationId, isActive)
- `GET /api/v1/roles/:id` - Get role by ID
- `PUT /api/v1/roles/:id` - Update role (admin+ for platform, org_admin+ for organization)
- `DELETE /api/v1/roles/:id` - Deactivate role (admin+ for platform, org_admin+ for organization)

**Multi-Tenancy**:
- **Platform Owner Users**: No restrictions, can access all data
- **Customer Users**: 
  - Non-admin customer users only see data from their organization
  - Admins can filter by organizationId
  - Data isolation enforced at organization level
- Cache invalidation on updates
- User session cache invalidated when user roles, organizationId, userType, or isActive changes

**Query Optimization**:
- Uses MongoDB aggregation pipelines with `$lookup` instead of Mongoose `populate()` for better performance
- `$match` stages placed before `$lookup` for early filtering
- Optimized for single organizationId per user (not arrays)

**Organization Types**:
- Each organization has a unique code
- Type determines organization capabilities
- Onboarding tracked with timestamp and user

### 3. Resource Service

**Purpose**: Manages pooled resources and their allocations

**Key Features**:
- Resource CRUD operations
- Resource allocation and booking
- Geospatial queries for location-based resources
- Capacity management
- Status tracking (available, in_use, maintenance, reserved, unavailable)

**Models**:
- `Resource` - Resource data with location, capacity, and specifications
- `ResourceAllocation` - Tracks resource usage and bookings

**Endpoints**:
- `POST /api/v1/resources` - Create resource (org_admin+)
- `GET /api/v1/resources` - Get all resources (with filters)
- `GET /api/v1/resources/:id` - Get resource by ID
- `PUT /api/v1/resources/:id` - Update resource (org_admin+)
- `POST /api/v1/resources/:id/allocate` - Allocate resource
- `GET /api/v1/resources/allocations/list` - Get allocations

**Resource Types**:
- aircraft
- equipment
- facility
- personnel
- other

**Allocation Logic**:
- Checks resource availability
- Validates capacity
- Prevents overlapping allocations
- Updates resource status automatically


## Shared Components

### Configuration (`shared/config`)

Centralized configuration for all services:
- Server settings
- MongoDB connection settings
- Redis connection settings
- JWT configuration
- Service URLs for inter-service communication
- CORS and rate limiting settings

### Common Utilities (`shared/common`)

Shared utilities and middleware:
- **Database**: MongoDB and Redis connection utilities
- **Logger**: Winston-based logging
- **Cache**: Redis cache wrapper functions
- **Auth Middleware**: JWT authentication and authorization
- **Error Handler**: Global error handling middleware
- **Response Utils**: Standardized API responses

### Authentication Middleware

- `authenticate` - Verifies JWT token and attaches user to request
- `authorize(...roles)` - Checks if user has required roles
- `checkOrganizationAccess` - Validates organization access

## Database Schema

### User (Auth Service)
```javascript
{
  email: String (unique, indexed),
  password: String (hashed),
  firstName: String,
  lastName: String,
  userType: String (enum: platform_owner, customer, required, indexed),
  organizationId: ObjectId (ref: Organization, optional for platform_owner),
  roles: [ObjectId] (ref: Role, required),
  isActive: Boolean,
  lastLogin: Date,
  refreshToken: String
}
```

### User (Platform Service)
```javascript
{
  email: String (unique, indexed),
  firstName: String,
  lastName: String,
  userType: String (enum: platform_owner, customer, required, indexed),
  organizationId: ObjectId (ref: Organization, indexed, required for customer),
  roles: [ObjectId] (ref: Role, required),
  isActive: Boolean (indexed),
  metadata: Map,
  preferences: {
    timezone: String,
    language: String,
    notifications: Object
  }
}
```

### Role
```javascript
{
  name: String (required, indexed),
  scope: String (enum: platform, organization, required, indexed),
  organizationId: ObjectId (ref: Organization, indexed, required if scope='organization', null if scope='platform'),
  description: String,
  permissions: [String],
  isActive: Boolean (indexed, default: true),
  metadata: Map,
  timestamps: true
}

// Indexes:
// - Unique: { name: 1, scope: 1, organizationId: 1 }
// - { scope: 1, organizationId: 1, isActive: 1 }
// - { scope: 1, isActive: 1 }
```

### Organization
```javascript
{
  name: String (indexed),
  type: String (enum: logistics, maintainer, customer, resource_provider, indexed),
  code: String (unique, uppercase, indexed),
  email: String,
  phone: String,
  address: Object,
  isActive: Boolean (indexed),
  metadata: Map,
  settings: Object,
  onboardedBy: ObjectId (ref: User),
  onboardedAt: Date
}
```

### Resource
```javascript
{
  name: String,
  type: String (enum: aircraft, equipment, facility, personnel, other, indexed),
  providerOrganizationId: ObjectId (ref: Organization, indexed),
  status: String (enum: available, in_use, maintenance, reserved, unavailable, indexed),
  capacity: Number,
  currentUsage: Number,
  location: {
    type: 'Point',
    coordinates: [Number],
    address: String,
    city: String,
    country: String
  },
  specifications: Map,
  metadata: Map,
  isActive: Boolean (indexed)
}
```

### ResourceAllocation
```javascript
{
  resourceId: ObjectId (ref: Resource, indexed),
  customerOrganizationId: ObjectId (ref: Organization, indexed),
  allocatedBy: ObjectId (ref: User),
  startTime: Date (indexed),
  endTime: Date (indexed),
  status: String (enum: pending, active, completed, cancelled, indexed),
  quantity: Number,
  notes: String
}
```

## Caching Strategy

### Redis Cache Usage

- **User Session Data**: Matches JWT expiration (24h default) - Stores userId, email, firstName, lastName, userType, organizationId, roles, roleIds, isActive
- **User Data**: 5 minutes TTL
- **Organization Data**: 5 minutes TTL
- **Role Data**: 5 minutes TTL
- **Resource Data**: 2 minutes TTL (frequently changing)
- **Refresh Tokens**: 7 days TTL

### Cache Invalidation

- Updates invalidate related cache keys
- Pattern-based deletion for list caches (e.g., `users:*`, `organizations:*`, `roles:*`)
- User session cache (`user_session:${userId}`) invalidated when:
  - User roles change
  - User organizationId changes
  - User userType changes
  - User isActive status changes
- Automatic expiration for time-sensitive data

## Security

### Authentication
- JWT-based authentication
- Access tokens (24h expiration)
- Refresh tokens (7d expiration)
- Refresh tokens stored in Redis for validation
- User session data cached in Redis with key `user_session:${userId}` and TTL matching JWT expiration
- Session data includes: userId, email, firstName, lastName, userType, organizationId, roles (names), roleIds, isActive
- Middleware retrieves user data from Redis cache first, falls back to JWT payload if cache miss
- Session cache automatically invalidated on user data changes

### Authorization
- Role-based access control (RBAC)
- Multi-level permissions
- Organization-level access control
- Resource-level permissions

### Data Protection
- Password hashing with bcrypt
- Sensitive fields excluded from JSON responses
- Input validation with Joi
- SQL injection prevention (MongoDB)
- XSS protection via Express middleware

## Scalability Features

### Horizontal Scaling
- PM2 cluster mode for load distribution
- Stateless services (can scale independently)
- Shared database and cache (MongoDB + Redis)

### Performance Optimizations
- Redis caching for frequently accessed data
- User session data cached in Redis to avoid database lookups on every request
- MongoDB aggregation pipelines with `$lookup` instead of Mongoose `populate()` for better performance
- `$match` stages placed before `$lookup` for early filtering and index usage
- Optimized aggregate queries for single organizationId per user
- Database indexing on critical fields
- Geospatial indexes for location queries
- Connection pooling for MongoDB
- Direct service access (routing via external load balancer)

### Low Latency Design
- In-memory caching (Redis)
- Efficient database queries with indexes
- Minimal inter-service communication
- Async/await for non-blocking operations

## Deployment

### PM2 Configuration

The `ecosystem.config.js` file manages all services:
- Auth: 2 instances (cluster mode)
- Platform: 2 instances (cluster mode) - Merged service for users, organizations, and admin
- Resource: 2 instances (cluster mode)

### Environment Variables

Required environment variables:
```bash
# MongoDB
MONGODB_URI=mongodb://localhost:27017/superb_db

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# Service URLs (for inter-service communication)
AUTH_SERVICE_URL=http://localhost:3001
PLATFORM_SERVICE_URL=http://localhost:3002
RESOURCE_SERVICE_URL=http://localhost:3004

# Server
NODE_ENV=development
LOG_LEVEL=info
```

### Running the Services

```bash
# Install dependencies
npm run install:all

# Start all services (development)
npm run start:dev

# Start all services (production)
npm run start:prod

# Stop all services
npm run stop

# Restart all services
npm run restart

# View logs
npm run logs

# Delete PM2 processes
npm run delete
```

## API Usage Examples

### Register User
```bash
POST /api/v1/auth/register
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "customer",
  "organizationId": "org_id_here",
  "roleIds": ["role_object_id_here"]
}
# Note: If roleIds not provided, defaults to 'viewer' role based on userType
```

### Login
```bash
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Create Organization (Admin)
```bash
POST /api/v1/admin/onboard-organization
Authorization: Bearer <admin_token>
{
  "organization": {
    "name": "Acme Logistics",
    "type": "logistics",
    "code": "ACME",
    "email": "contact@acme.com",
    "phone": "+1234567890",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "country": "USA",
      "zipCode": "10001"
    }
  },
  "adminUser": {
    "email": "admin@acme.com",
    "password": "securePassword123",
    "firstName": "Admin",
    "lastName": "User"
  }
}
```

### Create Resource
```bash
POST /api/v1/resources
Authorization: Bearer <token>
{
  "name": "Boeing 737",
  "type": "aircraft",
  "capacity": 1,
  "status": "available",
  "location": {
    "coordinates": [-74.006, 40.7128],
    "address": "JFK Airport",
    "city": "New York",
    "country": "USA"
  },
  "specifications": {
    "model": "737-800",
    "maxCapacity": 189,
    "range": 3500
  }
}
```

### Allocate Resource
```bash
POST /api/v1/resources/:resourceId/allocate
Authorization: Bearer <token>
{
  "startTime": "2025-01-15T10:00:00Z",
  "endTime": "2025-01-15T18:00:00Z",
  "quantity": 1,
  "notes": "Urgent delivery"
}
```

## Development Guidelines

### Code Structure
- Each service is self-contained with its own dependencies
- Shared code in `shared/` directory
- Models, controllers, routes pattern
- Consistent error handling

### Best Practices
- Use async/await for asynchronous operations
- Implement proper error handling
- Use caching for frequently accessed data
- Validate input data
- Log important operations
- Follow RESTful API conventions
- Use MongoDB aggregation pipelines with `$lookup` instead of Mongoose `populate()` for better performance
- Place `$match` stages before `$lookup` for early filtering
- Optimize queries for single ObjectId references (not arrays) where applicable

### Testing Considerations
- Unit tests for controllers
- Integration tests for services
- E2E tests for critical workflows
- Mock external dependencies

## Future Enhancements

Potential improvements:
- Message queue (RabbitMQ/Kafka) for async operations
- GraphQL API layer
- WebSocket support for real-time updates
- Advanced analytics and reporting
- Audit logging system
- Rate limiting per user/organization
- API versioning strategy
- Service mesh (Istio/Linkerd)
- Container orchestration (Kubernetes)
- CI/CD pipeline
- Monitoring and observability (Prometheus, Grafana)

## Support and Maintenance

### Logging
- Winston logger configured per service
- Logs stored in `./logs/` directory
- JSON format for production, simple format for development

### Monitoring
- PM2 monitoring dashboard available
- Health check endpoints on each service (`/health`)
- Service status tracking

### Troubleshooting
- Check service logs in `./logs/` directory
- Verify MongoDB and Redis connections
- Check environment variables
- Verify service URLs for inter-service communication
- Check Redis cache for user session data: `user_session:${userId}`
- Verify roles exist in database before user registration
- Ensure platform initialization script has been run: `npm run init:platform`

## Initialization

### Platform Initialization Script

The `scripts/init-platform.js` script initializes the platform:
1. Creates platform-scoped roles (super_admin, admin, viewer)
2. Creates a platform owner user (admin@platform.com)
3. Idempotent - can be run multiple times safely

**Usage**:
```bash
npm run init:platform
```

**Default Credentials**:
- Email: `admin@platform.com`
- Password: `ChangeMe123!`
- User Type: `platform_owner`
- Role: `super_admin`

## API Testing

### Postman Collection

A complete Postman collection is available for testing the full API flow:
- **File**: `postman-collection.json`
- **Environment**: `postman-environment.json`
- **Documentation**: `POSTMAN_COLLECTION_README.md`

**Test Flow**:
1. Login as Super Admin
2. Get Platform Roles
3. Create Platform Admin User
4. Login as Platform Admin
5. Onboard Organization
6. Get Organization Roles
7. Login as Organization Admin
8. Create Customer User
9. Login as Customer User
10. Get Customer User Profile
11. Get Organization Details
12. Get System Stats

The collection includes automatic variable extraction and test assertions for each request.

