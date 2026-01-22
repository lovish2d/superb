/**
 * User Cache Utility
 * Helper functions for managing user session cache in Redis
 */
import cache from './cache.js';

/**
 * Invalidate user session cache
 * Call this when user data changes (roles, organizationId, userType, isActive, etc.)
 */
export const invalidateUserSession = async (userId) => {
  try {
    await cache.del(`user_session:${userId}`);
    return true;
  } catch (error) {
    console.error('Error invalidating user session cache:', error);
    return false;
  }
};

/**
 * Invalidate multiple user sessions
 */
export const invalidateUserSessions = async (userIds) => {
  try {
    const promises = userIds.map(userId => cache.del(`user_session:${userId}`));
    await Promise.all(promises);
    return true;
  } catch (error) {
    console.error('Error invalidating user session caches:', error);
    return false;
  }
};

/**
 * Get user session data from cache
 */
export const getUserSession = async (userId) => {
  try {
    return await cache.get(`user_session:${userId}`);
  } catch (error) {
    console.error('Error getting user session from cache:', error);
    return null;
  }
};

export default {
  invalidateUserSession,
  invalidateUserSessions,
  getUserSession,
};

