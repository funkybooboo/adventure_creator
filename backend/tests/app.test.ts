import request from 'supertest';
import { app, server } from '../src/app';

describe('Express App', () => {
    it('should respond with 404 for undefined routes', async () => {
        const response = await request(app).get('/undefined-route');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Not Found');
    });

    it('should start the server and respond to GET requests', async () => {
        const response = await request(app).get('/');
        // You can check for specific responses if you have a route defined at '/'
        expect(response.status).toBe(200); // Adjust the status code as needed
    });

    afterAll(() => {
        server.close();
    });
});
