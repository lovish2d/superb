/**
 * Authentication Routes
 */
import express from 'express';
import { authenticate } from '@superb/shared-common';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);

// Protected routes
router.post('/logout', authenticate, authController.logout);
router.get('/profile', authenticate, authController.getProfile);

export default router;

