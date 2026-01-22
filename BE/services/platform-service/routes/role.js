/**
 * Role Routes
 */
import express from 'express';
import { authenticate, authorize } from '@superb/shared-common';
import * as roleController from '../controllers/roleController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Create role (admin or org_admin or higher)
router.post('/', authorize('admin', 'super_admin', 'org_admin'), roleController.createRole);

// Get all roles
router.get('/', roleController.getRoles);

// Get role by ID
router.get('/:id', roleController.getRoleById);

// Update role (admin or org_admin or higher)
router.put('/:id', authorize('admin', 'super_admin', 'org_admin'), roleController.updateRole);

// Delete role (admin or org_admin or higher)
router.delete('/:id', authorize('admin', 'super_admin', 'org_admin'), roleController.deleteRole);

export default router;

