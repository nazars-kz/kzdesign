/**
 * PROJECT: content registry. Every page of the public site, every collection,
 * global and form is listed here; the admin, sitemap and content checks are built
 * from it. See docs/CONTENT_SCHEMA.md.
 */
import { createRegistry } from '@/core/content/registry';

import { contactForm } from './forms/contact';
import { siteGlobals } from './globals/site';
import { placeholderPages } from './pages/placeholders';

export const registry = createRegistry({
  pages: [...placeholderPages],
  collections: [],
  globals: [siteGlobals],
  forms: [contactForm],
  sharedSections: [],
});
