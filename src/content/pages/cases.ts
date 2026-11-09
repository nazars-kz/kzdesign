/**
 * PAGE: Cases (/cases). Design: design/kz-homepage/pages/cases.html and pages/cases/*.html.
 * The list itself comes from the "Case studies" collection; this page holds the hero, and the
 * two blocks every case page ends with (the call to action and "Other case studies").
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
    defineSection({
      id: 'caseCta',
      label: 'Case page: call to action',
      description: 'The dark block under the client feedback on every case page.',
      fields: {
        eyebrow: f.text({ label: 'Label', max: 40 }),
        titleBefore: f.text({ label: 'Title: before the bold word', max: 60 }),
        titleBold: f.text({ label: 'Title: bold word', max: 40 }),
        titleAfter: f.text({ label: 'Title: after the bold word', max: 60 }),
        sub: f.text({ label: 'Text', max: 160 }),
        button: f.link({ label: 'Button' }),
        photo: f.image({ label: 'Person: photo', localized: false, recommendedSize: '96×96' }),
        name: f.text({ label: 'Person: name', max: 60 }),
        role: f.text({ label: 'Person: role', max: 60 }),
        points: f.list({ label: 'Person: points', of: f.text({ max: 160 }), max: 4 }),
      },
    }),
    defineSection({
      id: 'otherCases',
      label: 'Case page: other case studies',
      description: 'Heading of the slider of other cases at the bottom of every case page.',
      fields: {
        eyebrow: f.text({ label: 'Label', max: 40 }),
        title: f.text({ label: 'Title', max: 120 }),
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
      caseCta: {
        eyebrow: 'Get in touch',
        titleBefore: 'Take your',
        titleBold: 'product',
        titleAfter: 'to the next level',
        sub: 'No calls with sales. Contact us and get to chat with our CEO.',
        button: { label: 'Get in touch', href: '/contact-us', external: false },
        photo: { asset: 'cta-vlad.png', alt: 'Vlad Kyrieiev' },
        name: 'Vlad Kyrieiev',
        role: 'Founder & CEO',
        points: [
          'Serial design entrepreneur & leader with 10+ years of experience solving the most challenging UX issues.',
          'Ex-Head of Design in US ERP product.',
        ],
      },
      otherCases: {
        eyebrow: 'Other Case Studies',
        title: 'If you liked the previous works, you will definitely like these ones',
      },
    },
  },
});
