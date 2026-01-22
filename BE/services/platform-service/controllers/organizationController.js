/**
 * Organization Controller
 * Handles organization management with multi-tenancy for customer users only
 */
import mongoose from 'mongoose';
import Organization from '../models/Organization.js';
import { logger, cache, response } from '@superb/shared-common';
import * as organizationService from '../services/organizationService.js';

/**
 * Create organization
 */
const createOrganization = async (req, res) => {
  try {
    const organization = await organizationService.createOrganization(
      req.body,
      req.user.userId
    );

    return response.success(res, organization, 'Organization created successfully', 201);
  } catch (error) {
    logger.error('Create organization error:', error);
    if (error.code === 11000) {
      return response.error(res, 'Organization code already exists', 409);
    }
    return response.error(res, error.message, 500);
  }
};

/**
 * Get all organizations
 * Multi-tenancy: Customer users can only see their own organization
 */
const getOrganizations = async (req, res) => {
  try {
    const { type, isActive, page = 1, limit = 10 } = req.query;
    const user = req.user;

    const query = {};

    // Multi-tenancy: Only applies to customer users
    // Platform owner users can see all organizations
    if (user.userType === 'customer') {
      // Customer users can only see their own organization
      const hasAdminRole = user.roles?.some(role => 
        role === 'super_admin' || role === 'admin'
      );
      if (!hasAdminRole) {
        query._id = user.organizationId;
      }
    }
    // Platform owner users can see all organizations (no filter)

    if (type) {
      query.type = type;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Check cache
    const cacheKey = `organizations:${JSON.stringify(query)}:${page}:${limit}`;
    const cached = await cache.get(cacheKey);
    if (cached) {
      return response.success(res, cached, 'Organizations retrieved successfully');
    }

    // Use aggregate query to populate onboardedBy
    // $match first for efficiency, then lookup, then reshape
    const pipeline = [
      { $match: query },
      {
        $lookup: {
          from: 'users',
          localField: 'onboardedBy',
          foreignField: '_id',
          as: 'onboardedBy',
        },
      },
      {
        $addFields: {
          // onboardedBy is single ObjectId, so just get first element (or null) and select fields
          onboardedBy: {
            $let: {
              vars: { onboardedUser: { $arrayElemAt: ['$onboardedBy', 0] } },
              in: {
                $cond: {
                  if: '$$onboardedUser',
                  then: {
                    email: '$$onboardedUser.email',
                    firstName: '$$onboardedUser.firstName',
                    lastName: '$$onboardedUser.lastName',
                    _id: '$$onboardedUser._id',
                  },
                  else: null,
                },
              },
            },
          },
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: parseInt(limit) },
    ];

    const organizations = await Organization.aggregate(pipeline);

    const total = await Organization.countDocuments(query);

    const result = {
      organizations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    };

    // Cache for 5 minutes
    await cache.set(cacheKey, result, 300);

    return response.success(res, result, 'Organizations retrieved successfully');
  } catch (error) {
    logger.error('Get organizations error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Get organization by ID
 */
const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Check cache
    const cacheKey = `organization:${id}`;
    const cached = await cache.get(cacheKey);
    if (cached) {
      return response.success(res, cached, 'Organization retrieved successfully');
    }

    // Get organization with populated onboardedBy using aggregate query
    // $match first for efficiency, then lookup, then reshape
    const pipeline = [
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'users',
          localField: 'onboardedBy',
          foreignField: '_id',
          as: 'onboardedBy',
        },
      },
      {
        $addFields: {
          // onboardedBy is single ObjectId, so just get first element (or null) and select fields
          onboardedBy: {
            $let: {
              vars: { onboardedUser: { $arrayElemAt: ['$onboardedBy', 0] } },
              in: {
                $cond: {
                  if: '$$onboardedUser',
                  then: {
                    email: '$$onboardedUser.email',
                    firstName: '$$onboardedUser.firstName',
                    lastName: '$$onboardedUser.lastName',
                    _id: '$$onboardedUser._id',
                  },
                  else: null,
                },
              },
            },
          },
        },
      },
    ];

    const result = await Organization.aggregate(pipeline);
    const organization = result.length > 0 ? result[0] : null;

    if (!organization) {
      return response.error(res, 'Organization not found', 404);
    }

    // Multi-tenancy check: Only applies to customer users
    if (user.userType === 'customer') {
      const hasAdminRole = user.roles?.some(role => 
        role === 'super_admin' || role === 'admin'
      );
      if (!hasAdminRole) {
        if (organization._id.toString() !== user.organizationId) {
          return response.error(res, 'Access denied', 403);
        }
      }
    }
    // Platform owner users can access any organization

    // Cache for 5 minutes
    await cache.set(cacheKey, organization, 300);

    return response.success(res, organization, 'Organization retrieved successfully');
  } catch (error) {
    logger.error('Get organization error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Update organization
 */
const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = req.user;

    const organization = await Organization.findById(id);
    if (!organization) {
      return response.error(res, 'Organization not found', 404);
    }

    // Multi-tenancy check: Only applies to customer users
    if (user.userType === 'customer') {
      const hasAdminRole = user.roles?.some(role => 
        role === 'super_admin' || role === 'admin'
      );
      if (!hasAdminRole) {
        if (organization._id.toString() !== user.organizationId) {
          return response.error(res, 'Access denied', 403);
        }
      }
    }

    // Prevent type changes unless super admin
    const hasSuperAdminRole = user.roles?.some(role => role === 'super_admin');
    if (updates.type && !hasSuperAdminRole) {
      delete updates.type;
    }

    Object.assign(organization, updates);
    await organization.save();

    // Invalidate cache
    await cache.del(`organization:${id}`);
    await cache.delPattern('organizations:*');

    return response.success(res, organization, 'Organization updated successfully');
  } catch (error) {
    logger.error('Update organization error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Delete organization (soft delete)
 */
const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const organization = await Organization.findById(id);
    if (!organization) {
      return response.error(res, 'Organization not found', 404);
    }

    // Only super admin can delete organizations
    const hasSuperAdminRole = user.roles?.some(role => role === 'super_admin');
    if (!hasSuperAdminRole) {
      return response.error(res, 'Access denied', 403);
    }

    organization.isActive = false;
    await organization.save();

    // Invalidate cache
    await cache.del(`organization:${id}`);
    await cache.delPattern('organizations:*');

    return response.success(res, null, 'Organization deactivated successfully');
  } catch (error) {
    logger.error('Delete organization error:', error);
    return response.error(res, error.message, 500);
  }
};

export {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
};

