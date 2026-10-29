/**
 * PAGE: Home. Design: design/KZ/kz-homepage/index.html (Figma 13203:2 / 13203:1895).
 * Texts are copied verbatim from the design. Repeated blocks (uniqueness, testimonials,
 * partners, contact) are shared sections; services and cases come from collections.
 */
import { definePage, defineSection } from '@/core/content/define';
import { f } from '@/core/content/fields';
import { useShared } from '@/core/content/shared-section';

import { INDUSTRIES } from '../collections/cases';
import { contactShared } from '../shared/contact';
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

const APPROACH = [
  ['Discovery', 'discovery', 'approach-discovery.png'],
  ['Strategy', 'strategy', 'approach-strategy.png'],
  ['UX/UI Design', 'design', 'approach-uxui.png'],
  ['Prototyping', 'prototyping', 'approach-prototyping.png'],
] as const;

const INDUSTRY_TEXT: Record<(typeof INDUSTRIES)[number]['value'], string> = {
  healthcare:
    'We cured confusion and inefficiency in web interfaces and mobile applications for doctors and clinic managers. We brought great AI experience to streamline clunky processes and manage unstructured medical data. Everything is always with a focus on data security and compliance.',
  logistics:
    'We covered with a strong UX the entire cycle of transportation: fleet management, workforce, orders, routes and trips, scheduling, warehouse management, tracking, last-mile delivery, economics, and documentation',
  fintech:
    'We brought seamless user experience to investment platforms, account software, community platforms for angel investors, internal platforms for hedge funds, predictive analytics platforms, Loans management and banking.',
  hr: 'Enhance visibility of complex HR processes, ensuring seamless employee lifecycle management, including compliance. Designing the interface so that users can easily navigate between different levels of information, manage large amounts of data, and make the service easy to use for non-technical users.',
  ai: 'Designing AI-based applications or integrating AI into your workflows, we consider back-end operations to ensure that all design decisions enhance user experience, making AI-powered products clear and intuitive rather than confusing. AI agent experience, AI-powered builders.',
  energy:
    'Oil, gas, electricity, maintenance, etc. We empowered with a great UX for drilling rig operations analytical system, partial discharge monitoring platforms at high-voltage nodes, renewable energy management apps, and others.',
  sales:
    'We designed CRM, CPQ, and sales team management tools in a way to support reps’ everyday processes instead of complicate and interfere them. Excellent visualization and intuitive management of sales funnels - our top 1 priority.',
  proptech:
    'We streamlined, made easy and operational UX for always-busy real estate guys: listing platforms for buying, renting, and selling real estate, deal & customer management for real estate agents, apps for buyer agents, campaigns and communications.',
  social:
    'We supercharged retention and user satisfaction for professional and hobby social network apps, event management platforms for organizers and visitors, ticket management and analysis systems.',
  marketing:
    'We eased & streamlined the creative life marketing agencies with clear UX & stunning UI for their order management, content creation campaigns management, and omnichannel systems.',
  retail:
    'We have successfully designed easy onboarding and intuitive integrations with various communication channels (WhatsApp Business API integration, 10DLC phone number registration, etc.).',
  web3: 'We brought human-centered design principles to always-evolving world of web3 to make it understandable and comfortable for non-tech users, and powerful and sophisticated for experienced techheads. Blockchain, crypto, NFT - you name it, we’ve done it.',
};

export const homePage = definePage({
  id: 'home',
  path: '/',
  label: 'Home',
  parent: null,
  uiTexts: ['home', 'services'],
  seo: {
    title: 'K&Z Design — Your reliable UX/UI design partner',
    description:
      'We partner with digital product businesses to help them grow, go from seeds to Series D, and retain clients with our expertise in user experience & digital product design.',
  },
  sections: [
    defineSection({
      id: 'hero',
      label: 'Hero',
      fields: {
        badge: f.link({
          label: 'Badge above the title',
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
            image: f.image({ label: 'Picture', localized: false, recommendedSize: '460×330' }),
          },
        }),
      },
    }),
    useShared(testimonialsShared),
    useShared(partnersShared),
    defineSection({
      id: 'industries',
      label: 'Industries',
      description: 'The case studies of an industry are the ones tagged with it.',
      fields: {
        eyebrow: f.text({ label: 'Label above the title', max: 40 }),
        title: f.text({ label: 'Title', required: true, max: 200 }),
        text: f.textarea({ label: 'Text', max: 300, rows: 3 }),
        initiallyOpen: f.number({
          label: 'Industry open at the start',
          localized: false,
          integer: true,
          min: 0,
          help: 'Position of the industry that is open when the page loads; 0 for none.',
        }),
        items: f.list({
          label: 'Industries',
          itemLabelField: 'label',
          of: {
            key: f.select({ label: 'Industry', options: INDUSTRIES }),
            label: f.text({ label: 'Name', required: true, max: 60 }),
            text: f.textarea({ label: 'Text', max: 600, rows: 5 }),
          },
        }),
      },
    }),
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
        cards: APPROACH.map(([label, anchor, asset]) => ({
          link: { label, href: `/approach#${anchor}`, external: false },
          image: { asset, alt: `${label} illustration` },
        })),
      },
      industries: {
        eyebrow: 'Industries',
        title:
          'We specialize in designing products that make users happy with their problems solved',
        initiallyOpen: 1,
        text: 'By focusing on strategic design, we help our partners in various industries achieve their business goals and drive long-term success.',
        items: INDUSTRIES.map((industry) => ({
          key: industry.value,
          label: industry.label,
          text: INDUSTRY_TEXT[industry.value],
        })),
      },
      faq: {
        eyebrow: 'Faq',
        title: 'We were asked these',
        subtitle: 'Have any other questions?',
        initiallyOpen: 0,
        cta: { label: 'Contact us', href: '/contact-us', external: false },
        ctaAfter: { label: 'Get in touch', href: '/contact-us', external: false },
        items: FAQ.map(([question, answer]) => ({ question, answer })),
      },
    },
  },
});
