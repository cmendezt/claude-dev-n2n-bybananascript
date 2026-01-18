import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import type { Express } from 'express';
import { createApp } from '../../src/app.js';

describe('API Integration Tests', () => {
  let app: Express;

  beforeAll(() => {
    app = createApp();
  });

  describe('Health Endpoints', () => {
    describe('GET /api/health', () => {
      it('should return 200 with healthy status', async () => {
        const response = await request(app)
          .get('/api/health')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body).toMatchObject({
          success: true,
          data: {
            status: 'healthy',
            timestamp: expect.any(String),
          },
        });
      });

      it('should return valid ISO timestamp', async () => {
        const response = await request(app).get('/api/health');

        const timestamp = response.body.data.timestamp;
        expect(() => new Date(timestamp)).not.toThrow();
        expect(new Date(timestamp).toISOString()).toBe(timestamp);
      });
    });

    describe('GET /api/health/detailed', () => {
      it('should return 200 with detailed health information', async () => {
        const response = await request(app)
          .get('/api/health/detailed')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body).toMatchObject({
          success: true,
          data: {
            status: 'healthy',
            timestamp: expect.any(String),
            version: expect.any(String),
            environment: expect.any(String),
            uptime: {
              seconds: expect.any(Number),
              formatted: expect.any(String),
            },
            memory: {
              heapUsed: expect.any(String),
              heapTotal: expect.any(String),
              rss: expect.any(String),
              external: expect.any(String),
            },
            services: {
              database: expect.any(String),
            },
          },
        });
      });

      it('should return positive uptime', async () => {
        const response = await request(app).get('/api/health/detailed');

        expect(response.body.data.uptime.seconds).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Error Handling', () => {
    describe('404 Not Found', () => {
      it('should return 404 for unknown routes', async () => {
        const response = await request(app)
          .get('/api/unknown-route')
          .expect('Content-Type', /json/)
          .expect(404);

        expect(response.body).toMatchObject({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: expect.any(String),
          },
        });
      });

      it('should return 404 for non-API routes', async () => {
        const response = await request(app)
          .get('/unknown')
          .expect(404);

        expect(response.body.success).toBe(false);
      });
    });

    describe('Invalid JSON', () => {
      it('should return 400 for invalid JSON body', async () => {
        const response = await request(app)
          .post('/api/health')
          .set('Content-Type', 'application/json')
          .send('{ invalid json }')
          .expect(400);

        expect(response.body).toMatchObject({
          success: false,
          error: {
            code: 'INVALID_JSON',
            message: expect.any(String),
          },
        });
      });
    });
  });

  describe('Security Headers', () => {
    it('should include security headers from helmet', async () => {
      const response = await request(app).get('/api/health');

      // Helmet adds various security headers
      expect(response.headers['x-content-type-options']).toBe('nosniff');
      expect(response.headers['x-frame-options']).toBe('SAMEORIGIN');
    });
  });

  describe('CORS', () => {
    it('should handle preflight OPTIONS requests', async () => {
      const response = await request(app)
        .options('/api/health')
        .set('Origin', 'http://localhost:3000')
        .set('Access-Control-Request-Method', 'GET');

      expect(response.status).toBe(204);
    });
  });

  describe('Content-Type', () => {
    it('should accept JSON content type', async () => {
      const response = await request(app)
        .get('/api/health')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(true);
    });
  });
});
