/**
 * PAGE: Approach (/approach). Design: design/kz-homepage/pages/approach.html.
 * Four fixed phases (Discovery, Strategy, UX/UI design, Prototyping), each an accordion of steps
 * next to an animation; the pills at the top and the links from Home jump to the phase ids.
 * Industries, testimonials and the contact block are shared sections. Texts are copied verbatim.
 */
import { definePage, defineSection } from '@/core/content/define';
import { f } from '@/core/content/fields';
import { useShared } from '@/core/content/shared-section';

import { richParagraphs } from '../seed-text';
import { contactShared } from '../shared/contact';
import { industriesShared } from '../shared/industries';
import { testimonialsShared } from '../shared/testimonials';

/** The Lottie animations of the phases (files in public/animations). */
export const PHASE_ANIMATIONS = [
  { value: 'discovery', label: 'Discovery (4W)' },
  { value: 'strategy', label: 'Strategy (blueprint)' },
  { value: 'design', label: 'UX/UI design' },
  { value: 'prototyping', label: 'Prototyping' },
] as const;

const PHASES = [
  {
    id: 'discovery',
    eyebrow: 'Discovery',
    intro:
      'Via user interviews and analytics, we get a picture of who your users are, what they need and what are their goals.',
    animation: 'discovery',
    rows: [
      {
        label: 'What is the product about?',
        aka: 'aka workshops',
        text: 'Here we establish a comprehensive understanding of your:  business, vision, project goals. To make this understanding happen - we read your manifesto (and other relevant docs), meet with you & your team, and collect all your-business knowledge we need/can.',
      },
      {
        label: 'Who are user & what are their goals?',
        aka: 'aka user research',
        text: 'Via user interviews and analytics, we get a picture of who your users are, what they need and what are their goals.',
      },
      {
        label: 'What is the current product condition?',
        aka: 'aka UX/UI audit',
        text: 'If you do have an existing product, we evaluate its current state to check how it serves business objectives and project goals. This includes an audit of usability, clarity, and ease of task completion, use of design elements & its consistency, etc. As the result, we prepare a prioritization matrix that considers recommended changes, their impact and required effort.',
      },
      {
        label: 'What competitors do?',
        aka: 'aka competitor analysis',
        text: 'We analyze existing players to understand their value proposition and its execution to inform your competitive advantage. Looking at the similar products in the market helps us to determine which features are key ones and where the golden (or at least silver) opportunities lies.',
      },
    ],
  },
  {
    id: 'strategy',
    eyebrow: 'Strategy',
    intro:
      'Like for every construction work, good architecture blueprint/drawings is a must, strategy phase is a must for any UX/UI project. Here we define persona & map user journey, design information architecture, prioritize features on value and effort, and build a design roadmap.',
    animation: 'strategy',
    rows: [
      {
        label: 'Persona & User Journey Mapping',
        aka: '',
        text: 'Here we create personas as consolidated picture of most probable customer archetypes for your product. The goal here is to make step further from understanding users to defining their user stories - how/why/when they use the product. As the result, we are able to see & describe all the interactions, uncover potential pain points, bottlenecks & opportunities.',
      },
      {
        label: 'Information architecture',
        aka: '',
        text: 'Based on the insights gathered through a discovery phase, we create an information architecture - a scheme, skeleton of the product that ensures straightforward simple navigation, and fast intuitive access to features & data.',
      },
      {
        label: 'Feature prioritization',
        aka: '',
        text: "At this point we already know all the features that have to be created or updated - so next step is to define the priority & order. That's where a prioritization matrix comes in handy. \n\nIn this matrix, we rank each feature based on two things: how valuable it is (to the user & your business) and how much effort it'll take to get it done. Features in the top-left corner are Quick Wins – they're easy & sweet and should be our top priority. Features in the bottom-right corner, on the other hand, are Time Sinks – they're not worth our time right now and should be put on the back burner.",
      },
      {
        label: 'Design roadmap',
        aka: '',
        text: 'When features are prioritized, we build out a design roadmap for the project. The roadmap lays out the design tasks in detail for each 2-week sprint to provide clarity to you on what will be completed and by when. The roadmap is designed to be a living document that will evolve to reflect any priority update.',
      },
    ],
  },
  {
    id: 'design',
    eyebrow: 'UX/UI design',
    intro:
      'The Design phase is an iterative process that begins with low-fidelity wireframes & schematic flows and goes all the way up to fully-documented pixel-perfect high-fidelity mock-ups & prototypes that ready for development.',
    animation: 'design',
    rows: [
      {
        label: 'Iterative wireframing',
        aka: '',
        text: "Here we create low fidelity sketches, screenshot collages, etc., discuss and analyze them with business & product owners to define basic layouts, interactions, user journeys. \n\nWe don't buy the idea of traditional black and white wireframes. With the current sophistication of design systems, it's unnecessary time & money wastage to create those when we can establish the visual style and produce nearly high-fidelity screens immediately.",
      },
      {
        label: 'Visual style & design system',
        aka: '',
        text: "We use client input and iterations to nail down the product's look and feel, aligning it with business vision and UX standards. Then, we set up a design system based on the defined style to ensure consistency and cost & time effective design work.",
      },
      {
        label: 'High fidelity design',
        aka: '',
        text: 'Produce screens flow by flow with underline documentation, logical action sequences based on the defined user journeys & functionality.',
      },
      {
        label: 'User testing',
        aka: '',
        text: 'We see users as crucial participants in any product design process. By involving them in testing, we gain unique insights that almost impossible to get from stakeholders or internal testing. Alongside usability tests and interviews, we may engage users to give feedback on wireframes and help us ensure the product does what it was designed to do in real-world situations through user acceptance testing (UAT).',
      },
      {
        label: 'Pre-development preparation & hand-off',
        aka: '',
        text: 'We provide structured Figma with design system, components & variants, and all instructions for developers, so they will have all the required materials. Also, we conduct meetings with engineers to ensure their understanding of the product & design ways.',
      },
      {
        label: 'Development support & post-development testing',
        aka: '',
        text: 'We help developers providing on-demand explanation & other design support. After development is done we perform design testing to support successful implementation and ensure that everything works and looks and it suppose to.',
      },
    ],
  },
  {
    id: 'prototyping',
    eyebrow: 'Prototyping',
    intro:
      'Prototypes are somewhere between a design concept and a fully developed app. They allow you to prove the product value even before development via user testing or make a shiny pitch to potential investors.',
    animation: 'prototyping',
    rows: [
      {
        label: 'Interactive (clickable) prototypes',
        aka: '',
        text: "We create prototypes and test them to gain insights, refine, and enhance our partners' products. Via prototypes of different levels of fidelity, we validate hypotheses and uncover new questions, area for improvements, or opportunities well before our solutions meet market.",
      },
      {
        label: 'Animated video',
        aka: '',
        text: 'Optionally, we produce a polished video showreel to spotlight the interface in action. These can be used in marketing materials to effectively communicate the value proposition and attract users.',
      },
    ],
  },
] as const;

