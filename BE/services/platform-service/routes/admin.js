/**
 * Admin Routes
 */
import express from 'express';
import { authenticate, authorize } from '@superb/shared-common';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

// All routes require authentication and admin/super_admin role
router.use(authenticate);
router.use(authorize('admin', 'super_admin'));

// Onboard organization
router.post('/onboard-organization', adminController.onboardOrganization);

// Get system statistics
router.get('/stats', adminController.getSystemStats);

// Bulk operations
router.post('/bulk', authorize('super_admin'), adminController.bulkOperation);

export default router;

