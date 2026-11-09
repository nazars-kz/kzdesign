/**
 * PAGE: About us (/about-us). Design: design/kz-homepage/pages/about-us.html.
 * The uniqueness cards, testimonials and the contact block are shared sections (as on Home).
 * Texts are copied verbatim from the design.
 */
import { definePage, defineSection } from '@/core/content/define';
import { f } from '@/core/content/fields';
import { useShared } from '@/core/content/shared-section';

import { contactShared } from '../shared/contact';
import { testimonialsShared } from '../shared/testimonials';
import { uniquenessShared } from '../shared/uniqueness';

/** The Lottie illustrations of the "What makes us different" cards (files in public/animations). */
export const DIFF_ANIMATIONS = [
  { value: 'design-for-business', label: 'Design for business' },
  { value: 'comprehensive-support', label: 'Comprehensive support' },
  { value: 'partner-involvement', label: 'Partner involvement' },
  { value: 'strategy', label: 'Strategy' },
] as const;

export const aboutPage = definePage({
  id: 'about',
  path: '/about-us',
  label: 'About us',
  parent: null,
  uiTexts: ['about'],
  seo: {
    title: 'About K&Z Design: Founder-Led UI/UX Design Studio',
    description:
      'Meet K&Z Design: a founder-led UI/UX design studio. Two partners are involved in every project, with no backup team, to help digital product businesses grow and retain clients.',
  },
  sections: [
    defineSection({
      id: 'hero',
      label: 'Hero',
      description: 'Title and intro above the rotating 3D logo.',
      fields: {
        title: f.text({ label: 'Title (H1)', required: true, max: 120 }),
        sub: f.textarea({ label: 'Intro', max: 500, rows: 4 }),
      },
    }),
    defineSection({
      id: 'leadership',
      label: 'Leadership',
      description: 'The founders.',
      fields: {
        eyebrow: f.text({ label: 'Label', max: 40 }),
        intro: f.textarea({ label: 'Intro', max: 500, rows: 4 }),
        leaders: f.list({
          label: 'People',
          itemLabelField: 'firstName',
          max: 4,
          of: {
            photo: f.image({ label: 'Photo', localized: false, recommendedSize: '642×776' }),
            firstName: f.text({ label: 'First name', required: true, max: 40 }),
            lastName: f.text({
              label: 'Last name',
              max: 40,
              help: 'Its first letter is highlighted in orange.',
            }),
            role: f.text({ label: 'Role', max: 60 }),
            bio: f.textarea({ label: 'About', max: 300, rows: 3 }),
            experience: f.text({ label: 'Previous job', max: 100 }),
          },
        }),
        button: f.link({ label: 'Button' }),
      },
    }),
    useShared(uniquenessShared),
    defineSection({
      id: 'different',
      label: 'What makes us different',
      description: 'Four cards with an animation that plays on hover.',
      fields: {
        eyebrow: f.text({ label: 'Label', max: 40 }),
        title: f.text({ label: 'Title', max: 120 }),
        cards: f.list({
          label: 'Cards',
          itemLabelField: 'title',
          max: 8,
          of: {
            animation: f.select({ label: 'Animation', options: DIFF_ANIMATIONS }),
            title: f.textarea({
              label: 'Title',
              required: true,
              max: 80,
              rows: 2,
              help: 'A new line starts a new row.',
            }),
            text: f.textarea({ label: 'Text', max: 400, rows: 4 }),
          },
        }),
        more: f.link({ label: 'Link under the cards' }),
      },
    }),
    useShared(testimonialsShared),
    useShared(contactShared),
  ],
  seed: {
    en: {
      hero: {
        title: 'We tackle the toughest user experience challenges',
        sub: 'Our dedicated team of designers, strategists, and technologists is here to help you bring the most intuitive and effective digital experience to your customers, driving increased revenue and ensuring the growth of your business',
      },
      leadership: {
        eyebrow: 'K&Z Leadership',
        intro:
          'K&Z is run by two partners, each of whom is always involved in the project. We have no backup team: all your tasks are under the control of the founders daily, and all their experience is aimed at achieving your business goals.',
        leaders: [
          {
            photo: {
              asset: 'about-leader-vlad.webp',
              alt: 'Vlad Kyrieiev, CEO of K&Z Design',
            },
            firstName: 'Vlad',
            lastName: 'Kyrieiev',
            role: '(CEO)',
            bio: 'Serial design entrepreneur & leader with 10+ years of experience solving the most challenging UX issues.',
            experience: 'Ex-Head of Design in US ERP product',
          },
          {
            photo: {
              asset: 'about-leader-nick.webp',
              alt: 'Nick Zhurenko, COO & Head of Design of K&Z Design',
            },
            firstName: 'Nick',
            lastName: 'Zhurenko',
            role: '(COO & Head of Design)',
            bio: 'Design Leader, lecturer, coach with 10+ years in the field.',
            experience: 'Ex Head of Design in US CRM development company',
          },
        ],
        button: { label: 'Get in touch', href: '/contact-us', external: false },
      },
      different: {
        eyebrow: 'About us',
        title: 'What makes us different',
        cards: [
          {
            animation: 'design-for-business',
            title: 'Design for business, \nnot business for design',
            text: "Our approach and attitude focus on your business vision, needs, and goals. We don't do design just for design. Everything we do is aimed at helping your business succeed.",
          },
          {
            animation: 'comprehensive-support',
            title: 'Comprehensive support',
            text: 'We provide structured files with a design system and instructions for developers. We explain the details during development and support the product after implementation.',
          },
          {
            animation: 'partner-involvement',
            title: 'Partner involvement',
            text: 'We treat your product as if it were our own. K&Z partners are involved in every project to ensure attention to detail and high-quality work.',
          },
          {
            animation: 'strategy',
            title: 'Strategy',
            text: "A well-thought-out strategy allows us to create intuitive and effective interfaces. This helps deliver measurable results and competitive advantages for our partners' businesses.",
          },
        ],
        more: { label: 'More about our process', href: '/approach', external: false },
      },
    },
  },
});
