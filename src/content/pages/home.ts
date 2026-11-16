/**
 * PAGE: Home. Design: design/KZ/kz-homepage/index.html (Figma 13203:2 / 13203:1895).
 * Texts are copied verbatim from the design. Repeated blocks (uniqueness, testimonials,
 * partners, contact) are shared sections; services and cases come from collections.
 */
import { definePage, defineSection } from '@/core/content/define';
import { f } from '@/core/content/fields';
import { useShared } from '@/core/content/shared-section';

import { contactShared } from '../shared/contact';
import { industriesShared } from '../shared/industries';
import { partnersShared } from '../shared/partners';
import { testimonialsShared } from '../shared/testimonials';
import { uniquenessShared } from '../shared/uniqueness';

const FAQ: readonly (readonly [string, string])[] = [
  [
    'What types of products do you design?',
    'We design SaaS web apps, ERPs, CRMs, mobile apps, websites, enterprise systems, marketplaces, data-heavy platforms, including fintech, healthcare, logistics, proptech and AI-driven products.',
  ],
  [
    'Do you work with early-stage startups or only mature products?',
    'We work with both early-stage startups (from idea or MVP) and mature products that require redesign, scaling, or UX optimization.',
  ],
  [
    'Can you redesign an existing product or MVP?',
    'Yes. We often do redesigns to improve UX, enhance visual consistency, help scalability, reduce churn, increase NPS, and unblock revenue growth.',
  ],
  [
    'How do you usually start a new project?',
    'We start with a discovery phase where we learn about product, it’s current state, business situation & goals, project vision and all other context. We do that via knowledge sessions & workshops. After we prepare a tailored estimate with timeline, budget & our vision on successful project completion.',
  ],
  [
    'How do you estimate scope, timelines, and budget?',
    'We divide the project into sensible pieces (modules/pages/releases and estimate them based on size, complexity, and potential of discrepancy. After that, we align on everything with client side to make sure that we are on the same page before starting the work.',
  ],
  [
    'How do you collaborate with product managers and developers?',
    'We work closely with PMs, BAs and developers via regular syncs, clear documentation, and ongoing communication.',
  ],
  [
    'What design deliverables do you provide at the end of the project?',
    'Ready-for-development files: high-fidelity Figma designs, clickable prototypes, design system, and research artifacts,.',
  ],
  [
    'Do you create and maintain design systems?',
    'Yes. We maintain & update existing DSs, and build scalable design systems with components, styles, and usage rules - whether from scratch or based on widely used DSs like shadcn, tailwind, material-ui, etc',
  ],
  [
    'Can you work with existing brand guidelines?',
    'Yes. We can follow existing brand guidelines or help refine them if needed.',
  ],
  [
    'Do you handle complex or data-heavy interfaces?',
    'Yes. We have a strong experience designing analytics, dashboards, and data-heavy platforms and information-dense systems.',
  ],
  [
    'Do you design AI-driven or automation-based flows?',
    'Yes. We design AI-driven flows, agent-based interfaces, and automation-heavy user journeys.',
  ],
  [
    'Can you join an existing team for long-term collaboration?',
    'Yes. We often work as an extended product design department for your in-house product teams.',
  ],
  [
    'Do you support developers during implementation?',
    'Yes. We provide inline documentation, make UX/UI checks, and organize various sync calls (q/a sessions, grooming, hand-offs, etc.) to make sure that everything is clear and we are on the same page.',
  ],
  [
    'What tools do you use for design and collaboration?',
    'Figma, FigJam, Slack, Jira, Notion, and other tools used by the client.',
  ],
  [
    'How do you ensure designs are ready for development?',
    'We prepare consistent components, clear states, specifications, and edge cases. Also, we are strongly recommending to perform handoff meetings and grooming sessions with developers and product team.',
  ],
  [
    'Do you sign NDAs and work with confidential data?',
    'Yes. We regularly work under NDAs and follow strict confidentiality rules.',
  ],
  [
    'Do you provide UX research and user testing?',
    'Yes. We conduct interviews, usability testing, and prototype validation depending on project stage and goals.',
  ],
  [
    'How do you prioritize features and UX improvements?',
    'We use UX Impact vs. Implementation Effort Matrix together with business and technical constraints.',
  ],
  [
    'How can we start working together?',
    'We recommend to start with a short intro call where we discuss goals, scope, and next steps.',
  ],
];

