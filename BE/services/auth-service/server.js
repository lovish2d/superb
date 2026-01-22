import dotenv from 'dotenv';
dotenv.config();

/**
 * Authentication Service
 * Handles user authentication, JWT token generation, and authorization
 */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import config from '@superb/shared-config';
import { connectMongoDB, connectRedis, logger, errorHandler, notFoundHandler } from '@superb/shared-common';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'auth-service' });
});

// Routes
app.use('/api/v1/auth', authRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectMongoDB();
    await connectRedis();
    
    app.listen(PORT, () => {
      logger.info(`Auth Service running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start auth service:', error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

export default app;

