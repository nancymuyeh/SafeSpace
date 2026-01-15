import { Router } from 'express';
import { getResourcesHandler } from '../controllers/resource.controller';

const router = Router();

/**
 * @swagger
 * /api/v1/resources:
 *   get:
 *     summary: Retrieve a list of resources
 *     tags: [Resources]
 *     responses:
 *       200:
 *         description: A list of resources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 */
router.get('/', getResourcesHandler);

export default router;
