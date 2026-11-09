/**
 * PAGE: Services (/services). Design: design/kz-homepage/pages/saas.html, mobile.html, web.html.
 * The list is the "Services" collection; each service has a template page at /services/<slug>.
 * This page holds the blocks every service page shares: the three promises, the case studies
 * heading, the "Got an Idea?" banner, the process, and the labels. Partners, testimonials and
 * the contact block are shared sections. Texts are copied verbatim from the design.
 */
import { definePage, defineSection } from '@/core/content/define';
import { f } from '@/core/content/fields';
import { useShared } from '@/core/content/shared-section';

import { richParagraphs } from '../seed-text';
import { contactShared } from '../shared/contact';
import { testimonialsShared } from '../shared/testimonials';

export const servicesPage = definePage({
  id: 'services',
  path: '/services',
  label: 'Services',
  parent: null,
  uiTexts: ['services'],
  seo: {
    title: 'UX/UI Design Services for SaaS, Mobile & Web | K&Z Design',
    description:
      'UX/UI design services of K&Z Design: SaaS web apps, mobile apps and websites for digital product businesses.',
  },
  sections: [
    defineSection({
      id: 'intro',
      label: 'Services list',
      description: 'The heading of the /services page that lists every service.',
      fields: {
        title: f.text({ label: 'Title', required: true, max: 120 }),
        body: f.richText({ label: 'Text' }),
      },
    }),
    defineSection({
      id: 'about',
      label: 'Service page: About',
      description: 'Label of the About block of every service page.',
      fields: { eyebrow: f.text({ label: 'Label', max: 40 }) },
    }),
    defineSection({
      id: 'features',
      label: 'Service page: three promises',
      description: 'The three cards under the About block of every service page.',
      fields: {
        cards: f.list({
          label: 'Cards',
          itemLabelField: 'title',
          max: 4,
          of: {
            title: f.textarea({
              label: 'Title',
              required: true,
              max: 80,
              rows: 2,
              help: 'A new line starts a new row.',
            }),
            text: f.textarea({ label: 'Text', max: 400, rows: 4 }),
            image: f.image({ label: 'Picture', localized: false, recommendedSize: '858×766' }),
          },
        }),
      },
    }),
    defineSection({
      id: 'cases',
      label: 'Service page: case studies',
      description: 'Heading and link above the case cards of every service page.',
      fields: {
        eyebrow: f.text({ label: 'Label', max: 40 }),
        title: f.textarea({
          label: 'Title',
          max: 120,
          rows: 2,
          help: 'A new line starts a new row.',
        }),
        seeAll: f.link({ label: 'Link to all cases' }),
      },
    }),
    defineSection({
      id: 'idea',
      label: 'Service page: “Got an Idea?” banner',
      description: 'The dark banner with a button. The device picture is set per service.',
      fields: {
        title: f.textarea({
          label: 'Title',
          max: 80,
          rows: 2,
          help: 'A new line starts a new row.',
        }),
        button: f.link({ label: 'Button' }),
      },
    }),
    defineSection({
      id: 'process',
      label: 'Service page: process',
      description: 'The four steps of the process.',
      fields: {
        eyebrow: f.text({ label: 'Label', max: 40 }),
        title: f.text({ label: 'Title', max: 120 }),
        steps: f.list({
          label: 'Steps',
          itemLabelField: 'title',
          max: 8,
          of: {
            title: f.text({ label: 'Title', required: true, max: 80 }),
            text: f.richText({ label: 'Text', max: 700, help: 'Bold text is set heavier.' }),
          },
        }),
      },
    }),
    defineSection({
      id: 'partners',
      label: 'Service page: partner logos',
      description: 'The scrolling row of partner logos at the end of every service page.',
      fields: {
        eyebrow: f.text({ label: 'Label', max: 40 }),
        title: f.text({ label: 'Title', max: 160 }),
        logos: f.list({
          label: 'Logos',
          of: f.image({ localized: false, recommendedSize: '400×188' }),
          localized: false,
          help: 'Shown in this order, scrolling to the left.',
        }),
      },
    }),
    useShared(testimonialsShared),
    useShared(contactShared),
    defineSection({
      id: 'nextService',
      label: 'Service page: next service',
      description: 'Label above the cards of the other services at the end of a service page.',
      fields: { eyebrow: f.text({ label: 'Label', max: 40 }) },
    }),
  ],
  seed: {
    en: {
      intro: { title: 'Services' },
      about: { eyebrow: 'About' },
      features: {
        cards: [
          {
            title: 'No middlemen.\nOnly design people',
            text: 'No sales, no project managers, no business analysts – you always speak with designers. We believe that best products are born by direct communication between product and design sides.',
            image: {
              asset: 'service-feature-1.webp',
              alt: 'Client connected directly to the design team',
            },
          },
          {
            title: 'Communication\n& Updates',
            text: 'Daily updates on what is done today + requests/questions/blockers. Recurring meetings (at least 1 meeting per week for active design phase)',
            image: {
              asset: 'service-feature-2.webp',
              alt: 'Timeline of daily updates and weekly meetings',
            },
          },
          {
            title: 'Designs created\nto be developed',
            text: 'Design system based on the libraries Devs use (Tailwind, Material ui, Shadcn, etc). Figma files organized by flows with inline documentation',
            image: { asset: 'service-feature-3.webp', alt: 'Figma components mapped to code' },
          },
        ],
      },
      cases: {
        eyebrow: 'Case Studies',
        title: 'Check how K&Z keeps partners ahead\nin the digital landscape',
        seeAll: { label: 'See all cases', href: '/cases', external: false },
      },
      idea: {
        title: "Got an Idea?\nWe're Ready to Listen",
        button: { label: 'Get in touch', href: '/contact-us', external: false },
      },
      process: {
        eyebrow: 'Process',
        title: 'Our Step-by-Step Guide to designing your product',
        steps: [
          {
            title: 'Discovery',
            text: richParagraphs([
              'The first thing we do in K&Z for every UX/UI design project is discovery or what we call 4W phase. In this phase we ask 4 questions - ',
              {
                bold: 'What is the product about? Who are users & what are their goals? What is the current product condition? What competitors do?',
              },
              ' - and getting answers.',
            ]),
          },
          {
            title: 'Strategy (blueprint)',
            text: richParagraphs([
              'Like for every construction work, good architecture blueprint/drawings is a must, strategy phase is a must for any UX/UI project. Here we define persona & map user journey, design information architecture, prioritize features on value and effort, and build a design roadmap.',
            ]),
          },
          {
            title: 'UX/UI Design (The DESIGN, finally)',
            text: richParagraphs([
              'The Design phase is an iterative process that begins with low-fidelity wireframes & schematic flows and goes all the way up to fully-documented pixel-perfect high-fidelity mock-ups & prototypes that ready for development.',
            ]),
          },
          {
            title: 'Prototyping',
            text: richParagraphs([
              'Prototypes are somewhere between a design concept and a fully developed app. They allow you to prove the product value even before development via user testing or make a shiny pitch to potential investors.',
            ]),
          },
        ],
      },
      partners: {
        eyebrow: 'Partners',
        title: 'Partners who trust us their user experience',
        logos: [
          { asset: 'service-partner-01.webp', alt: 'Partner logo 1' },
          { asset: 'service-partner-02.webp', alt: 'Partner logo 2' },
          { asset: 'service-partner-03.webp', alt: 'Partner logo 3' },
          { asset: 'service-partner-04.webp', alt: 'Partner logo 4' },
          { asset: 'service-partner-05.webp', alt: 'Partner logo 5' },
          { asset: 'service-partner-06.webp', alt: 'Partner logo 6' },
          { asset: 'service-partner-07.webp', alt: 'Partner logo 7' },
          { asset: 'service-partner-08.webp', alt: 'Partner logo 8' },
          { asset: 'service-partner-09.webp', alt: 'Partner logo 9' },
          { asset: 'service-partner-10.webp', alt: 'Partner logo 10' },
          { asset: 'service-partner-11.webp', alt: 'Partner logo 11' },
          { asset: 'service-partner-12.webp', alt: 'Partner logo 12' },
          { asset: 'service-partner-13.webp', alt: 'Partner logo 13' },
          { asset: 'service-partner-14.webp', alt: 'Partner logo 14' },
          { asset: 'service-partner-15.webp', alt: 'Partner logo 15' },
          { asset: 'service-partner-16.webp', alt: 'Partner logo 16' },
          { asset: 'service-partner-17.webp', alt: 'Partner logo 17' },
          { asset: 'service-partner-18.webp', alt: 'Partner logo 18' },
          { asset: 'service-partner-19.webp', alt: 'Partner logo 19' },
          { asset: 'service-partner-20.webp', alt: 'Partner logo 20' },
          { asset: 'service-partner-21.webp', alt: 'Partner logo 21' },
          { asset: 'service-partner-22.webp', alt: 'Partner logo 22' },
          { asset: 'service-partner-23.webp', alt: 'Partner logo 23' },
          { asset: 'service-partner-24.webp', alt: 'Partner logo 24' },
        ],
      },
      nextService: { eyebrow: 'Next service' },
    },
  },
});
