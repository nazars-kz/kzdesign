/** SHARED SECTION: "We are not design outsource…" cards (Home, About). */
import { f } from '@/core/content/fields';
import { defineSharedSection } from '@/core/content/shared-section';

import { richParagraphs } from '../seed-text';

export const uniquenessShared = defineSharedSection({
  id: 'uniqueness',
  label: 'Uniqueness',
  description: 'Three cards with bullet points, a client quote and an illustration.',
  fields: {
    eyebrow: f.text({ label: 'Label above the title', max: 40 }),
    title: f.text({ label: 'Title', required: true, max: 160 }),
    cards: f.list({
      label: 'Cards',
      itemLabelField: 'title',
      max: 6,
      of: {
        title: f.text({ label: 'Title', required: true, max: 80 }),
        bullets: f.textarea({
          label: 'Bullet points',
          max: 1200,
          rows: 8,
          help: 'One bullet point per line.',
        }),
        quote: f.richText({
          label: 'Client quote',
          max: 500,
          help: 'Use bold for the highlighted words.',
        }),
        personName: f.text({ label: 'Client name', max: 60 }),
        personRole: f.text({ label: 'Client role', max: 80 }),
        personAvatar: f.image({
          label: 'Client photo',
          localized: false,
          recommendedSize: '96×96',
        }),
        image: f.image({ label: 'Illustration', localized: false, recommendedSize: '1302×1138' }),
        imageFit: f.select({
          label: 'Illustration fit',
          options: [
            { value: 'cover', label: 'Fill the area' },
            { value: 'contain', label: 'Fit inside' },
          ],
        }),
      },
    }),
  },
  seed: {
    en: {
      eyebrow: 'Uniqueness',
      title: 'We are not design outsource, we are your detached product design department',
      cards: [
        {
          title: 'No middlemen. Only design people',
          bullets: [
            'No sales, no project managers, no business analysts – you always speak with designers. We believe that best products are born by direct communication between product and design sides',
            'Why no BAs? Because we believe that if designer himself doesn’t understand the business he is designing for - he’ll never do anything good',
          ].join('\n'),
          quote: richParagraphs([
            '“From the very beginning, the team took the time to ensure they ',
            { bold: 'fully understood' },
            ' the problem we were solving. ',
            { bold: 'This set the foundation' },
            ' for the design process.“',
          ]),
          personName: 'Kwabena Osei-Larbi',
          personRole: 'Founder, 2step',
          personAvatar: { asset: 'avatar-kwabena-osei-larbi.png', alt: 'Kwabena Osei-Larbi' },
          image: {
            asset: 'uniqueness-direct.jpg',
            alt: 'Client in the center, connected directly to designers',
          },
          imageFit: 'cover',
        },
        {
          title: 'Communication & Updates',
          bullets: [
            'Daily updates on what is done today + requests/questions/blockers',
            'Recurring meetings (at least 1 meeting per week for active design phase)',
            'Dedicated communication channel + Figma comments',
          ].join('\n'),
          quote: richParagraphs([
            '“The quality of the work is top-notch, while the communication and responses ',
            { bold: 'were excellent' },
            '.“',
          ]),
          personName: 'Benn Eames',
          personRole: 'CEO of VidSprint',
          personAvatar: { asset: 'avatar-benn-eames.png', alt: 'Benn Eames' },
          image: {
            asset: 'uniqueness-updates.png',
            alt: 'Daily updates timeline with Figma, Slack and Google Meet',
          },
          imageFit: 'cover',
        },
        {
          title: 'Designs created to be developed',
          bullets: [
            'Design system based on the libraries Devs use (Tailwind, Material ui, Shadcn, etc)',
            'Figma files organized by flows with inline documentation',
            'Development handoff Q/A sessions',
            'Ongoing development support: Q/A, materials provision, post-dev testing',
            'Direct design-development communication - no middle-man needed',
          ].join('\n'),
          quote: richParagraphs([
            '“Our developers were provided a ',
            { bold: 'GREAT UI design' },
            ' in Figma that was easy to implement. They have a fantastic ',
            { bold: 'ability to listen' },
            ' to our business problems and process flows...“',
          ]),
          personName: 'Mike Hapner',
          personRole: 'CTO, Valorian Solutions',
          personAvatar: { asset: 'avatar-mike-hapner.png', alt: 'Mike Hapner' },
          image: {
            asset: 'uniqueness-handoff.png',
            alt: 'Figma components and documentation handed off to code',
          },
          imageFit: 'contain',
        },
      ],
    },
  },
});
