import request from 'supertest';
import express from 'express';
import http from 'http';
import { AddressInfo } from 'net';  // Correctly import AddressInfo from 'net'
import middleware from '../src/middleware';  // Adjust path as necessary

describe('Middleware Tests', () => {
    let server: http.Server;

    const app = express();
    app.use(middleware);
    app.get('/test', (req, res) => {
        res.status(200).send('Middleware Test');
    });

    beforeAll(() => {
        // Start the server on a random available port
        server = app.listen(0, () => {
            const port = (server.address() as AddressInfo).port;  // Cast the address to AddressInfo
            console.log(`Test server running on port ${port}`);
        });
    });

    afterAll(() => {
        // Clean up server after tests
        server.close();
    });

    it('should return 200 and "Middleware Test" message', async () => {
        const response = await request(server).get('/test');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Middleware Test');
    });
});
