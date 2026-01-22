/**
 * Authentication middleware
 */
import jwt from 'jsonwebtoken';
import config from '../../config/index.js';
import logger from '../logger.js';
import cache from '../utils/cache.js';

/**
 * Verify JWT token and attach user info to request
 * First checks Redis cache for user data, falls back to JWT payload if cache miss
 */
export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token required',
      });
    }

    // Check if token contains unresolved variable (Postman variable not set)
    if (typeof token === 'string' && (token.includes('{{') || token.includes('}}'))) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token variable not resolved. Please ensure token is set in environment.',
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, config.jwt.secret);
    const userId = decoded.userId;

    // Try to get user session data from Redis cache
    let userSessionData = await cache.get(`user_session:${userId}`);

    if (userSessionData) {
      // Use cached user data (includes roles, organizationId, etc.)
      // Verify user is still active
      if (!userSessionData.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Account is deactivated',
        });
      }
      req.user = userSessionData;
      logger.debug(`User session data retrieved from cache for user: ${userId}`);
    } else {
      // Fallback to JWT payload if cache miss (for backward compatibility)
      // This can happen if cache expired or was cleared
      // Cache will be refreshed on next login/token refresh
      req.user = decoded;
      logger.debug(`User session data not in cache, using JWT payload for user: ${userId}`);
    }

    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

/**
 * Check if user has required role(s)
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    const userRoles = req.user.roles || [];
    const hasRole = allowedRoles.some(role => userRoles.includes(role));

    if (!hasRole) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
    }

    next();
  };
};

/**
 * Check if user belongs to organization
 * Multi-tenancy: Only applies to customer users
 */
export const checkOrganizationAccess = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  // Platform owner users have access to all organizations
  if (req.user.userType === 'platform_owner') {
    return next();
  }

  const orgId = req.params.orgId || req.body.organizationId || req.query.organizationId;
  
  // Super admins and admins (customer users) can access any organization
  if (req.user.roles?.includes('super_admin') || req.user.roles?.includes('admin')) {
    return next();
  }

  // Check if user's organization matches (for customer users)
  if (req.user.organizationId !== orgId) {
    return res.status(403).json({
      success: false,
      message: 'Access denied to this organization',
    });
  }

  next();
};

