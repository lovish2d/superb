# Platform Service Dockerfile
# Multi-stage build for optimized image size

# Stage 1: Build dependencies
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY package-lock.json* ./

# Copy shared packages
COPY shared/config/package.json ./shared/config/
COPY shared/common/package.json ./shared/common/

# Copy platform service package.json
COPY services/platform-service/package.json ./services/platform-service/

# Install dependencies
RUN npm ci --workspace=shared/config --workspace=shared/common --workspace=services/platform-service

# Copy shared packages source
COPY shared/config ./shared/config
COPY shared/common ./shared/common

# Copy platform service source
COPY services/platform-service ./services/platform-service

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY package-lock.json* ./

# Copy shared packages
COPY shared/config/package.json ./shared/config/
COPY shared/common/package.json ./shared/common/
COPY services/platform-service/package.json ./services/platform-service/

# Install production dependencies only
RUN npm ci --workspace=shared/config --workspace=shared/common --workspace=services/platform-service --omit=dev

# Copy built application from builder
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/services/platform-service ./services/platform-service

WORKDIR /app/services/platform-service

# Expose port
EXPOSE 3002

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3002/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the service
CMD ["node", "server.js"]

