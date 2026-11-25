import { openPglite } from '@/core/db/drivers/pglite';
import type { Database } from '@/core/db/types';

/**
 * Time limit for a test or hook that runs the seed. Seeding syncs the project's content and imports
 * every seed image, so it grows with each case study (about 55 s on CI with 260 images).
 */
export const SEED_TIMEOUT_MS = 180_000;

/** Fresh, migrated in-memory database for a test file. */
export async function createTestDb(): Promise<{ db: Database; close: () => Promise<void> }> {
  const { db, client } = await openPglite({ dataDir: null });
  return { db, close: () => client.close() };
}
