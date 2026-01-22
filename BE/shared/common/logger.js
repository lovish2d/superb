/**
 * Shared logger utility using Winston
 */
import winston from 'winston';
import config from '../config/index.js';

const logger = winston.createLogger({
  level: config.logging.level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    config.logging.format === 'json' 
      ? winston.format.json() 
      : winston.format.simple()
  ),
  defaultMeta: { service: process.env.SERVICE_NAME || 'unknown' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

export default logger;

