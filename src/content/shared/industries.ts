/** SHARED SECTION: "Industries" accordion (Home, Approach). The case studies of an industry are the ones tagged with it. */
import { f } from '@/core/content/fields';
import { defineSharedSection } from '@/core/content/shared-section';

import { INDUSTRIES } from '../cases/card';

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

export const industriesShared = defineSharedSection({
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
  seed: {
    en: {
      eyebrow: 'Industries',
      title: 'We specialize in designing products that make users happy with their problems solved',
      initiallyOpen: 1,
      text: 'By focusing on strategic design, we help our partners in various industries achieve their business goals and drive long-term success.',
      items: INDUSTRIES.map((industry) => ({
        key: industry.value,
        label: industry.label,
        text: INDUSTRY_TEXT[industry.value],
      })),
    },
  },
});
