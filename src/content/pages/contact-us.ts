/**
 * PAGE: Contact us (/contact-us). Design: design/kz-homepage/pages/contact-us.html.
 * The whole page is the shared contact block (title, people, form, company details) with the
 * title as the page's h1.
 */
import { definePage } from '@/core/content/define';
import { useShared } from '@/core/content/shared-section';

import { contactShared } from '../shared/contact';

export const contactUsPage = definePage({
  id: 'contact-us',
  path: '/contact-us',
  label: 'Contact us',
  parent: null,
  seo: {
    title: 'Contact K&Z Design: Talk Directly to Our CEO',
    description:
      'Contact K&Z Design: no calls with sales, talk to our CEO about your product design needs.',
  },
  sections: [useShared(contactShared)],
  seed: { en: {} },
});
