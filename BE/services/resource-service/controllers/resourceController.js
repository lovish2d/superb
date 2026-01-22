/**
 * Resource Controller
 */
import Resource from '../models/Resource.js';
import ResourceAllocation from '../models/ResourceAllocation.js';
import { logger, cache, response } from '@superb/shared-common';

/**
 * Create resource
 */
const createResource = async (req, res) => {
  try {
    const resourceData = {
      ...req.body,
      providerOrganizationId: req.user.organizationId,
    };

    const resource = new Resource(resourceData);
    await resource.save();

    // Invalidate cache
    await cache.delPattern('resources:*');

    logger.info(`Resource created: ${resource._id} by ${req.user.userId}`);

    return response.success(res, resource, 'Resource created successfully', 201);
  } catch (error) {
    logger.error('Create resource error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Get all resources
 */
const getResources = async (req, res) => {
  try {
    const { type, status, organizationId, page = 1, limit = 10, lat, lng, radius } = req.query;
    const user = req.user;

    const query = { isActive: true };

    // Filter by organization if specified
    if (organizationId) {
      query.providerOrganizationId = organizationId;
    } else if (!user.roles?.includes('super_admin') && !user.roles?.includes('admin')) {
      // Non-admin users see resources from their organization or available resources
      query.$or = [
        { providerOrganizationId: user.organizationId },
        { status: 'available' },
      ];
    }

    if (type) {
      query.type = type;
    }

    if (status) {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Check cache
    const cacheKey = `resources:${JSON.stringify(query)}:${page}:${limit}`;
    const cached = await cache.get(cacheKey);
    if (cached) {
      return response.success(res, cached, 'Resources retrieved successfully');
    }

    let resourcesQuery = Resource.find(query);

    // Geospatial query if location provided
    if (lat && lng && radius) {
      resourcesQuery = Resource.find({
        ...query,
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(lng), parseFloat(lat)],
            },
            $maxDistance: parseInt(radius) * 1000, // Convert km to meters
          },
        },
      });
    }

    const resources = await resourcesQuery
      .populate('providerOrganizationId', 'name type code')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Resource.countDocuments(query);

    const result = {
      resources,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    };

    // Cache for 2 minutes (resources change frequently)
    await cache.set(cacheKey, result, 120);

    return response.success(res, result, 'Resources retrieved successfully');
  } catch (error) {
    logger.error('Get resources error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Get resource by ID
 */
const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check cache
    const cacheKey = `resource:${id}`;
    const cached = await cache.get(cacheKey);
    if (cached) {
      return response.success(res, cached, 'Resource retrieved successfully');
    }

    const resource = await Resource.findById(id).populate('providerOrganizationId');

    if (!resource) {
      return response.error(res, 'Resource not found', 404);
    }

    // Cache for 2 minutes
    await cache.set(cacheKey, resource, 120);

    return response.success(res, resource, 'Resource retrieved successfully');
  } catch (error) {
    logger.error('Get resource error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Update resource
 */
const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = req.user;

    const resource = await Resource.findById(id);
    if (!resource) {
      return response.error(res, 'Resource not found', 404);
    }

    // Check access
    if (!user.roles?.includes('super_admin') && !user.roles?.includes('admin')) {
      if (resource.providerOrganizationId.toString() !== user.organizationId) {
        return response.error(res, 'Access denied', 403);
      }
    }

    Object.assign(resource, updates);
    await resource.save();

    // Invalidate cache
    await cache.del(`resource:${id}`);
    await cache.delPattern('resources:*');

    return response.success(res, resource, 'Resource updated successfully');
  } catch (error) {
    logger.error('Update resource error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Allocate resource
 */
const allocateResource = async (req, res) => {
  try {
    const { resourceId, startTime, endTime, quantity = 1, notes } = req.body;
    const user = req.user;

    // Check if resource exists and is available
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return response.error(res, 'Resource not found', 404);
    }

    if (resource.status !== 'available') {
      return response.error(res, 'Resource is not available', 400);
    }

    if (resource.currentUsage + quantity > resource.capacity) {
      return response.error(res, 'Insufficient resource capacity', 400);
    }

    // Check for overlapping allocations
    const overlapping = await ResourceAllocation.findOne({
      resourceId,
      status: { $in: ['pending', 'active'] },
      $or: [
        {
          startTime: { $lte: new Date(endTime) },
          endTime: { $gte: new Date(startTime) },
        },
      ],
    });

    if (overlapping) {
      return response.error(res, 'Resource already allocated for this time period', 400);
    }

    // Create allocation
    const allocation = new ResourceAllocation({
      resourceId,
      customerOrganizationId: user.organizationId,
      allocatedBy: user.userId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      quantity,
      notes,
      status: 'pending',
    });

    await allocation.save();

    // Update resource usage
    resource.currentUsage += quantity;
    if (resource.currentUsage >= resource.capacity) {
      resource.status = 'reserved';
    }
    await resource.save();

    // Invalidate cache
    await cache.del(`resource:${resourceId}`);
    await cache.delPattern('resources:*');
    await cache.delPattern('allocations:*');

    logger.info(`Resource allocated: ${resourceId} to ${user.organizationId}`);

    return response.success(res, allocation, 'Resource allocated successfully', 201);
  } catch (error) {
    logger.error('Allocate resource error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Get allocations
 */
const getAllocations = async (req, res) => {
  try {
    const { resourceId, organizationId, status, page = 1, limit = 10 } = req.query;
    const user = req.user;

    const query = {};

    if (resourceId) {
      query.resourceId = resourceId;
    }

    if (organizationId) {
      query.customerOrganizationId = organizationId;
    } else if (!user.roles?.includes('super_admin') && !user.roles?.includes('admin')) {
      query.customerOrganizationId = user.organizationId;
    }

    if (status) {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const allocations = await ResourceAllocation.find(query)
      .populate('resourceId')
      .populate('customerOrganizationId', 'name type code')
      .populate('allocatedBy', 'email firstName lastName')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ startTime: -1 });

    const total = await ResourceAllocation.countDocuments(query);

    const result = {
      allocations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    };

    return response.success(res, result, 'Allocations retrieved successfully');
  } catch (error) {
    logger.error('Get allocations error:', error);
    return response.error(res, error.message, 500);
  }
};

export {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  allocateResource,
  getAllocations,
};

