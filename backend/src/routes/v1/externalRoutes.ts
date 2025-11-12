import { Router } from 'express';

const router = Router();

/**
 * @summary External (public) API routes
 * @description Routes accessible without authentication
 *
 * Examples:
 * - /api/v1/external/security/login
 * - /api/v1/external/public/...
 */

/**
 * @summary Health check for external API
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    scope: 'external',
    timestamp: new Date().toISOString(),
  });
});

export default router;
