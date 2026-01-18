import type { Request, Response, NextFunction } from 'express';
import { z, type ZodSchema } from 'zod';

/**
 * Validation schema configuration
 */
interface ValidationSchemas {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

/**
 * Validation middleware factory
 * Creates middleware that validates request body, query, and/or params against Zod schemas
 *
 * @example
 * ```typescript
 * const createUserSchema = z.object({
 *   email: z.string().email(),
 *   name: z.string().min(2),
 * });
 *
 * router.post('/users', validateRequest({ body: createUserSchema }), createUser);
 * ```
 */
export const validateRequest = (schemas: ValidationSchemas) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validate body
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }

      // Validate query parameters
      if (schemas.query) {
        req.query = await schemas.query.parseAsync(req.query);
      }

      // Validate URL parameters
      if (schemas.params) {
        req.params = await schemas.params.parseAsync(req.params);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Common validation schemas for reuse
 */
export const commonSchemas = {
  /**
   * Pagination query parameters
   */
  pagination: z.object({
    page: z.string().transform(Number).pipe(z.number().int().positive()).optional().default('1'),
    limit: z.string().transform(Number).pipe(z.number().int().min(1).max(100)).optional().default('20'),
  }),

  /**
   * UUID parameter
   */
  uuidParam: z.object({
    id: z.string().uuid('Invalid ID format'),
  }),

  /**
   * Search query
   */
  searchQuery: z.object({
    q: z.string().min(1).max(100).optional(),
    page: z.string().transform(Number).pipe(z.number().int().positive()).optional().default('1'),
    limit: z.string().transform(Number).pipe(z.number().int().min(1).max(100)).optional().default('20'),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  }),
};

/**
 * Type inference helper for validated request data
 *
 * @example
 * ```typescript
 * const schema = z.object({ email: z.string().email() });
 * type CreateUserBody = InferValidated<typeof schema>;
 * ```
 */
export type InferValidated<T extends ZodSchema> = z.infer<T>;
