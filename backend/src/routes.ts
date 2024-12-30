import { Router, Request, Response } from 'express';

const routes = Router();

// Define routes
routes.get('/', (_req: Request, res: Response) => {
    res.status(200).send({});
});

// Health check route for monitoring
routes.get('/health', (_req: Request, res: Response) => {
    res.status(200).send({ status: 'ok' });  // Simple health check response
});

export default routes;