/** One phase: its id is the anchor (`/approach#discovery`), so it never changes. */
function phaseSection(id: (typeof PHASES)[number]['id'], label: string) {
  return defineSection({
    id,
    label,
    description: 'A phase of the process: intro, an accordion of steps and an animation.',
    fields: {
      eyebrow: f.text({ label: 'Label (also the pill at the top)', required: true, max: 40 }),
      intro: f.textarea({ label: 'Intro', max: 500, rows: 4 }),
      animation: f.select({ label: 'Animation', localized: false, options: PHASE_ANIMATIONS }),
      rows: f.list({
        label: 'Steps',
        itemLabelField: 'label',
        max: 10,
        of: {
          label: f.text({ label: 'Question', required: true, max: 120 }),
          aka: f.text({ label: 'Also known as', max: 60 }),
          text: f.textarea({
            label: 'Answer',
            max: 1200,
            rows: 6,
            help: 'An empty line starts a new paragraph.',
          }),
        },
      }),
    },
  });
}

export const approachPage = definePage({
  id: 'approach',
  path: '/approach',
  label: 'Our approach',
  parent: null,
  uiTexts: ['approach'],
  seo: {
    title: 'Our UX/UI Design Process | K&Z Design',
    description:
      'How we design digital products: discovery, strategy, UX/UI design and prototyping. A clear process with daily updates and developer-ready files.',
  },
  sections: [
    defineSection({
      id: 'hero',
      label: 'Hero',
      description: 'Title, intro, the jump links to the phases and the founder quote.',
      fields: {
        title: f.text({ label: 'Title (H1)', required: true, max: 80 }),
        sub: f.textarea({ label: 'Intro', max: 400, rows: 4 }),
        quote: f.richText({ label: 'Quote', max: 600, help: 'Bold text is set heavier.' }),
        name: f.text({ label: 'Quote author', max: 60 }),
        role: f.text({ label: 'Quote author: role', max: 60 }),
        photo: f.image({
          label: 'Quote author: photo',
          localized: false,
          recommendedSize: '96×96',
        }),
      },
    }),
    phaseSection('discovery', 'Phase: Discovery'),
    phaseSection('strategy', 'Phase: Strategy'),
    phaseSection('design', 'Phase: UX/UI design'),
    phaseSection('prototyping', 'Phase: Prototyping'),
    useShared(industriesShared),
    useShared(testimonialsShared),
    useShared(contactShared),
  ],
  seed: {
    en: {
      hero: {
        title: 'Approach',
        sub: "We tackle the most complex UX/UI challenges. Whether you're adding new features, launching a new product, or improving an existing one, we got you covered and help your business thrive.",
        quote: richParagraphs([
          '“Our whole process is quite big and sophisticated and could look a bit too much for your current situation - no worries, our main rule is ',
          { bold: 'design for business, not design for design' },
          '. So, we’ll take only the steps necessary in your particular situation to get the best results within the current limitations.”',
        ]),
        name: 'Vlad Kyrieiev',
        role: 'Founder & CEO',
        photo: { asset: 'cta-vlad.png', alt: 'Vlad Kyrieiev' },
      },
      ...Object.fromEntries(
        PHASES.map(({ id, ...phase }) => [
          id,
          { ...phase, rows: phase.rows.map((row) => ({ ...row })) },
        ]),
      ),
    },
  },
});