/** Icons of the "What's included" cards: `public/icons/included/<value>.svg`. */
const INCLUDED_ICONS = [
  { value: 'ux-audit', label: 'Magnifier with a person' },
  { value: 'information-architecture', label: 'Site map' },
  { value: 'user-flow', label: 'Flow between two points' },
  { value: 'new-ux-ui', label: 'Screen with a cursor' },
  { value: 'design-system', label: 'Component blocks' },
  { value: 'prototypes', label: 'Two linked screens' },
] as const;

const INCLUDED: readonly (readonly [(typeof INCLUDED_ICONS)[number]['value'], string, string])[] = [
  [
    'ux-audit',
    'UX audit',
    'A review of your key flows against usability heuristics, analytics and user feedback. Issues are ranked by UX impact and implementation effort.',
  ],
  [
    'information-architecture',
    'Information architecture',
    'We restructure navigation and screens, so users find what matters and the product has room to grow.',
  ],
  [
    'user-flow',
    'User flow optimization',
    'Shorter paths to key actions and no dead ends, based on how people really use the product.',
  ],
  [
    'new-ux-ui',
    'New UX/UI',
    'High-fidelity Figma designs for web and mobile in one consistent visual language.',
  ],
  [
    'design-system',
    'Design system',
    'Components, styles and usage rules built on the libraries your developers use: Tailwind, Material UI, shadcn and others.',
  ],
  [
    'prototypes',
    'Prototypes',
    'Clickable prototypes to check the new experience with users before development starts.',
  ],
];

const APPROACH = [
  ['Discovery', 'discovery', 'discovery'],
  ['Strategy', 'strategy', 'strategy'],
  ['UX/UI Design', 'design', 'uxui'],
  ['Prototyping', 'prototyping', 'prototyping'],
] as const;

