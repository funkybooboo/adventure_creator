import request from 'supertest';
import {app, server} from '../src/app';

describe('GET /', () => {
    it('should respond with "Hello, world!"', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello, World!');
    });
});

afterAll(() => {
    if (server) {
        server.close();
    }
});
