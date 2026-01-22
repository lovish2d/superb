/**
 * User Routes
 */
import express from 'express';
import { authenticate, authorize } from '@superb/shared-common';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all users
router.get('/', userController.getUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user (requires org_admin or higher)
router.put('/:id', authorize('org_admin', 'admin', 'super_admin'), userController.updateUser);

// Delete user (requires org_admin or higher)
router.delete('/:id', authorize('org_admin', 'admin', 'super_admin'), userController.deleteUser);

export default router;

