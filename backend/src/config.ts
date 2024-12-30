import dotenv from 'dotenv';
import logger from './logger.js';

export const loadConfig = (): void => {
    dotenv.config({ path: './config/.env'});

    // Load the appropriate .env file based on the MODE value
    const mode = process.env.MODE || 'dev'; // Default to 'dev' if MODE is not set

    // Construct the path for the config file
    const envFile = `.env.${mode}`;

    // Load environment variables from the correct .env file
    dotenv.config({ path: `./config/${envFile}`});

    // Verify the environment variable is loaded correctly
    logger.info(`Loaded mode: ${mode}`);
};
