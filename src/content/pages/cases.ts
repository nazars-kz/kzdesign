/**
 * PAGE: Cases (/cases). Design: design/kz-homepage/pages/cases.html and pages/cases/*.html.
 * The list is made of the case study pages (src/content/cases, docs/project/CASES.md); this page
 * holds the hero.
 * Texts are copied verbatim from the design.
 */
import { definePage, defineSection } from '@/core/content/define';
import { f } from '@/core/content/fields';
import { useShared } from '@/core/content/shared-section';

import { contactShared } from '../shared/contact';

export const casesPage = definePage({
  id: 'cases',
  path: '/cases',
  label: 'Cases',
  parent: null,
  uiTexts: ['cases'],
  seo: {
    title: 'UI/UX Design Case Studies: SaaS, Mobile & Web | K&Z Design',
    description:
      'Selected UI/UX design case studies: SaaS platforms, dashboards, CRM and mobile apps designed by K&Z Design for startups and B2B companies.',
  },
  sections: [
    defineSection({
      id: 'hero',
      label: 'Hero',
      description: 'Top of the Cases page: title, intro and the numbers.',
      fields: {
        background: f.image({
          label: 'Background picture',
          localized: false,
          recommendedSize: '2880×1486',
        }),
        eyebrow: f.text({ label: 'Label', max: 40 }),
        title: f.textarea({
          label: 'Title (H1)',
          max: 120,
          rows: 3,
          required: true,
          help: 'A new line starts a new row of the title.',
        }),
        sub: f.textarea({ label: 'Intro', max: 240, rows: 3 }),
        stats: f.list({
          label: 'Numbers',
          itemLabelField: 'label',
          max: 4,
          of: {
            label: f.text({ label: 'Label', required: true, max: 24 }),
            value: f.text({ label: 'Number', required: true, max: 12 }),
          },
          help: 'The last number is highlighted in orange.',
        }),
      },
    }),
    useShared(contactShared),
  ],
  seed: {
    en: {
      hero: {
        background: {
          asset: 'cases-hero.webp',
          alt: 'Dashboard of a product designed by K&Z Design',
        },
        eyebrow: 'Case studies',
        title: 'Products that already\nbenefited from our\npartnership',
        sub: 'We put our knowledge and 11+ years of experience to help your digital product become the best version of itself.',
        stats: [
          { label: 'Web apps', value: '100' },
          { label: 'Mobile apps', value: '75' },
          { label: 'Websites', value: '125' },
          { label: 'Totally', value: '300+' },
        ],
      },
    },
  },
});
