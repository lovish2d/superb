/**
 * Redis cache utility functions
 */
import { getRedisClient } from '../db/redis.js';
import config from '../../config/index.js';

/**
 * Get value from cache
 */
export const get = async (key) => {
  try {
    const client = getRedisClient();
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
};

/**
 * Set value in cache
 */
export const set = async (key, value, ttl = config.redis.ttl.default) => {
  try {
    const client = getRedisClient();
    await client.setEx(key, ttl, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Cache set error:', error);
    return false;
  }
};

/**
 * Delete value from cache
 */
export const del = async (key) => {
  try {
    const client = getRedisClient();
    await client.del(key);
    return true;
  } catch (error) {
    console.error('Cache delete error:', error);
    return false;
  }
};

/**
 * Delete multiple keys matching pattern
 */
export const delPattern = async (pattern) => {
  try {
    const client = getRedisClient();
    const keys = await client.keys(pattern);
    if (keys.length > 0) {
      await client.del(keys);
    }
    return true;
  } catch (error) {
    console.error('Cache delete pattern error:', error);
    return false;
  }
};

/**
 * Check if key exists in cache
 */
export const exists = async (key) => {
  try {
    const client = getRedisClient();
    const result = await client.exists(key);
    return result === 1;
  } catch (error) {
    console.error('Cache exists error:', error);
    return false;
  }
};

/**
 * Cache object with all cache methods
 */
const cache = {
  get,
  set,
  del,
  delPattern,
  exists,
};

export default cache;

