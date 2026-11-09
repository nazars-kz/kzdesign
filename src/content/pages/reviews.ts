/**
 * PAGE: Reviews (/reviews). Design: design/kz-homepage/pages/reviews.html.
 * The reviews themselves are the Clutch widget (third-party); this page frames it with a title,
 * a call to action and the contact block. Texts are copied verbatim from the design.
 */
import { definePage, defineSection } from '@/core/content/define';
import { f } from '@/core/content/fields';
import { useShared } from '@/core/content/shared-section';

import { contactShared } from '../shared/contact';

export const reviewsPage = definePage({
  id: 'reviews',
  path: '/reviews',
  label: 'Reviews',
  parent: null,
  uiTexts: ['reviews'],
  seo: {
    title: 'K&Z Design Reviews: Client Feedback on Clutch',
    description:
      'What our partners say about working with K&Z Design, including reviews from Clutch.',
  },
  sections: [
    defineSection({
      id: 'hero',
      label: 'Hero',
      fields: {
        title: f.text({ label: 'Title (H1)', required: true, max: 80 }),
        sub: f.textarea({ label: 'Intro', max: 400, rows: 4 }),
      },
    }),
    defineSection({
      id: 'widget',
      label: 'Clutch reviews',
      description: 'The reviews are shown by the Clutch widget of our Clutch profile.',
      fields: {
        companyId: f.text({
          label: 'Clutch company ID',
          localized: false,
          required: true,
          max: 20,
          help: 'The number from the Clutch widget code (data-clutchcompany-id).',
        }),
        profile: f.link({
          label: 'Link to the Clutch profile',
          help: 'Shown if the widget cannot load.',
        }),
      },
    }),
    defineSection({
      id: 'cta',
      label: 'Call to action',
      description: 'The grey card under the reviews.',
      fields: {
        title: f.textarea({
          label: 'Title',
          max: 160,
          rows: 2,
          help: 'A new line starts a new row.',
        }),
        sub: f.text({ label: 'Text', max: 160 }),
        button: f.link({ label: 'Button' }),
      },
    }),
    useShared(contactShared),
  ],
  seed: {
    en: {
      hero: {
        title: 'Reviews',
        sub: 'We turn ambitious ideas into thoughtful designs that change businesses. Every feedback is a reflection of our approach to work: individual solutions, creativity and maximum attention to detail in every project.',
      },
      widget: {
        companyId: '2218631',
        profile: {
          label: 'Read our reviews on Clutch',
          href: 'https://clutch.co/profile/kz-design',
          external: true,
        },
      },
      cta: {
        title: "Let's increase chances\nof your business for success with our expertise",
        sub: 'Contact us to discover how exceptional design can drive your business forward.',
        button: { label: 'Get in touch', href: '/contact-us', external: false },
      },
    },
  },
});
