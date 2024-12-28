import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

// Load environment variables from the ./config/.env file
dotenv.config({ path: './config/.env' });

const app = express();

// Define routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
