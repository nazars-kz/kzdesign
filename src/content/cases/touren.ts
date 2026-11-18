/**
 * CASE STUDY: Touren (/cases/touren). A unique page: its layout is built for this case
 * (src/site/cases/touren/). Design: design/cases/touren (Frame.png and assets, not committed).
 *
 * Every text and picture is a field. Product screens and photo mockups are images; the rest of the
 * page (block heads, process steps, goals, site map, quote, type specimen, palette, panels, web
 * overlay, project summary cards, team) is code. Convention in titles: words in *asterisks* are
 * highlighted, a new line starts a new row.
 */
import { definePage, defineSection } from '@/core/content/define';
import { f } from '@/core/content/fields';
import { useShared } from '@/core/content/shared-section';

import { relatedCasesShared } from '../shared/related-cases';
import { caseCardSection } from './card';

const HIGHLIGHT_HELP = 'Words in *asterisks* are highlighted; a new line starts a new row.';

/** The icons of the round badge next to a block label (drawn in code). */
export const TOUREN_ICONS = [
  { value: 'gear', label: 'Gear' },
  { value: 'puzzle', label: 'Puzzle' },
  { value: 'chart', label: 'Chart' },
  { value: 'bars', label: 'Bar chart' },
  { value: 'bolt', label: 'Lightning' },
  { value: 'home', label: 'Home' },
  { value: 'chat', label: 'Chat' },
  { value: 'route', label: 'Route' },
  { value: 'helmet', label: 'Helmet' },
  { value: 'monitor', label: 'Monitor' },
] as const;

/** The picture of a screen / mockup: a non-localized image with an alt text. */
const picture = (label: string, recommendedSize: string, help?: string) =>
  f.image({ label, localized: false, recommendedSize, ...(help ? { help } : {}) });

const TRANSPARENT = 'A transparent PNG with its shadow.';

const tags = (label = 'Tags') =>
  f.list({ label, of: f.text({ max: 40 }), display: 'tags', max: 6 });

/** The head of a block: round icon, small label, title (h2), lead and the small side note. */
const head = (options: { lead?: boolean; note?: boolean; tags?: boolean } = {}) => ({
  icon: f.select({ label: 'Icon', options: TOUREN_ICONS, localized: false }),
  label: f.text({
    label: 'Label',
    required: true,
    max: 40,
    help: 'The small line above the title.',
  }),
  title: f.textarea({ label: 'Title', required: true, max: 120, rows: 2, help: HIGHLIGHT_HELP }),
  ...(options.lead === false ? {} : { lead: f.textarea({ label: 'Text', max: 500, rows: 4 }) }),
  ...(options.note === false
    ? {}
    : {
        note: f.textarea({
          label: 'Side note',
          max: 400,
          rows: 3,
          help: 'The small text on the right.',
        }),
      }),
  ...(options.tags === false ? {} : { tags: tags() }),
});

const TEXT_TONES = [
  { value: 'dark', label: 'Dark text' },
  { value: 'light', label: 'Light text' },
] as const;

