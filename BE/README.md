# Superb Backend - Resource Pooling Platform

Multi-service monorepo backend for managing, maintaining, and onboarding customers to use pooled resources.

## Architecture

This project follows a microservices architecture with the following services:

- **Auth Service** (Port 3001) - Authentication and authorization
- **Platform Service** (Port 3002) - Merged service for user management, organization management, and admin operations
- **Resource Service** (Port 3004) - Pooled resource management

**Note**: An external load balancer/router should be used to route requests to the appropriate services.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Redis** - Caching layer
- **PM2** - Process manager
- **JWT** - Authentication

## Quick Start

### Prerequisites

- Node.js (v20.x LTS or higher)
- MongoDB (running on localhost:27017)
- Redis (running on localhost:6379)
- PM2 (installed globally or via npm)

### Installation

```bash
# Install all dependencies (recommended - uses Node.js script)
npm run install:all

# Or use bash script directly
npm run install:all:bash
# or
./scripts/install-all.sh

# Or use Node.js script directly
node scripts/install-all.js

# Copy environment variables (create .env files as needed)
# See PROJECT_CONTEXT.md for required environment variables
```

The installation script will:
1. Install root dependencies
2. Install shared packages dependencies (@superb/shared-config, @superb/shared-common)
3. Install all service dependencies (auth, user, organization, resource, admin)
4. Link workspace packages

### Running Services

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Stop all services
npm run stop

# View logs
npm run logs
```

### Individual Service Management

```bash
# Start specific service
pm2 start ecosystem.config.js --only auth-service

# Restart specific service
pm2 restart auth-service

# View logs for specific service
pm2 logs auth-service
```

## Project Structure

```
BE/
├── services/              # Microservices
│   ├── auth-service/
│   ├── platform-service/  # Merged service (users, organizations, admin)
│   ├── resource-service/
│   ├── user-service/       # Deprecated (merged into platform-service)
│   ├── organization-service/ # Deprecated (merged into platform-service)
│   └── admin-service/      # Deprecated (merged into platform-service)
├── shared/                # Shared utilities
│   ├── config/           # Shared configuration
│   └── common/           # Common utilities and middleware
├── logs/                  # PM2 logs (gitignored)
├── ecosystem.config.js    # PM2 configuration
├── package.json          # Root package.json
└── PROJECT_CONTEXT.md     # Comprehensive project documentation
```

## Documentation

For detailed documentation, see [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) which includes:
- Complete architecture overview
- Service details and endpoints
- Database schema
- Security implementation
- API usage examples
- Deployment guide

## Nginx Configuration

Nginx configuration files are available in the `nginx/` directory for routing requests to services:

- **`nginx/superb-backend.conf`** - Complete standalone configuration
- **`nginx/superb-backend-upstreams.conf`** - Upstream definitions (for modular setup)
- **`nginx/superb-backend-server.conf`** - Server block (requires upstreams)

See [nginx/README.md](./nginx/README.md) for detailed installation and configuration instructions.

### Quick Setup

```bash
# Copy to nginx sites-available (Ubuntu/Debian)
sudo cp nginx/superb-backend.conf /etc/nginx/sites-available/superb-backend
sudo ln -s /etc/nginx/sites-available/superb-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Docker Deployment

### Using Docker Compose

```bash
# Build and start all services with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Development mode (only MongoDB and Redis)
docker-compose -f docker-compose.dev.yml up -d
```

### Building Individual Services

Each service has its own Dockerfile in its service folder:
- `services/auth-service/Dockerfile` - Auth Service
- `services/platform-service/Dockerfile` - Platform Service (users, organizations, admin)
- `services/resource-service/Dockerfile` - Resource Service

```bash
# Build a specific service
docker build -f services/auth-service/Dockerfile -t superb-auth-service:latest .

# Run a service
docker run -p 3001:3001 --env-file .env superb-auth-service:latest
```

### Building and Pushing to AWS ECR

```bash
# Using Node.js script (recommended)
npm run docker:ecr:build [AWS_ACCOUNT_ID] [AWS_REGION] [IMAGE_TAG]

# Using bash script
npm run docker:ecr:build:bash [AWS_ACCOUNT_ID] [AWS_REGION] [IMAGE_TAG]

# Or directly
./scripts/build-and-push-ecr.sh [AWS_ACCOUNT_ID] [AWS_REGION] [IMAGE_TAG]
node scripts/build-and-push-ecr.js [AWS_ACCOUNT_ID] [AWS_REGION] [IMAGE_TAG]

# With environment variables
export AWS_ACCOUNT_ID=123456789012
export AWS_REGION=us-east-1
export IMAGE_TAG=v1.0.0
npm run docker:ecr:build
```

The script will:
1. Login to AWS ECR
2. Create ECR repositories if they don't exist
3. Build Docker images for all services
4. Tag images with the specified tag and `latest`
5. Push all images to ECR

## Features

- ✅ Multi-tenancy support
- ✅ Role-based access control (RBAC)
- ✅ JWT authentication
- ✅ Redis caching for low latency
- ✅ Scalable microservices architecture
- ✅ Organization onboarding workflow
- ✅ Resource pooling and allocation
- ✅ Geospatial queries for resources
- ✅ PM2 process management
- ✅ Docker containerization
- ✅ Docker Compose for easy deployment
- ✅ AWS ECR integration

## License

MIT License - See [LICENSE](./LICENSE) file for details.
