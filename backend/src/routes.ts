import { Router, Request, Response } from 'express';

const routes = Router();

// Define routes
routes.get('/', (_req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Health check route for monitoring
routes.get('/health', (_req: Request, res: Response) => {
    res.status(200).send({ status: 'ok' });  // Simple health check response
});

// Define error route that triggers an uncaught exception
// eslint-disable-next-line @typescript-eslint/no-unused-vars
routes.get('/error', (_req: Request, _res: Response) => {
    throw new Error('Something went wrong!');
});

export default routes;
