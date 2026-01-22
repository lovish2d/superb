import dotenv from 'dotenv';
dotenv.config();

/**
 * Platform Service
 * Merged service handling users, organizations, and admin operations
 * Supports platform_owner and customer user types with multi-tenancy for customers only
 */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import config from '@superb/shared-config';
import { connectMongoDB, connectRedis, logger, errorHandler, notFoundHandler } from '@superb/shared-common';
import userRoutes from './routes/user.js';
import organizationRoutes from './routes/organization.js';
import adminRoutes from './routes/admin.js';
import roleRoutes from './routes/role.js';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'platform-service' });
});

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/organizations', organizationRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/roles', roleRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectMongoDB();
    await connectRedis();
    
    app.listen(PORT, () => {
      logger.info(`Platform Service running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start platform service:', error);
    process.exit(1);
  }
};

startServer();

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

export default app;

