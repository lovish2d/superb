/**
 * User Controller
 */
import User from '../models/User.js';
import { logger, cache, response, authenticate, authorize, checkOrganizationAccess } from '@superb/shared-common';

/**
 * Get all users (with multi-tenancy filtering)
 */
const getUsers = async (req, res) => {
  try {
    const { organizationId, isActive, role, page = 1, limit = 10 } = req.query;
    const user = req.user;

    // Build query with multi-tenancy
    const query = {};

    // Super admins and admins can see all users
    if (!user.roles?.includes('super_admin') && !user.roles?.includes('admin')) {
      query.organizationId = user.organizationId;
    } else if (organizationId) {
      query.organizationId = organizationId;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    if (role) {
      query.roles = role;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Check cache
    const cacheKey = `users:${JSON.stringify(query)}:${page}:${limit}`;
    const cached = await cache.get(cacheKey);
    if (cached) {
      return response.success(res, cached, 'Users retrieved successfully');
    }

    const users = await User.find(query)
      .populate('organizationId', 'name type')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    const result = {
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    };

    // Cache for 5 minutes
    await cache.set(cacheKey, result, 300);

    return response.success(res, result, 'Users retrieved successfully');
  } catch (error) {
    logger.error('Get users error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Get user by ID
 */
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Check cache
    const cacheKey = `user:${id}`;
    const cached = await cache.get(cacheKey);
    if (cached) {
      return response.success(res, cached, 'User retrieved successfully');
    }

    const foundUser = await User.findById(id).populate('organizationId');

    if (!foundUser) {
      return response.error(res, 'User not found', 404);
    }

    // Multi-tenancy check
    if (!user.roles?.includes('super_admin') && !user.roles?.includes('admin')) {
      if (foundUser.organizationId.toString() !== user.organizationId) {
        return response.error(res, 'Access denied', 403);
      }
    }

    // Cache for 5 minutes
    await cache.set(cacheKey, foundUser, 300);

    return response.success(res, foundUser, 'User retrieved successfully');
  } catch (error) {
    logger.error('Get user error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Update user
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = req.user;

    const foundUser = await User.findById(id);
    if (!foundUser) {
      return response.error(res, 'User not found', 404);
    }

    // Multi-tenancy check
    if (!user.roles?.includes('super_admin') && !user.roles?.includes('admin')) {
      if (foundUser.organizationId.toString() !== user.organizationId) {
        return response.error(res, 'Access denied', 403);
      }
    }

    // Prevent role changes unless super admin or admin
    if (updates.roles && !user.roles?.includes('super_admin') && !user.roles?.includes('admin')) {
      delete updates.roles;
    }

    Object.assign(foundUser, updates);
    await foundUser.save();

    // Invalidate cache
    await cache.del(`user:${id}`);
    await cache.delPattern('users:*');

    return response.success(res, foundUser, 'User updated successfully');
  } catch (error) {
    logger.error('Update user error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Delete user (soft delete)
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const foundUser = await User.findById(id);
    if (!foundUser) {
      return response.error(res, 'User not found', 404);
    }

    // Multi-tenancy check
    if (!user.roles?.includes('super_admin') && !user.roles?.includes('admin')) {
      if (foundUser.organizationId.toString() !== user.organizationId) {
        return response.error(res, 'Access denied', 403);
      }
    }

    foundUser.isActive = false;
    await foundUser.save();

    // Invalidate cache
    await cache.del(`user:${id}`);
    await cache.delPattern('users:*');

    return response.success(res, null, 'User deactivated successfully');
  } catch (error) {
    logger.error('Delete user error:', error);
    return response.error(res, error.message, 500);
  }
};

export {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

