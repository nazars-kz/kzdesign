/**
 * CASE STUDY: Onground (/cases/onground). A unique page: its layout is built for this case
 * (src/site/cases/onground/). Design: design/cases/onground (Case.png and assets).
 *
 * Every text and picture is a field. Screens and photo mockups are images; the rest (hero bar,
 * phases, architecture map, type and color sheet, chart cards, team) is code.
 * Convention in titles: a new line starts a new row, words in *asterisks* are highlighted.
 */
import { definePage, defineSection } from '@/core/content/define';
import { f } from '@/core/content/fields';
import { useShared } from '@/core/content/shared-section';

import { relatedCasesShared } from '../shared/related-cases';
import { caseCardSection } from './card';

const HIGHLIGHT_HELP = 'A new line starts a new row; words in *asterisks* are highlighted.';

/** The picture of a screen / mockup: a non-localized image with an alt text. */
const picture = (label: string, recommendedSize: string, help?: string) =>
  f.image({ label, localized: false, recommendedSize, ...(help ? { help } : {}) });

/** The "// About" style intro of a chapter: label and title. */
function chapterFields(titleRows = 1) {
  return {
    eyebrow: f.text({ label: 'Chapter label', required: true, max: 40 }),
    title: f.textarea({
      label: 'Chapter title',
      required: true,
      max: 120,
      rows: titleRows,
      help: HIGHLIGHT_HELP,
    }),
  };
}

/** A row of screens (tablet pictures) that runs wider than the page. */
const screens = (label: string, help: string) =>
  f.list({
    label,
    itemLabelField: 'name',
    max: 6,
    help,
    of: {
      name: f.text({ label: 'Name', required: true, max: 60 }),
      image: picture('Screen', '1897×1200'),
    },
  });

const PHASE_TONES = [
  { value: 'grey', label: 'Grey' },
  { value: 'yellow', label: 'Yellow' },
] as const;

const COLOR_TONES = [
  { value: 'dark', label: 'Dark text (light color)' },
  { value: 'light', label: 'Light text (dark color)' },
] as const;

