import { Request, Response } from 'express';
import * as resourceService from '../services/resource.service';

export const getResourcesHandler = async (_req: Request, res: Response) => {
    try {
        const resources = await resourceService.getResources();
        res.json(resources);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch resources' });
    }
};
