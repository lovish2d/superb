# Docker Deployment Guide

This guide covers Docker deployment for all services in the Superb Backend monorepo.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- AWS CLI (for ECR deployment)
- AWS Account with ECR access (for pushing images)

## Dockerfiles

Each service has its own Dockerfile in its service folder, optimized for production:

- **services/auth-service/Dockerfile** - Auth Service (Port 3001)
- **services/platform-service/Dockerfile** - Platform Service (Port 3002) - Merged service for users, organizations, and admin
- **services/resource-service/Dockerfile** - Resource Service (Port 3004)

All Dockerfiles use:
- Multi-stage builds for smaller images
- Node.js 20 Alpine LTS (lightweight)
- Production-only dependencies
- Health checks
- Proper working directories

## Docker Compose

### Production Deployment

The `docker-compose.yml` file includes all services and infrastructure:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f auth-service

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild and restart
docker-compose up -d --build
```

### Development Mode

Use `docker-compose.dev.yml` to run only MongoDB and Redis:

```bash
# Start only infrastructure
docker-compose -f docker-compose.dev.yml up -d

# Stop infrastructure
docker-compose -f docker-compose.dev.yml down
```

### Environment Variables

Create a `.env` file in the root directory:

```bash
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
LOG_FORMAT=json
```

Docker Compose will automatically load these variables.

## Building Individual Services

### Build a Service

```bash
# Auth Service
docker build -f services/auth-service/Dockerfile -t superb-auth-service:latest .

# User Service
docker build -f services/user-service/Dockerfile -t superb-user-service:latest .

# Platform Service (merged users, organizations, admin)
docker build -f services/platform-service/Dockerfile -t superb-platform-service:latest .

# Resource Service
docker build -f services/resource-service/Dockerfile -t superb-resource-service:latest .

# Admin Service
docker build -f services/admin-service/Dockerfile -t superb-admin-service:latest .
```

### Run a Service

```bash
# Run with environment variables
docker run -d \
  --name auth-service \
  -p 3001:3001 \
  --env-file .env \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/superb_db \
  -e REDIS_HOST=host.docker.internal \
  superb-auth-service:latest
```

## AWS ECR Deployment

### Prerequisites

1. AWS CLI configured with credentials
2. ECR repository access
3. Docker installed and running

### Build and Push Scripts

Two scripts are available for building and pushing to ECR:

#### Node.js Script (Recommended)

```bash
# Basic usage
node scripts/build-and-push-ecr.js [AWS_ACCOUNT_ID] [AWS_REGION] [IMAGE_TAG]

# With environment variables
export AWS_ACCOUNT_ID=123456789012
export AWS_REGION=us-east-1
export IMAGE_TAG=v1.0.0
export ECR_REPOSITORY_PREFIX=superb-backend
node scripts/build-and-push-ecr.js
```

#### Bash Script

```bash
# Basic usage
./scripts/build-and-push-ecr.sh [AWS_ACCOUNT_ID] [AWS_REGION] [IMAGE_TAG]

# With environment variables
export AWS_ACCOUNT_ID=123456789012
export AWS_REGION=us-east-1
export IMAGE_TAG=v1.0.0
./scripts/build-and-push-ecr.sh
```

#### Using NPM Scripts

```bash
# Node.js script
npm run docker:ecr:build [AWS_ACCOUNT_ID] [AWS_REGION] [IMAGE_TAG]

# Bash script
npm run docker:ecr:build:bash [AWS_ACCOUNT_ID] [AWS_REGION] [IMAGE_TAG]
```

### What the Scripts Do

1. **Validate AWS credentials** - Checks for AWS_ACCOUNT_ID
2. **Login to ECR** - Authenticates Docker with AWS ECR
3. **Create repositories** - Creates ECR repositories if they don't exist
4. **Build images** - Builds Docker images for all services
5. **Tag images** - Tags with specified tag and `latest`
6. **Push to ECR** - Pushes all images to their respective repositories

### ECR Repository Names

The scripts create repositories with the following naming pattern:
- `{ECR_REPOSITORY_PREFIX}-auth-service`
- `{ECR_REPOSITORY_PREFIX}-user-service`
- `{ECR_REPOSITORY_PREFIX}-platform-service`
- `{ECR_REPOSITORY_PREFIX}-resource-service`
- `{ECR_REPOSITORY_PREFIX}-admin-service`

Default prefix: `superb-backend`

### Example Output

After running the script, you'll get ECR repository URLs like:
```
123456789012.dkr.ecr.us-east-1.amazonaws.com/superb-backend-auth-service:v1.0.0
123456789012.dkr.ecr.us-east-1.amazonaws.com/superb-backend-user-service:v1.0.0
...
```

## Pulling and Running from ECR

After pushing to ECR, you can pull and run images:

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  123456789012.dkr.ecr.us-east-1.amazonaws.com

# Pull an image
docker pull 123456789012.dkr.ecr.us-east-1.amazonaws.com/superb-backend-auth-service:latest

# Run the image
docker run -d \
  --name auth-service \
  -p 3001:3001 \
  --env-file .env \
  123456789012.dkr.ecr.us-east-1.amazonaws.com/superb-backend-auth-service:latest
```

## Health Checks

All services include health check endpoints at `/health`. Docker health checks are configured in:
- Dockerfiles (HEALTHCHECK instruction)
- docker-compose.yml (healthcheck section)

Check service health:
```bash
# Via Docker
docker ps  # Shows health status

# Via HTTP
curl http://localhost:3001/health  # Auth Service
curl http://localhost:3002/health  # User Service
curl http://localhost:3002/health  # Platform Service
curl http://localhost:3004/health  # Resource Service
curl http://localhost:3005/health  # Admin Service
```

## Troubleshooting

### Build Failures

```bash
# Clean build cache
docker builder prune

# Build without cache
docker build --no-cache -f Dockerfile.auth -t superb-auth-service:latest .
```

### Connection Issues

```bash
# Check service logs
docker-compose logs auth-service

# Check network connectivity
docker network inspect superb-network

# Test MongoDB connection from container
docker exec -it superb-auth-service node -e "require('mongoose').connect('mongodb://mongodb:27017/superb_db').then(() => console.log('Connected'))"
```

### ECR Push Failures

```bash
# Verify AWS credentials
aws sts get-caller-identity

# Check ECR permissions
aws ecr describe-repositories --region us-east-1

# Re-authenticate
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  123456789012.dkr.ecr.us-east-1.amazonaws.com
```

## Best Practices

1. **Use specific tags** - Avoid using only `latest` in production
2. **Scan images** - Enable ECR image scanning
3. **Use secrets** - Store sensitive data in AWS Secrets Manager or environment variables
4. **Monitor health** - Set up CloudWatch alarms for health check failures
5. **Resource limits** - Set memory and CPU limits in docker-compose.yml
6. **Backup volumes** - Regularly backup MongoDB and Redis volumes

## Production Considerations

1. **Use managed databases** - Consider AWS RDS for MongoDB or DocumentDB
2. **Use ElastiCache** - Consider AWS ElastiCache for Redis
3. **Load balancing** - Use ALB/NLB in front of services
4. **Auto-scaling** - Configure ECS/EKS auto-scaling
5. **Logging** - Integrate with CloudWatch Logs
6. **Monitoring** - Set up CloudWatch metrics and alarms

