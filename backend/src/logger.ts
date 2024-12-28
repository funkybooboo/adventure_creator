import winston, { Logger } from 'winston';

// Create a custom logger configuration
const logger: Logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug', // Set the log level based on environment
    format: winston.format.combine(
        winston.format.colorize(),      // Colorize the log output for console
        winston.format.timestamp(),     // Add timestamp to log entries
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`; // Custom log format
        })
    ),
    transports: [
        new winston.transports.Console(),  // Log to console
        new winston.transports.File({ filename: 'app.log' })  // Log to a file
    ],
});

export default logger;
