import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { projectConfig } from '@project/config';

import { registry } from '@/content';
import {
  loadSeedMedia,
  previewSiteSettings,
  previewSiteState,
  seedAssetFile,
  seedMediaId,
} from '@/core/preview/seed-data';

describe('preview mode data', () => {
  it('settings: every language on, never indexable, not paused or private', () => {
    const settings = previewSiteSettings();
    expect(settings.general.enabledLocales).toEqual([...projectConfig.localeCodes]);
    expect(settings.status).toMatchObject({ indexing: false, privateMode: false });
    expect(settings.status.maintenance.enabled).toBe(false);
  });

  it('site state: page routes, seed items, no staff', () => {
    const state = previewSiteState();
    expect(state.indexing).toBe(false);
    expect(state.staff).toEqual({});
    expect(state.routes).toEqual(expect.arrayContaining(registry.pages.map((page) => page.path)));
    const cases = state.collections.find((collection) => collection.itemPath === '/cases/:slug');
    expect(Object.keys(cases?.items ?? {})).toContain('touren');
  });

  it('seed media ids are stable UUIDs and resolve to the bundled files', async () => {
    const id = seedMediaId('award-badge-1.png');
    expect(z.uuid().safeParse(id).success).toBe(true);
    expect(seedMediaId('award-badge-1.png')).toBe(id);
    const media = await loadSeedMedia([id, seedMediaId('missing.webp')]);
    expect(media.get(id)).toMatchObject({ src: '/api/seed-assets/award-badge-1.png' });
    expect(media.get(id)?.width).toBeGreaterThan(0);
    expect(media.size).toBe(1);
  });

  it('serves only plain file names from the seed folder', () => {
    expect(seedAssetFile('award-badge-1.png')).toMatch(/seed[\\/]assets[\\/]award-badge-1\.png$/);
    expect(seedAssetFile('../secret.txt')).toBeNull();
    expect(seedAssetFile('.env')).toBeNull();
  });
});
