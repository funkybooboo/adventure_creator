import request from 'supertest';
import { app, server } from '../src/app';

describe('Routes Tests', () => {

    // Test the home route ("/")
    it('should return Hello, World! on GET /', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello, World!');
    });

    // Test the health check route
    it('should return status ok on GET /health', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('ok');
    });

    // Test error handling by triggering an uncaught exception
    it('should return a 500 status on GET /error', async () => {
        const response = await request(app).get('/error');
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Something went wrong!');
    });

    afterAll(() => server.close());
});
