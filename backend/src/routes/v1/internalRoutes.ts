import { Router } from 'express';

const router = Router();

/**
 * @summary Internal (authenticated) API routes
 * @description Routes requiring authentication
 *
 * Examples:
 * - /api/v1/internal/student
 * - /api/v1/internal/grade
 */

/**
 * @summary Health check for internal API
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    scope: 'internal',
    timestamp: new Date().toISOString(),
  });
});

export default router;
