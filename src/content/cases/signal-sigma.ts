/**
 * CASE STUDY: Signal Sigma (/cases/signal-sigma). A unique page: its layout is built for this case
 * (src/site/cases/signal-sigma/). Design: design/cases/signal-sigma (Signal Sigma.png and assets,
 * not committed).
 *
 * Every text and picture is a field. Product screens and photo mockups are images; the rest of the
 * page (chapter strips, notes, quote, metrics, research cards, type specimen, palette, chat, team)
 * is code. Convention in titles: words in *asterisks* are highlighted, a new line starts a new row.
 */
import { definePage, defineSection } from '@/core/content/define';
import { f } from '@/core/content/fields';
import { useShared } from '@/core/content/shared-section';

import { relatedCasesShared } from '../shared/related-cases';
import { caseCardSection } from './card';

const HIGHLIGHT_HELP = 'Words in *asterisks* are highlighted; a new line starts a new row.';

/** The picture of a screen / mockup: a non-localized image with an alt text. */
const picture = (label: string, recommendedSize: string, help?: string) =>
  f.image({ label, localized: false, recommendedSize, ...(help ? { help } : {}) });

/** The label of the chapter strip ("/ OVERVIEW") above a block. */
const chapter = () =>
  f.text({
    label: 'Chapter label',
    required: true,
    max: 40,
    help: 'Shown in the strip of chapters above the title.',
  });

const title = (max = 220) =>
  f.textarea({ label: 'Title', required: true, max, rows: 3, help: HIGHLIGHT_HELP });

const note = (label = 'Handwritten note') => f.textarea({ label, max: 300, rows: 3 });

const tags = (label = 'Tags') =>
  f.list({ label, of: f.text({ max: 40 }), display: 'tags', max: 6 });

const SWATCH_SIZES = [
  { value: 'tall', label: 'Tall stripe' },
  { value: 'short', label: 'Short stripe' },
] as const;

const CHAT_SIDES = [
  { value: 'left', label: 'Person on the left' },
  { value: 'right', label: 'Person on the right' },
] as const;

const AVATAR_TONES = [
  { value: 'yellow', label: 'Yellow circle' },
  { value: 'white', label: 'White circle' },
  { value: 'none', label: 'No circle' },
] as const;

