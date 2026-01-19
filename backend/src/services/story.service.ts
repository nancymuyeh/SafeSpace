import { db } from '../db';
import { stories, reactions, reports } from '../schema';
import { desc } from 'drizzle-orm';
import { cleanContent } from '../utils/filter';

import redis from "../redis";

export const createStory = async (content: string, mood: string, userId?: string) => {
    const cleanedContent = cleanContent(content);
    const [newStory] = await db.insert(stories).values({
        content: cleanedContent,
        mood,
        userId,
    }).returning();
    await redis.del("stories");
    return newStory;
};

export const getStories = async () => {
    const cachedStories = await redis.get("stories");
    if (cachedStories) {
        return JSON.parse(cachedStories);
    }
    const allStories = await db.select().from(stories).orderBy(desc(stories.createdAt));
    await redis.set("stories", JSON.stringify(allStories), "EX", 3600);
    return allStories;
};

export const addReaction = async (storyId: string, type: string) => {
    const [reaction] = await db.insert(reactions).values({ storyId, type }).returning();
    return reaction;
};

export const reportStory = async (storyId: string, reason: string) => {
    const [report] = await db.insert(reports).values({ storyId, reason }).returning();
    return report;
};
