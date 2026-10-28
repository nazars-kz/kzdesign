/**
 * SHARED SECTION: "Let's take your product to the next level" with the team and the
 * contact form (Home, About, Cases, services). The form fields and texts are in
 * Pages → Forms; company details come from Header & footer.
 */
import { f } from '@/core/content/fields';
import { defineSharedSection } from '@/core/content/shared-section';

import { richParagraphs } from '../seed-text';

export const contactShared = defineSharedSection({
  id: 'contact',
  label: 'Contact block',
  description:
    'Heading, the people to talk to and the contact form. Form texts: Pages → Forms. Company details: Header & footer.',
  fields: {
    titleBefore: f.text({ label: 'Title: before the arrow', required: true, max: 80 }),
    titleAfter: f.text({ label: 'Title: after the arrow', max: 40 }),
    lead: f.text({ label: 'Lead', max: 200 }),
    team: f.list({
      label: 'People',
      itemLabelField: 'name',
      max: 4,
      of: {
        photo: f.image({ label: 'Photo', localized: false, recommendedSize: '128×128' }),
        name: f.text({ label: 'Name', required: true, max: 60 }),
        role: f.text({ label: 'Role', max: 80 }),
        bio: f.richText({
          label: 'About',
          max: 400,
          help: 'Italic text is highlighted in white.',
        }),
      },
    }),
  },
  seed: {
    en: {
      titleBefore: "Let's take your product to the next",
      titleAfter: 'level',
      lead: 'No calls with sales. Contact us and get to chat with our CEO.',
      team: [
        {
          photo: { asset: 'team-vlad-kyrieiev.jpg', alt: 'Vlad Kyrieiev' },
          name: 'Vlad Kyrieiev',
          role: 'Founder & CEO',
          bio: richParagraphs([
            'Serial design entrepreneur & ',
            {
              italic: 'leader with 10+ years of experience solving the most challenging UX issues.',
            },
            ' Ex-Head of Design in US ERP product',
          ]),
        },
        {
          photo: { asset: 'team-nick-zhurenko.png', alt: 'Nick Zhurenko' },
          name: 'Nick Zhurenko',
          role: 'Management Board Member & COO',
          bio: richParagraphs([
            'Design Leader, lecturer, coach with 10+ years in the field. Ex Head of Design in US CRM development company',
          ]),
        },
      ],
    },
  },
});
