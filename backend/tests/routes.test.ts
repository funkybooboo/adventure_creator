import request from 'supertest';
import { app, server } from '../src/app';

describe('Routes Tests', () => {
    // Test the health check route
    it('should return status ok on GET /health', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('ok');
    });

    afterAll(() => server.close());
});
