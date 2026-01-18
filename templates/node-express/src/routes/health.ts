import { Router } from 'express';
import { healthController } from '../controllers/health.controller.js';

const router = Router();

/**
 * @route   GET /api/health
 * @desc    Basic health check endpoint
 * @access  Public
 */
router.get('/', healthController.check);

/**
 * @route   GET /api/health/detailed
 * @desc    Detailed health check with system information
 * @access  Public
 */
router.get('/detailed', healthController.detailed);

export { router as healthRouter };
