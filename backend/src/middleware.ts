import express, { Request, Response, NextFunction, Router } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import logger from './logger.js';
import compression from 'compression';

const middleware: Router = express.Router();

// Use helmet for security headers
middleware.use(helmet());

// Enable CORS (cross-origin requests)
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*', // Allow specific domains in production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Allowed methods
};
middleware.use(cors(corsOptions));

// Apply compression to all responses
middleware.use(compression());

// Set up rate limiting (max requests per IP per window)
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),  // Default: 15 minutes (900000ms)
    limit: parseInt(process.env.RATE_LIMIT_LIMIT || '100'),  // Default: Limit each IP to 100 requests
    message: { message: 'Too many requests from this IP, please try again later.' },
});
middleware.use(limiter);

// Parse incoming JSON requests
middleware.use(express.json());
middleware.use(express.urlencoded({ extended: true }));  // For parsing URL-encoded bodies

// Log incoming requests and measure request duration
middleware.use((req: Request, res: Response, next: NextFunction): void => {
    const start = Date.now();  // Start time

    res.on('finish', () => {
        const duration = Date.now() - start;  // Calculate time taken
        logger.info(`${req.method} ${req.url} - ${duration}ms`);  // Log the request method, URL, and duration
    });

    next();
});

// Timeout handling middleware: if a request takes too long, it will time out
middleware.use((_req: Request, res: Response, next: NextFunction) => {
    const timeout = setTimeout(() => {
        res.status(504).send('Request timeout');  // Send a 504 Gateway Timeout response
    }, parseInt(process.env.TIMEOUT || '5000'));  // Default: 5 seconds

    // Clear timeout when request finishes
    res.on('finish', () => {
        clearTimeout(timeout);
    });

    next();
});

export default middleware;
