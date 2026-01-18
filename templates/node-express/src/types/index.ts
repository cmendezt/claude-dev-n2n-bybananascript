/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ResponseMeta;
}

/**
 * API error structure
 */
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

/**
 * Response metadata for pagination, etc.
 */
export interface ResponseMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

/**
 * Basic health check response
 */
export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
}

/**
 * Detailed health check response
 */
export interface DetailedHealthCheckResponse extends HealthCheckResponse {
  version: string;
  environment: string;
  uptime: {
    seconds: number;
    formatted: string;
  };
  memory: {
    heapUsed: string;
    heapTotal: string;
    rss: string;
    external: string;
  };
  services: {
    database: 'connected' | 'disconnected' | 'not_configured';
    [key: string]: string;
  };
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  items: T[];
  meta: Required<ResponseMeta>;
}

/**
 * Sort parameters
 */
export interface SortParams {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

/**
 * Search parameters
 */
export interface SearchParams extends PaginationParams, Partial<SortParams> {
  q?: string;
}

/**
 * Generic ID parameter
 */
export interface IdParam {
  id: string;
}

/**
 * Timestamp fields for entities
 */
export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Base entity with ID and timestamps
 */
export interface BaseEntity extends Timestamps {
  id: string;
}

/**
 * User entity (example)
 */
export interface User extends BaseEntity {
  email: string;
  name: string;
  role: 'user' | 'admin';
}

/**
 * Request with authenticated user
 */
export interface AuthenticatedRequest {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedRequest['user'];
    }
  }
}
