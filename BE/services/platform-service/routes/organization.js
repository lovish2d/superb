/**
 * Organization Routes
 */
import express from 'express';
import { authenticate, authorize } from '@superb/shared-common';
import * as organizationController from '../controllers/organizationController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Create organization (admin or super admin only)
router.post('/', authorize('admin', 'super_admin'), organizationController.createOrganization);

// Get all organizations
router.get('/', organizationController.getOrganizations);

// Get organization by ID
router.get('/:id', organizationController.getOrganizationById);

// Update organization (org_admin or higher)
router.put('/:id', authorize('org_admin', 'admin', 'super_admin'), organizationController.updateOrganization);

// Delete organization (super admin only)
router.delete('/:id', authorize('super_admin'), organizationController.deleteOrganization);

export default router;

