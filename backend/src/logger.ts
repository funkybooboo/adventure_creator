import winston, { Logger } from 'winston';
import 'winston-daily-rotate-file';

// Custom log format for better control over the log structure
const customFormat = winston.format.printf(({ timestamp, level, message, stack }) => {
    return stack ? `${timestamp} [${level}]: ${message}\n${stack}` : `${timestamp} [${level}]: ${message}`;
});

// Create a custom logger configuration
const logger: Logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug', // Set log level based on environment
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Custom timestamp format
        winston.format.colorize(), // Colorize logs for better readability
        customFormat // Use custom format for logs
    ),
    transports: [
        // Console transport with environment-based settings
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize(), // Colorize the log output
                winston.format.simple() // Simple log format for console
            ),
            silent: process.env.NODE_ENV === 'production', // Disable console logging in production
        }),

        // File transport for all logs, in 'combined.log' file
        new winston.transports.File({
            filename: 'logs/app.log',
            level: 'info', // Record all logs of level 'info' and above
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json() // Save logs in JSON format
            ),
        }),

        // Error-specific file logging
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error', // Only error logs
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),

        // Log rotation for file transport using winston-daily-rotate-file
        new winston.transports.DailyRotateFile({
            filename: 'logs/%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true, // Compress older logs
            maxSize: '20m', // Max size of each log file
            maxFiles: '14d', // Retain logs for 14 days
        }),
    ],
});

// Add a log level for uncaught exceptions (e.g., critical errors)
logger.exceptions.handle(
    new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    new winston.transports.File({
        filename: 'logs/exceptions.log',
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    })
);

// Add a log level for unhandled rejections
logger.rejections.handle(
    new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    new winston.transports.File({
        filename: 'logs/rejections.log',
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    })
);

export default logger;
