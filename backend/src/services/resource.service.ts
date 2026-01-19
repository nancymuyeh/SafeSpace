import { db } from '../db';
import { resources } from '../schema';

import redis from "../redis";

export const getResources = async () => {
    const cachedResources = await redis.get("resources");
    if (cachedResources) {
        return JSON.parse(cachedResources);
    }
    const allResources = await db.select().from(resources);
    await redis.set("resources", JSON.stringify(allResources), "EX", 3600);
    return allResources;
};

// Internal use or future admin API
export const createResource = async (title: string, description: string, url: string, type: string) => {
    const [resource] = await db.insert(resources).values({ title, description, url, type }).returning();
    await redis.del("resources");
    return resource;
};
