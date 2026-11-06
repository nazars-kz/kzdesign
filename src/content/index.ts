/**
 * PROJECT: content registry. Every page of the public site, every collection,
 * global and form is listed here; the admin, sitemap and content checks are built
 * from it. See docs/CONTENT_SCHEMA.md.
 */
import { createRegistry } from '@/core/content/registry';

import { cases } from './collections/cases';
import { services } from './collections/services';
import { bookingForm } from './forms/booking';
import { contactForm } from './forms/contact';
import { projectForm } from './forms/project';
import { siteGlobals } from './globals/site';
import { casesPage } from './pages/cases';
import { homePage } from './pages/home';
import { placeholderPages } from './pages/placeholders';
import { contactShared } from './shared/contact';
import { partnersShared } from './shared/partners';
import { testimonialsShared } from './shared/testimonials';
import { uniquenessShared } from './shared/uniqueness';

export const registry = createRegistry({
  pages: [homePage, casesPage, ...placeholderPages],
  collections: [services, cases],
  globals: [siteGlobals],
  forms: [contactForm, projectForm, bookingForm],
  sharedSections: [uniquenessShared, testimonialsShared, partnersShared, contactShared],
});