export const ongroundCase = definePage({
  id: 'case-onground',
  path: '/cases/onground',
  label: 'Onground',
  parent: 'cases',
  adminGroup: 'Case studies',
  uiTexts: ['cases'],
  seo: {
    title: 'Onground: Private Jet Cleaning Platform UX/UI Case Study | K&Z Design',
    description:
      'UX/UI design case study of Onground, a platform for private jet cleaning that connects clients, vendors and administrators: booking, dashboards, inbox and admin workspace.',
  },
  structuredData: ({ url, title, locale }) => [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: title,
      url,
      inLanguage: locale,
      about: 'UX/UI design of a private jet cleaning platform (client, vendor and admin web app)',
      creator: { '@type': 'Organization', name: 'K&Z Design' },
    },
  ],
  sections: [
    caseCardSection(),
    defineSection({
      id: 'hero',
      label: 'Hero',
      description: 'The dark first screen: a thin bar with the studio, the service and the year.',
      fields: {
        heading: f.text({
          label: 'Page heading (H1)',
          required: true,
          max: 120,
          help: 'The only H1 of the page. It is read by search engines and screen readers, not shown.',
        }),
        studio: f.text({ label: 'Bar: left', max: 30 }),
        service: f.text({ label: 'Bar: center', max: 30 }),
        year: f.text({ label: 'Bar: right', max: 10 }),
        image: picture('Hero picture', '3840×2556'),
      },
    }),
    defineSection({
      id: 'overview',
      label: 'About',
      description: 'Project overview: title, short intro and the lead text.',
      fields: {
        ...chapterFields(),
        intro: f.textarea({ label: 'Intro (left)', max: 400, rows: 4 }),
        lead: f.textarea({ label: 'Lead (right)', required: true, max: 400, rows: 4 }),
        note: f.textarea({ label: 'Note (right, small)', max: 400, rows: 3 }),
      },
    }),
    defineSection({
      id: 'process',
      label: 'Process',
      description: 'Design phases as a zig-zag of chips.',
      fields: {
        ...chapterFields(),
        text: f.textarea({ label: 'Text', max: 500, rows: 4 }),
        phases: f.list({
          label: 'Phases',
          itemLabelField: 'label',
          max: 8,
          of: {
            label: f.text({ label: 'Name', required: true, max: 60 }),
            tone: f.select({ label: 'Color', options: PHASE_TONES }),
            lowered: f.boolean({
              label: 'Lower row',
              localized: false,
              help: 'The chip sits lower: the zig-zag of the design.',
            }),
          },
        }),
      },
    }),
    defineSection({
      id: 'visuals',
      label: 'Sign-up and plane',
      description: 'Two pictures side by side.',
      fields: {
        signup: picture('Sign-up laptop', '1888×1888'),
        plane: picture('Plane', '2840×1175', 'A plane on a transparent background.'),
      },
    }),
    defineSection({
      id: 'video',
      label: 'Video link',
      description: 'The yellow block that links to the motion video.',
      fields: {
        link: f.link({ label: 'Link', help: 'The label is the big underlined word.' }),
        badge: f.text({ label: 'Badge (bottom right)', max: 30 }),
      },
    }),
    defineSection({
      id: 'goals',
      label: 'Task and goals',
      description: 'The four goals and two pictures.',
      fields: {
        ...chapterFields(2),
        goals: f.list({
          label: 'Goals',
          itemLabelField: 'title',
          max: 6,
          of: {
            title: f.text({ label: 'Title', required: true, max: 60 }),
            text: f.textarea({ label: 'Text', max: 300, rows: 4 }),
          },
        }),
        sky: picture('Plane in the clouds', '1888×1888'),
        badge: picture('ID card', '1888×1888'),
      },
    }),
    defineSection({
      id: 'architecture',
      label: 'Info architecture',
      description: 'Three rows: the entry point and the sections of each side.',
      fields: {
        ...chapterFields(),
        rows: f.list({
          label: 'Rows',
          itemLabelField: 'entry',
          max: 5,
          of: {
            entry: f.text({ label: 'Side', required: true, max: 30 }),
            steps: f.textarea({
              label: 'Sections',
              max: 300,
              rows: 5,
              help: 'One section per line.',
            }),
          },
        }),
      },
    }),
    defineSection({
      id: 'typography',
      label: 'Typography and colors',
      description: 'The type specimen and the color circles.',
      fields: {
        ...chapterFields(),
        typefaceLabel: f.text({ label: 'Specimen: label', max: 30 }),
        alphabet: f.textarea({ label: 'Specimen: characters', max: 200, rows: 3 }),
        fontName: f.text({ label: 'Font name', required: true, max: 40 }),
        fontText: f.textarea({ label: 'Font description', max: 400, rows: 4 }),
        weights: f.textarea({
          label: 'Weights',
          max: 80,
          rows: 3,
          help: 'One per line (3 lines).',
        }),
        glyph: f.text({ label: 'Big letter', max: 2 }),
        credit: f.textarea({ label: 'Credit', max: 80, rows: 2 }),
        colors: f.list({
          label: 'Colors',
          itemLabelField: 'hex',
          max: 6,
          of: {
            hex: f.color({ label: 'Color', localized: false }),
            tone: f.select({ label: 'Text on it', options: COLOR_TONES }),
          },
        }),
      },
    }),
    defineSection({
      id: 'dashboard',
      label: 'Dashboard',
      description: 'The vendor and client dashboards.',
      fields: {
        ...chapterFields(),
        vendorChip: f.text({ label: 'Vendor: label', max: 20 }),
        vendorLeft: f.textarea({ label: 'Vendor: text (left)', max: 500, rows: 5 }),
        vendorRight: f.textarea({ label: 'Vendor: text (right)', max: 500, rows: 5 }),
        phone: picture('Phone dashboard', '1432×2712', 'A phone on a transparent background.'),
        aisle: picture('Cabin photo', '1888×1768'),
        chartTitle: f.text({ label: 'Chart: title', max: 40 }),
        chartAxis: f.text({ label: 'Chart: axis label', max: 20 }),
        chartBars: f.list({
          label: 'Chart: months',
          itemLabelField: 'month',
          max: 8,
          of: {
            month: f.text({ label: 'Month', required: true, max: 10 }),
            earnings: f.number({ label: 'Earnings (k)', localized: false, min: 0, step: 0.1 }),
            pending: f.number({ label: 'Pending (k)', localized: false, min: 0, step: 0.1 }),
          },
        }),
        totalTitle: f.text({ label: 'Total card: title', max: 30 }),
        totalNote: f.textarea({ label: 'Total card: note', max: 120, rows: 2 }),
        earningsLabel: f.text({ label: 'Total card: earnings', max: 30 }),
        earningsValue: f.text({ label: 'Total card: earnings amount', max: 20 }),
        earningsDelta: f.text({ label: 'Total card: earnings change', max: 10 }),
        payoutsLabel: f.text({ label: 'Total card: pending', max: 30 }),
        payoutsValue: f.text({ label: 'Total card: pending amount', max: 20 }),
        clientChip: f.text({ label: 'Client: label', max: 20 }),
        clientLeft: f.textarea({ label: 'Client: text (left)', max: 500, rows: 5 }),
        clientRight: f.textarea({ label: 'Client: text (right)', max: 500, rows: 5 }),
        clouds: picture('Plane in the clouds', '1888×1768'),
        laptop: picture('Dashboard on a laptop', '2766×1600'),
      },
    }),
    defineSection({
      id: 'booking',
      label: 'Booking',
      description: 'The booking flow with two rows of screens.',
      fields: {
        ...chapterFields(),
        textLeft: f.textarea({ label: 'Text (left)', max: 500, rows: 5 }),
        textRightA: f.textarea({ label: 'Text (right, first)', max: 400, rows: 3 }),
        textRightB: f.textarea({ label: 'Text (right, second)', max: 500, rows: 5 }),
        chips: f.list({ label: 'Steps', of: f.text({ max: 40 }), max: 8 }),
        rowA: screens(
          'Screens: first row',
          'The middle screen is centered; the others run off the page.',
        ),
        rowB: screens(
          'Screens: second row',
          'The middle screen is centered; the others run off the page.',
        ),
      },
    }),
    defineSection({
      id: 'details',
      label: 'Booking details',
      description: 'The completed service screen and a photo.',
      fields: {
        ...chapterFields(),
        textLeft: f.textarea({ label: 'Text (left)', max: 500, rows: 5 }),
        textRight: f.textarea({ label: 'Text (right)', max: 600, rows: 6 }),
        laptop: picture('Laptop with the screen', '1888×1768'),
        window: picture('Plane window', '1888×1768'),
      },
    }),
    defineSection({
      id: 'inbox',
      label: 'Inbox',
      description: 'Direct messages.',
      fields: {
        ...chapterFields(),
        textA: f.textarea({ label: 'Text (first)', max: 400, rows: 4 }),
        textB: f.textarea({ label: 'Text (second)', max: 400, rows: 4 }),
        image: picture('Inbox on a laptop', '3840×2242'),
      },
    }),
    defineSection({
      id: 'admin',
      label: 'Admin',
      description: 'The admin workspace with two rows of screens.',
      fields: {
        ...chapterFields(),
        textLeft: f.textarea({ label: 'Text (left)', max: 700, rows: 7 }),
        textRightA: f.textarea({ label: 'Text (right, first)', max: 600, rows: 6 }),
        textRightB: f.textarea({ label: 'Text (right, second)', max: 300, rows: 3 }),
        chips: f.list({ label: 'Screens', of: f.text({ max: 40 }), max: 8 }),
        rowA: screens(
          'Screens: first row',
          'The middle screen is centered; the others run off the page.',
        ),
        rowB: screens(
          'Screens: second row',
          'The middle screen is centered; the others run off the page.',
        ),
      },
    }),
    defineSection({
      id: 'outro',
      label: 'Outro and team',
      description: 'The closing line and the team of the case.',
      fields: {
        title: f.textarea({
          label: 'Title',
          required: true,
          max: 120,
          rows: 3,
          help: HIGHLIGHT_HELP,
        }),
        subtitle: f.text({ label: 'Subtitle', max: 80 }),
        teamTitle: f.text({
          label: 'Team: heading (hidden)',
          max: 60,
          help: 'Read by screen readers and search engines, not shown.',
        }),
        team: f.list({
          label: 'Team',
          itemLabelField: 'name',
          max: 9,
          of: {
            photo: picture('Photo', '420×420'),
            role: f.text({ label: 'Role', max: 60 }),
            name: f.text({ label: 'Name', required: true, max: 60 }),
          },
        }),
      },
    }),
    useShared(relatedCasesShared),
  ],
  seed: {
    en: {
      card: {
        order: 2,
        title: 'Onground',
        description: 'Private jet cleaning platform',
        tags: ['SaaS', 'Web', 'UI/UX design'],
        cover: {
          asset: 'case-onground-card-cover.webp',
          alt: 'Onground dashboard on a laptop in the dark',
        },
        coverMobile: {
          asset: 'case-onground-card-cover-mobile.webp',
          alt: 'Onground sign-up screen on a laptop',
        },
        categories: ['SaaS', 'Web'],
        showOnHome: true,
        homeOrder: 2,
        industries: ['logistics'],
        industryThumb: {
          asset: 'case-onground-card-thumb.webp',
          alt: 'The Onground ID card',
        },
        industryOrder: 2,
      },
      hero: {
        heading: 'Onground: UX/UI case study of a private jet cleaning platform',
        studio: 'KZ DESIGN',
        service: 'UI/UX Design',
        year: '2025',
        image: {
          asset: 'case-onground-hero.webp',
          alt: 'The Onground dashboard on a laptop standing on a dark stone in a spotlight',
        },
      },
      overview: {
        eyebrow: 'About',
        title: 'Project Overview',
        intro:
          'The project is a specialized platform for private jet cleaning that connects clients, vendors, and administrators. Our goal was to create a user-friendly platform, without unnecessary complexity.',
        lead: 'Clients book services in just a few clicks and track their orders in real time. Vendors manage tasks and locations. Administrators oversee processes, analytics, and resources.',
        note: 'The platform automates scheduling, approvals, and payments, ensuring seamless operations with built-in messaging, performance tracking, and smart service recommendations.',
      },
      process: {
        eyebrow: 'Process',
        title: 'Design Phases',
        text: 'We created a platform that automates scheduling, approvals, and payments, significantly reducing manual work. Built-in messaging, performance tracking, and smart suggestions simplify communication and support faster, more informed decision-making.',
        phases: [
          { label: 'Discovery', tone: 'grey', lowered: false },
          { label: 'Persona & User Journey Mapping', tone: 'yellow', lowered: true },
          { label: 'Information Architecture', tone: 'grey', lowered: true },
          { label: 'UX/UI Design', tone: 'grey', lowered: false },
          { label: 'Pre-development preparation', tone: 'yellow', lowered: true },
          { label: 'Development Support & Post-Development', tone: 'grey', lowered: false },
        ],
      },
      visuals: {
        signup: {
          asset: 'case-onground-signup.webp',
          alt: 'The Onground sign-up screen “Join Onground Systems” on a laptop',
        },
        plane: {
          asset: 'case-onground-plane.webp',
          alt: 'A white private jet in flight',
        },
      },
      video: {
        link: { label: 'Link', href: 'https://jitter.video', external: true },
        badge: 'jitter.video',
      },
      goals: {
        eyebrow: 'Task and Goals',
        title: 'From Insights\nto Action',
        goals: [
          {
            title: 'User-Friendly Interface Design',
            text: 'Create a clean, responsive interface that allows clients to effortlessly book services and track orders, vendors to manage tasks, and administrators to oversee processes and analytics.',
          },
          {
            title: 'Optimized Vendor Workflow',
            text: 'Design a seamless experience for vendor with automated job assignments, real-time performance tracking, and intuitive location management, ensuring efficiency and high service standards.',
          },
          {
            title: 'Simplified Service Management',
            text: 'Build an easy-to-use platform for clients, vendors, and administrators to quickly book services, manage tasks, and track jobs in real time.',
          },
          {
            title: 'Comprehensive Admin Reporting',
            text: 'Provide administrators with the tools to monitor operations, generate reports, and manage users easily for smooth and transparent service management.',
          },
        ],
        sky: {
          asset: 'case-onground-sky-plane.webp',
          alt: 'A passenger plane climbing out of a cloud, in black and white',
        },
        badge: {
          asset: 'case-onground-id-card.webp',
          alt: 'A black Onground ID card on a lanyard: “Streamlining Jet Care Operations”',
        },
      },
      architecture: {
        eyebrow: 'Info Architecture',
        title: 'Structured for Clarity',
        rows: [
          { entry: 'Client Side', steps: 'Dashboard\nFleet Management\nBookings\nPayments\nInbox' },
          {
            entry: 'Vendor Side',
            steps: 'Dashboard\nJob Management\nAirport Tools\nEarnings\nTraining & Resources',
          },
          { entry: 'Admin Side', steps: 'Dashboard\nClients\nVendors\nJobs\nTeam Management' },
        ],
      },
      typography: {
        eyebrow: 'UI Design',
        title: 'Typography & Colors',
        typefaceLabel: 'Typeface',
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz\n0123456789!@#$%^&*()_+',
        fontName: 'DM Sans',
        fontText:
          'DM Sans is a low-contrast geometric sans serif design, intended for use at smaller text sizes. DM Sans supports a Latin Extended glyph set, enabling typesetting for English and other Western European languages.',
        weights: 'regular\nmedium\nbold',
        glyph: 'a',
        credit: 'Designed by\nColophon Foundry',
        colors: [
          { hex: '#161616', tone: 'light' },
          { hex: '#FDD12C', tone: 'dark' },
          { hex: '#F0F0F0', tone: 'dark' },
          { hex: '#FFFFFF', tone: 'dark' },
        ],
      },
      dashboard: {
        eyebrow: 'Dashboard',
        title: 'Intuitive Dashboard Interface',
        vendorChip: 'VENDOR',
        vendorLeft:
          'The vendor dashboard helps service providers stay organized by tracking jobs, managing service locations, and coordinating tasks in real time. Clear job statuses and scheduling tools prevent conflicts, while the financial overview gives a quick snapshot of earnings and pending payouts.',
        vendorRight:
          'Built-in communication tools make it easy to connect with clients and administrators, and access to training resources assists in maintaining high service standards. Everything is designed for a smooth, efficient workflow.',
        phone: {
          asset: 'case-onground-phone.webp',
          alt: 'The Onground vendor dashboard on a phone: upcoming, new, completed and all jobs',
        },
        aisle: {
          asset: 'case-onground-aisle.webp',
          alt: 'A cleaner in a protective suit disinfecting the aisle of a private jet',
        },
        chartTitle: 'Financial Overview',
        chartAxis: 'Amount($)',
        chartBars: [
          { month: 'Jan', earnings: 2.4, pending: 0.3 },
          { month: 'Feb', earnings: 3.3, pending: 1.2 },
          { month: 'Mar', earnings: 2.8, pending: 0.3 },
          { month: 'Apr', earnings: 3, pending: 0.4 },
          { month: 'May', earnings: 2.6, pending: 0 },
          { month: 'Jun', earnings: 2.2, pending: 0.6 },
        ],
        totalTitle: 'Total',
        totalNote: 'Showing total financial data for the last 6 months',
        earningsLabel: 'Earnings',
        earningsValue: '$12.378',
        earningsDelta: '45%',
        payoutsLabel: 'Pending Payouts',
        payoutsValue: '$3.378',
        clientChip: 'CLIENT',
        clientLeft:
          'The dashboard makes booking aircraft cleaning and detailing services instant—no calls, no waiting for quotes. A simple, structured interface allows clients to schedule services in a few clicks, track progress in real time, and manage their fleet, bookings, and payments all in one place.',
        clientRight:
          'Clear status updates provide full visibility, while the built-in search helps quickly find trusted service providers. Designed for efficiency, the platform removes hassle and keeps everything arranged in one intuitive space.',
        clouds: {
          asset: 'case-onground-clouds.webp',
          alt: 'A plane seen from below in a grey cloudy sky',
        },
        laptop: {
          asset: 'case-onground-laptop-dashboard.webp',
          alt: 'The Onground client dashboard: booking a service, booking history and a map of vendors',
        },
      },
      booking: {
        eyebrow: 'Booking',
        title: 'Service Summary',
        textLeft:
          'The Book a Service flow makes scheduling aircraft cleaning simple and straightforward. Users enter key details like the tail number and airport, then select services with real-time pricing displayed upfront.',
        textRightA:
          'The step-by-step design keeps things easy, showing only the relevant information at each stage.',
        textRightB:
          'An optional notes section lets users add special instructions, while secure Stripe payments ensure a fast and hassle-free checkout. A final confirmation screen verifies all details, giving users confidence in their booking. The process is designed to be smooth, transparent, and effortless.',
        chips: ['TAIL INFO', 'SERVICES', 'NOTES', 'REDIRECTS TO STRIPE', 'BOOKED SUMMARY'],
        rowA: [
          {
            name: 'Tail info',
            image: {
              asset: 'case-onground-screen-tail-info.webp',
              alt: 'Book a Service, step Tail info: tail number, aircraft type, airport and times',
            },
          },
          {
            name: 'Services',
            image: {
              asset: 'case-onground-screen-services.webp',
              alt: 'Book a Service, step Services: cleaning levels with prices and a total of $700',
            },
          },
          {
            name: 'Notes',
            image: {
              asset: 'case-onground-screen-notes.webp',
              alt: 'Book a Service, step Notes: special instructions and the total amount',
            },
          },
        ],
        rowB: [
          {
            name: 'Services list',
            image: {
              asset: 'case-onground-screen-services-list.webp',
              alt: 'Book a Service: the list of interior and exterior cleaning services',
            },
          },
          {
            name: 'Booked summary',
            image: {
              asset: 'case-onground-screen-booked.webp',
              alt: 'Booking successful: the booked summary with services and a total of $700',
            },
          },
          {
            name: 'Tail info',
            image: {
              asset: 'case-onground-screen-tail-info-2.webp',
              alt: 'Book a Service, step Tail info with a security instructions file attached',
            },
          },
        ],
      },
      details: {
        eyebrow: 'Booking Details',
        title: 'Completed Service Details',
        textLeft:
          'The Booking Details screen gives clients a key overview of their completed service. It includes key details like the booking number, date, time, tail number, and service location. A notes section captures special requests, ensuring a personalized experience.',
        textRight:
          'Clients can easily reach vendor contact details, check completed cleaning tasks, and download invoices in one click. Future service recommendations help plan ahead, while the “Book Again” button makes reordering quick and convenient. The design keeps everything structured, making it simple to review previous services and schedule new ones.',
        laptop: {
          asset: 'case-onground-laptop-details.webp',
          alt: 'The Booking details screen of a completed service on a laptop',
        },
        window: {
          asset: 'case-onground-window.webp',
          alt: 'A plane wing over the clouds at sunset, seen through the window',
        },
      },
      inbox: {
        eyebrow: 'Inbox',
        title: 'Direct Messages',
        textA:
          'The Inbox makes it simple for users to chat with service providers, get support, and clarify booking details. All conversations are saved, so users can check past messages at any time.',
        textB:
          'The right panel displays key booking details, so there’s no need to switch screens. Search and unread message indicators help users quickly find important chats. This design keeps communication neat, organized, and hassle-free.',
        image: {
          asset: 'case-onground-inbox.webp',
          alt: 'The Onground Inbox: a list of chats, a conversation and the booking info panel',
        },
      },
      admin: {
        eyebrow: 'Admin',
        title: 'Admin Workspace',
        textLeft:
          'The Admin Workspace gathers the essential tools in one intuitive interface: client details, bookings, team coordination, and communication. Admins can instantly view client info, including contacts, company name, working hours, and service locations. An interactive map provides valuable context, while quick-edit buttons help keep the information updated.',
        textRightA:
          'The Job Details screen shows booking date, time, status, payment, along with client and vendor notes. With a Built-in chat, solving issues is possible without switching tabs. Team management is improved too: admins can view roles, change user access with a single click, and invite new members. Search and Pagination lets easily locate anyone on the list.',
        textRightB:
          'The workspace is designed to be clear, fast, and efficient, so admins can focus on running operations smoothly.',
        chips: ['CLIENT DETAILS', 'JOB DETAILS', 'TEAM MANAGEMENT'],
        rowA: [
          {
            name: 'Team management',
            image: {
              asset: 'case-onground-screen-team.webp',
              alt: 'Team Management: the list of team members with roles and statuses',
            },
          },
          {
            name: 'Client details',
            image: {
              asset: 'case-onground-screen-client.webp',
              alt: 'Client Details: contact information, working hours and a map of locations',
            },
          },
          {
            name: 'Job details',
            image: {
              asset: 'case-onground-screen-job.webp',
              alt: 'Job Details: job overview, client and vendor information',
            },
          },
        ],
        rowB: [
          {
            name: 'Client details',
            image: {
              asset: 'case-onground-screen-client-2.webp',
              alt: 'The Clients list with the client details dialog',
            },
          },
          {
            name: 'Job details',
            image: {
              asset: 'case-onground-screen-job-2.webp',
              alt: 'Job Details with payment information and the built-in chat',
            },
          },
          {
            name: 'Team management',
            image: {
              asset: 'case-onground-screen-team-2.webp',
              alt: 'Team Management table with names, emails and roles',
            },
          },
        ],
      },
      outro: {
        title: 'Eat veggies,\nembrace UX, and\nstay tuned.',
        subtitle: 'See ya in the next case study!',
        teamTitle: 'The team behind the Onground case study',
        team: [
          {
            photo: { asset: 'case-onground-team-vlad.webp', alt: 'Vladyslav Kyrieiev' },
            role: 'CO-Founder & CEO',
            name: 'Vladyslav Kyrieiev',
          },
          {
            photo: { asset: 'case-onground-team-nick.webp', alt: 'Nick Zhurenko' },
            role: 'CO-Founder & Head of Design',
            name: 'Nick Zhurenko',
          },
          {
            photo: { asset: 'case-onground-team-dasha.webp', alt: 'Dasha Popadynets' },
            role: 'Lead UX/UI Design',
            name: 'Dasha Popadynets',
          },
          {
            photo: { asset: 'case-onground-team-mariia.webp', alt: 'Mariia Nevedrova' },
            role: 'UX/UI Designer',
            name: 'Mariia Nevedrova',
          },
          {
            photo: { asset: 'case-onground-team-eleonora.webp', alt: 'Eleonora Shymova' },
            role: 'Case Study Designer',
            name: 'Eleonora Shymova',
          },
          {
            photo: { asset: 'case-onground-team-maks.webp', alt: 'Maks Blyznyuk' },
            role: 'Case Study Designer',
            name: 'Maks Blyznyuk',
          },
        ],
      },
    },
  },
});
