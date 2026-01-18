import type { Request, Response } from 'express';
import { env } from '../config/env.js';
import type { ApiResponse, HealthCheckResponse, DetailedHealthCheckResponse } from '../types/index.js';

export const healthController = {
  /**
   * Basic health check
   */
  check: (_req: Request, res: Response<ApiResponse<HealthCheckResponse>>): void => {
    const response: ApiResponse<HealthCheckResponse> = {
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
      },
    };

    res.status(200).json(response);
  },

  /**
   * Detailed health check with system information
   */
  detailed: (_req: Request, res: Response<ApiResponse<DetailedHealthCheckResponse>>): void => {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();

    const response: ApiResponse<DetailedHealthCheckResponse> = {
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: process.env['npm_package_version'] ?? '1.0.0',
        environment: env.NODE_ENV,
        uptime: {
          seconds: Math.floor(uptime),
          formatted: formatUptime(uptime),
        },
        memory: {
          heapUsed: formatBytes(memoryUsage.heapUsed),
          heapTotal: formatBytes(memoryUsage.heapTotal),
          rss: formatBytes(memoryUsage.rss),
          external: formatBytes(memoryUsage.external),
        },
        services: {
          database: 'not_configured', // Update when database is connected
        },
      },
    };

    res.status(200).json(response);
  },
};

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;
  let value = bytes;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }

  return `${value.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * Format uptime seconds to human-readable string
 */
function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  parts.push(`${secs}s`);

  return parts.join(' ');
}