export const signalSigmaCase = definePage({
  id: 'case-signal-sigma',
  path: '/cases/signal-sigma',
  label: 'Signal Sigma',
  parent: 'cases',
  adminGroup: 'Case studies',
  uiTexts: ['cases'],
  seo: {
    title: 'Signal Sigma: Investment Platform UX/UI Case Study | K&Z Design',
    description:
      'UX/UI design case study of Signal Sigma, an investment research platform: portfolio tracking, stock screener, backtests, journalling and technical analysis.',
  },
  structuredData: ({ url, title: name, locale }) => [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name,
      url,
      inLanguage: locale,
      about: 'UX/UI design of an investment research and portfolio tracking web platform',
      creator: { '@type': 'Organization', name: 'K&Z Design' },
    },
  ],
  sections: [
    caseCardSection(),
    defineSection({
      id: 'hero',
      label: 'Hero',
      description: 'The first screen: the tablet picture, the project facts and the intro.',
      fields: {
        heading: f.text({
          label: 'Page heading (H1)',
          required: true,
          max: 120,
          help: 'The only H1 of the page, read by search engines and screen readers (not shown).',
        }),
        image: picture('Picture', '1920×1920'),
        facts: f.list({
          label: 'Project facts',
          itemLabelField: 'label',
          max: 6,
          of: {
            label: f.text({ label: 'Name', required: true, max: 30 }),
            value: f.text({ label: 'Value', required: true, max: 60 }),
          },
        }),
        title: f.text({ label: 'Intro title', required: true, max: 120 }),
        text: f.textarea({ label: 'Intro text', max: 700, rows: 5 }),
      },
    }),
    defineSection({
      id: 'overview',
      label: 'Overview',
      fields: {
        chapter: chapter(),
        title: title(),
        text: f.textarea({ label: 'Text', max: 400, rows: 3 }),
        photo: picture('Photo', '1110×1151'),
        note: note(),
        card: picture('Card over the photo', '568×783', 'A transparent PNG with its shadow.'),
      },
    }),
    defineSection({
      id: 'feedback',
      label: 'Feedback from client',
      fields: {
        chapter: chapter(),
        title: title(),
        photo: picture('Client photo', '200×200'),
        name: f.text({ label: 'Client name', required: true, max: 60 }),
        role: f.text({ label: 'Client role', max: 80 }),
        quote: f.textarea({ label: 'Quote', required: true, max: 500, rows: 4 }),
        metrics: f.list({
          label: 'Results',
          itemLabelField: 'label',
          max: 6,
          of: {
            value: f.text({ label: 'Number', required: true, max: 10 }),
            label: f.text({ label: 'Name', required: true, max: 60 }),
            text: f.textarea({ label: 'Text', max: 240, rows: 3 }),
          },
        }),
      },
    }),
    defineSection({
      id: 'about',
      label: 'About',
      fields: {
        chapter: chapter(),
        title: title(),
        text: f.textarea({ label: 'Text', max: 500, rows: 4 }),
        photo: picture('Photo', '1665×1727'),
        card: picture('Card over the photo', '1292×672', 'A transparent PNG with its shadow.'),
        note: note(),
      },
    }),
    defineSection({
      id: 'research',
      label: 'Research',
      description: 'The title and four cards: context, challenge, solution, audience.',
      fields: {
        title: title(260),
        cards: f.list({
          label: 'Cards',
          itemLabelField: 'title',
          max: 6,
          of: {
            title: f.text({ label: 'Title', required: true, max: 60 }),
            text: f.textarea({ label: 'Text', max: 500, rows: 4 }),
            tags: f.text({ label: 'Tags', max: 120, help: 'Separated by commas.' }),
          },
        }),
      },
    }),
    defineSection({
      id: 'showcase',
      label: 'Laptop between rocks',
      fields: {
        image: picture('Picture', '3916×3354'),
      },
    }),
    defineSection({
      id: 'ui',
      label: 'UI: typography and colors',
      fields: {
        chapter: chapter(),
        title: title(),
        fontName: f.text({ label: 'Typeface name', required: true, max: 30 }),
        weights: f.list({ label: 'Weights', of: f.text({ max: 20 }), display: 'tags', max: 6 }),
        stones: picture('Stones picture', '855×1738'),
        typographyTitle: f.text({ label: 'Typography: title', max: 40 }),
        typographyText: f.textarea({ label: 'Typography: text', max: 300, rows: 3 }),
        colorsTitle: f.text({ label: 'Colors: title', max: 40 }),
        colorsText: f.textarea({ label: 'Colors: text', max: 300, rows: 3 }),
        colorsTags: tags('Colors: tags'),
        note: note(),
        swatches: f.list({
          label: 'Palette',
          itemLabelField: 'hex',
          max: 16,
          help: 'Stripes from top to bottom.',
          of: {
            hex: f.color({ label: 'Color', required: true, localized: false }),
            size: f.select({ label: 'Height', options: SWATCH_SIZES }),
          },
        }),
      },
    }),
    defineSection({
      id: 'measurements',
      label: 'Measurements and team chat',
      fields: {
        image: picture('Measurements screen', '3842×3072'),
        chat: f.list({
          label: 'Chat',
          itemLabelField: 'message',
          max: 6,
          of: {
            photo: picture('Photo', '291×291'),
            tone: f.select({ label: 'Photo circle', options: AVATAR_TONES }),
            name: f.text({ label: 'Name', required: true, max: 30 }),
            role: f.text({ label: 'Role', max: 40 }),
            message: f.text({ label: 'Message', required: true, max: 80 }),
            side: f.select({ label: 'Side', options: CHAT_SIDES }),
          },
        }),
      },
    }),
    defineSection({
      id: 'orders',
      label: 'Orders & Trades',
      fields: {
        chapter: chapter(),
        title: title(),
        text: f.textarea({ label: 'Text', max: 400, rows: 3 }),
        image: picture('Screens', '2136×2387'),
        note: note(),
      },
    }),
    defineSection({
      id: 'watchlist',
      label: 'Watchlist',
      fields: {
        chapter: chapter(),
        title: title(),
        image: picture('Screen', '2463×1630'),
        note: note('Note card'),
      },
    }),
    defineSection({
      id: 'screener',
      label: 'Stock Screener',
      fields: {
        chapter: chapter(),
        title: title(),
        text: f.textarea({ label: 'Text', max: 400, rows: 3 }),
        laptop: picture('Laptop between rocks', '2880×3111'),
        note: note('Note card'),
        metricsTitle: f.textarea({ label: 'Metrics: title', max: 160, rows: 2 }),
        points: f.list({ label: 'Metrics: points', of: f.textarea({ max: 240, rows: 2 }), max: 4 }),
        dialog: picture('“Add Metric” picture', '1433×1724'),
        chatPhoto: picture('Chat: photo', '291×291'),
        chatName: f.text({ label: 'Chat: name', max: 30 }),
        chatRole: f.text({ label: 'Chat: role', max: 40 }),
        chatMessage: f.text({ label: 'Chat: message', max: 80 }),
      },
    }),
    defineSection({
      id: 'journal',
      label: 'Blog & Journalling',
      fields: {
        chapter: chapter(),
        title: title(),
        text: f.textarea({ label: 'Text', max: 400, rows: 3 }),
        tablet: picture('Tablet', '2880×2861'),
        signals: picture(
          '“Market Signals” card',
          '1154×1535',
          'A transparent PNG with its shadow.',
        ),
        note: note(),
        posts: picture('Blog cards', '1766×374'),
      },
    }),
    defineSection({
      id: 'technical',
      label: 'Technical Analysis',
      fields: {
        chapter: chapter(),
        title: title(),
        text: f.textarea({ label: 'Text', max: 400, rows: 3 }),
        laptop: picture('Laptop', '2882×1952'),
        photo: picture('Wide photo', '2880×1835'),
        chart: picture(
          'Chart card over the photo',
          '1028×860',
          'A transparent PNG with its shadow.',
        ),
      },
    }),
    defineSection({
      id: 'fundamentals',
      label: 'Fundamentals',
      fields: {
        title: title(),
        text: f.textarea({ label: 'Text', max: 400, rows: 3 }),
        laptop: picture('Laptop between rocks', '2876×2939'),
      },
    }),
    defineSection({
      id: 'summary',
      label: 'Summary',
      fields: {
        chapter: chapter(),
        title: title(),
        text: f.textarea({ label: 'Text', max: 400, rows: 3 }),
        items: f.list({
          label: 'Results list',
          itemLabelField: 'title',
          max: 8,
          of: {
            title: f.text({ label: 'Title', required: true, max: 60 }),
            text: f.textarea({ label: 'Text', max: 240, rows: 2 }),
          },
        }),
      },
    }),
    defineSection({
      id: 'outro',
      label: 'Team',
      fields: {
        title: f.textarea({
          label: 'Title',
          required: true,
          max: 120,
          rows: 2,
          help: HIGHLIGHT_HELP,
        }),
        background: picture('Background', '2876×2687'),
        team: f.list({
          label: 'Team',
          itemLabelField: 'name',
          max: 12,
          of: {
            photo: picture('Photo', '291×291'),
            name: f.text({ label: 'Name', required: true, max: 60 }),
            role: f.text({ label: 'Role', max: 80 }),
          },
        }),
        closing: f.text({ label: 'Closing line', max: 80 }),
      },
    }),
    useShared(relatedCasesShared),
  ],
  seed: {
    en: {
      card: {
        order: 2,
        title: 'Signal Sigma',
        description: 'Investment research and portfolio tracking platform',
        tags: ['Fintech', 'SaaS', 'Web', 'B2B'],
        cover: {
          asset: 'case-signal-sigma-card-cover.webp',
          alt: 'The Signal Sigma technical analysis screen on a tablet in a dark room',
        },
        coverMobile: {
          asset: 'case-signal-sigma-card-cover-mobile.webp',
          alt: 'The Signal Sigma stock chart on a tablet',
        },
        categories: ['SaaS', 'Web', 'B2B'],
        showOnHome: false,
        homeOrder: 2,
        industries: ['fintech'],
        industryThumb: {
          asset: 'case-signal-sigma-card-thumb.webp',
          alt: 'The Signal Sigma stock chart',
        },
        industryOrder: 1,
      },
      hero: {
        heading: 'Signal Sigma: UX/UI case study of an investment research platform',
        image: {
          asset: 'case-signal-sigma-hero.webp',
          alt: 'The Signal Sigma technical analysis screen of Apple stock on a tablet in a dark concrete room',
        },
        facts: [
          { label: 'Industry', value: 'FinTech' },
          { label: 'Service', value: 'UX/UI Design' },
          { label: 'Product', value: 'Web App' },
          { label: 'Date', value: '2024' },
        ],
        title: 'Track smarter, build stronger strategies with Signal Sigma',
        text: 'Signal Sigma is an advanced investment tracking platform designed to help investors analyze, optimize, and refine their strategies with confidence. With a focus on comprehensive research and intuitive tools, Signal Sigma empowers both individual traders and professional strategists to make data-driven decisions. Whether you’re managing your own portfolio or creating strategies for others, the platform provides the insights needed to stay ahead.',
      },
      overview: {
        chapter: 'Overview',
        title:
          'A platform *for experienced investors* — from traders optimizing portfolios to strategists building them for others.',
        text: 'Signal Sigma is not a brokerage service — it focuses on research and tracking. Users can monitor their investments, test strategies, and make informed decisions before placing trades with their brokers.',
        photo: {
          asset: 'case-signal-sigma-building.webp',
          alt: 'An orange brick building with arched windows and a fire escape in the evening sun',
        },
        note: 'A smarter way to understand and optimize your investments.',
        card: {
          asset: 'case-signal-sigma-screener-card.webp',
          alt: 'A Signal Sigma backtest card “Stock Screener 1 BT”: running, dividend yield, average aggregation, $1,000 starting capital',
        },
      },
      feedback: {
        chapter: 'Feedback from client',
        title:
          'What stood out most about *K&Z Design* was their ability to combine creative excellence with pragmatic execution.',
        photo: { asset: 'case-signal-sigma-client-andrei.webp', alt: 'Andrei Sota' },
        name: 'Andrei Sota',
        role: 'Founder & CEO, Signal Sigma',
        quote:
          'I was particularly struck by how they balanced my vision with their expertise, knowing exactly when to push boundaries for innovation and when to reel things in for practicality. The handoff from Figma layouts to code was seamless.',
        metrics: [
          {
            value: '40%',
            label: 'User engagement metrics',
            text: 'Showed a 40% increase in average session duration, reflecting the intuitive and engaging design of the frontend.',
          },
          {
            value: '30%',
            label: 'Development efficiency',
            text: 'Also saw a boost, with a 30% reduction in frontend implementation time due to the detailed Figma layouts and clear documentation provided by K&Z Design.',
          },
          {
            value: '25%',
            label: 'Onboarding completion rates',
            text: 'Improved by 25%, thanks to the streamlined UX that made complex financial tools accessible to both novice and expert users.',
          },
          {
            value: '85',
            label: 'Promoter Score (NPS) efficiency',
            text: 'Jumped to 85, indicating high user satisfaction with the interface and functionality.',
          },
        ],
      },
      about: {
        chapter: 'About',
        title: 'Empowering better investment decisions.',
        text: 'Signal Sigma is built for clarity and precision. By combining advanced analytics with human-centered design, we make it easier to explore markets, evaluate opportunities, and execute informed strategies. From tracking assets to testing models, every feature is designed to help investors make smarter moves — faster.',
        photo: {
          asset: 'case-signal-sigma-about-photo.webp',
          alt: 'A bearded man in glasses reading on a tablet in an armchair by the window',
        },
        card: {
          asset: 'case-signal-sigma-market-cap.webp',
          alt: 'A Signal Sigma “Market Cap” list: Apple, Tesla and Rheinmetall with prices and daily change',
        },
        note: 'We bridge the gap between data and strategy — transforming complex financial insights into intuitive, actionable tools for investors at every level.',
      },
      research: {
        title:
          'Before building the experience, *we explored the market*, defined the audience, and identified the challenges that shaped the platform’s design.',
        cards: [
          {
            title: 'Project Context',
            text: 'The fintech industry is becoming increasingly data-driven — yet many investors still rely on fragmented or overly technical tools. Signal Sigma was conceived to bridge this gap by providing a unified, research-focused platform that combines analytical power with accessibility.',
            tags: 'Fintech, InvestmentPlatform, DataDriven',
          },
          {
            title: 'The Challenge',
            text: 'The client’s goal was to create a tool advanced enough for professional strategists yet intuitive for experienced individual investors. The main challenge was to visualize massive datasets and risk models in a clear, actionable way without overwhelming the user.',
            tags: 'DataVisualization, CognitiveLoad, Confidence',
          },
          {
            title: 'The Solution',
            text: 'We built a modular interface with defined data hierarchies and streamlined user flows. Each module — from portfolio tracking to risk analysis — was designed to feel cohesive, ensuring that complex financial operations could be performed effortlessly within a unified environment.',
            tags: 'UI/UXDesign, SystemThinking, Clarity',
          },
          {
            title: 'Target Audience',
            text: 'The platform is designed for experienced investors: individual traders optimizing portfolios, and professional strategists developing data-backed investment models. The tone, structure, and UX language reflect professional confidence and analytical focus.',
            tags: 'B2B, B2C, Professional investors',
          },
        ],
      },
      showcase: {
        image: {
          asset: 'case-signal-sigma-laptop-rocks.webp',
          alt: 'The Signal Sigma balance sheet with bar charts and ratios on a laptop between grey and yellow rocks, with a note: “It offers detailed charts and indicators to make rational decisions and spot capital potential”',
        },
      },
      ui: {
        chapter: 'UI',
        title:
          'Typography and color work together to *create clarity and hierarchy* in the platform.',
        fontName: 'Inter',
        weights: ['Bold', 'Semibold', 'Medium', 'Regular'],
        stones: {
          asset: 'case-signal-sigma-stones.webp',
          alt: 'Four white pebbles balanced on top of each other',
        },
        typographyTitle: 'Typography',
        typographyText:
          'The type system creates a clear visual hierarchy that helps users navigate dense financial information with ease.',
        colorsTitle: 'Colors',
        colorsText:
          'The palette is built around calm, balanced tones that support clarity when working with dense financial data.',
        colorsTags: ['Balance', 'Clarity', 'Hierarchy'],
        note: 'Typography and color work together to create harmony and balance across the platform. The type system provides clarity for complex data, while the color palette guides focus and creates a visual rhythm that supports confident, intuitive decision-making.',
        swatches: [
          { hex: '#FFFFFF', size: 'tall' },
          { hex: '#D7DDE8', size: 'tall' },
          { hex: '#BBC1CD', size: 'tall' },
          { hex: '#8B919E', size: 'tall' },
          { hex: '#828896', size: 'short' },
          { hex: '#495F6E', size: 'short' },
          { hex: '#313A40', size: 'short' },
          { hex: '#293237', size: 'short' },
          { hex: '#0B0F10', size: 'short' },
          { hex: '#0F1315', size: 'short' },
          { hex: '#131719', size: 'short' },
        ],
      },
      measurements: {
        image: {
          asset: 'case-signal-sigma-measurements.webp',
          alt: 'The Signal Sigma Measurements screen: core allocation bars and Stock Screener backtest cards',
        },
        chat: [
          {
            photo: { asset: 'case-signal-sigma-team-nick.webp', alt: 'Nick' },
            tone: 'yellow',
            name: 'Nick',
            role: 'Head of Design',
            message: 'Left a couple of comments',
            side: 'left',
          },
          {
            photo: { asset: 'case-signal-sigma-team-dmytro.webp', alt: 'Dmitro' },
            tone: 'white',
            name: 'Dmitro',
            role: 'Lead Project',
            message: 'We’ll do everything!',
            side: 'right',
          },
          {
            photo: { asset: 'case-signal-sigma-team-vlada.webp', alt: 'Vlada' },
            tone: 'none',
            name: 'Vlada',
            role: 'UX/UI Designer',
            message: 'Of course! Shall we meet up?',
            side: 'right',
          },
        ],
      },
      orders: {
        chapter: 'Orders & Trades',
        title:
          'Orders & Trades the list of trades *users need to execute* to reach their target portfolio.',
        text: 'This section helps users track and manage their trades with a clear list of buy and sell orders. Open orders and trade history are displayed in one place, making it easy to review past decisions and monitor progress.',
        image: {
          asset: 'case-signal-sigma-orders.webp',
          alt: 'The Signal Sigma Portfolio Assets table of buy and sell orders next to the Trade History panel with notes',
        },
        note: 'Users can also add notes to trades, improving strategy refinement and control. By enhancing trade visibility, this feature increases user retention, keeping investors engaged and actively managing their portfolios.',
      },
      watchlist: {
        chapter: 'Watchlist',
        title:
          'Orders & Trades the list of trades users *need to execute* to reach their target portfolio.',
        image: {
          asset: 'case-signal-sigma-watchlist.webp',
          alt: 'The Signal Sigma Watchlist: a table of tickers with volume, dividend yield and market cap above a price chart',
        },
        note: 'Users can customize the view, select the most relevant data, and save it as a template for instant access.',
      },
      screener: {
        chapter: 'Stock Screener',
        title: 'Stock Screener, smart filtering for\n*better stock selection*',
        text: 'The Stock Screener helps discover the right stocks by applying filters step by step, excluding those that don’t meet their criteria.',
        laptop: {
          asset: 'case-signal-sigma-screener-laptop.webp',
          alt: 'The Signal Sigma stock screener table with P/E, dividend yield and P/S filters on a laptop among white rocks',
        },
        note: 'With a wide range of metrics arranged by categories, users can easily select and customize important parameters. This enables precise filtering, helping them build a refined, high-quality stock list relevant to their strategy.',
        metricsTitle:
          'Add and adjust metrics to generate a list of tickers aligned with your goals.',
        points: [
          'It serves to evaluate risk, refine filters, and improve decision-making with clear performance insights.',
          'The Backtest feature lets users test investment strategies on historical data before implementing them in real markets.',
        ],
        dialog: {
          asset: 'case-signal-sigma-add-metric.webp',
          alt: 'The “Add Metric” dialog of Signal Sigma with financial ratios and profitability metrics over a white rock',
        },
        chatPhoto: { asset: 'case-signal-sigma-team-dmytro.webp', alt: 'Dmitro' },
        chatName: 'Dmitro',
        chatRole: 'Lead Project',
        chatMessage: 'Just one more metric...',
      },
      journal: {
        chapter: 'Blog & Journalling',
        title: 'Journalling Tracking *all portfolio actions* in one place',
        text: 'Journalling records trades, adjustments, and notes, making it easy to review past decisions and optimize investment strategies.',
        tablet: {
          asset: 'case-signal-sigma-journal-tablet.webp',
          alt: 'The Signal Sigma journal on a tilted tablet: bought, sold and closed positions with notes on a timeline',
        },
        signals: {
          asset: 'case-signal-sigma-market-signals.webp',
          alt: 'A “Market Signals” card showing +95.5%',
        },
        note: 'Explore market news, trends, and professional insights every day.',
        posts: {
          asset: 'case-signal-sigma-blog-cards.webp',
          alt: 'Three Signal Sigma blog cards about investing, portfolio growth and risk, with authors and likes',
        },
      },
      technical: {
        chapter: 'Technical Analysis',
        title: '*Technical Analysis* provides tools to research individual assets',
        text: 'This section helps users analyze investments by analyzing trends, price movements, and historical data.',
        laptop: {
          asset: 'case-signal-sigma-technical-laptop.webp',
          alt: 'The Signal Sigma technical analysis of Apple stock with price targets on a laptop on a grey table',
        },
        photo: {
          asset: 'case-signal-sigma-campus.webp',
          alt: 'An office campus with trees and a pool, with a note: “It offers detailed charts and indicators to make rational decisions and spot capital potential”',
        },
        chart: {
          asset: 'case-signal-sigma-chart.webp',
          alt: 'A Signal Sigma chart “Absolute, 2 years”: the price growing above its trend line',
        },
      },
      fundamentals: {
        title:
          'The Fundamentals section presents *major financial metrics* for a stock, including profitability, liquidity, and debt levels.',
        text: 'With charts and historical data, users can track performance over time and make better investment decisions.',
        laptop: {
          asset: 'case-signal-sigma-fundamentals-laptop.webp',
          alt: 'The Signal Sigma Fundamentals screen with assets and liabilities bar charts on a laptop between white rocks',
        },
      },
      summary: {
        chapter: 'Summary',
        title:
          'We created a *complete ecosystem for investment analysis* — from structure and logic to interaction and visual identity.',
        text: 'The platform delivers clarity, speed, and intuitive decision-making tools for both traders and strategists. The result is a cohesive, scalable product ready to support complex financial workflows.',
        items: [
          {
            title: 'Strategy & Architecture',
            text: 'We defined core modules and user flows, creating a solid, scalable foundation for the entire platform.',
          },
          {
            title: 'Visual Concept',
            text: 'A balanced, calm visual language that reinforces clarity, focus, and trust.',
          },
          {
            title: 'UI/UX Design',
            text: 'Intuitive interactions and clean hierarchy make complex data easy to navigate and understand.',
          },
          {
            title: 'Responsiveness',
            text: 'Adaptive layouts ensure full usability and readability across all devices.',
          },
        ],
      },
      outro: {
        title: 'Eat veggies, embrace UX,\nand stay tuned.',
        background: {
          asset: 'case-signal-sigma-outro-bg.webp',
          alt: 'Grey and yellow rocks around a light opening (decorative)',
        },
        team: [
          {
            photo: { asset: 'case-signal-sigma-team-vladyslav.webp', alt: 'Vladyslav Kyrieiev' },
            name: 'Vladyslav Kyrieiev',
            role: 'Co-Founder & CEO',
          },
          {
            photo: { asset: 'case-signal-sigma-team-nick.webp', alt: 'Nick Zhurenko' },
            name: 'Nick Zhurenko',
            role: 'Co-Founder & Head of Design',
          },
          {
            photo: { asset: 'case-signal-sigma-team-dmytro.webp', alt: 'Dmytro Vytushynskyi' },
            name: 'Dmytro Vytushynskyi',
            role: 'Lead UX/UI Designer',
          },
          {
            photo: { asset: 'case-signal-sigma-team-vlada.webp', alt: 'Vlada Hetun' },
            name: 'Vlada Hetun',
            role: 'UX/UI Designer',
          },
          {
            photo: { asset: 'case-signal-sigma-team-anna.webp', alt: 'Anna Okruhina' },
            name: 'Anna Okruhina',
            role: 'Visual Designer',
          },
          {
            photo: { asset: 'case-signal-sigma-team-maks.webp', alt: 'Maks Blyznyuk' },
            name: 'Maks Blyznyuk',
            role: 'Head of Web / Case Study Designer',
          },
        ],
        closing: 'See ya in the next case study',
      },
    },
  },
});