export const tourenCase = definePage({
  id: 'case-touren',
  path: '/cases/touren',
  label: 'Touren',
  parent: 'cases',
  adminGroup: 'Case studies',
  uiTexts: ['cases'],
  seo: {
    title: 'Touren: Off-Road Navigation App UX/UI Case Study | K&Z Design',
    description:
      'UX/UI case study of Touren, an off-road trail navigation app and website: trail maps, missions and sections, condition reports, hazard alerts and a rider community.',
  },
  structuredData: ({ url, title: name, locale }) => [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name,
      url,
      inLanguage: locale,
      about: 'UX/UI design of an off-road trail navigation mobile app and its promotional website',
      creator: { '@type': 'Organization', name: 'K&Z Design' },
    },
  ],
  sections: [
    caseCardSection(),
    defineSection({
      id: 'hero',
      label: 'Hero',
      description:
        'The first screen: the rider photo, the project facts, the phone and the request.',
      fields: {
        heading: f.text({
          label: 'Page heading (H1)',
          required: true,
          max: 120,
          help: 'The only H1 of the page, read by search engines and screen readers (not shown).',
        }),
        photo: picture('Photo', '2880×1515', 'Fades to white at the bottom.'),
        phone: picture('Phone', '908×1779', TRANSPARENT),
        facts: f.list({
          label: 'Project facts',
          itemLabelField: 'label',
          max: 4,
          of: {
            label: f.text({ label: 'Name', required: true, max: 30 }),
            value: f.textarea({
              label: 'Value',
              required: true,
              max: 80,
              rows: 2,
              help: 'One line per row.',
            }),
          },
        }),
        requestLabel: f.text({ label: 'Request: label', max: 30 }),
        request: f.textarea({ label: 'Request: text', max: 500, rows: 4 }),
      },
    }),
    defineSection({
      id: 'brief',
      label: 'Solution, goal, challenge',
      fields: {
        items: f.list({
          label: 'Items',
          itemLabelField: 'title',
          max: 4,
          help: 'The first item sits on the grey band.',
          of: {
            title: f.text({ label: 'Title', required: true, max: 40 }),
            text: f.textarea({ label: 'Text', max: 400, rows: 3 }),
          },
        }),
        phones: picture('Phones', '1611×2190', TRANSPARENT),
      },
    }),
    defineSection({
      id: 'process',
      label: 'Design process',
      fields: {
        ...head({ lead: false, note: false, tags: false }),
        intro: f.textarea({ label: 'Text: left', max: 400, rows: 4 }),
        focus: f.textarea({ label: 'Text: right', max: 400, rows: 3 }),
        steps: f.list({
          label: 'Steps',
          itemLabelField: 'title',
          max: 8,
          help: 'Numbered in order (01., 02. …).',
          of: {
            title: f.text({ label: 'Title', required: true, max: 50 }),
            text: f.textarea({ label: 'Text', max: 300, rows: 3 }),
          },
        }),
      },
    }),
    defineSection({
      id: 'goals',
      label: 'Task and goals',
      fields: {
        ...head({ lead: false, note: false, tags: false }),
        items: f.list({
          label: 'Goals',
          itemLabelField: 'title',
          max: 9,
          of: {
            title: f.text({ label: 'Title', required: true, max: 60 }),
            text: f.textarea({ label: 'Text', max: 300, rows: 3 }),
          },
        }),
        image: picture('Phone between rocks', '2880×1950'),
      },
    }),
    defineSection({
      id: 'sitemap',
      label: 'Site mapping',
      fields: {
        ...head({ lead: false, note: false, tags: false }),
        entry: f.list({
          label: 'Entry screens',
          of: f.text({ max: 30 }),
          display: 'tags',
          max: 3,
          help: 'Sign up, log in…',
        }),
        onboarding: f.text({ label: 'Step after sign up', max: 30 }),
        screens: f.list({
          label: 'Main screens',
          itemLabelField: 'name',
          max: 6,
          of: {
            name: f.text({ label: 'Screen', required: true, max: 30 }),
            pages: f.text({ label: 'Its pages', max: 160, help: 'Separated by commas.' }),
          },
        }),
      },
    }),
    defineSection({
      id: 'quote',
      label: 'Quote of the team',
      fields: {
        bubble: f.text({ label: 'Bubble', max: 40 }),
        photo: picture('Photo', '213×213'),
        role: f.text({ label: 'Role', max: 40 }),
        quote: f.textarea({ label: 'Quote', required: true, max: 400, rows: 4 }),
      },
    }),
    defineSection({
      id: 'showcase',
      label: 'Website and badges',
      fields: {
        tablet: picture('Website on a tablet', '2880×1890'),
        bento: picture('Badges, riders, photos', '2880×1487'),
        phone: picture('Phone on a rock', '2880×1890'),
      },
    }),
    defineSection({
      id: 'identity',
      label: 'Typography and colors',
      fields: {
        ...head({ lead: false, note: false, tags: false }),
        fontLabel: f.text({ label: 'Font: label', max: 30 }),
        alphabet: f.textarea({
          label: 'Font: alphabet',
          max: 120,
          rows: 3,
          help: 'One line per row.',
        }),
        typographyLabel: f.text({ label: 'Typography: label', max: 30 }),
        weights: f.list({ label: 'Weights', of: f.text({ max: 20 }), display: 'tags', max: 4 }),
        fontName: f.text({ label: 'Typeface name', required: true, max: 20 }),
        specimen: f.text({ label: 'Big letters', max: 4 }),
        stripes: f.list({
          label: 'Accent stripes',
          of: f.color({ localized: false }),
          max: 4,
          help: 'From top to bottom.',
        }),
        swatches: f.list({
          label: 'Palette',
          itemLabelField: 'name',
          max: 4,
          of: {
            name: f.text({ label: 'Name', required: true, max: 30 }),
            hex: f.color({ label: 'Color', required: true, localized: false }),
            tone: f.select({ label: 'Text on it', options: TEXT_TONES }),
          },
        }),
        icons: picture('Icons and chips', '2880×1487'),
      },
    }),
    defineSection({
      id: 'home',
      label: 'Home page',
      fields: {
        ...head(),
        phone: picture('Home screen', '1131×2293', TRANSPARENT),
        leaderboard: picture('Leaderboard', '1091×1585', TRANSPARENT),
      },
    }),
    defineSection({
      id: 'community',
      label: 'Community page',
      fields: { ...head(), image: picture('Screens', '2538×1860') },
    }),
    defineSection({
      id: 'explore',
      label: 'Explore page',
      fields: { ...head(), image: picture('Screen and photo', '5760×3924') },
    }),
    defineSection({
      id: 'profile',
      label: 'User profile',
      fields: { ...head(), image: picture('Screens', '2538×1860') },
    }),
    defineSection({
      id: 'navigation',
      label: 'Trail navigation',
      fields: {
        ...head({ tags: false }),
        panelText: f.textarea({ label: 'Panel: text', max: 400, rows: 4 }),
        panelTags: tags('Panel: tags'),
        slogan: f.textarea({
          label: 'Panel: big words',
          max: 60,
          rows: 3,
          help: 'One line per row.',
        }),
        image: picture('Screens', '1684×2177', TRANSPARENT),
      },
    }),
    defineSection({
      id: 'mission',
      label: 'Mission & section',
      fields: {
        ...head(),
        section: picture('Section screen', '1050×2121', TRANSPARENT),
        level: picture('Level screen', '1108×1994', TRANSPARENT),
      },
    }),
    defineSection({
      id: 'conditions',
      label: 'Condition reports',
      fields: { ...head(), image: picture('Photo and screen', '2880×2194') },
    }),
    defineSection({
      id: 'hazard',
      label: 'Hazard & safety alerts',
      fields: {
        ...head({ tags: false }),
        image: picture('Screens', '1371×1972', TRANSPARENT),
        panelTitle: f.textarea({
          label: 'Panel: title',
          max: 60,
          rows: 2,
          help: 'One line per row.',
        }),
        panelText: f.textarea({ label: 'Panel: text', max: 400, rows: 4 }),
        panelTags: tags('Panel: tags'),
      },
    }),
    defineSection({
      id: 'web',
      label: 'Website',
      fields: {
        ...head({ tags: false }),
        photo: picture('Photo', '2880×2546'),
        photoTitle: f.textarea({
          label: 'Photo: title',
          max: 60,
          rows: 2,
          help: 'One line per row.',
        }),
        photoText: f.textarea({ label: 'Photo: text', max: 400, rows: 4 }),
        steps: f.list({ label: 'Photo: steps', of: f.text({ max: 40 }), display: 'tags', max: 8 }),
        laptop: picture('Website between rocks', '2880×1800'),
      },
    }),
    defineSection({
      id: 'mobile',
      label: 'Mobile website',
      fields: {
        phone: picture('Phone', '1128×2124', TRANSPARENT),
        title: f.textarea({
          label: 'Title',
          required: true,
          max: 80,
          rows: 3,
          help: 'Words in *asterisks* are bright, the rest is grey; a new line starts a new row.',
        }),
        lead: f.textarea({ label: 'Text', max: 400, rows: 4 }),
        note: f.textarea({ label: 'Small text', max: 300, rows: 2 }),
        year: f.text({ label: 'Big number', max: 6 }),
      },
    }),
    defineSection({
      id: 'pages',
      label: 'Website pages',
      fields: {
        ...head({ note: false, tags: false }),
        links: f.list({ label: 'Pages', of: f.text({ max: 40 }), display: 'tags', max: 8 }),
        image: picture('Pages', '2880×2898'),
      },
    }),
    defineSection({
      id: 'highlights',
      label: 'Project highlights',
      fields: {
        ...head({ lead: false, note: false, tags: false }),
        reviewPhoto: picture('Review: photo', '200×200'),
        reviewFlag: picture('Review: flag', '40×40'),
        reviewName: f.text({ label: 'Review: name', max: 60 }),
        reviewRole: f.text({ label: 'Review: role', max: 80 }),
        reviewTitle: f.textarea({ label: 'Review: title', max: 120, rows: 2 }),
        reviewTexts: f.list({
          label: 'Review: texts',
          of: f.textarea({ max: 240, rows: 3 }),
          max: 3,
        }),
        scopeTitle: f.text({ label: 'Scope: label', max: 40 }),
        scopeText: f.textarea({ label: 'Scope: title', max: 120, rows: 2 }),
        stats: f.list({
          label: 'Scope: numbers',
          itemLabelField: 'label',
          max: 4,
          of: {
            value: f.text({ label: 'Number', required: true, max: 10 }),
            label: f.text({ label: 'Name', required: true, max: 30 }),
          },
        }),
        storyTitle: f.text({ label: 'Photo card: label', max: 40 }),
        storyText: f.textarea({ label: 'Photo card: title', max: 120, rows: 2 }),
        storyNote: f.textarea({ label: 'Photo card: small text', max: 200, rows: 2 }),
        storyPhoto: picture('Photo card: photo', '1100×1682'),
      },
    }),
    defineSection({
      id: 'outro',
      label: 'Team',
      fields: {
        title: f.textarea({
          label: 'Title',
          required: true,
          max: 160,
          rows: 4,
          help: HIGHLIGHT_HELP,
        }),
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
      },
    }),
    useShared(relatedCasesShared),
  ],
  seed: {
    en: {
      card: {
        order: 3,
        title: 'Touren',
        description: 'Off-road trail navigation app and website for adventure riders',
        tags: ['Mobile App', 'Web', 'Navigation', 'Sports'],
        cover: {
          asset: 'case-touren-cover-dark.webp',
          alt: 'The Touren rider profile of Jane Cooper on a phone between dark rocks',
        },
        coverMobile: {
          asset: 'case-touren-cover-dark-mobile.webp',
          alt: 'The Touren rider profile screen on a phone in a dark room',
        },
        categories: ['Mobile', 'Web', 'B2C', 'Social Media'],
        showOnHome: false,
        homeOrder: 3,
        industries: ['social'],
        industryThumb: {
          asset: 'case-touren-thumb-dark.webp',
          alt: 'The Touren rider profile screen',
        },
        industryOrder: 1,
      },
      hero: {
        heading: 'Touren: UX/UI case study of an off-road trail navigation app',
        photo: {
          asset: 'case-touren-hero.webp',
          alt: 'An adventure motorcyclist in a helmet riding through tall dry grass',
        },
        phone: {
          asset: 'case-touren-hero-phone.webp',
          alt: 'The Touren Explore screen: a trail map with nearby routes, filters and 76 trails nearby',
        },
        facts: [
          { label: 'Product:', value: 'Off-Road Trail Navigation' },
          { label: 'Project', value: 'Navigation / Sports\nDate / 2025' },
          { label: 'Domain', value: 'Mobile App\nWeb' },
        ],
        requestLabel: 'Request',
        request:
          'Our client needed an off-road navigation app for adventurers, outdoor enthusiasts, and competitive riders. The app had to help users explore trails, track their location, and get real-time updates on conditions and hazards while being reliable and easy to use.',
      },
      brief: {
        items: [
          {
            title: 'Solution',
            text: 'Our client required a mobile application for off-road navigation, designed for adventure seekers, outdoor enthusiasts, and competitive racers. Additionally, a website was needed to effectively showcase and promote the app.',
          },
          {
            title: 'Goal',
            text: 'The goal was to create a platform where users could explore, navigate, and create trails with real-time updates on conditions and hazards. The app also needed to track location, distance, and speed using GPS.',
          },
          {
            title: 'Challenge',
            text: 'The challenge was to design a user-friendly and reliable app that provides detailed trail reports, live notifications, and safety alerts, keeping users informed and safe throughout their journey.',
          },
        ],
        phones: {
          asset: 'case-touren-brief-phones.webp',
          alt: 'Two Touren screens: the Home dashboard with a performance snapshot and the Rocky Ascent section card',
        },
      },
      process: {
        icon: 'gear',
        label: 'Design Process',
        title: 'Empowering *adventures*',
        intro:
          'We design with purpose, creating a platform that meets user needs while aligning with business goals. Through research, creativity, and technical precision, we ensure seamless navigation, intuitive usability, and reliable functionality.',
        focus:
          'Our focus is to make trail exploration safer, more engaging, and more accessible, delivering value to both users and the business.',
        steps: [
          {
            title: 'Discovery',
            text: 'We conducted a detailed analysis of the product, target users, and competitors to define the project’s direction. This established a solid foundation, ensuring our design met both user needs and business goals.',
          },
          {
            title: 'Persona & comp. analysis',
            text: 'We developed detailed personas to represent key user archetypes and mapped their journeys to identify behaviors and needs. This process revealed pain points and allowed us to refine user interactions.',
          },
          {
            title: 'Information architecture',
            text: 'Following insights from the discovery phase, we structured the product to provide simple navigation and easy access to key features. The focus was on creating a logical and user-centered flow.',
          },
          {
            title: 'Visual design system',
            text: 'We began with wireframes to map out layouts and flows, defined the visual style, and finalized high-fidelity screens, ready for development.',
          },
          {
            title: 'Pre-development preparation',
            text: 'We delivered a structured Figma file with a comprehensive design system and detailed guidelines to facilitate a smooth handoff. By collaborating with engineers, we clarified requirements to support efficient implementation.',
          },
          {
            title: 'Development support & testing',
            text: 'We offered on-demand design support during development and handled extensive testing after launch to ensure that the product functions accurately and is displayed as intended.',
          },
        ],
      },
      goals: {
        icon: 'puzzle',
        label: 'Task and goals',
        title: 'Enhance. *Expand. Boost.*',
        items: [
          {
            title: 'Boost User Engagement',
            text: 'Keep trail info up to date and enrich the experience with gamified features like badges, rewards, and skill progression. Foster community engagement through ride groups, shared missions, and challenges to encourage long-term participation.',
          },
          {
            title: 'Optimize Operational Efficiency',
            text: 'We create an interactive map with easy-to-use settings for smooth navigation and real-time route updates. This simplifies trail management and provides personalized recommendations using data insights.',
          },
          {
            title: 'Expand Community Involvement',
            text: 'Encourage user-generated content by allowing users to share trail reviews, photos, and experiences. Support community-driven projects and ideas to improve and develop trails together.',
          },
          {
            title: 'Keep Users Active & Engaged',
            text: 'Encourage regular app usage with personalized notifications, fun challenges, and progress tracking. Keep users motivated by celebrating achievements and new trail discoveries.',
          },
          {
            title: 'User-Friendly Navigation',
            text: 'Design a seamless interface that lets users explore trails, plan routes, and track key metrics. Help them navigate effortlessly while gaining insights to improve their performance.',
          },
          {
            title: 'Enhance Trail Safety & Accessibility',
            text: 'Provide real-time updates on trail conditions and hazards, make issue reporting simple, and encourage user involvement in trail maintenance and safety efforts.',
          },
        ],
        image: {
          asset: 'case-touren-profile-rocks.webp',
          alt: 'The Touren rider profile of Jane Cooper on a phone floating between two mossy rocks',
        },
      },
      sitemap: {
        icon: 'chart',
        label: 'Site mapping',
        title: 'Structuring *the journey.*',
        entry: ['Sign up', 'Log in'],
        onboarding: 'Onboarding',
        screens: [
          {
            name: 'Home Screen',
            pages: 'Performance snapshot, Riding activity, Suggested missions, Leaderboard',
          },
          { name: 'Explore Screen', pages: 'Search Trail, Trail feed, Map View, Trail details' },
          { name: 'Community', pages: 'Create missions, Mission details' },
          { name: 'User Profile', pages: 'Activities, Photos, Badges' },
        ],
      },
      quote: {
        bubble: 'Well done, team!',
        photo: { asset: 'case-touren-team-nick.webp', alt: 'Nick Zhurenko, Head of Design at K&Z' },
        role: 'Head of Design',
        quote:
          '“We conducted a detailed analysis, defined the goals, developed the structure, and carefully worked through all the key aspects. Now that we have a clear vision of the product and the necessary information, we move on to the next stage: UI design.”',
      },
      showcase: {
        tablet: {
          asset: 'case-touren-web-tablet.webp',
          alt: 'The Touren Trail Guides web page on a tablet lying on black gravel',
        },
        bento: {
          asset: 'case-touren-bento.webp',
          alt: 'Touren skill badges by level, a “3K+ users” chip and the photo gallery of a rider profile',
        },
        phone: {
          asset: 'case-touren-phone-rock.webp',
          alt: 'The Touren trail details screen of Bukki Namzeti Park on a phone resting on a dark rock',
        },
      },
      identity: {
        icon: 'bolt',
        label: 'Typography & colors',
        title: 'Shaping identity *through design*',
        fontLabel: 'Main font',
        alphabet: 'abcdefghijklmno\npqrstuvwxyz\n1234567890',
        typographyLabel: 'Typography',
        weights: ['Regular', 'Semibold', 'Bold'],
        fontName: 'Inter',
        specimen: 'abc',
        stripes: ['#778a2f', '#aac73e', '#c3e54f'],
        swatches: [
          { name: 'Light grey', hex: '#f8f8f8', tone: 'dark' },
          { name: 'Black', hex: '#18181b', tone: 'light' },
          { name: 'Grey', hex: '#949494', tone: 'dark' },
        ],
        icons: {
          asset: 'case-touren-icons.webp',
          alt: 'Touren filter chips Nearby, Top Picks and Missions, round category icons and the helmet icon on a 24 px grid',
        },
      },
      home: {
        icon: 'home',
        label: 'Home Page',
        title: 'Explore *without limits*',
        lead: 'The Home Page is the dashboard for tracking progress and discovering new challenges. The Performance Snapshot provides a quick overview of a rider’s total distance, time on trails, and completed sections.',
        note: 'The Riding Activity section breaks down recent rides with maps, distance, speed, and duration. Suggested missions keep exploration exciting, while leaderboards boost motivation through friendly competition. The clean, intuitive design makes it easy to stay engaged and track progress effortlessly.',
        tags: ['Performance Snapshot', 'Riding Activity', 'Leaderboard', 'Suggested Missions'],
        phone: {
          asset: 'case-touren-home-phone.webp',
          alt: 'The Touren Home screen: performance snapshot, riding activity on a map and suggested missions',
        },
        leaderboard: {
          asset: 'case-touren-leaderboard.webp',
          alt: 'The Touren leaderboard of riders by distance, with the current rider highlighted in fourth place',
        },
      },
      community: {
        icon: 'chat',
        label: 'Community Page',
        title: 'Connect. *Explore. Achieve.*',
        lead: 'The Community Page allows users track their active missions, discover new ones, and connect with other riders. Each mission includes detailed descriptions, trail info, and participant updates, making it easy to stay informed.',
        note: 'With an intuitive design, users can join missions with a single tap, engage with the community, and stay motivated through shared challenges and achievements.',
        tags: [],
        image: {
          asset: 'case-touren-community.webp',
          alt: 'The Touren Community screen with available missions and the Wilderness Adventure Hunt mission details',
        },
      },
      explore: {
        icon: 'route',
        label: 'Explore Page',
        title: 'Push limits. *Share journeys.*',
        lead: 'The Explore Page clarifies the discovering trails process with an interactive map that shows nearby routes in real time.',
        note: 'Users can filter options quickly by difficulty, terrain, trail status, and user ratings to find the best match for their adventure.',
        tags: ['Trail feed', 'Navigation', 'Search', 'Map View'],
        image: {
          asset: 'case-touren-explore.webp',
          alt: 'The Touren All Trails list next to a photo of a rider in a helmet checking a phone on a motorbike',
        },
      },
      profile: {
        icon: 'helmet',
        label: 'User Profile',
        title: 'Where challenges *become triumphs*',
        lead: 'The User Profile is designed for seamless navigation, giving riders a structured overview of their journey. Users can easily track completed trails, self-created routes, and submitted trail reports, ensuring quick access to their experiences and contributions.',
        note: 'A badge system tracks skill mastery, making achievements rewarding and motivating.',
        tags: ['Activities', 'Badges', 'Notifications', 'Garage'],
        image: {
          asset: 'case-touren-profile.webp',
          alt: 'The Touren profile of Cameron Williamson and the My Badges screen with skill levels',
        },
      },
      navigation: {
        icon: 'home',
        label: 'Trail Navigation',
        title: 'Mission accepted: *explore more*',
        lead: 'The Trail Navigation & Creation System is designed for effortless exploration.',
        note: 'During rides, users can follow trails with clear, adjustable map views and easily access structured trail details.',
        panelText:
          'Once a trail is completed, it’s automatically saved to the user’s history, allowing them to review stats, track progress, and rate their experience. This streamlined approach ensures a smooth, intuitive process of both navigation and trail management.',
        panelTags: ['Manage trails', 'Trail Details', 'Real-Time Tracking', 'Post-Trail Review'],
        slogan: 'Track.\nNavigate.\nConquer.',
        image: {
          asset: 'case-touren-navigation.webp',
          alt: 'Two Touren screens: trail details of Bukki Namzeti Park and live navigation with time, speed and an elevation chart',
        },
      },
      mission: {
        icon: 'home',
        label: 'Mission & Section',
        title: 'Adventure *starts here*',
        lead: 'The Missions & Sections System adds structure and excitement to the off-road experience. Missions are tied to specific trails, offering goal-oriented challenges where riders can earn rewards like TrailCoins.',
        note: 'Sections focus on skill-building, allowing riders to train, compete, and track their performance on technical and physical challenges. These interactive elements keep users engaged, foster progression, and encourage friendly competition, making every ride more rewarding.',
        tags: [
          'Interactive Trail Map',
          'Trail Sections',
          'Trail Mission',
          'Achievement Recognition',
        ],
        section: {
          asset: 'case-touren-mission-section.webp',
          alt: 'The Touren Rocky Ascent section: photo, average score, skills tested and the Create Mission button',
        },
        level: {
          asset: 'case-touren-mission-level.webp',
          alt: 'The Touren level-up screen: the rider reached the maximum Throttle Control level and earned the Master Badge',
        },
      },
      conditions: {
        icon: 'route',
        label: 'Condition Reports',
        title: 'Ride smart. *Stay safe.*',
        lead: 'The Condition Reports feature is crucial for maintaining safety. It keeps riders informed with real-time trail updates, including difficulty ratings and photos, ensuring the information remains accurate and useful.',
        note: 'With a simple submission process, reports are quickly shared with the community, helping everyone prepare for rides, avoid hazards, and enjoy a safer off-road experience.',
        tags: ['Create Reporting', 'Streamlined Selection', 'Feedback'],
        image: {
          asset: 'case-touren-conditions.webp',
          alt: 'A rider on a motocross bike checking a phone next to the Touren Condition Reporting form',
        },
      },
      hazard: {
        icon: 'home',
        label: 'Hazard & Safety Alerts',
        title: 'Stay informed. *Ride confidently.*',
        lead: 'The Hazard & Safety Alerts feature helps riders stay informed of dangers like landslides, fallen trees, and flooding.',
        note: 'Users can report hazards by adding descriptions, GPS coordinates, and photos for accurate updates.',
        image: {
          asset: 'case-touren-hazard.webp',
          alt: 'Two Touren screens: a rockslide hazard on the trail map and the Hazard Report form',
        },
        panelTitle: 'Real-time\nalerts',
        panelText:
          'Alerts are instantly shared on the interactive map and sent as notifications to registered users, ensuring everyone stays informed, avoids risks, and navigates safely. This keeps the community connected and makes off-road adventures safer for all.',
        panelTags: ['Creating hazards', 'Safety Alerts', 'Map Integration'],
      },
      web: {
        icon: 'monitor',
        label: 'Web',
        title: 'Showcasing innovation. *Elevating experience.*',
        lead: 'To help users fully explore the benefits of the app, we developed a website that demonstrates its key features, functionality, and unique characteristics.',
        note: 'It serves as a promotional platform that introduces the product to the audience, emphasizes its competitive advantages, and encourages its use.',
        photo: {
          asset: 'case-touren-web-photo.webp',
          alt: 'Three enduro riders racing through mud on a forest trail',
        },
        photoTitle: 'From idea\nto execution.',
        photoText:
          'Our process makes the transition from research to final implementation smooth, with a focus on user needs, functionality, and aesthetics. By combining strategic analysis, iterative design, and thorough testing, we deliver solutions that are both visually compelling and highly functional.',
        steps: [
          'Analysis',
          'Wireframing',
          'Concept Design',
          'UI/UX Design',
          'Prototyping',
          'Testing & Iteration',
          'Final Implementation',
        ],
        laptop: {
          asset: 'case-touren-web-laptop.webp',
          alt: 'The Touren home page “Endure. Sweat. Share. Gain” on a screen between two dark rocks',
        },
      },
      mobile: {
        phone: {
          asset: 'case-touren-web-phone.webp',
          alt: 'The Touren Trail Scouts page on a phone with the Join the Pride button',
        },
        title: 'Optimized\nfor *mobile*\n*experience*',
        lead: 'Designed with a mobile-first approach, the interface adapts seamlessly to any device, ensuring smooth navigation and easy access to key features. Users can explore trails, engage with the community, and stay updated on the go.',
        note: 'The intuitive layout and responsive design provide a frictionless experience, allowing adventurers to focus on the journey, not the app.',
        year: '2025',
      },
      pages: {
        icon: 'monitor',
        label: 'Web',
        title: 'Seamless digital *experience*',
        lead: 'From exploring new trails to managing subscriptions, every page is crafted for maximal usability and impact.',
        links: ['What’s New', 'Trail Guides', 'Business', 'Subscription'],
        image: {
          asset: 'case-touren-web-pages.webp',
          alt: 'Pages of the Touren website: hero, community, testimonials, app download, brand missions and trail scouts',
        },
      },
      highlights: {
        icon: 'bolt',
        label: 'Project highlights',
        title: 'Project summary: *impact & insights*',
        reviewPhoto: { asset: 'testi-denis-bondar.jpg', alt: 'Denis Bondar' },
        reviewFlag: { asset: 'flag-luxembourg.webp', alt: 'Luxembourg' },
        reviewName: 'Denis Bondar',
        reviewRole: 'Founder, Touren App',
        reviewTitle: 'An excellent UX/UI designers from K&Z!',
        reviewTexts: [
          'Delivered a beautifully crafted, user-friendly mobile app design that exceeded expectations.',
          'Communicative, detail-oriented, and quick to incorporate feedback. Highly recommend for any app design projects!',
        ],
        scopeTitle: 'Project scope',
        scopeText: 'Numbers that define the work.',
        stats: [
          { value: '120+', label: 'Mobile screens' },
          { value: '16', label: 'Flows' },
          { value: '2', label: 'Milestones' },
        ],
        storyTitle: 'Project vision',
        storyText: 'Designed for the bold. Built for adventure.',
        storyNote: 'The road ahead is not always clear, but adventure begins where the path ends.',
        storyPhoto: {
          asset: 'case-touren-story.webp',
          alt: 'An enduro rider splashing through mud towards the camera',
        },
      },
      outro: {
        title: 'Eat veggies, embrace\nUX, and stay tuned.\nSee ya in *the next*\n*case study*',
        team: [
          {
            photo: { asset: 'case-touren-team-vladyslav.webp', alt: 'Vladyslav Kyrieiev' },
            name: 'Vladyslav Kyrieiev',
            role: 'Co-Founder & CEO',
          },
          {
            photo: { asset: 'case-touren-team-nick.webp', alt: 'Nick Zhurenko' },
            name: 'Nick Zhurenko',
            role: 'Co-Founder & Head of Design',
          },
          {
            photo: { asset: 'case-touren-team-alina.webp', alt: 'Alina Tkachenko' },
            name: 'Alina Tkachenko',
            role: 'UX/UI Designer',
          },
          {
            photo: { asset: 'case-touren-team-eleonora.webp', alt: 'Eleonora Shymova' },
            name: 'Eleonora Shymova',
            role: 'UX/UI & Case Study Designer',
          },
          {
            photo: { asset: 'case-touren-team-maks.webp', alt: 'Maks Blyznyuk' },
            name: 'Maks Blyznyuk',
            role: 'Head of Web & Case Study Designer',
          },
          {
            photo: { asset: 'case-touren-team-anna.webp', alt: 'Anna Chagina' },
            name: 'Anna Chagina',
            role: 'Case Study Designer',
          },
        ],
      },
    },
  },
});
