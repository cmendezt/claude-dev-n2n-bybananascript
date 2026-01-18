import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Type-safe query helpers
export type ModelName = Exclude<keyof typeof prisma, `$${string}` | symbol>;

// Generic error handler for Prisma operations
export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public meta?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

// Wrapper for database operations with error handling
export async function dbOperation<T>(
  operation: () => Promise<T>,
  errorMessage = 'Database operation failed'
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof Error) {
      // Handle Prisma-specific errors
      const prismaError = error as { code?: string; meta?: Record<string, unknown> };
      throw new DatabaseError(
        `${errorMessage}: ${error.message}`,
        prismaError.code,
        prismaError.meta
      );
    }
    throw new DatabaseError(errorMessage);
  }
}

// Transaction helper
export async function withTransaction<T>(
  fn: (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>) => Promise<T>
): Promise<T> {
  return prisma.$transaction(fn);
}

// Graceful shutdown
export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
}

// Health check
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
