# Dockerfile for User Service
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY shared/config/package.json ./shared/config/
COPY shared/common/package.json ./shared/common/
COPY services/user-service/package.json ./services/user-service/

# Install dependencies
RUN npm install --workspaces --include-workspace-root

# Copy shared packages
COPY shared/config ./shared/config
COPY shared/common ./shared/common

# Copy service files
COPY services/user-service ./services/user-service

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY shared/config/package.json ./shared/config/
COPY shared/common/package.json ./shared/common/
COPY services/user-service/package.json ./services/user-service/

# Install production dependencies only
RUN npm ci --workspaces --include-workspace-root --omit=dev

# Copy shared packages
COPY --from=builder /app/shared/config ./shared/config
COPY --from=builder /app/shared/common ./shared/common

# Copy service files
COPY --from=builder /app/services/user-service ./services/user-service

# Set working directory to service
WORKDIR /app/services/user-service

# Expose port
EXPOSE 3002

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3002/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start service
CMD ["node", "server.js"]