export const homePage = definePage({
  id: 'home',
  path: '/',
  label: 'Home',
  parent: null,
  uiTexts: ['home', 'services'],
  seo: {
    title: 'UI/UX Design Agency for SaaS & B2B Products | K&Z Design',
    description:
      'K&Z Design is a UI/UX design agency for SaaS, web and mobile products. Founder-led team, developer-ready Figma, design systems. Seed to Series D.',
  },
  sections: [
    defineSection({
      id: 'hero',
      label: 'Hero',
      fields: {
        badge: f.link({
          label: 'Top badge',
          help: 'The text is the badge label, the address is where it leads.',
        }),
        title: f.textarea({
          label: 'Title',
          required: true,
          max: 120,
          rows: 2,
          help: 'A new line starts a new line of the title.',
        }),
        subtitle: f.textarea({ label: 'Text', max: 300, rows: 3 }),
        highlight: f.text({
          label: 'Highlighted end of the text',
          max: 120,
          help: 'Shown in a gray pill after the text.',
        }),
        cta: f.link({ label: 'Button', required: true }),
        awardsLabel: f.text({ label: 'Awards: label', max: 60 }),
        awards: f.list({
          label: 'Awards: badges',
          of: f.image({ recommendedSize: '300×318' }),
          max: 8,
          help: 'The image description is read by screen readers.',
        }),
      },
    }),
    defineSection({
      id: 'services',
      label: 'Our Services',
      description:
        'The tabs, texts and lists come from the services: Pages → Blog & lists → Services.',
      fields: {
        eyebrow: f.text({ label: 'Label above the tabs', max: 40 }),
      },
    }),
    defineSection({
      id: 'cases',
      label: 'Case Studies',
      description: 'The cards are the case studies marked “Show on Home”.',
      fields: {
        eyebrow: f.text({ label: 'Label above the title', max: 40 }),
        title: f.text({ label: 'Title', required: true, max: 160 }),
        seeAll: f.link({ label: 'Link under the cards' }),
      },
    }),
    defineSection({
      id: 'included',
      label: "What's included",
      fields: {
        eyebrow: f.text({ label: 'Label on the left', max: 40 }),
        title: f.text({ label: 'Title', required: true, max: 160 }),
        cards: f.list({
          label: 'Cards',
          itemLabelField: 'title',
          max: 12,
          of: {
            icon: f.select({ label: 'Icon', options: [...INCLUDED_ICONS] }),
            title: f.text({ label: 'Title', required: true, max: 60 }),
            text: f.textarea({ label: 'Text', max: 240, rows: 3 }),
          },
        }),
      },
    }),
    useShared(uniquenessShared),
    defineSection({
      id: 'approach',
      label: 'Our Approach',
      fields: {
        eyebrow: f.text({ label: 'Label above the title', max: 40 }),
        title: f.text({ label: 'Title', required: true, max: 200 }),
        text: f.textarea({ label: 'Text', max: 400, rows: 4 }),
        link: f.link({ label: 'Link' }),
        cards: f.list({
          label: 'Cards',
          itemLabelField: 'link',
          max: 8,
          of: {
            link: f.link({ label: 'Title and link' }),
            graphic: f.select({
              label: 'Illustration',
              options: [
                { value: 'discovery', label: 'Discovery (search)' },
                { value: 'strategy', label: 'Strategy (priorities)' },
                { value: 'uxui', label: 'UX/UI Design (form)' },
                { value: 'prototyping', label: 'Prototyping (payment)' },
              ],
            }),
          },
        }),
      },
    }),
    useShared(testimonialsShared),
    useShared(partnersShared),
    useShared(industriesShared),
    defineSection({
      id: 'faq',
      label: 'FAQ',
      fields: {
        eyebrow: f.text({ label: 'Label above the title', max: 40 }),
        title: f.text({ label: 'Title', required: true, max: 120 }),
        subtitle: f.text({ label: 'Text under the title', max: 120 }),
        initiallyOpen: f.number({
          label: 'Question open at the start',
          localized: false,
          integer: true,
          min: 0,
          help: 'Position of the question that is open when the page loads; 0 for none.',
        }),
        visibleCount: f.number({
          label: 'Questions shown at first',
          localized: false,
          integer: true,
          min: 0,
          help: 'The others wait behind “Show all questions”; 0 shows every question.',
        }),
        cta: f.link({ label: 'Button next to the title' }),
        ctaAfter: f.link({ label: 'Button under the list (phones)' }),
        items: f.list({
          label: 'Questions',
          itemLabelField: 'question',
          of: {
            question: f.text({ label: 'Question', required: true, max: 160 }),
            answer: f.textarea({ label: 'Answer', max: 800, rows: 4 }),
          },
        }),
      },
    }),
    useShared(contactShared),
  ],
  seed: {
    en: {
      hero: {
        badge: {
          label: 'Top UX company 2023/24/25',
          href: 'https://clutch.co/profile/kz-design',
          external: true,
        },
        title: 'Your reliable\nUX/UI design partner',
        subtitle:
          'We partner with digital product businesses to help them grow, go from seeds to Series D, and retain clients with our expertise in',
        highlight: 'user experience & digital product design.',
        cta: { label: 'Get in touch', href: '/contact-us', external: false },
        awardsLabel: 'Top UX company 2023/25',
        awards: [
          { asset: 'award-badge-1.png', alt: 'Clutch — Top User Experience Company 2025' },
          { asset: 'award-badge-2.png', alt: 'Clutch — Top User Experience Company 2023' },
          { asset: 'award-badge-3.png', alt: 'Clutch — Top Company 2024' },
          { asset: 'award-badge-4.png', alt: 'Clutch — Top UX Strategy Company 2024' },
          { asset: 'award-badge-5.png', alt: 'Clutch Champion Spring 2024' },
        ],
      },
      services: { eyebrow: 'Our Services' },
      cases: {
        eyebrow: 'Case Studies',
        title: 'Check how K&Z keeps partners ahead in the digital landscape',
        seeAll: { label: 'See all cases', href: '/cases', external: false },
      },
      included: {
        eyebrow: "What's included",
        title: 'What a product redesign with K&Z includes',
        cards: INCLUDED.map(([icon, title, text]) => ({ icon, title, text })),
      },
      approach: {
        eyebrow: 'Our Approach',
        title:
          'With a business-first approach to UX/UI Design, we help you win users, increase revenue, reduce churn and look cool',
        text: "We tackle the most complex UX/UI challenges. Whether you're adding new features, launching a new product, or improving an existing one, we got you covered and help your business thrive.",
        link: {
          label: 'Learn more about our processes',
          href: '/approach',
          external: false,
        },
        cards: APPROACH.map(([label, anchor, graphic]) => ({
          link: { label, href: `/approach#${anchor}`, external: false },
          graphic,
        })),
      },
      faq: {
        eyebrow: 'Faq',
        title: 'We were asked these',
        subtitle: 'Have any other questions?',
        initiallyOpen: 0,
        visibleCount: 6,
        cta: { label: 'Contact us', href: '/contact-us', external: false },
        ctaAfter: { label: 'Get in touch', href: '/contact-us', external: false },
        items: FAQ.map(([question, answer]) => ({ question, answer })),
      },
    },
  },
});
