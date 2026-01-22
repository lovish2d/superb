/**
 * Resource Routes
 */
import express from 'express';
import { authenticate, authorize } from '@superb/shared-common';
import * as resourceController from '../controllers/resourceController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Create resource (requires resource_provider organization or admin)
router.post('/', authorize('org_admin', 'manager', 'admin', 'super_admin'), resourceController.createResource);

// Get all resources
router.get('/', resourceController.getResources);

// Get resource by ID
router.get('/:id', resourceController.getResourceById);

// Update resource
router.put('/:id', authorize('org_admin', 'manager', 'admin', 'super_admin'), resourceController.updateResource);

// Allocate resource
router.post('/:id/allocate', resourceController.allocateResource);

// Get allocations
router.get('/allocations/list', resourceController.getAllocations);

export default router;

