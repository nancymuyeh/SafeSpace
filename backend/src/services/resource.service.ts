import { db } from '../db';
import { resources } from '../schema';

export const getResources = async () => {
    return await db.select().from(resources);
};

// Internal use or future admin API
export const createResource = async (title: string, description: string, url: string, type: string) => {
    const [resource] = await db.insert(resources).values({ title, description, url, type }).returning();
    return resource;
};
