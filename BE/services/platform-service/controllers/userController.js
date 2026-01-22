/**
 * User Controller
 * Handles user management with multi-tenancy for customer users only
 */
import mongoose from 'mongoose';
import User from '../models/User.js';
import Role from '../models/Role.js';
import { logger, cache, response, invalidateUserSession } from '@superb/shared-common';
import axios from 'axios';
import config from '@superb/shared-config';

/**
 * Get all users (with multi-tenancy filtering for customer users)
 */
const getUsers = async (req, res) => {
  try {
    const { organizationId, isActive, roleName, roleId, userType, page = 1, limit = 10 } = req.query;
    const user = req.user;

    // Build query
    const query = {};

    // Filter by userType if provided
    if (userType) {
      query.userType = userType;
    }

    // Multi-tenancy: Only applies to customer users
    // Platform owner users can see all users
    if (user.userType === 'customer') {
      // Customer users can only see users from their organization
      // Check if user has super_admin or admin role by name (from JWT)
      const hasAdminRole = user.roles?.some(role => 
        role === 'super_admin' || role === 'admin'
      );
      if (!hasAdminRole) {
        query.organizationId = user.organizationId;
        query.userType = 'customer'; // Customer users can only see other customer users
      } else if (organizationId) {
        query.organizationId = organizationId;
        query.userType = 'customer';
      }
    }
    // Platform owner users can see all users (no organization filter)

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Check cache
    const cacheKey = `users:${JSON.stringify(query)}:${page}:${limit}`;
    const cached = await cache.get(cacheKey);
    if (cached) {
      return response.success(res, cached, 'Users retrieved successfully');
    }

    // Build aggregate pipeline
    const pipeline = [
      { $match: query },
    ];

    // Filter by role name if provided
    if (roleName) {
      const role = await Role.findOne({ name: roleName, isActive: true });
      if (role) {
        pipeline.push({
          $match: { roles: { $in: [role._id] } },
        });
      } else {
        // Return empty result if role not found
        pipeline.push({ $match: { _id: null } });
      }
    }

    // Filter by role ID if provided
    if (roleId) {
      pipeline.push({
        $match: { roles: { $in: [new mongoose.Types.ObjectId(roleId)] } },
      });
    }

    // Lookup organizationId (single ObjectId per user)
    pipeline.push({
      $lookup: {
        from: 'organizations',
        localField: 'organizationId',
        foreignField: '_id',
        as: 'organizationId',
      },
    });

    // Lookup roles (array of ObjectIds)
    pipeline.push({
      $lookup: {
        from: 'roles',
        localField: 'roles',
        foreignField: '_id',
        as: 'roles',
      },
    });

    // Reshape organizationId from array to single object (organizationId is always single or null)
    pipeline.push({
      $addFields: {
        organizationId: { $arrayElemAt: ['$organizationId', 0] },
      },
    });

    // Add pagination and sorting
    pipeline.push(
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: parseInt(limit) }
    );

    // Get total count
    const countPipeline = [
      { $match: query },
    ];
    if (roleName) {
      const role = await Role.findOne({ name: roleName, isActive: true });
      if (role) {
        countPipeline.push({ $match: { roles: { $in: [role._id] } } });
      } else {
        countPipeline.push({ $match: { _id: null } });
      }
    }
    if (roleId) {
      countPipeline.push({ $match: { roles: { $in: [new mongoose.Types.ObjectId(roleId)] } } });
    }
    countPipeline.push({ $count: 'total' });

    const [users, countResult] = await Promise.all([
      User.aggregate(pipeline),
      User.aggregate(countPipeline),
    ]);

    const total = countResult.length > 0 ? countResult[0].total : 0;

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

    // Get user with populated data using aggregate query
    // $match first for efficiency, then lookups, then reshape
    const pipeline = [
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'organizations',
          localField: 'organizationId',
          foreignField: '_id',
          as: 'organizationId',
        },
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'roles',
          foreignField: '_id',
          as: 'roles',
        },
      },
      {
        $addFields: {
          // organizationId is single ObjectId, so just get first element (or null)
          organizationId: { $arrayElemAt: ['$organizationId', 0] },
        },
      },
    ];

    const result = await User.aggregate(pipeline);
    const foundUser = result.length > 0 ? result[0] : null;

    if (!foundUser) {
      return response.error(res, 'User not found', 404);
    }

    // Multi-tenancy check: Only applies to customer users
    if (user.userType === 'customer') {
      const hasAdminRole = user.roles?.some(role => 
        role === 'super_admin' || role === 'admin'
      );
      if (!hasAdminRole) {
        const userOrgId = foundUser.organizationId?._id?.toString() || foundUser.organizationId?.toString();
        if (userOrgId !== user.organizationId) {
          return response.error(res, 'Access denied', 403);
        }
      }
    }
    // Platform owner users can access any user

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

    // Multi-tenancy check: Only applies to customer users
    if (user.userType === 'customer') {
      const hasAdminRole = user.roles?.some(role => 
        role === 'super_admin' || role === 'admin'
      );
      if (!hasAdminRole) {
        if (foundUser.organizationId?.toString() !== user.organizationId) {
          return response.error(res, 'Access denied', 403);
        }
      }
    }

    // Handle role updates - expect roleIds array
    if (updates.roleIds) {
      // Validate that role IDs exist and match user's scope
      const roleIds = Array.isArray(updates.roleIds) ? updates.roleIds : [updates.roleIds];
      const roles = await Role.find({ _id: { $in: roleIds }, isActive: true });
      
      if (roles.length !== roleIds.length) {
        return response.error(res, 'One or more role IDs are invalid', 400);
      }

      // Validate role scope matches user type
      const userScope = foundUser.userType === 'platform_owner' ? 'platform' : 'organization';
      const invalidRoles = roles.filter(role => {
        if (role.scope !== userScope) return true;
        if (role.scope === 'organization' && role.organizationId?.toString() !== foundUser.organizationId?.toString()) {
          return true;
        }
        return false;
      });

      if (invalidRoles.length > 0) {
        return response.error(res, 'Roles must match user scope and organization', 400);
      }

      // Prevent role changes unless super admin or admin
      const hasAdminRole = user.roles?.some(role => 
        role === 'super_admin' || role === 'admin'
      );
      if (!hasAdminRole) {
        delete updates.roleIds;
      } else {
        updates.roles = roleIds;
        delete updates.roleIds;
      }
    }

    // Prevent userType changes unless super admin
    const hasSuperAdminRole = user.roles?.some(role => role === 'super_admin');
    if (updates.userType && !hasSuperAdminRole) {
      delete updates.userType;
    }

    // If changing to customer type, ensure organizationId is set
    if (updates.userType === 'customer' && !updates.organizationId && !foundUser.organizationId) {
      return response.error(res, 'Organization ID is required for customer users', 400);
    }

    Object.assign(foundUser, updates);
    await foundUser.save();

    // Invalidate cache
    await cache.del(`user:${id}`);
    await cache.delPattern('users:*');
    
    // Invalidate user session cache if roles or organizationId changed
    if (updates.roles || updates.organizationId || updates.userType || updates.isActive) {
      await invalidateUserSession(id);
    }

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

    // Multi-tenancy check: Only applies to customer users
    if (user.userType === 'customer') {
      const hasAdminRole = user.roles?.some(role => 
        role === 'super_admin' || role === 'admin'
      );
      if (!hasAdminRole) {
        if (foundUser.organizationId?.toString() !== user.organizationId) {
          return response.error(res, 'Access denied', 403);
        }
      }
    }

    foundUser.isActive = false;
    await foundUser.save();

    // Invalidate cache
    await cache.del(`user:${id}`);
    await cache.delPattern('users:*');
    
    // Invalidate user session cache (user is deactivated)
    await invalidateUserSession(id);

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

