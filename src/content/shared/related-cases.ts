/**
 * SHARED SECTION: "Related case studies", the block every case page ends with, just before the
 * footer. The cards are the other cases of the site (see docs/project/CASES.md).
 */
import { f } from '@/core/content/fields';
import { defineSharedSection } from '@/core/content/shared-section';

export const relatedCasesShared = defineSharedSection({
  id: 'related',
  label: 'Related case studies',
  description: 'Heading of the slider of other case studies at the end of every case page.',
  fields: {
    eyebrow: f.text({ label: 'Label', max: 40 }),
    title: f.text({ label: 'Title', max: 120 }),
  },
  seed: {
    en: {
      eyebrow: 'Related case studies',
      title: 'If you liked the previous works, you will definitely like these ones',
    },
  },
});
