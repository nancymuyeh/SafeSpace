import { Router } from 'express';
import { createStoryHandler, getStoriesHandler, addReactionHandler, reportStoryHandler } from '../controllers/story.controller';

const router = Router();

/**
 * @swagger
 * /api/v1/stories:
 *   get:
 *     summary: Retrieve a list of stories
 *     tags: [Stories]
 *     responses:
 *       200:
 *         description: A list of stories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Story'
 *   post:
 *     summary: Create a new story
 *     tags: [Stories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewStory'
 *     responses:
 *       201:
 *         description: The created story
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Story'
 */
router.post('/', createStoryHandler);
router.get('/', getStoriesHandler);

/**
 * @swagger
 * /api/v1/stories/{id}/reactions:
 *   post:
 *     summary: Add a reaction to a story
 *     tags: [Reactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type]
 *             properties:
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created reaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reaction'
 */
router.post('/:id/reactions', addReactionHandler);

/**
 * @swagger
 * /api/v1/stories/{id}/report:
 *   post:
 *     summary: Report a story
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [reason]
 *             properties:
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created report
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 */
router.post('/:id/report', reportStoryHandler);

export default router;
