/**
 * CASE STUDY: Tach (/cases/tach). A unique page: its layout is built for this case
 * (src/site/cases/tach/). Design: design/cases/tach (Case.png and assets).
 */
import { definePage } from '@/core/content/define';
import { useShared } from '@/core/content/shared-section';

import { relatedCasesShared } from '../shared/related-cases';
import { caseCardSection } from './card';

export const tachCase = definePage({
  id: 'case-tach',
  path: '/cases/tach',
  label: 'Tach',
  parent: 'cases',
  adminGroup: 'Case studies',
  uiTexts: ['cases'],
  seo: {
    title: 'Tach: Logistics Platform UX/UI Case Study | K&Z Design',
    description:
      'UX/UI design case study of Tach, a digital platform that simplifies financial and operational tasks for owner-operators, carriers and vendors in logistics.',
  },
  sections: [caseCardSection(), useShared(relatedCasesShared)],
  seed: {
    en: {
      card: {
        order: 1,
        title: 'Tach',
        description: 'Financial and operational platform for logistics',
        tags: ['Logistics', 'Mobile', 'Web', 'B2C'],
        categories: ['Logistics', 'Mobile', 'Web', 'B2C'],
        showOnHome: true,
        homeOrder: 1,
        industries: ['logistics'],
        industryOrder: 1,
      },
    },
  },
});
