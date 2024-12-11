import express, { Request, Response } from 'express';

// Create an Express app
const app = express();

// Define a route for the root endpoint
app.get('/', (req: Request, res: Response): void => {
  res.send('Hello World');
});

// Start the server and listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
