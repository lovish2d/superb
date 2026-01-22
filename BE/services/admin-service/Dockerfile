# Dockerfile for Admin Service
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY shared/config/package.json ./shared/config/
COPY shared/common/package.json ./shared/common/
COPY services/admin-service/package.json ./services/admin-service/

# Install dependencies
RUN npm install --workspaces --include-workspace-root

# Copy shared packages
COPY shared/config ./shared/config
COPY shared/common ./shared/common

# Copy service files
COPY services/admin-service ./services/admin-service

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY shared/config/package.json ./shared/config/
COPY shared/common/package.json ./shared/common/
COPY services/admin-service/package.json ./services/admin-service/

# Install production dependencies only
RUN npm ci --workspaces --include-workspace-root --omit=dev

# Copy shared packages
COPY --from=builder /app/shared/config ./shared/config
COPY --from=builder /app/shared/common ./shared/common

# Copy service files
COPY --from=builder /app/services/admin-service ./services/admin-service

# Set working directory to service
WORKDIR /app/services/admin-service

# Expose port
EXPOSE 3005

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3005/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start service
CMD ["node", "server.js"]

