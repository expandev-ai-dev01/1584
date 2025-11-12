import { Router } from 'express';
import externalRoutes from '@/routes/v1/externalRoutes';
import internalRoutes from '@/routes/v1/internalRoutes';

const router = Router();

/**
 * @summary V1 API router configuration
 * @description Separates external (public) and internal (authenticated) routes
 *
 * External routes: /api/v1/external/...
 * Internal routes: /api/v1/internal/...
 */

router.use('/external', externalRoutes);
router.use('/internal', internalRoutes);

export default router;
