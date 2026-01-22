/**
 * MongoDB connection utility
 */
import mongoose from 'mongoose';
import config from '../../config/index.js';
import logger from '../logger.js';

let connection = null;

export const connectMongoDB = async () => {
  if (connection) {
    return connection;
  }

  try {
    connection = await mongoose.connect(config.mongodb.uri, config.mongodb.options);
    logger.info('MongoDB connected successfully');
    
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
      connection = null;
    });

    return connection;
  } catch (error) {
    logger.error('MongoDB connection failed:', error);
    throw error;
  }
};

export const disconnectMongoDB = async () => {
  if (connection) {
    await mongoose.disconnect();
    connection = null;
    logger.info('MongoDB disconnected');
  }
};

export { mongoose };

