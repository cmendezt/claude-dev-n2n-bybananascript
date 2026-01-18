import { Router } from 'express';
import { healthRouter } from './health.js';

const router = Router();

// Mount route modules
router.use('/health', healthRouter);

// Add additional route modules here:
// router.use('/users', userRouter);
// router.use('/auth', authRouter);

export { router as routes };
