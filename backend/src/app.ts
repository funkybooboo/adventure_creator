import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import logger from './logger';
import middleware from './middleware';
import routes from './routes';

// Load environment variables
dotenv.config({ path: './config/.env' });

const app = express();

// Use the middleware before the route handlers
app.use(middleware);

// Apply routes after the middleware
app.use('/', routes);

// 404 handler for undefined routes
app.use((_req: Request, res: Response) => {
    res.status(404).send({ message: 'Not Found' });
});

// General error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', reason, promise);
    process.exit(1);
});

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown on SIGINT or SIGTERM
process.on('SIGINT', () => {
    logger.info('Received SIGINT. Shutting down...');
    server.close(() => {
        logger.info('Server closed gracefully');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    logger.info('Received SIGTERM. Shutting down...');
    server.close(() => {
        logger.info('Server closed gracefully');
        process.exit(0);
    });
});

export default app;
