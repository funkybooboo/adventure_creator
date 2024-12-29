import request from 'supertest';
import app from '../src/app';

describe('Basic Routes', () => {
    it('should return a 200 status and "Hello, World!"', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello, World!');
    });

    it('should return a 200 status and {status: "ok"} for /health', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('ok');
    });
});

describe('Rate Limiting', () => {
    it('should return 429 status if too many requests are made', async () => {
        // Simulate multiple requests within a short time to hit rate limit
        for (let i = 0; i < 101; i++) {
            await request(app).get('/');
        }

        const response = await request(app).get('/');
        expect(response.status).toBe(429);  // Too Many Requests
        expect(response.body.message).toBe('Too many requests from this IP, please try again later.');
    });
});

describe('Error Handling', () => {
    it('should return 500 status for uncaught errors', async () => {
        const response = await request(app).get('/error');
        expect(response.status).toBe(500);  // Internal Server Error
        expect(response.body.message).toBe('Something went wrong!');
    });
});

describe('CORS', () => {
    it('should return 200 status with appropriate CORS headers', async () => {
        // Make sure we are not hitting the rate limit
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.headers['access-control-allow-origin']).toBe('*');
    });
});
