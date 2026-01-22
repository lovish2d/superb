/**
 * Role Controller
 * Handles role management with scoping (platform vs organization)
 */
import mongoose from 'mongoose';
import Role from '../models/Role.js';
import { logger, cache, response } from '@superb/shared-common';

/**
 * Create role
 */
const createRole = async (req, res) => {
  try {
    const { name, scope, organizationId, description, permissions } = req.body;
    const user = req.user;

    // Validate scope and organizationId
    if (scope === 'organization' && !organizationId) {
      return response.error(res, 'Organization ID is required for organization-scoped roles', 400);
    }
    if (scope === 'platform' && organizationId) {
      return response.error(res, 'Organization ID must be null for platform-scoped roles', 400);
    }

    // Multi-tenancy: Only platform owner users can create platform roles
    // Customer users can only create roles for their organization
    if (scope === 'platform' && user.userType !== 'platform_owner') {
      return response.error(res, 'Only platform owner users can create platform-scoped roles', 403);
    }

    if (scope === 'organization') {
      // Customer users can only create roles for their organization
      if (user.userType === 'customer') {
        const hasAdminRole = user.roles?.some(role => 
          role === 'super_admin' || role === 'admin' || role === 'org_admin'
        );
        if (!hasAdminRole) {
          return response.error(res, 'Insufficient permissions to create roles', 403);
        }
        if (organizationId !== user.organizationId) {
          return response.error(res, 'Can only create roles for your organization', 403);
        }
      }
    }

    const role = new Role({
      name,
      scope,
      organizationId: scope === 'organization' ? organizationId : null,
      description,
      permissions: permissions || [],
      isActive: true,
    });

    await role.save();

    // Invalidate cache
    await cache.delPattern('roles:*');

    logger.info(`Role created: ${name} (${scope}) by ${user.userId}`);

    return response.success(res, role, 'Role created successfully', 201);
  } catch (error) {
    logger.error('Create role error:', error);
    if (error.code === 11000) {
      return response.error(res, 'Role with this name already exists for this scope/organization', 409);
    }
    return response.error(res, error.message, 500);
  }
};

/**
 * Get all roles
 */
const getRoles = async (req, res) => {
  try {
    const { scope, organizationId, isActive, page = 1, limit = 10 } = req.query;
    const user = req.user;

    const query = {};

    // Multi-tenancy: Customer users can only see roles from their organization
    if (user.userType === 'customer') {
      const hasAdminRole = user.roles?.some(role => 
        role === 'super_admin' || role === 'admin'
      );
      if (!hasAdminRole) {
        // Non-admin customer users can only see roles from their organization
        query.scope = 'organization';
        query.organizationId = user.organizationId;
      } else if (scope === 'organization' && organizationId) {
        query.scope = 'organization';
        query.organizationId = organizationId;
      }
    } else if (scope) {
      query.scope = scope;
      if (scope === 'organization' && organizationId) {
        query.organizationId = organizationId;
      }
    }

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Check cache
    const cacheKey = `roles:${JSON.stringify(query)}:${page}:${limit}`;
    const cached = await cache.get(cacheKey);
    if (cached) {
      return response.success(res, cached, 'Roles retrieved successfully');
    }

    // Use aggregate query to populate organizationId
    // $match first for efficiency, then lookup, then reshape
    const pipeline = [
      { $match: query },
      {
        $lookup: {
          from: 'organizations',
          localField: 'organizationId',
          foreignField: '_id',
          as: 'organizationId',
        },
      },
      {
        $addFields: {
          // organizationId is single ObjectId (or null for platform roles), so just get first element
          organizationId: { $arrayElemAt: ['$organizationId', 0] },
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: parseInt(limit) },
    ];

    const roles = await Role.aggregate(pipeline);

    const total = await Role.countDocuments(query);

    const result = {
      roles,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    };

    // Cache for 5 minutes
    await cache.set(cacheKey, result, 300);

    return response.success(res, result, 'Roles retrieved successfully');
  } catch (error) {
    logger.error('Get roles error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Get role by ID
 */
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Check cache
    const cacheKey = `role:${id}`;
    const cached = await cache.get(cacheKey);
    if (cached) {
      return response.success(res, cached, 'Role retrieved successfully');
    }

    // Get role with populated organizationId using aggregate query
    // $match first for efficiency, then lookup, then reshape
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
        $addFields: {
          // organizationId is single ObjectId (or null for platform roles), so just get first element
          organizationId: { $arrayElemAt: ['$organizationId', 0] },
        },
      },
    ];

    const result = await Role.aggregate(pipeline);
    const role = result.length > 0 ? result[0] : null;

    if (!role) {
      return response.error(res, 'Role not found', 404);
    }

    // Multi-tenancy check
    if (user.userType === 'customer') {
      const hasAdminRole = user.roles?.some(role => 
        role === 'super_admin' || role === 'admin'
      );
      if (!hasAdminRole) {
        const roleOrgId = role.organizationId?._id?.toString() || role.organizationId?.toString();
        if (role.scope === 'platform' || roleOrgId !== user.organizationId) {
          return response.error(res, 'Access denied', 403);
        }
      }
    }

    // Cache for 5 minutes
    await cache.set(cacheKey, role, 300);

    return response.success(res, role, 'Role retrieved successfully');
  } catch (error) {
    logger.error('Get role error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Update role
 */
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = req.user;

    const role = await Role.findById(id);
    if (!role) {
      return response.error(res, 'Role not found', 404);
    }

    // Multi-tenancy check
    if (user.userType === 'customer') {
      const hasAdminRole = user.roles?.some(role => 
        role === 'super_admin' || role === 'admin' || role === 'org_admin'
      );
      if (!hasAdminRole) {
        return response.error(res, 'Insufficient permissions', 403);
      }
      if (role.scope === 'platform' || role.organizationId?.toString() !== user.organizationId) {
        return response.error(res, 'Access denied', 403);
      }
    }

    // Prevent scope changes
    if (updates.scope && updates.scope !== role.scope) {
      return response.error(res, 'Cannot change role scope', 400);
    }

    // Prevent organizationId changes
    if (updates.organizationId && updates.organizationId.toString() !== role.organizationId?.toString()) {
      return response.error(res, 'Cannot change role organization', 400);
    }

    Object.assign(role, updates);
    await role.save();

    // Invalidate cache
    await cache.del(`role:${id}`);
    await cache.delPattern('roles:*');

    return response.success(res, role, 'Role updated successfully');
  } catch (error) {
    logger.error('Update role error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Delete role (soft delete)
 */
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const role = await Role.findById(id);
    if (!role) {
      return response.error(res, 'Role not found', 404);
    }

    // Multi-tenancy check
    if (user.userType === 'customer') {
      const hasAdminRole = user.roles?.some(role => 
        role === 'super_admin' || role === 'admin' || role === 'org_admin'
      );
      if (!hasAdminRole) {
        return response.error(res, 'Insufficient permissions', 403);
      }
      if (role.scope === 'platform' || role.organizationId?.toString() !== user.organizationId) {
        return response.error(res, 'Access denied', 403);
      }
    }

    role.isActive = false;
    await role.save();

    // Invalidate cache
    await cache.del(`role:${id}`);
    await cache.delPattern('roles:*');

    return response.success(res, null, 'Role deactivated successfully');
  } catch (error) {
    logger.error('Delete role error:', error);
    return response.error(res, error.message, 500);
  }
};

export {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
};

