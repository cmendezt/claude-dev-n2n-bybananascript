import type { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';

interface LogEntry {
  timestamp: string;
  method: string;
  url: string;
  statusCode: number;
  duration: string;
  userAgent?: string;
  ip?: string;
  contentLength?: string;
}

/**
 * Format log entry based on log level
 */
function formatLogEntry(entry: LogEntry): string {
  const statusEmoji = entry.statusCode < 400 ? '' : entry.statusCode < 500 ? '[WARN]' : '[ERROR]';
  return `${statusEmoji} ${entry.method} ${entry.url} ${entry.statusCode} ${entry.duration}`;
}

/**
 * Get client IP address from request
 */
function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0]?.trim() ?? 'unknown';
  }
  return req.socket.remoteAddress ?? 'unknown';
}

/**
 * Request logging middleware
 * Logs incoming requests and response status
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Skip logging for health checks in production to reduce noise
  if (env.NODE_ENV === 'production' && req.url === '/api/health') {
    next();
    return;
  }

  const startTime = process.hrtime.bigint();

  // Log request start in debug mode
  if (env.LOG_LEVEL === 'debug') {
    console.log(`[request] --> ${req.method} ${req.url}`);
  }

  // Capture original end function
  const originalEnd = res.end;

  // Override end to capture response
  res.end = function (
    this: Response,
    ...args: Parameters<typeof originalEnd>
  ): ReturnType<typeof originalEnd> {
    const endTime = process.hrtime.bigint();
    const durationNs = endTime - startTime;
    const durationMs = Number(durationNs) / 1_000_000;

    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: res.statusCode,
      duration: `${durationMs.toFixed(2)}ms`,
      userAgent: req.headers['user-agent'],
      ip: getClientIp(req),
      contentLength: res.get('Content-Length'),
    };

    // Log based on status code and log level
    const logMessage = formatLogEntry(logEntry);

    if (res.statusCode >= 500) {
      console.error(`[request] ${logMessage}`);
    } else if (res.statusCode >= 400) {
      if (env.LOG_LEVEL !== 'error') {
        console.warn(`[request] ${logMessage}`);
      }
    } else if (env.LOG_LEVEL === 'info' || env.LOG_LEVEL === 'debug') {
      console.log(`[request] ${logMessage}`);
    }

    // Log detailed info in debug mode
    if (env.LOG_LEVEL === 'debug') {
      console.log('[request] Details:', JSON.stringify(logEntry, null, 2));
    }

    return originalEnd.apply(this, args);
  };

  next();
};
