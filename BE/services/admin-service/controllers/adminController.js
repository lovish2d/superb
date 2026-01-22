/**
 * Admin Controller
 */
import axios from 'axios';
import config from '@superb/shared-config';
import { logger, response } from '@superb/shared-common';

/**
 * Onboard new organization
 * This orchestrates the onboarding process across multiple services
 */
const onboardOrganization = async (req, res) => {
  try {
    const { organization, adminUser } = req.body;
    const onboardedBy = req.user.userId;

    // Step 1: Create organization
    const orgResponse = await axios.post(
      `${config.services.organization}/api/v1/organizations`,
      {
        ...organization,
        onboardedBy,
      },
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    const createdOrg = orgResponse.data.data;

    // Step 2: Create admin user for the organization
    const userResponse = await axios.post(
      `${config.services.auth}/api/v1/auth/register`,
      {
        ...adminUser,
        organizationId: createdOrg._id,
        roles: ['org_admin'],
      }
    );

    const createdUser = userResponse.data.data.user;

    logger.info(`Organization onboarded: ${createdOrg.code} by ${onboardedBy}`);

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
    // Fetch stats from various services
    const [orgsResponse, usersResponse, resourcesResponse] = await Promise.all([
      axios.get(`${config.services.organization}/api/v1/organizations?limit=1`, {
        headers: { Authorization: req.headers.authorization },
      }),
      axios.get(`${config.services.user}/api/v1/users?limit=1`, {
        headers: { Authorization: req.headers.authorization },
      }),
      axios.get(`${config.services.resource}/api/v1/resources?limit=1`, {
        headers: { Authorization: req.headers.authorization },
      }),
    ]);

    const stats = {
      organizations: {
        total: orgsResponse.data.data.pagination?.total || 0,
      },
      users: {
        total: usersResponse.data.data.pagination?.total || 0,
      },
      resources: {
        total: resourcesResponse.data.data.pagination?.total || 0,
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

