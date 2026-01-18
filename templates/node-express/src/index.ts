import { createApp } from './app.js';
import { env } from './config/env.js';

const startServer = async (): Promise<void> => {
  try {
    const app = createApp();

    const server = app.listen(env.PORT, () => {
      console.log(`[server] {{PROJECT_NAME}} running on port ${env.PORT}`);
      console.log(`[server] Environment: ${env.NODE_ENV}`);
      console.log(`[server] Health check: http://localhost:${env.PORT}/api/health`);
    });

    // Graceful shutdown handling
    const gracefulShutdown = (signal: string): void => {
      console.log(`\n[server] Received ${signal}. Starting graceful shutdown...`);

      server.close((err) => {
        if (err) {
          console.error('[server] Error during shutdown:', err);
          process.exit(1);
        }

        console.log('[server] Server closed successfully');
        process.exit(0);
      });

      // Force shutdown after 30 seconds
      setTimeout(() => {
        console.error('[server] Forced shutdown after timeout');
        process.exit(1);
      }, 30000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('[server] Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
