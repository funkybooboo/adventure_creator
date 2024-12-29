import express, { Request, Response, NextFunction, Router } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import logger from './logger';

const middleware = Router();

// Use helmet for security headers
middleware.use(helmet());

// Enable CORS (cross-origin requests)
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*', // Allow specific domains in production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Allowed methods
};
middleware.use(cors(corsOptions));

// Set up rate limiting (max 100 requests per IP per 15 minutes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    limit: 100,  // Limit each IP to 100 requests per windowMs
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: { message: 'Too many requests from this IP, please try again later.' },
});
middleware.use(limiter);

// Parse incoming JSON requests
middleware.use(express.json());
middleware.use(express.urlencoded({ extended: true }));  // For parsing URL-encoded bodies

// Log incoming requests
middleware.use((req: Request, _res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url}`);  // Log method and URL
    next();
});

export default middleware;
