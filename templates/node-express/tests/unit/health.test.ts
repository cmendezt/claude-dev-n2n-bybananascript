import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response } from 'express';
import { healthController } from '../../src/controllers/health.controller.js';

describe('Health Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: ReturnType<typeof vi.fn>;
  let statusMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    jsonMock = vi.fn();
    statusMock = vi.fn().mockReturnValue({ json: jsonMock });

    mockRequest = {};
    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };
  });

  describe('check', () => {
    it('should return healthy status with 200', () => {
      healthController.check(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: expect.objectContaining({
            status: 'healthy',
            timestamp: expect.any(String),
          }),
        })
      );
    });

    it('should return valid ISO timestamp', () => {
      healthController.check(
        mockRequest as Request,
        mockResponse as Response
      );

      const response = jsonMock.mock.calls[0][0];
      const timestamp = response.data.timestamp;

      expect(() => new Date(timestamp)).not.toThrow();
      expect(new Date(timestamp).toISOString()).toBe(timestamp);
    });
  });

  describe('detailed', () => {
    it('should return detailed health information with 200', () => {
      healthController.detailed(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: expect.objectContaining({
            status: 'healthy',
            timestamp: expect.any(String),
            version: expect.any(String),
            environment: expect.any(String),
            uptime: expect.objectContaining({
              seconds: expect.any(Number),
              formatted: expect.any(String),
            }),
            memory: expect.objectContaining({
              heapUsed: expect.any(String),
              heapTotal: expect.any(String),
              rss: expect.any(String),
              external: expect.any(String),
            }),
            services: expect.objectContaining({
              database: expect.any(String),
            }),
          }),
        })
      );
    });

    it('should return positive uptime', () => {
      healthController.detailed(
        mockRequest as Request,
        mockResponse as Response
      );

      const response = jsonMock.mock.calls[0][0];
      expect(response.data.uptime.seconds).toBeGreaterThanOrEqual(0);
    });

    it('should return properly formatted memory values', () => {
      healthController.detailed(
        mockRequest as Request,
        mockResponse as Response
      );

      const response = jsonMock.mock.calls[0][0];
      const { memory } = response.data;

      // Memory values should include units
      expect(memory.heapUsed).toMatch(/\d+\.\d+\s+(B|KB|MB|GB)/);
      expect(memory.heapTotal).toMatch(/\d+\.\d+\s+(B|KB|MB|GB)/);
      expect(memory.rss).toMatch(/\d+\.\d+\s+(B|KB|MB|GB)/);
    });
  });
});
