/**
 * Organization Service
 * Shared business logic for organization operations
 */
import Organization from '../models/Organization.js';
import { logger, cache } from '@superb/shared-common';

/**
 * Create organization
 * Shared logic for creating organizations
 */
export const createOrganization = async (organizationData, onboardedBy) => {
  const data = {
    ...organizationData,
    onboardedBy,
    onboardedAt: new Date(),
  };

  const organization = new Organization(data);
  await organization.save();

  // Invalidate cache
  await cache.delPattern('organizations:*');

  logger.info(`Organization created: ${organization.code} by ${onboardedBy}`);

  return organization;
};

