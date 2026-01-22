/**
 * Redis connection utility
 */
import redis from 'redis';
import config from '../../config/index.js';
import logger from '../logger.js';

let client = null;

export const connectRedis = async () => {
  if (client && client.isOpen) {
    return client;
  }

  try {
    const redisConfig = {
      socket: {
        host: config.redis.host,
        port: config.redis.port,
      },
    };

    if (config.redis.password) {
      redisConfig.password = config.redis.password;
    }

    client = redis.createClient(redisConfig);

    client.on('error', (err) => {
      logger.error('Redis Client Error:', err);
    });

    client.on('connect', () => {
      logger.info('Redis Client Connected');
    });

    client.on('ready', () => {
      logger.info('Redis Client Ready');
    });

    await client.connect();
    
    if (config.redis.db) {
      await client.select(config.redis.db);
    }

    return client;
  } catch (error) {
    logger.error('Redis connection failed:', error);
    throw error;
  }
};

export const getRedisClient = () => {
  if (!client || !client.isOpen) {
    throw new Error('Redis client not connected. Call connectRedis() first.');
  }
  return client;
};

export const disconnectRedis = async () => {
  if (client && client.isOpen) {
    await client.quit();
    client = null;
    logger.info('Redis disconnected');
  }
};

