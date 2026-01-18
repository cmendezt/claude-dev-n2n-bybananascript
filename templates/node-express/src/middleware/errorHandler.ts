import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { env } from '../config/env.js';
import type { ApiResponse, ApiError } from '../types/index.js';

/**
 * Custom application error class
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    details?: unknown
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Common error factory functions
 */
export const createError = {
  badRequest: (message: string, details?: unknown): AppError =>
    new AppError(message, 400, 'BAD_REQUEST', details),

  unauthorized: (message: string = 'Unauthorized'): AppError =>
    new AppError(message, 401, 'UNAUTHORIZED'),

  forbidden: (message: string = 'Forbidden'): AppError =>
    new AppError(message, 403, 'FORBIDDEN'),

  notFound: (resource: string = 'Resource'): AppError =>
    new AppError(`${resource} not found`, 404, 'NOT_FOUND'),

  conflict: (message: string): AppError =>
    new AppError(message, 409, 'CONFLICT'),

  validationError: (details: unknown): AppError =>
    new AppError('Validation failed', 422, 'VALIDATION_ERROR', details),

  internal: (message: string = 'Internal server error'): AppError =>
    new AppError(message, 500, 'INTERNAL_ERROR'),
};

/**
 * Format Zod validation errors
 */
function formatZodError(error: ZodError): { field: string; message: string }[] {
  return error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
}

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response<ApiResponse<never>>,
  _next: NextFunction
): void => {
  // Log error in development
  if (env.NODE_ENV === 'development') {
    console.error('[error]', err);
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const response: ApiResponse<never> = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        details: formatZodError(err),
      },
    };
    res.status(422).json(response);
    return;
  }

  // Handle known application errors
  if (err instanceof AppError) {
    const errorResponse: ApiError = {
      code: err.code,
      message: err.message,
    };

    if (err.details && env.NODE_ENV !== 'production') {
      errorResponse.details = err.details;
    }

    const response: ApiResponse<never> = {
      success: false,
      error: errorResponse,
    };

    res.status(err.statusCode).json(response);
    return;
  }

  // Handle JSON parse errors
  if (err instanceof SyntaxError && 'body' in err) {
    const response: ApiResponse<never> = {
      success: false,
      error: {
        code: 'INVALID_JSON',
        message: 'Invalid JSON in request body',
      },
    };
    res.status(400).json(response);
    return;
  }

  // Handle unknown errors
  const response: ApiResponse<never> = {
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : err.message,
    },
  };

  // Include stack trace in development
  if (env.NODE_ENV === 'development' && err.stack) {
    response.error.details = { stack: err.stack };
  }

  res.status(500).json(response);
};
