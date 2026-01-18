import { beforeAll, afterAll, beforeEach, afterEach, vi } from 'vitest';

// Set test environment variables before anything else
process.env['NODE_ENV'] = 'test';
process.env['PORT'] = '3001';
process.env['LOG_LEVEL'] = 'error'; // Reduce test output noise

/**
 * Global test setup
 */
beforeAll(async () => {
  // Add any global setup here
  // e.g., database connection, test containers, etc.
  console.log('[test] Starting test suite');
});

/**
 * Global test teardown
 */
afterAll(async () => {
  // Add any global cleanup here
  // e.g., close database connections, cleanup test data
  console.log('[test] Test suite completed');
});

/**
 * Per-test setup
 */
beforeEach(() => {
  // Reset mocks before each test
  vi.clearAllMocks();
});

/**
 * Per-test teardown
 */
afterEach(() => {
  // Restore all mocks after each test
  vi.restoreAllMocks();
});

/**
 * Test utilities
 */
export const testUtils = {
  /**
   * Wait for a specified duration
   */
  wait: (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms)),

  /**
   * Generate a random test ID
   */
  generateId: (): string =>
    `test-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,

  /**
   * Create a mock user for authenticated requests
   */
  mockUser: (overrides = {}) => ({
    id: 'test-user-id',
    email: 'test@example.com',
    role: 'user',
    ...overrides,
  }),
};
