/**
 * CASE STUDY: PrintBuy (/cases/printbuy). A unique page: its layout is built for this case
 * (src/site/cases/printbuy/). Design: design/cases/printbuy (a full-page export and assets, not
 * committed).
 *
 * Every text and picture is a field. Product screens, photos and the compositions of phones over
 * the 3D shapes are images; the rest (texts, notes, the process, the feature cards, the palette,
 * the type specimen, the team) is code. A new line in a title starts a new row.
 */
import { definePage, defineSection } from '@/core/content/define';
import { f } from '@/core/content/fields';
import { useShared } from '@/core/content/shared-section';

import { relatedCasesShared } from '../shared/related-cases';
import { caseCardSection } from './card';
import { caseAboutSection, caseIntroSection } from './page-parts';

const ROWS_HELP = 'A new line starts a new row (on wide screens).';
const PARAGRAPHS_HELP = 'Each new line is a paragraph.';
const NOTE_HELP = 'Written by hand, next to a colored mark.';

/** The icons of the feature cards (drawn in code). */
export const PRINTBUY_ICONS = [
  { value: 'folder', label: 'Folder' },
  { value: 'cursor', label: 'Click' },
  { value: 'chat', label: 'Chat' },
] as const;

/** A non-localized picture with an alt text. */
const picture = (label: string, recommendedSize: string, help?: string) =>
  f.image({ label, localized: false, recommendedSize, ...(help ? { help } : {}) });

const note = (label = 'Handwritten note') =>
  f.textarea({ label, max: 300, rows: 3, help: NOTE_HELP });

/** A screen (or a composition) with a small label and a text beside it. */
const feature = (recommendedSize: string, max: number) =>
  f.list({
    label: 'Blocks',
    itemLabelField: 'label',
    max,
    help: 'Shown in order; their places on the page follow the design.',
    of: {
      image: picture('Picture', recommendedSize),
      label: f.text({ label: 'Label', required: true, max: 60 }),
      text: f.textarea({ label: 'Text', max: 600, rows: 5, help: PARAGRAPHS_HELP }),
    },
  });

