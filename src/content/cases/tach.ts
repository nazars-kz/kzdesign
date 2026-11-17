/**
 * CASE STUDY: Tach (/cases/tach). A unique page: its layout is built for this case
 * (src/site/cases/tach/). Design: design/cases/tach (Case.png and assets).
 *
 * Every text and picture is a field. Product screens and photo mockups are images; the rest of the
 * page (hero cards, dialog, facts, timeline, brand sheet, vendor card, team) is code.
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

/** The "01 Brand Identity" style intro of a chapter: label, title and a short text. */
function chapterFields() {
  return {
    eyebrow: f.text({ label: 'Chapter label', required: true, max: 40 }),
    title: f.text({ label: 'Chapter title', required: true, max: 120 }),
    text: f.textarea({ label: 'Chapter text', max: 400, rows: 3 }),
  };
}

const COLOR_TONES = [
  { value: 'dark', label: 'Dark text (light color)' },
  { value: 'light', label: 'Light text (dark color)' },
] as const;

const BAR_TONES = [
  { value: 'dark', label: 'Dark' },
  { value: 'white', label: 'White' },
  { value: 'orange', label: 'Orange' },
  { value: 'green', label: 'Green' },
  { value: 'fade', label: 'Dark, fading out' },
] as const;

export const tachCase = definePage({
  id: 'case-tach',
  path: '/cases/tach',
  label: 'Tach',
  parent: 'cases',
  adminGroup: 'Case studies',
  uiTexts: ['cases'],
  seo: {
    title: 'Tach: Logistics Platform UX/UI Case Study | K&Z Design',
    description:
      'UX/UI design case study of Tach, a digital platform that simplifies financial and operational tasks for owner-operators, carriers and vendors in logistics.',
  },
  structuredData: ({ url, title, locale }) => [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: title,
      url,
      inLanguage: locale,
      about: 'UX/UI design of a logistics fintech platform (mobile app and web portal)',
      creator: { '@type': 'Organization', name: 'K&Z Design' },
    },
  ],
  sections: [
    caseCardSection(),
    defineSection({
      id: 'hero',
      label: 'Hero',
      description: 'The first screen: the photo, the lead text and two interface cards.',
      fields: {
        heading: f.text({
          label: 'Page heading (H1)',
          required: true,
          max: 120,
          help: 'The only H1 of the page. It is read by search engines and screen readers; the logo is shown instead of it.',
        }),
        lead: f.textarea({ label: 'Lead text', required: true, max: 300, rows: 4 }),
        photo: picture(
          'Background photo',
          '6400×2980',
          'A wide panorama: on large screens more of it is shown to the sides. The person stands at 62% of its width.',
        ),
        person: picture(
          'Person cut-out',
          '3840×2980',
          'The middle part of the photo (its 20%–80% of the width, 3840×2980) with a transparent background around the person: the orange line passes behind it.',
        ),
        screenTitle: f.text({ label: 'Card 1: title', max: 30 }),
        goalTitle: f.text({ label: 'Card 2: title', max: 30 }),
        goalAmount: f.text({ label: 'Card 2: amount', max: 30 }),
        goalPercent: f.number({
          label: 'Card 2: progress, %',
          localized: false,
          integer: true,
          min: 0,
          max: 100,
        }),
        goalNote: f.text({ label: 'Card 2: note', max: 60 }),
      },
    }),
    defineSection({
      id: 'scene',
      label: 'Tablet scene',
      description: 'The tablet on rocks with the maintenance dialog over its corner.',
      fields: {
        image: picture('Scene', '3768×2386'),
        dialogTitle: f.text({ label: 'Dialog: title', max: 40 }),
        typeLabel: f.text({ label: 'Dialog: first field label', max: 30 }),
        typeValue: f.text({ label: 'Dialog: first field value', max: 40 }),
        remindLabel: f.text({ label: 'Dialog: options label', max: 30 }),
        remindOptions: f.list({
          label: 'Dialog: options',
          of: f.text({ max: 30 }),
          max: 4,
          help: 'The first option is selected.',
        }),
        dateLabel: f.text({ label: 'Dialog: date label', max: 30 }),
        dateValue: f.text({ label: 'Dialog: date value', max: 30 }),
        cancel: f.text({ label: 'Dialog: cancel button', max: 20 }),
        confirm: f.text({ label: 'Dialog: confirm button', max: 20 }),
      },
    }),
    defineSection({
      id: 'overview',
      label: 'Overview',
      description: 'The logo, the description, the site link and the project facts.',
      fields: {
        lead: f.textarea({ label: 'Lead', required: true, max: 300, rows: 3 }),
        text: f.textarea({ label: 'Text', max: 600, rows: 4 }),
        website: f.link({ label: 'Website link' }),
        facts: f.list({
          label: 'Project facts',
          itemLabelField: 'label',
          max: 8,
          of: {
            label: f.text({ label: 'Name', required: true, max: 40 }),
            value: f.text({ label: 'Value', required: true, max: 120 }),
          },
        }),
      },
    }),
    defineSection({
      id: 'workflow',
      label: 'Workflow plan',
      description: 'The dark timeline: months and bars (start and length in months).',
      fields: {
        title: f.text({ label: 'Title', required: true, max: 60 }),
        duration: f.text({ label: 'Total duration', max: 30 }),
        months: f.list({
          label: 'Months',
          of: f.text({ max: 20 }),
          max: 12,
          help: 'One column per month, left to right.',
        }),
        bars: f.list({
          label: 'Bars',
          itemLabelField: 'label',
          max: 12,
          of: {
            label: f.text({ label: 'Name', required: true, max: 60 }),
            row: f.number({
              label: 'Row',
              localized: false,
              integer: true,
              min: 1,
              help: '1 is the top row.',
            }),
            start: f.number({
              label: 'Start (months)',
              localized: false,
              min: 0,
              step: 0.05,
              help: '0 is the start of the first month.',
            }),
            length: f.number({
              label: 'Length (months)',
              localized: false,
              min: 0.1,
              step: 0.05,
            }),
            tone: f.select({ label: 'Color', options: BAR_TONES }),
          },
        }),
      },
    }),
    defineSection({
      id: 'showcase',
      label: 'Truck scene',
      description: 'The truck at dusk with three interface cards floating over it.',
      fields: {
        image: picture('Truck photo', '3768×1838'),
        balanceLabel: f.text({ label: 'Balance card: label', max: 40 }),
        balanceValue: f.text({ label: 'Balance card: amount', max: 30 }),
        balanceNote: f.text({ label: 'Balance card: note', max: 40 }),
        budgetTitle: f.text({ label: 'Budget card: title', max: 40 }),
        revenueLabel: f.text({ label: 'Budget card: revenue label', max: 40 }),
        revenueValue: f.text({ label: 'Budget card: revenue', max: 30 }),
        expensesLabel: f.text({ label: 'Budget card: expenses label', max: 40 }),
        expensesValue: f.text({ label: 'Budget card: expenses', max: 30 }),
        callouts: f.list({
          label: 'Budget card: chart labels',
          itemLabelField: 'label',
          max: 4,
          of: {
            label: f.text({ label: 'Label', max: 40 }),
            value: f.text({ label: 'Value', max: 40 }),
          },
        }),
        amountLabel: f.text({ label: 'Amount card: label', max: 40 }),
        amountValue: f.text({ label: 'Amount card: amount', max: 30 }),
        amountNote: f.text({ label: 'Amount card: note', max: 60 }),
      },
    }),
    defineSection({
      id: 'brand',
      label: '01 Brand identity',
      description: 'Logo, colors, fonts and the branded mockups.',
      fields: {
        ...chapterFields(),
        gridWide: f.text({ label: 'Logo grid: wide measure', max: 10 }),
        gridTall: f.text({ label: 'Logo grid: tall measure', max: 10 }),
        colorsTitle: f.textarea({ label: 'Colors: title', max: 80, rows: 2 }),
        colorsText: f.textarea({ label: 'Colors: text', max: 300, rows: 4 }),
        hexLabel: f.text({ label: 'Colors: HEX label', max: 10 }),
        rgbLabel: f.text({ label: 'Colors: RGB label', max: 10 }),
        colors: f.list({
          label: 'Colors',
          itemLabelField: 'name',
          max: 8,
          of: {
            name: f.text({ label: 'Name', required: true, max: 30 }),
            hex: f.color({ label: 'Color', localized: false }),
            rgb: f.text({ label: 'RGB values', max: 30, help: 'For example: 106, 158, 104' }),
            tone: f.select({ label: 'Text on it', options: COLOR_TONES }),
          },
        }),
        fontLabel: f.text({ label: 'Fonts: label', max: 30 }),
        fonts: f.list({
          label: 'Fonts',
          itemLabelField: 'name',
          max: 2,
          help: 'Two specimens: the first one is shown over the photo.',
          of: {
            name: f.textarea({ label: 'Name', required: true, max: 40, rows: 2 }),
            alphabet: f.text({ label: 'Alphabet', max: 120 }),
          },
        }),
        fontPhoto: picture('Fonts: photo behind the first specimen', '1866×1838'),
        cardsImage: picture('Debit cards', '1394×1182', 'Transparent PNG/WebP on the green tile.'),
        capImage: picture('Cap mockup', '1670×2506', 'A person on a transparent background.'),
        carrierTitle: f.text({ label: 'Cap: card title', max: 30 }),
        carrierText: f.textarea({ label: 'Cap: card text', max: 160, rows: 3 }),
        billboard: picture('Billboard', '3768×2638'),
      },
    }),
    defineSection({
      id: 'platform',
      label: '02 Platform',
      description: 'The laptop and tablet screens of the platform and its two key features.',
      fields: {
        ...chapterFields(),
        laptop: picture('Laptop on the truck', '3768×2386'),
        overview: picture('Overview screen', '1866×1838'),
        controlTitle: f.textarea({
          label: 'Text card: title',
          max: 100,
          rows: 2,
          help: HIGHLIGHT_HELP,
        }),
        controlText: f.textarea({ label: 'Text card: text', max: 600, rows: 6 }),
        home: picture('Home screen', '2793×1779'),
        bankingTitle: f.textarea({
          label: 'Banking tile: title',
          max: 80,
          rows: 2,
          help: HIGHLIGHT_HELP,
        }),
        bankingText: f.textarea({ label: 'Banking tile: text', max: 300, rows: 4 }),
        vendorTitle: f.textarea({
          label: 'Vendor tile: title',
          max: 80,
          rows: 2,
          help: HIGHLIGHT_HELP,
        }),
        vendorText: f.textarea({ label: 'Vendor tile: text', max: 300, rows: 4 }),
        withdraw: picture('Withdraw phone', '1866×2292'),
      },
    }),
    defineSection({
      id: 'finances',
      label: '03 Finances',
      description: 'The finances screens, the statement and the debit cards band.',
      fields: {
        ...chapterFields(),
        monitor: picture('Monitor', '3768×2386'),
        glanceTitle: f.textarea({
          label: 'Text card: title',
          max: 100,
          rows: 2,
          help: HIGHLIGHT_HELP,
        }),
        glanceText: f.textarea({ label: 'Text card: text', max: 600, rows: 6 }),
        phone: picture('Person with the phone', '1866×1838'),
        statement: f.textarea({
          label: 'Statement',
          max: 300,
          rows: 4,
          help: 'The large text of the dark band; words in *asterisks* are highlighted.',
        }),
        statementNote: f.textarea({ label: 'Text under the statement', max: 300, rows: 4 }),
      },
    }),
    defineSection({
      id: 'vendors',
      label: '04 Vendor marketplace',
      description: 'The map screens and a vendor card over the truck photo.',
      fields: {
        ...chapterFields(),
        laptop: picture('Laptop with the map', '3768×2386'),
        truck: picture('Truck photo', '1866×1838'),
        phone: picture('Vendor phone', '1866×1838'),
        vendorName: f.text({ label: 'Vendor card: name', max: 60 }),
        vendorDistance: f.text({ label: 'Vendor card: distance', max: 20 }),
        vendorRating: f.text({ label: 'Vendor card: rating', max: 10 }),
        vendorDescription: f.text({ label: 'Vendor card: description', max: 80 }),
        vendorHours: f.text({ label: 'Vendor card: hours', max: 40 }),
        vendorBadge: f.text({ label: 'Vendor card: badge', max: 20 }),
        vendorSite: f.text({ label: 'Vendor card: website', max: 60 }),
        vendorPhone: f.text({ label: 'Vendor card: phone', max: 30 }),
      },
    }),
    defineSection({
      id: 'assets',
      label: '05 Assets',
      description: 'The asset management screens.',
      fields: {
        ...chapterFields(),
        laptop: picture('Laptop on the rock', '3768×2386'),
        truck: picture('Truck at night', '1866×2116'),
        tileTitle: f.textarea({ label: 'Tile: title', max: 60, rows: 2, help: HIGHLIGHT_HELP }),
        tileText: f.textarea({ label: 'Tile: text', max: 300, rows: 4 }),
        phone: picture('Asset phone', '1866×2116'),
      },
    }),
    defineSection({
      id: 'outro',
      label: 'Outro and team',
      description: 'The closing line, the founders and the team of the case.',
      fields: {
        title: f.textarea({
          label: 'Title',
          required: true,
          max: 80,
          rows: 3,
          help: HIGHLIGHT_HELP,
        }),
        founders: f.list({
          label: 'Founders',
          itemLabelField: 'name',
          max: 2,
          help: 'The first one stands next to the first row of the title, the second one next to the second.',
          of: {
            photo: picture('Photo', '602×602'),
            name: f.text({ label: 'Name', required: true, max: 60 }),
            role: f.text({ label: 'Role', max: 60 }),
          },
        }),
        teamTitle: f.text({
          label: 'Team: heading (hidden)',
          max: 60,
          help: 'Read by screen readers and search engines, not shown.',
        }),
        team: f.list({
          label: 'Team',
          itemLabelField: 'name',
          max: 12,
          of: {
            photo: picture('Photo', '520×520'),
            name: f.text({ label: 'Name', required: true, max: 60 }),
            role: f.textarea({ label: 'Role', max: 80, rows: 2 }),
          },
        }),
      },
    }),
    useShared(relatedCasesShared),
  ],
  seed: {
    en: {
      card: {
        order: 1,
        title: 'Tach',
        description: 'Financial and operational platform for logistics',
        tags: ['Logistics', 'Mobile', 'Web', 'B2C'],
        cover: {
          asset: 'case-tach-card-cover.webp',
          alt: 'Tach vendor marketplace on a laptop standing on the hood of a red truck',
        },
        coverMobile: {
          asset: 'case-tach-card-cover-mobile.webp',
          alt: 'Withdraw screen of the Tach mobile app in a hand',
        },
        categories: ['Logistics', 'Mobile', 'Web', 'B2C'],
        showOnHome: true,
        homeOrder: 1,
        industries: ['logistics'],
        industryThumb: {
          asset: 'case-tach-card-thumb.webp',
          alt: 'A trucker, the typical Tach user',
        },
        industryOrder: 1,
      },
      hero: {
        heading: 'Tach: UX/UI case study of a logistics banking and operations platform',
        lead: 'TACH is a digital platform that helps simplify financial and operational tasks for Owner-Operators, Carriers, and Vendors in the logistics industry.',
        photo: {
          asset: 'case-tach-hero-wide.webp',
          alt: 'A trucker in a cap and a plaid shirt in front of his truck, snowy mountains behind',
        },
        person: {
          asset: 'case-tach-hero-person.webp',
          alt: 'Cut-out of the trucker over the orange line (decorative)',
        },
        screenTitle: 'Finances',
        goalTitle: 'Fuel',
        goalAmount: '$800 / $1,000',
        goalPercent: 80,
        goalNote: 'Target on Oct 10 (30 from 90 days left)',
      },
      scene: {
        image: {
          asset: 'case-tach-scene-tablet.webp',
          alt: 'The Tach overview screen on a tablet standing between grey rocks',
        },
        dialogTitle: 'Add Maintenance Reminder',
        typeLabel: 'Type',
        typeValue: 'Oil change',
        remindLabel: 'Remind at',
        remindOptions: ['Date', 'After N days', 'After N miles'],
        dateLabel: 'Date',
        dateValue: 'Feb 18, 2026',
        cancel: 'Cancel',
        confirm: 'Add',
      },
      overview: {
        lead: 'TACH is a digital platform that helps simplify financial and operational tasks for Owner-Operators, Carriers, and Vendors in the logistics industry.',
        text: 'It combines modern banking tools, vendor management, and financial analytics in one place. The goal is to design a straightforward and easy-to-use system that saves time, reduces manual work, and helps users make better decisions based on accurate data.',
        website: { label: 'www.tachusa.com', href: 'https://www.tachusa.com', external: true },
        facts: [
          {
            label: 'Product',
            value: 'Mobile app, web-portal for driver, vendor and service provider',
          },
          { label: 'Services', value: 'UX/UI' },
          { label: 'Industry', value: 'B2C' },
          { label: 'Timelines', value: '4.5 months' },
        ],
      },
      workflow: {
        title: 'Workflow plan',
        duration: '4.5 months',
        months: ['December', 'January', 'February', 'March', 'April'],
        bars: [
          { label: 'Analysis & Research', row: 1, start: 0, length: 0.87, tone: 'dark' },
          { label: 'Brand Identity', row: 2, start: 0.14, length: 0.73, tone: 'dark' },
          { label: 'Wireframing', row: 3, start: 0.25, length: 1.22, tone: 'white' },
          { label: 'UI/UX Design', row: 4, start: 0.76, length: 3, tone: 'orange' },
          { label: 'Web Design', row: 2, start: 2.5, length: 1.72, tone: 'green' },
          { label: 'Support & Product design', row: 5, start: 3, length: 2.35, tone: 'fade' },
        ],
      },
      showcase: {
        image: {
          asset: 'case-tach-truck.webp',
          alt: 'A red truck with a dark cab on a desert road at sunset',
        },
        balanceLabel: 'Available Balance',
        balanceValue: '$2,000.00',
        balanceNote: 'Total: $3,764.25',
        budgetTitle: 'Actual Budget',
        revenueLabel: 'Total Yearly Revenue',
        revenueValue: '$105,987.34',
        expensesLabel: 'Total Yearly Expenses',
        expensesValue: '$78,687.34',
        callouts: [
          { label: 'Leased Truck Income', value: '$4,000.00 (7%)' },
          { label: 'Services Income', value: '$1,500.00 (7%)' },
          { label: 'Fuel Surcharges', value: '$4,000.00 (7%)' },
          { label: 'Rental Income', value: '$4,000.00 (7%)' },
        ],
        amountLabel: 'Available Amount',
        amountValue: '$5,000.00',
        amountNote: 'Estimate Advance Limit: $15,000.00',
      },
      brand: {
        eyebrow: '01 Brand Identity',
        title: 'A bold identity for a smarter future',
        text: 'Solving real logistics pain points with smart financial tools, streamlined vendor access, and intuitive design.',
        gridWide: '2x',
        gridTall: '1x',
        colorsTitle: 'Inspired by resilience and trust',
        colorsText:
          'TACH’s color palette draws inspiration from military and patriotic themes, embodying trust, discipline, and resilience — core values in logistics.',
        hexLabel: 'HEX',
        rgbLabel: 'RGB',
        colors: [
          { name: 'Arctic White', hex: '#FFFFFF', rgb: '255, 255, 255', tone: 'dark' },
          { name: 'Admiral Blue', hex: '#013366', rgb: '1, 51, 102', tone: 'light' },
          { name: 'Navy Green', hex: '#6A9E68', rgb: '106, 158, 104', tone: 'dark' },
          { name: 'Harvest Orange', hex: '#F7A826', rgb: '247, 168, 38', tone: 'dark' },
          { name: 'Indigo Blue', hex: '#1D213B', rgb: '29, 33, 59', tone: 'light' },
        ],
        fontLabel: 'Font-face',
        fonts: [
          {
            name: 'Hanken\nGrotesk',
            alphabet:
              'Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz',
          },
          {
            name: 'IBM Plex\nSans',
            alphabet:
              'Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz',
          },
        ],
        fontPhoto: {
          asset: 'case-tach-font-desert.webp',
          alt: 'A road through the desert towards the mountains with two trucks on it',
        },
        cardsImage: {
          asset: 'case-tach-cards.webp',
          alt: 'Three Tach debit cards: white, orange and dark',
        },
        capImage: {
          asset: 'case-tach-cap.webp',
          alt: 'A man in a white and green Tach cap looking down',
        },
        carrierTitle: 'Carrier',
        carrierText: 'I operate trucks or vehicles to provide transportation services.',
        billboard: {
          asset: 'case-tach-billboard.webp',
          alt: 'A Tach billboard on a roof: “Be the Broker Shippers Choose”',
        },
      },
      platform: {
        eyebrow: '02 Platform',
        title: 'Stay in control of your earnings',
        text: 'Real-time updates and intuitive layout help users stay in control and make quick, confident decisions, whether on the road or in the office.',
        laptop: {
          asset: 'case-tach-laptop-truck.webp',
          alt: 'The Tach vendors screen on a laptop standing on the hood of a red truck',
        },
        overview: {
          asset: 'case-tach-overview.webp',
          alt: 'The Tach banking overview screen: balance, account details, debit card and loan payment plans',
        },
        controlTitle: '*Stay in control* of your earnings',
        controlText:
          'The Home screen gives trucking professionals instant access to key financial data — balances, savings goals, transactions, and trends — all in one clean, easy-to-scan view. Real-time updates and intuitive layout help users stay in control and make quick, confident decisions, whether on the road or in the office.',
        home: {
          asset: 'case-tach-home-screen.webp',
          alt: 'The Tach Home screen: balances, savings goals and a monthly revenue and expenses chart',
        },
        bankingTitle: 'Built-In\n*Banking Tools*',
        bankingText:
          'Seamless banking with real-time transaction tracking, smart credit management, and easy debit card access — no financial expertise required.',
        vendorTitle: 'Vendor\n*Marketplace*',
        vendorText:
          'A smart directory to help users quickly find trusted services nearby — fast, reliable, and ready on the go.',
        withdraw: {
          asset: 'case-tach-withdraw-phone.webp',
          alt: 'The Withdraw screen of the Tach mobile app in a hand',
        },
      },
      finances: {
        eyebrow: '03 Finances',
        title: 'Financial insights for smarter decisions',
        text: 'Solving real logistics pain points with smart financial tools, streamlined vendor access, and intuitive design.',
        monitor: {
          asset: 'case-tach-monitor.webp',
          alt: 'The Tach Monthly Budget screen on a monitor against a blue sky',
        },
        glanceTitle: 'Your finances,\n*at a glance*',
        glanceText:
          'Get a real-time overview of your balances, credit lines, and upcoming payments in one clean, organized layout. Our Banking screen puts you in full control of your day-to-day finances by giving you quick access to account details and the ability to easily manage linked debit cards.',
        phone: {
          asset: 'case-tach-finances-phone.webp',
          alt: 'A smiling man holding a phone with the Tach Finances screen and a budget chart',
        },
        statement:
          'Users can quickly access account details and manage linked debit cards with *ease, giving them full control over day-to-day finances.*',
        statementNote:
          'Designed for speed and reliability, the experience keeps critical services just a tap away, whether you’re planning or solving a problem on the road.',
      },
      vendors: {
        eyebrow: '04 Vendor Marketplace',
        title: 'Find trusted vendors on the road',
        text: 'The Vendor Marketplace helps truckers quickly find nearby fuel stations, repair shops, and parts providers using a clear, map-based interface.',
        laptop: {
          asset: 'case-tach-vendors-laptop.webp',
          alt: 'The Tach vendor map with fuel stations and repair shops on a laptop',
        },
        truck: {
          asset: 'case-tach-vendors-truck.webp',
          alt: 'A dark truck driving along an autumn road',
        },
        phone: {
          asset: 'case-tach-vendor-phone.webp',
          alt: 'The Truck Service Depot vendor screen of the Tach app in a hand',
        },
        vendorName: 'Atlanta Freight Fueling & Wash',
        vendorDistance: '4.6 mi',
        vendorRating: '4.9',
        vendorDescription: '24/7 diesel fueling station & truck wash',
        vendorHours: 'Open · Closes 23:00',
        vendorBadge: 'Promotion',
        vendorSite: 'atlantafreightfuel.com',
        vendorPhone: '(404) 555-3648',
      },
      assets: {
        eyebrow: '05 Assets',
        title: 'Smart asset management for maximum uptime',
        text: 'The Assets section centralizes key data for managing trucks, trailers, and equipment, including VINs, leasing info, tire quality, and maintenance status.',
        laptop: {
          asset: 'case-tach-assets-laptop.webp',
          alt: 'The Tach Edit Asset screen on a laptop standing on a dark rock',
        },
        truck: {
          asset: 'case-tach-assets-truck.webp',
          alt: 'A truck with its lights on driving over a bridge at dusk',
        },
        tileTitle: 'All in one\nplace',
        tileText:
          'With a clear layout, automated reminders, and quick-edit options, carriers can plan maintenance, track asset status, and control costs — all in one place.',
        phone: {
          asset: 'case-tach-assets-phone.webp',
          alt: 'The Edit Asset screen of the Tach mobile app on a phone between white rocks',
        },
      },
      outro: {
        title: 'See ya in\n*the next*\ncase study',
        founders: [
          {
            photo: { asset: 'case-tach-team-nick.webp', alt: 'Nick Zhurenko' },
            name: 'Nick Zhurenko',
            role: 'Co-Founder & Head of Design',
          },
          {
            photo: { asset: 'case-tach-team-vlad.webp', alt: 'Vladyslav Kyrieiev' },
            name: 'Vladyslav Kyrieiev',
            role: 'Co-Founder & CEO',
          },
        ],
        teamTitle: 'The team behind the Tach case study',
        team: [
          {
            photo: { asset: 'case-tach-team-anna.webp', alt: 'Okruhina Anna' },
            name: 'Okruhina Anna',
            role: 'UX/UI Lead',
          },
          {
            photo: { asset: 'case-tach-team-nataliia.webp', alt: 'Nataliia Yasnohorska' },
            name: 'Nataliia Yasnohorska',
            role: 'UX/UI & Case Study Designer',
          },
          {
            photo: { asset: 'case-tach-team-natalia.webp', alt: 'Natalia Grybyniuk' },
            name: 'Natalia Grybyniuk',
            role: 'UX/UI Designer',
          },
          {
            photo: { asset: 'case-tach-team-maks.webp', alt: 'Maks Blyznyuk' },
            name: 'Maks Blyznyuk',
            role: 'Head of Web\nCase Study Designer',
          },
          {
            photo: { asset: 'case-tach-team-eleonora.webp', alt: 'Eleonora Shymova' },
            name: 'Eleonora Shymova',
            role: 'Case Study Designer',
          },
          {
            photo: { asset: 'case-tach-team-nazar.webp', alt: 'Nazar Serhiiko' },
            name: 'Nazar Serhiiko',
            role: 'Web Designer\nCase Study Designer',
          },
        ],
      },
    },
  },
});
