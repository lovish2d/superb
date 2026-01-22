/**
 * Admin Controller
 * Handles admin operations including organization onboarding
 */
import axios from 'axios';
import config from '@superb/shared-config';
import { logger, response, cache } from '@superb/shared-common';
import Organization from '../models/Organization.js';
import User from '../models/User.js';
import Role from '../models/Role.js';
import * as organizationService from '../services/organizationService.js';

/**
 * Onboard new organization
 * Creates organization and admin user for the organization
 */
const onboardOrganization = async (req, res) => {
  try {
    const { organization, adminUser } = req.body;
    const onboardedBy = req.user.userId;

    // Step 1: Create organization using shared service
    const createdOrg = await organizationService.createOrganization(
      organization,
      onboardedBy
    );

    // Step 2: Create default roles for the organization
    const defaultRoles = [
      { name: 'org_admin', description: 'Organization Administrator', permissions: ['*'] },
      { name: 'manager', description: 'Organization Manager', permissions: ['read', 'write'] },
      { name: 'operator', description: 'Resource Operator', permissions: ['read', 'operate'] },
      { name: 'viewer', description: 'Viewer', permissions: ['read'] },
    ];

    const createdRoles = [];
    for (const roleData of defaultRoles) {
      const role = new Role({
        ...roleData,
        scope: 'organization',
        organizationId: createdOrg._id,
        isActive: true,
      });
      await role.save();
      createdRoles.push(role);
    }

    // Find org_admin role ID
    const orgAdminRole = createdRoles.find(r => r.name === 'org_admin');
    if (!orgAdminRole) {
      throw new Error('Failed to create org_admin role');
    }

    // Step 3: Create admin user for the organization via Auth Service
    const userResponse = await axios.post(
      `${config.services.auth}/api/v1/auth/register`,
      {
        ...adminUser,
        organizationId: createdOrg._id,
        roleIds: [orgAdminRole._id.toString()],
        userType: 'customer', // Organization users are customer type
      }
    );

    const createdUser = userResponse.data.data.user;

    logger.info(`Organization onboarded: ${createdOrg.code} by ${onboardedBy}`);

    // Invalidate cache
    await cache.delPattern('organizations:*');
    await cache.delPattern('users:*');

    return response.success(
      res,
      {
        organization: createdOrg,
        adminUser: createdUser,
      },
      'Organization onboarded successfully',
      201
    );
  } catch (error) {
    logger.error('Onboard organization error:', error);
    
    if (error.response) {
      return response.error(res, error.response.data.message || 'Onboarding failed', error.response.status);
    }
    
    return response.error(res, error.message, 500);
  }
};

/**
 * Get system statistics
 */
const getSystemStats = async (req, res) => {
  try {
    // Fetch stats directly from database (no inter-service calls needed)
    const [orgCount, userCount, customerUserCount, platformOwnerCount] = await Promise.all([
      Organization.countDocuments({ isActive: true }),
      User.countDocuments({ isActive: true }),
      User.countDocuments({ isActive: true, userType: 'customer' }),
      User.countDocuments({ isActive: true, userType: 'platform_owner' }),
    ]);

    // Fetch resource stats from Resource Service
    let resourceCount = 0;
    try {
      const resourcesResponse = await axios.get(`${config.services.resource}/api/v1/resources?limit=1`, {
        headers: { Authorization: req.headers.authorization },
      });
      resourceCount = resourcesResponse.data.data.pagination?.total || 0;
    } catch (error) {
      logger.warn('Could not fetch resource stats:', error.message);
    }

    const stats = {
      organizations: {
        total: orgCount,
      },
      users: {
        total: userCount,
        customer: customerUserCount,
        platform_owner: platformOwnerCount,
      },
      resources: {
        total: resourceCount,
      },
    };

    return response.success(res, stats, 'System statistics retrieved successfully');
  } catch (error) {
    logger.error('Get system stats error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Bulk operations
 */
const bulkOperation = async (req, res) => {
  try {
    const { operation, data } = req.body;

    // Implement bulk operations as needed
    // This is a placeholder for future bulk operations

    return response.error(res, 'Bulk operation not implemented', 501);
  } catch (error) {
    logger.error('Bulk operation error:', error);
    return response.error(res, error.message, 500);
  }
};

export {
  onboardOrganization,
  getSystemStats,
  bulkOperation,
};

