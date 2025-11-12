import { getPool, closeConnection } from '@/utils/database';

/**
 * @summary Database instance management
 * @description Manages database connection lifecycle
 */

/**
 * @summary Initialize database connection
 */
export async function initializeDatabase(): Promise<void> {
  try {
    await getPool();
    console.log('Database connection established');
  } catch (error: any) {
    console.error('Failed to initialize database:', error.message);
    throw error;
  }
}

/**
 * @summary Close database connection
 */
export async function closeDatabaseConnection(): Promise<void> {
  try {
    await closeConnection();
    console.log('Database connection closed');
  } catch (error: any) {
    console.error('Failed to close database connection:', error.message);
  }
}

/**
 * @summary Handle process termination
 */
process.on('SIGINT', async () => {
  await closeDatabaseConnection();
  process.exit(0);
});