export const printbuyCase = definePage({
  id: 'case-printbuy',
  path: '/cases/printbuy',
  label: 'PrintBuy',
  parent: 'cases',
  adminGroup: 'Case studies',
  uiTexts: ['cases'],
  seo: {
    title: 'PrintBuy: Wrap Studio Management Platform UX/UI Case Study | K&Z Design',
    description:
      'UX/UI case study of PrintBuy, a management platform for vehicle wrap studios: schedules, invoices, client details, billing and a mobile version for teams on the go.',
  },
  structuredData: ({ url, title: name, locale }) => [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name,
      url,
      inLanguage: locale,
      about: 'UX/UI design of a web platform for vehicle wrap studios and its mobile version',
      creator: { '@type': 'Organization', name: 'K&Z Design' },
    },
  ],
  sections: [
    caseCardSection(),
    caseIntroSection(),
    defineSection({
      id: 'hero',
      label: 'Hero',
      description: 'The first picture: the dashboard on a monitor in a wrap studio.',
      fields: { image: picture('Picture', '2400×1833') },
    }),
    defineSection({
      id: 'overview',
      label: 'About the product',
      fields: {
        text: f.textarea({
          label: 'Text',
          required: true,
          max: 1000,
          rows: 6,
          help: PARAGRAPHS_HELP,
        }),
        facts: f.list({
          label: 'Project facts',
          itemLabelField: 'label',
          max: 6,
          of: {
            label: f.text({ label: 'Name', required: true, max: 30 }),
            values: f.text({
              label: 'Values',
              required: true,
              max: 120,
              help: 'Separated by commas.',
            }),
          },
        }),
      },
    }),
    defineSection({
      id: 'focus',
      label: 'Product design focus',
      fields: {
        title: f.text({ label: 'Title', required: true, max: 60 }),
        text: f.textarea({ label: 'Text', max: 500, rows: 4 }),
      },
    }),
    defineSection({
      id: 'schedules',
      label: 'Schedules and users',
      description: 'The wrapped car with the laptop and the phone, then the text about the users.',
      fields: {
        image: picture(
          'Picture',
          '2364×1945',
          'The text block overlaps its white bottom on the right.',
        ),
        title: f.text({ label: 'Title', required: true, max: 60 }),
        text: f.textarea({ label: 'Text', max: 800, rows: 5, help: PARAGRAPHS_HELP }),
        note: note(),
      },
    }),
    defineSection({
      id: 'curve',
      label: 'Dark block with the phone',
      fields: {
        title: f.textarea({ label: 'Title', required: true, max: 160, rows: 2, help: ROWS_HELP }),
        text: f.textarea({ label: 'Text', max: 200, rows: 2, help: ROWS_HELP }),
        background: picture('Background', '2400×1767'),
        phone: picture('Phone', '1100×2306', 'A transparent PNG with its shadow.'),
        note: note('Note under the phone'),
      },
    }),
    defineSection({
      id: 'sync',
      label: 'Design process',
      fields: {
        title: f.textarea({ label: 'Title', required: true, max: 80, rows: 2, help: ROWS_HELP }),
        steps: f.list({
          label: 'Steps',
          itemLabelField: 'label',
          max: 8,
          of: {
            label: f.text({ label: 'Label', required: true, max: 50 }),
            text: f.textarea({ label: 'Text', max: 300, rows: 3 }),
          },
        }),
      },
    }),
    defineSection({
      id: 'structure',
      label: 'Feature cards',
      fields: {
        title: f.textarea({ label: 'Title', required: true, max: 200, rows: 3, help: ROWS_HELP }),
        cards: f.list({
          label: 'Cards',
          itemLabelField: 'title',
          max: 3,
          of: {
            icon: f.select({ label: 'Icon', options: PRINTBUY_ICONS, localized: false }),
            title: f.text({ label: 'Title', required: true, max: 40 }),
            text: f.textarea({ label: 'Text', max: 300, rows: 3 }),
          },
        }),
      },
    }),
    defineSection({
      id: 'workshop',
      label: 'Laptop in the studio',
      fields: { image: picture('Picture', '2400×1633') },
    }),
    defineSection({
      id: 'control',
      label: 'Control, speed and precision',
      fields: {
        label: f.text({ label: 'Label', max: 80 }),
        text: f.textarea({ label: 'Text', required: true, max: 500, rows: 4 }),
      },
    }),
    defineSection({
      id: 'screens',
      label: 'Invoicing screens',
      description: 'Screens with a text beside them; the picture sits left, right, left.',
      fields: { items: feature('2000×1766', 3) },
    }),
    defineSection({
      id: 'mobile',
      label: 'Mobile version',
      fields: {
        label: f.text({ label: 'Label', max: 40 }),
        image: picture('Picture', '2214×2400', 'The two phones over the purple and green shapes.'),
        note: note('Note under the picture'),
      },
    }),
    defineSection({
      id: 'phones',
      label: 'Mobile screens',
      description: 'Full-width pictures of phones; the text sits left, right, left.',
      fields: { items: feature('2364×1751', 3) },
    }),
    defineSection({
      id: 'studio',
      label: 'Studio photo with the phone',
      fields: {
        image: picture('Picture', '2364×1549', 'The right half stays dark: the texts sit on it.'),
        note: f.textarea({ label: 'Handwritten note', max: 200, rows: 2, help: NOTE_HELP }),
        title: f.textarea({ label: 'Title', required: true, max: 80, rows: 3, help: ROWS_HELP }),
      },
    }),
    defineSection({
      id: 'brand',
      label: 'Icons, colors, typeface',
      fields: {
        iconsLabel: f.text({ label: 'Icons: label', max: 40 }),
        icons: picture('Icons', '2140×1260'),
        paletteLabel: f.text({ label: 'Colors: label', max: 40 }),
        swatches: f.list({
          label: 'Colors',
          itemLabelField: 'color',
          max: 6,
          localized: false,
          of: {
            color: f.text({ label: 'Color', required: true, max: 7, help: 'Hex, e.g. #288F74.' }),
            tints: f.text({
              label: 'Tints above it',
              max: 120,
              help: 'Hex colors separated by commas, lightest first. Leave empty for none.',
            }),
          },
        }),
        typeLabel: f.text({ label: 'Typeface: label', max: 40 }),
        typeface: f.text({ label: 'Typeface: name', max: 20 }),
        weights: f.list({
          label: 'Weights',
          itemLabelField: 'label',
          max: 6,
          of: {
            label: f.text({ label: 'Name', required: true, max: 20 }),
            weight: f.number({
              label: 'Weight',
              localized: false,
              integer: true,
              min: 100,
              max: 900,
            }),
          },
        }),
      },
    }),
    defineSection({
      id: 'outro',
      label: 'Team',
      fields: {
        label: f.text({ label: 'Label', max: 40 }),
        team: f.list({
          label: 'Team',
          itemLabelField: 'name',
          max: 12,
          of: {
            photo: picture('Photo', '213×213'),
            name: f.text({ label: 'Name', required: true, max: 60 }),
            role: f.text({ label: 'Role', max: 80 }),
          },
        }),
        line: f.text({ label: 'Last words: small line', max: 80 }),
        farewell: f.text({ label: 'Last words: big line', max: 80 }),
      },
    }),
    caseAboutSection(),
    useShared(relatedCasesShared),
  ],
  seed: {
    en: {
      card: {
        order: 5,
        title: 'PrintBuy',
        description: 'Management platform for vehicle wrap studios',
        tags: ['SaaS', 'Web', 'UI/UX Design'],
        cover: {
          asset: 'case-printbuy-cover.webp',
          alt: 'The PrintBuy dashboard on a tilted monitor over a purple 3D shape',
        },
        coverMobile: {
          asset: 'case-printbuy-cover-mobile.webp',
          alt: 'The PrintBuy menu and dashboard on a phone over a purple 3D shape',
        },
        categories: ['SaaS', 'B2B', 'Web', 'CRM'],
        showOnHome: false,
        homeOrder: 5,
      },
      intro: {
        title: 'PrintBuy – Management Platform for Vehicle Wrap Studios',
        details: [
          { label: 'Industry', value: 'Print & Signage' },
          { label: 'Platform', value: 'Web App, Mobile Web' },
          { label: 'Timeline', value: '2 months' },
        ],
        quote: '',
        author: '',
        authorRole: '',
      },
      hero: {
        image: {
          asset: 'case-printbuy-hero.webp',
          alt: 'The PrintBuy dashboard with invoices, amounts due, a sales chart and recent estimates on a monitor in a car wrap studio',
        },
      },
      overview: {
        text: 'PrintBuy is a platform built for vehicle wrap studios — businesses that design, print, and apply vinyl graphics to cars. It helps teams manage orders, collaborate with clients on visual mockups, track deadlines, and store project data in one place.\nWe kept the design simple, so nothing gets in the way of the work. Clear screens, easy navigation, and no unnecessary clutter — that’s how teams move faster and make fewer mistakes. We believe that when the interface stays out of the way, the experience feels truly seamless and intuitive.',
        facts: [
          { label: 'Product', values: 'Platform' },
          { label: 'Services', values: 'UX/UI' },
          { label: 'Industry', values: 'Print & Signage Industry, B2B' },
          { label: 'Timelines', values: '2 months' },
        ],
      },
      focus: {
        title: 'Product Design Focus',
        text: 'From day one, our priority was utility. We aimed to help teams manage orders, timelines, and clients without distractions. We kept the design clean and clear, so nothing slows users down. Every component was made to serve the experience, not define it.',
      },
      schedules: {
        image: {
          asset: 'case-printbuy-schedules.webp',
          alt: 'The PrintBuy schedules calendar on a laptop and a phone in front of a car wrapped in green and purple stripes',
        },
        title: 'Understanding Our Users',
        text: 'PrintBuy is created for the people doing the work — not the drivers. It helps Shop Managers, Production Coordinators, and client-facing teams stay organized and in control.\nThey often deal with designs, deadlines, and repeat orders all at once. We built PrintBuy to simplify this: track jobs, communicate with clients, and always know what’s next — all in one place.',
        note: 'Reliable tools for real workflows — from planning to production, every detail is designed with wrap teams in mind.',
      },
      curve: {
        title:
          'Every curve counts, every deadline matters —\nthere’s no room for chaos in this industry.',
        text: 'We crafted a tool that’s just as precise and\nreliable as the teams who use it.',
        background: {
          asset: 'case-printbuy-curve.webp',
          alt: 'A flowing purple 3D shape on a dark background',
        },
        phone: {
          asset: 'case-printbuy-curve-phone.webp',
          alt: 'The PrintBuy menu open over the dashboard on a phone',
        },
        note: 'By bringing design approvals, customer data, and production schedules into one place, the platform supports auto graphics teams where they work best — in motion, not in menus.',
      },
      sync: {
        title: 'Built to keep wrap\nstudios in sync',
        steps: [
          {
            label: 'Discovery',
            text: 'We dived into daily studio operations to design a platform that’s easy to use and effective at solving real tasks.',
          },
          {
            label: 'Persona & Comp. Analysis',
            text: 'By mapping roles and tools, we identified what users truly need and focused on the features that matter most.',
          },
          {
            label: 'Visual Design System',
            text: 'We used a clean layout, readable text, and neutral palette to keep the focus sharp and reflect the precision of the wrap industry.',
          },
          {
            label: 'Information Architecture',
            text: 'We rebuilt the structure around actual workflows — making approvals, file management, and schedules effortless.',
          },
          {
            label: 'Pre-development preparation',
            text: 'We turned each layout into clear, ready-to-use files for developers — easy to scale, adapt, and integrate.',
          },
          {
            label: 'Development Support & Testing',
            text: 'We supported the team through development and testing to ensure everything runs smoothly and loads quickly.',
          },
        ],
      },
      structure: {
        title:
          'Even the most creative businesses benefit from\nstructure. That’s why we built a system that\nhandles the details.',
        cards: [
          {
            icon: 'folder',
            title: 'Everything in one place',
            text: 'All invoices, tax records, and project documents are stored in a single system — no more digging through folders or switching between tools.',
          },
          {
            icon: 'cursor',
            title: 'Automate your routine',
            text: 'Invoice processing and tax calculations are fully automated, reducing human errors and saving time — so teams can focus on the work that matters.',
          },
          {
            icon: 'chat',
            title: 'Shared synchronization',
            text: 'Client chats, visual approvals, and timelines all live in one place — keeping managers and designers aligned without extra steps.',
          },
        ],
      },
      workshop: {
        image: {
          asset: 'case-printbuy-workshop.webp',
          alt: 'The PrintBuy schedules calendar on a laptop in a car wrap studio, two installers at work behind it',
        },
      },
      control: {
        label: 'Control, speed, and precision in one place',
        text: 'PrintBuy is the all-in-one management platform built for car wrap studios — from the first client request to final installation. Managing wrap jobs often means juggling tools, chasing updates, and searching through folders. PrintBuy replaces that with one simple, connected workspace.',
      },
      screens: {
        items: [
          {
            image: {
              asset: 'case-printbuy-invoice-new.webp',
              alt: 'The PrintBuy new invoice screen with the invoice form, file attachments and before and after images of the performed work',
            },
            label: 'Clear and Complete Invoicing',
            text: 'PrintBuy’s invoicing screen brings everything into one clear flow — client details, services, and payment info. Files, mockups, and job photos can be attached directly, while a dedicated section for project notes and before/after images helps showcase the work done.',
          },
          {
            image: {
              asset: 'case-printbuy-client-details.webp',
              alt: 'The PrintBuy client details screen: a list of clients with amounts due and the invoices of the selected client',
            },
            label: 'Full Client Overview in One Place',
            text: 'All client data — from invoices and estimates to payments and time tracking — is gathered in one place. Users can quickly find the right client, check balances, and see invoice statuses at a glance. The clear layout and color-coded labels help studios stay organized and respond faster.',
          },
          {
            image: {
              asset: 'case-printbuy-invoices.webp',
              alt: 'The PrintBuy invoices screen with overdue, outstanding and draft totals and a table of invoices with color-coded statuses',
            },
            label: 'Full Control Over Billing',
            text: 'This screen gives studios a complete view of all invoices — overdue, outstanding, and drafts — with key totals displayed upfront. Users can sort by date, client, or amount, track statuses by color-coded labels, and quickly identify what needs attention. It keeps billing clear, organized, and easy to manage.',
          },
        ],
      },
      mobile: {
        label: 'Mobile version',
        image: {
          asset: 'case-printbuy-mobile.webp',
          alt: 'The PrintBuy schedules calendar and dashboard on two tilted phones over purple and green 3D shapes',
        },
        note: 'PrintBuy works wherever wrap teams do — in the studio, on-site, or on the go. The mobile interface keeps essential tools at their fingertips, making it easy to review designs, check schedules, and manage approvals with just a few taps — even on the busiest days.',
      },
      phones: {
        items: [
          {
            image: {
              asset: 'case-printbuy-business.webp',
              alt: 'The PrintBuy menu with the dashboard and the invoices list on two phones',
            },
            label: 'Business overview & control',
            text: 'Track key financial metrics, manage invoices, and review client activity in one place. Designed for clarity and control, so you can make fast, informed decisions without friction.',
          },
          {
            image: {
              asset: 'case-printbuy-clients.webp',
              alt: 'The PrintBuy client details chart and the edit invoice screen with a photo of a car on two phones over a purple 3D shape',
            },
            label: 'Understand your clients',
            text: 'Dive deep into client data and financial history to make informed decisions.\nView dynamic charts, filter by time periods, track income vs expenses, and edit invoice content — including visual documentation — all in one streamlined interface. Perfect for transparent and efficient communication with clients.',
          },
          {
            image: {
              asset: 'case-printbuy-plan.webp',
              alt: 'The PrintBuy schedules as a list and as a month calendar on two phones over a green 3D shape',
            },
            label: 'Plan with precision',
            text: 'Whether you prefer a list view or a full calendar grid, you can manage availability, plan installations or consultations, and ensure everyone is aligned — minimizing missed appointments and maximizing productivity.',
          },
        ],
      },
      studio: {
        image: {
          asset: 'case-printbuy-studio.webp',
          alt: 'The PrintBuy schedules calendar on a phone in front of two wrap installers at work',
        },
        note: 'Designed for the demands of modern wrap teams — efficient, reliable, future-ready.',
        title: 'Built to keep\nwrap studios\nin sync',
      },
      brand: {
        iconsLabel: 'icons 4 use',
        icons: {
          asset: 'case-printbuy-icons.webp',
          alt: 'The PrintBuy line icon set: settings, documents, calendar, clients, upload, search, invoices and more',
        },
        paletteLabel: 'color palette',
        swatches: [
          { color: '#0C0C0C', tints: '#DEDEDE, #CCCCCC, #9C9C9C, #6B6B6B, #3C3C3C' },
          { color: '#288F74', tints: '#E2EFEB, #D1E6E1, #A7D0C6, #7DBCAB, #52A58F' },
          { color: '#F6F7FA', tints: '' },
          { color: '#FFFFFF', tints: '' },
        ],
        typeLabel: 'typeface',
        typeface: 'Inter',
        weights: [
          { label: 'Regular', weight: 400 },
          { label: 'Medium', weight: 500 },
          { label: 'SemiBold', weight: 600 },
          { label: 'Bold', weight: 700 },
        ],
      },
      outro: {
        label: 'team',
        team: [
          {
            photo: { asset: 'case-printbuy-team-vladyslav.webp', alt: 'Vladyslav Kyrieiev' },
            name: 'Vladyslav Kyrieiev',
            role: 'Co-Founder & CEO',
          },
          {
            photo: { asset: 'case-printbuy-team-nick.webp', alt: 'Nick Zhurenko' },
            name: 'Nick Zhurenko',
            role: 'Co-Founder & Head of Design',
          },
          {
            photo: { asset: 'case-printbuy-team-oleksii.webp', alt: 'Oleksii Opolinskyi' },
            name: 'Oleksii Opolinskyi',
            role: 'Lead UX/UI Designer',
          },
          {
            photo: { asset: 'case-printbuy-team-alina.webp', alt: 'Alina Tkachenko' },
            name: 'Alina Tkachenko',
            role: 'UX/UI Designer',
          },
          {
            photo: { asset: 'case-printbuy-team-maks.webp', alt: 'Maks Blyznyuk' },
            name: 'Maks Blyznyuk',
            role: 'Head of Web & Case Study Designer',
          },
          {
            photo: { asset: 'case-printbuy-team-nataliia.webp', alt: 'Nataliia Yasnohorska' },
            name: 'Nataliia Yasnohorska',
            role: 'UX/UI & Case Study Designer',
          },
          {
            photo: { asset: 'case-printbuy-team-eleonora.webp', alt: 'Eleonora Shymova' },
            name: 'Eleonora Shymova',
            role: 'Case Study Designer',
          },
        ],
        line: 'Enjoy colors, embrace UX, and stay tuned.',
        farewell: 'See ya in the next case studies',
      },
      'about-project': {
        title: 'About the PrintBuy project',
        text: 'PrintBuy is a SaaS management platform for vehicle wrap studios, the businesses that design, print and apply vinyl graphics to cars. It brings orders, schedules, clients, estimates, invoices and payments into one web app with a mobile version for teams in the studio and on-site.\nK&Z Design did the UX/UI design in two months: discovery of daily studio operations, personas and competitor analysis, information architecture, a visual design system with its icon set, files ready for development and support during development and testing.\nStudios plan installations in a calendar or a list, send invoices with before and after photos of the work, follow every client’s balance and see the state of their billing at a glance.',
        links: [
          { label: 'SaaS and web app design services', href: '/services/saas', external: false },
          { label: 'Website design services', href: '/services/web', external: false },
          { label: 'All case studies', href: '/cases', external: false },
        ],
      },
    },
  },
});
