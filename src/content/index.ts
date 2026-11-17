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
import { siteGlobals } from './globals/site';
import { aboutPage } from './pages/about';
import { approachPage } from './pages/approach';
import { contactUsPage } from './pages/contact-us';
import { casesPage } from './pages/cases';
import { homePage } from './pages/home';
import { legalPages } from './pages/legal';
import { reviewsPage } from './pages/reviews';
import { servicesPage } from './pages/services';
import { contactShared } from './shared/contact';
import { industriesShared } from './shared/industries';
import { partnersShared } from './shared/partners';
import { testimonialsShared } from './shared/testimonials';
import { uniquenessShared } from './shared/uniqueness';

export const registry = createRegistry({
  pages: [
    homePage,
    aboutPage,
    approachPage,
    casesPage,
    servicesPage,
    reviewsPage,
    contactUsPage,
    ...legalPages,
  ],
  collections: [services, cases],
  globals: [siteGlobals],
  forms: [contactForm, bookingForm],
  sharedSections: [
    uniquenessShared,
    testimonialsShared,
    partnersShared,
    industriesShared,
    contactShared,
  ],
});
