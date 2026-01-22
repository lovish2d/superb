/**
 * Shared configuration for all services
 */

const config = {
  // Server Configuration
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    apiVersion: 'v1',
  },

  // MongoDB Configuration
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/superb_db',
    options: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    },
  },

  // Redis Configuration
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
    db: process.env.REDIS_DB || 0,
    ttl: {
      default: 3600, // 1 hour
      session: 1800, // 30 minutes
      token: 900, // 15 minutes
    },
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  // Service URLs (for inter-service communication)
  services: {
    auth: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    platform: process.env.PLATFORM_SERVICE_URL || 'http://localhost:3002',
    resource: process.env.RESOURCE_SERVICE_URL || 'http://localhost:3004',
  },

  // Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },

  // CORS Configuration
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'json',
  },
};

export default config;

