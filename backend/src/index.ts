import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import { db } from './db';
import { stories } from './schema';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /stories:
 *   get:
 *     summary: Retrieve a list of stories
 *     responses:
 *       200:
 *         description: A list of stories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Story'
 */
app.get('/stories', async (req, res) => {
  const allStories = await db.select().from(stories);
  res.json(allStories);
});

/**
 * @swagger
 * /stories:
 *   post:
 *     summary: Create a new story
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewStory'
 *     responses:
 *       200:
 *         description: The created story.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Story'
 */
app.post('/stories', async (req, res) => {
  const { content, mood } = req.body;
  const newStory = await db.insert(stories).values({ content, mood }).returning();
  res.json(newStory);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
