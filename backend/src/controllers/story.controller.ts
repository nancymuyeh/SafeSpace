import { Request, Response } from 'express';
import { z } from 'zod';
import * as storyService from '../services/story.service';

const createStorySchema = z.object({
    content: z.string().min(1, "Content is required").max(1000, "Content fails to be under 1000 characters"),
    mood: z.string().min(1, "Mood is required"),
    userId: z.string().uuid().optional(),
});

export const createStoryHandler = async (req: Request, res: Response) => {
    try {
        const { content, mood, userId } = createStorySchema.parse(req.body);
        const story = await storyService.createStory(content, mood, userId);
        res.status(201).json(story);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export const getStoriesHandler = async (_req: Request, res: Response) => {
    try {
        const stories = await storyService.getStories();
        res.json(stories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch stories' });
    }
};

const reactionSchema = z.object({
    type: z.string().min(1, "Reaction type is required"),
});

export const addReactionHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { type } = reactionSchema.parse(req.body);
        const reaction = await storyService.addReaction(id, type);
        res.status(201).json(reaction);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const reportSchema = z.object({
    reason: z.string().min(1, "Reason is required"),
});

export const reportStoryHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { reason } = reportSchema.parse(req.body);
        const report = await storyService.reportStory(id, reason);
        res.status(201).json(report);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
