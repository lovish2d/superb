# Setup Guide

## Prerequisites

Before setting up the project, ensure you have the following installed:

1. **Node.js** (v20.x LTS or higher)
   ```bash
   node --version
   ```

2. **MongoDB** (v5.0 or higher)
   - Install MongoDB: https://www.mongodb.com/try/download/community
   - Start MongoDB service:
     ```bash
     # Linux/Mac
     sudo systemctl start mongod
     # or
     mongod
     
     # Windows
     net start MongoDB
     ```

3. **Redis** (v6.0 or higher)
   - Install Redis: https://redis.io/download
   - Start Redis server:
     ```bash
     # Linux/Mac
     redis-server
     
     # Windows
     redis-server.exe
     ```

4. **PM2** (Optional - can be installed via npm)
   ```bash
   npm install -g pm2
   ```

## Installation Steps

### 1. Clone and Navigate to Project

```bash
cd /home/yasskicker/Documents/Work/BE
```

### 2. Install Dependencies

```bash
# Install root dependencies and all workspace dependencies
npm run install:all
```

This will:
- Install root dependencies (PM2)
- Install dependencies for all services
- Install dependencies for shared packages

### 3. Environment Configuration

Create a `.env` file in the root directory (or in each service directory if you prefer service-specific configs):

```bash
# Copy example (if available) or create manually
cp .env.example .env  # If .env.example exists
```

Required environment variables (see `.env.example` for reference):
- `MONGODB_URI` - MongoDB connection string
- `REDIS_HOST` - Redis host
- `REDIS_PORT` - Redis port
- `JWT_SECRET` - Secret key for JWT tokens (change in production!)

### 4. Verify Services

Check that MongoDB and Redis are running:

```bash
# Check MongoDB
mongosh --eval "db.version()"

# Check Redis
redis-cli ping
# Should return: PONG
```

### 5. Start Services

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

### 6. Verify Services are Running

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs

# Test health endpoints
curl http://localhost:3001/health  # Auth
curl http://localhost:3002/health  # User
curl http://localhost:3003/health  # Organization
curl http://localhost:3004/health  # Resource
curl http://localhost:3005/health  # Admin
```

## Common Issues

### MongoDB Connection Error

**Error**: `MongoDB connection failed`

**Solutions**:
1. Verify MongoDB is running: `mongosh --eval "db.version()"`
2. Check connection string in `.env`: `MONGODB_URI=mongodb://localhost:27017/superb_db`
3. Check MongoDB logs for errors

### Redis Connection Error

**Error**: `Redis connection failed`

**Solutions**:
1. Verify Redis is running: `redis-cli ping`
2. Check Redis configuration in `.env`
3. Check Redis logs

### Port Already in Use

**Error**: `EADDRINUSE: address already in use`

**Solutions**:
1. Find process using the port:
   ```bash
   # Linux/Mac
   lsof -i :3001
   # Windows
   netstat -ano | findstr :3001
   ```
2. Kill the process or change the port in `ecosystem.config.js`

### Module Not Found Errors

**Error**: `Cannot find module '@superb/shared-config'`

**Solutions**:
1. Run `npm run install:all` again
2. Verify workspace configuration in `package.json`
3. Check that shared packages have `package.json` files

### PM2 Not Found

**Error**: `pm2: command not found`

**Solutions**:
1. Install PM2 globally: `npm install -g pm2`
2. Or use npx: `npx pm2 start ecosystem.config.js`

## Development Workflow

### Running Individual Services

```bash
# Start only auth service
pm2 start ecosystem.config.js --only auth-service

# Start multiple services
pm2 start ecosystem.config.js --only auth-service,user-service
```

### Viewing Logs

```bash
# All services
pm2 logs

# Specific service
pm2 logs auth-service

# Last 100 lines
pm2 logs --lines 100

# Follow logs
pm2 logs --follow
```

### Restarting Services

```bash
# Restart all
pm2 restart ecosystem.config.js

# Restart specific service
pm2 restart auth-service

# Reload (zero-downtime restart)
pm2 reload auth-service
```

### Stopping Services

```bash
# Stop all
pm2 stop ecosystem.config.js

# Stop specific service
pm2 stop auth-service

# Delete from PM2
pm2 delete auth-service
```

## Testing the API

### 1. Register a Super Admin User

First, you'll need to manually create a super admin user in MongoDB or use a script. For testing, you can use MongoDB shell:

```javascript
// Connect to MongoDB
mongosh superb_db

// Create super admin user (password will need to be hashed)
// Use the auth service register endpoint after creating an organization
```

### 2. Create an Organization (via Admin)

```bash
curl -X POST http://localhost:3005/api/v1/admin/onboard-organization \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_token>" \
  -d '{
    "organization": {
      "name": "Test Organization",
      "type": "logistics",
      "code": "TEST",
      "email": "test@example.com"
    },
    "adminUser": {
      "email": "admin@test.com",
      "password": "password123",
      "firstName": "Admin",
      "lastName": "User"
    }
  }'
```

### 3. Login

```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "password123"
  }'
```

### 4. Use the Token

```bash
# Get users
curl -X GET http://localhost:3002/api/v1/users \
  -H "Authorization: Bearer <your_token>"
```

## Production Deployment

### Environment Variables

Ensure all production environment variables are set:
- Strong `JWT_SECRET`
- Production MongoDB URI
- Production Redis configuration
- Proper CORS origins
- `NODE_ENV=production`

### PM2 Configuration

The `ecosystem.config.js` is already configured for production. Adjust instance counts based on your server capacity:

```javascript
instances: 2,  // Adjust based on CPU cores
exec_mode: 'cluster',
max_memory_restart: '500M',  // Adjust based on available memory
```

### Monitoring

```bash
# PM2 monitoring
pm2 monit

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
```

## Next Steps

1. Review [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) for detailed architecture
2. Set up proper environment variables
3. Configure MongoDB indexes for production
4. Set up Redis persistence
5. Configure logging and monitoring
6. Set up CI/CD pipeline
7. Implement API rate limiting
8. Add comprehensive testing

