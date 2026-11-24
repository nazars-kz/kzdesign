/**
 * CASE STUDY: Filmtoro (/cases/filmtoro). A unique page: its layout is built for this case
 * (src/site/cases/filmtoro/). Design: the case as it was on the old site (desktop exports
 * `film-desk-*`, phone exports `film-mob-*`); every block is a "slide" with a desktop picture, a
 * phone picture and live text placed on it.
 *
 * Every text and picture is a field. Pictures are the scenes without their texts; texts, labels,
 * the process list, the type specimen and the palette are code. Convention in texts: words in
 * *asterisks* get the coral highlight; in titles a new line starts a new row.
 */
import { definePage, defineSection } from '@/core/content/define';
import { f } from '@/core/content/fields';
import { useShared } from '@/core/content/shared-section';

import { relatedCasesShared } from '../shared/related-cases';
import { caseCardSection } from './card';
import { caseAboutSection, caseIntroSection } from './page-parts';

const HIGHLIGHT_HELP = 'Words in *asterisks* get the coral highlight.';
const TITLE_HELP = 'A new line starts a new row.';
const SCENE_HELP = 'The scene without its texts (the texts are placed on it).';

/** A non-localized picture with an alt text. */
const picture = (label: string, recommendedSize: string, help?: string) =>
  f.image({ label, localized: false, recommendedSize, ...(help ? { help } : {}) });

/** The desktop and the phone picture of a slide. */
const scene = (desktopSize: string, phoneSize: string) => ({
  image: picture('Picture: desktop', desktopSize, SCENE_HELP),
  imagesMobile: f.list({
    label: 'Pictures: phone',
    of: picture('Picture', phoneSize),
    max: 3,
    help: `${SCENE_HELP} Top to bottom: a tall picture is cut into parts of 2400 px at most.`,
  }),
});

const title = (max = 60) =>
  f.textarea({ label: 'Title', required: true, max, rows: 2, help: TITLE_HELP });
const text = (label = 'Text', max = 500) =>
  f.textarea({ label, max, rows: 4, help: HIGHLIGHT_HELP });

const TEXT_TONES = [
  { value: 'light', label: 'Light text' },
  { value: 'dark', label: 'Dark text' },
] as const;

export const filmtoroCase = definePage({
  id: 'case-filmtoro',
  path: '/cases/filmtoro',
  label: 'Filmtoro',
  parent: 'cases',
  adminGroup: 'Case studies',
  uiTexts: ['cases'],
  seo: {
    title: 'Filmtoro: Movie Social Media App UX/UI Case Study | K&Z Design',
    description:
      'UX/UI case study of Filmtoro, a social media app for movie fans: a personal feed, where to watch, trailer reels, reviews, top-10 lists and movie quizzes.',
  },
  structuredData: ({ url, title: name, locale }) => [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name,
      url,
      inLanguage: locale,
      about: 'UX/UI design of a social media mobile app for movie and TV series fans',
      creator: { '@type': 'Organization', name: 'K&Z Design' },
    },
  ],
  sections: [
    caseCardSection(),
    caseIntroSection(),
    defineSection({
      id: 'hero',
      label: 'Hero',
      description: 'The first screen: two phones on the big dim name.',
      fields: scene('2880×2954', '768×2400'),
    }),
    defineSection({
      id: 'about',
      label: 'The challenge and the request',
      fields: {
        title: title(120),
        text: text('Text', 300),
        photos: f.list({
          label: 'Faces next to the request',
          of: picture('Photo', '200×200'),
          max: 3,
        }),
        quote: text('Request of the client', 300),
      },
    }),
    defineSection({
      id: 'process',
      label: 'Design process',
      fields: {
        label: f.text({ label: 'Label', required: true, max: 40 }),
        lead: f.textarea({ label: 'Text', max: 300, rows: 3 }),
        note: f.textarea({ label: 'Small text', max: 300, rows: 3 }),
        groups: f.list({
          label: 'Stages',
          itemLabelField: 'title',
          max: 4,
          of: {
            title: f.text({ label: 'Stage', required: true, max: 60 }),
            items: f.textarea({ label: 'Steps', max: 400, rows: 6, help: 'One step per line.' }),
          },
        }),
      },
    }),
    defineSection({
      id: 'community',
      label: 'Community (phone in hand)',
      fields: {
        ...scene('2880×2177', '768×2400'),
        title: f.text({ label: 'Card: title', required: true, max: 80 }),
        text: f.textarea({ label: 'Card: text', max: 300, rows: 4 }),
      },
    }),
    defineSection({
      id: 'brand',
      label: 'Logo and screens',
      fields: {
        ...scene('2880×1883', '768×2400'),
        logoLabel: f.text({ label: 'Logo: label', max: 20 }),
        menuLabel: f.text({ label: 'Menu view: label', max: 20 }),
      },
    }),
    defineSection({
      id: 'architecture',
      label: 'Info architecture',
      fields: {
        label: f.text({ label: 'Label', required: true, max: 40 }),
        text: text('Text', 400),
        image: picture('Map (desktop)', '2880×2522', SCENE_HELP),
        hubs: f.list({
          label: 'Map on phones',
          itemLabelField: 'name',
          max: 10,
          help: 'Phones show the map as this list.',
          of: {
            name: f.text({ label: 'Screen', required: true, max: 40 }),
            pages: f.text({ label: 'Its parts', max: 240, help: 'Separated by commas.' }),
          },
        }),
      },
    }),
    defineSection({
      id: 'showcase',
      label: 'Profile screens',
      fields: scene('2880×3701', '768×2400'),
    }),
    defineSection({
      id: 'identity',
      label: 'Colors and typography',
      fields: {
        label: f.text({ label: 'Label', required: true, max: 40 }),
        text: f.textarea({ label: 'Text', max: 400, rows: 4 }),
        fontLabel: f.text({ label: 'Typeface: label', max: 30 }),
        sizes: f.list({ label: 'Text sizes', of: f.text({ max: 10 }), display: 'tags', max: 6 }),
        fontName: f.text({ label: 'Typeface name', required: true, max: 20 }),
        fontCredit: f.text({ label: 'Typeface: credit', max: 80 }),
        alphabet: f.textarea({ label: 'Alphabet', max: 120, rows: 3, help: 'One line per row.' }),
        specimen: f.text({ label: 'Big letters', max: 4 }),
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
      },
    }),
    defineSection({
      id: 'home',
      label: 'Home page and navigation',
      fields: {
        ...scene('2880×2846', '768×2400'),
        title: title(),
        lead: f.textarea({ label: 'Text under the title', max: 300, rows: 3 }),
        note: text('Text next to the phones', 300),
        card: f.textarea({ label: 'Text on the dark blue card', max: 300, rows: 4 }),
      },
    }),
    defineSection({
      id: 'discover',
      label: 'Notifications and search',
      fields: {
        ...scene('2880×2433', '768×2400'),
        text: text('Text', 400),
      },
    }),
    defineSection({
      id: 'reels',
      label: 'Reels',
      fields: { ...scene('2880×2646', '768×2400'), title: title(), text: text() },
    }),
    defineSection({
      id: 'posts',
      label: 'Posts',
      fields: {
        ...scene('2880×2144', '768×2400'),
        title: title(),
        lead: text('Text: first paragraph', 300),
        text: text('Text: second paragraph', 300),
        note: text('Small text', 300),
      },
    }),
    defineSection({
      id: 'profile',
      label: 'Profile',
      fields: {
        ...scene('2880×2489', '768×2400'),
        title: title(),
        text: text(),
        note: text('Text next to the K&Z sign', 300),
      },
    }),
    defineSection({
      id: 'details',
      label: 'Details pages',
      fields: { title: title(), lead: text('Text', 400), note: text('Small text', 400) },
    }),
    defineSection({
      id: 'create',
      label: 'Create posts',
      fields: {
        ...scene('2880×2426', '768×2400'),
        title: title(),
        text: text(),
        note: text('Text next to the K&Z sign', 300),
      },
    }),
    defineSection({
      id: 'lists',
      label: 'Create post lists',
      fields: {
        ...scene('2880×3555', '768×2400'),
        title: title(),
        text: text(),
        note: text('Small text', 300),
      },
    }),
    defineSection({
      id: 'quizzes',
      label: 'Quizzes',
      fields: {
        ...scene('2880×2910', '768×2400'),
        title: title(),
        text: text(),
        note: text('Small text', 400),
      },
    }),
    caseAboutSection(),
    useShared(relatedCasesShared),
  ],
  seed: {
    en: {
      card: {
        order: 4,
        title: 'Filmtoro',
        description: 'Social media app for movie fans: reviews, top lists, trailers and quizzes',
        tags: ['Mobile App', 'Social Media', 'B2C'],
        cover: {
          asset: 'case-filmtoro-cover.webp',
          alt: 'Two Filmtoro phones on a dark red background: the Dune: Part Two page and the search',
        },
        coverMobile: {
          asset: 'case-filmtoro-cover-mobile.webp',
          alt: 'The Filmtoro movie page and search on two phones',
        },
        categories: ['Mobile', 'B2C', 'Social Media'],
        showOnHome: false,
        homeOrder: 4,
        industries: ['social'],
        industryThumb: { asset: 'case-filmtoro-thumb.webp', alt: 'The Filmtoro app icon' },
        industryOrder: 2,
      },
      intro: {
        title: 'Filmtoro – Social Media App for Movie Fans',
        details: [
          { label: 'Industry', value: 'Social Media' },
          { label: 'Platform', value: 'Mobile App' },
          { label: 'Year', value: '2024' },
        ],
        quote: '',
        author: '',
        authorRole: '',
      },
      hero: {
        image: {
          asset: 'case-filmtoro-hero.webp',
          alt: 'Two Filmtoro screens on the big word Filmtoro: the Dune: Part Two page with tags and cast, and the search with streaming services',
        },
        imagesMobile: [
          {
            asset: 'case-filmtoro-hero-mobile.webp',
            alt: 'Two Filmtoro screens: the Dune: Part Two page and the search with streaming services',
          },
        ],
      },
      about: {
        title: 'The challenge wasn’t\njust to design another\nmovie database',
        text: 'it was to build a platform where users could actively engage, discover films in new ways, and easily find streaming options.',
        photos: [
          { asset: 'case-filmtoro-team-vladyslav.webp', alt: 'Vladyslav Kyrieiev' },
          { asset: 'case-filmtoro-team-nick.webp', alt: 'Nick Zhurenko' },
        ],
        quote:
          'Our client asked us to create a mobile app that would *outshine competitors by offering movie* lovers a more interactive and community-driven experience.',
      },
      process: {
        label: 'Design Process',
        lead: 'We carefully worked through each step of the design process, keeping real user needs at the center.',
        note: 'With extensive research, testing, and thoughtful decision-making, we turned complex ideas into a practical and user-friendly app.',
        groups: [
          { title: 'Discovery:', items: 'Competitors Analysis' },
          {
            title: 'Strategy (blueprint):',
            items:
              'Persona & User Journey Mapping\nInformation Architecture\nFeature Prioritization\nDesign Roadmap',
          },
          {
            title: 'UX/UI Design (The DESIGN, finally):',
            items:
              'Iterative wireframing\nVisual Style & Design System\nHigh Fidelity Design\nUser Testing\nPre-Development Preparation & hand-off\nDevelopment Support & Post-Development Testing',
          },
          { title: 'Prototyping', items: 'Interactive (Clickable) Prototypes\nAnimated Video' },
        ],
      },
      community: {
        image: {
          asset: 'case-filmtoro-community-hand.webp',
          alt: 'A hand in a black glove holds a phone with the Filmtoro feed; a post about Doctor Who is shown enlarged next to it',
        },
        imagesMobile: [
          {
            asset: 'case-filmtoro-community-mobile.webp',
            alt: 'A hand in a black glove holds a phone with the Filmtoro feed and an enlarged post about Doctor Who',
          },
        ],
        title: 'Share Your Thoughts on Movies With the Community',
        text: 'Movies spark emotions and insights — now you have the perfect space to discuss them. Connect, comment, and discover different perspectives in a lively film-loving community.',
      },
      brand: {
        image: {
          asset: 'case-filmtoro-brand.webp',
          alt: 'The Filmtoro app icon, the icon on an iPhone home screen and the page of Timothée Chalamet with his top movies',
        },
        imagesMobile: [
          {
            asset: 'case-filmtoro-brand-mobile.webp',
            alt: 'The Filmtoro app icon, the icon on an iPhone home screen and the page of Timothée Chalamet',
          },
        ],
        logoLabel: 'Logo',
        menuLabel: 'Menu view',
      },
      architecture: {
        label: 'Info Architecture',
        text: 'We structured the app based on actual user behavior to make navigation simple and intuitive. By organizing content *into clear flows and logical sections,* we established a system that assists users in quickly finding what they prefer, and keeps them engaged with the platform.',
        image: {
          asset: 'case-filmtoro-architecture-map.webp',
          alt: 'The Filmtoro information architecture: Home page, Search page, Quizzes, Posts, Notifications, Create posts, Details pages and Profile with their parts',
        },
        hubs: [
          {
            name: 'Home page',
            pages:
              'Top-10 films, Review posts, New trailers (reels), Where to watch, Classic posts, Report user or post, Blog post',
          },
          {
            name: 'Search page',
            pages: 'Personalized feed, Where to watch, Search, Filter and sort',
          },
          {
            name: 'Quizzes',
            pages:
              'Quiz result, Correct answers, Leaderboard, Quiz description, Themed questions and quizzes',
          },
          { name: 'Posts', pages: 'Blog post, Review, List, Classic post' },
          {
            name: 'Notifications',
            pages: 'Discovering new content, Tracking users activity, Responding to interactions',
          },
          {
            name: 'Create posts',
            pages:
              'Select type of post, Post message, Gif, Film rating, Film selection for the list',
          },
          {
            name: 'Details pages',
            pages:
              'New film recommendations, Similar films, Cast, Details about film, Video player',
          },
          {
            name: 'Profile',
            pages:
              'Manage profile, Watch dog, Posts, Followers & following lists, My lists, Saved, Created posts',
          },
        ],
      },
      showcase: {
        image: {
          asset: 'case-filmtoro-showcase.webp',
          alt: 'Two tilted phones with a review in the feed and a profile, the lists tab among sparks, the House of the Dragon poster and cinema showtimes',
        },
        imagesMobile: [
          {
            asset: 'case-filmtoro-showcase-mobile.webp',
            alt: 'Tilted phones with a review and a profile, the lists tab, the House of the Dragon poster and cinema showtimes',
          },
        ],
      },
      identity: {
        label: 'Colors and Typography',
        text: 'The Geist typeface together with balanced color palette create a clean, modern, and cinematic vibe. The mindful design improves readability, strengthens emotional connection, and makes the app experience enjoyable and captivating for film lovers.',
        fontLabel: 'Typeface',
        sizes: ['32px', '30px', '20px', '16px', '12px'],
        fontName: 'Geist',
        fontCredit: 'Designed by Vercel, Basement Studio',
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz\n0123456789!@#$%^&*()_+',
        specimen: 'Aa',
        swatches: [
          { name: 'Blue', hex: '#164364', tone: 'light' },
          { name: 'Dark Blue', hex: '#091A28', tone: 'light' },
          { name: 'White', hex: '#FFFFFF', tone: 'dark' },
          { name: 'Coral', hex: '#F15262', tone: 'dark' },
        ],
      },
      home: {
        image: {
          asset: 'case-filmtoro-home.webp',
          alt: 'Two tilted Filmtoro phones among sparks: the top-10 films and TV shows and the home feed with streaming services',
        },
        imagesMobile: [
          {
            asset: 'case-filmtoro-home-mobile-1.webp',
            alt: 'Two tilted Filmtoro phones among sparks and the notifications screen',
          },
          {
            asset: 'case-filmtoro-home-mobile-2.webp',
            alt: 'Two tilted Filmtoro phones among sparks and the notifications screen (continued)',
          },
        ],
        title: 'Home Page &\nmain navigation',
        lead: 'The Filmtoro Home Page is designed for smooth exploration and interaction, keeping movie and series enthusiasts engaged.',
        note: '*It highlights trending content*, user reviews, and personalized recommendations, making it easy to navigate through over 30,000 titles.',
        card: 'Well-structured sections like “New Trailers” and “Top 10 Films & TV Shows” keep users up to date on the latest releases. A streaming filter optimizes content discovery by showing where movies are available to watch instantly.',
      },
      discover: {
        image: {
          asset: 'case-filmtoro-discover.webp',
          alt: 'The Filmtoro notifications on a dark panel and the search with streaming services on a coral panel',
        },
        imagesMobile: [
          {
            asset: 'case-filmtoro-discover-mobile.webp',
            alt: 'The Filmtoro search with streaming services on a coral panel',
          },
        ],
        text: 'The dark mode design enhances readability and gives the app a cinematic feel. The Reels feature lets users discover trailers effortlessly with intuitive gestures and controls. Every detail is crafted to make discovering movies simple, social, and engaging.',
      },
      reels: {
        image: {
          asset: 'case-filmtoro-reels.webp',
          alt: 'Two Filmtoro reels over a dim ship deck: the Pirates of the Caribbean trailer and the Shōgun trailer with the hint to swipe up',
        },
        imagesMobile: [
          {
            asset: 'case-filmtoro-reels-mobile.webp',
            alt: 'The Pirates of the Caribbean trailer in Filmtoro reels',
          },
        ],
        title: 'Reels',
        text: 'The reels feature makes trailer discovery quick and immersive. With smooth navigation, users can easily browse and *watch without interruptions,* enhancing engagement while maintaining a clean, visually appealing interface.',
      },
      posts: {
        image: {
          asset: 'case-filmtoro-posts.webp',
          alt: 'The Filmtoro feed with a review and the top-10 list and blog posts sliding out next to it',
        },
        imagesMobile: [
          {
            asset: 'case-filmtoro-posts-mobile.webp',
            alt: 'The Filmtoro feed with a review and more posts next to it',
          },
        ],
        title: 'Posts',
        lead: 'Our app’s post system makes sharing and exploring movie content easy and interactive.',
        text: 'Users can publish quick updates, create posts for rankings like “Top 10 lists”, write detailed reviews, or share blog-style stories — all in a format that suits their style',
        note: 'Beyond content management, the profile fosters meaningful connections — users can interact with followers, explore shared interests, and build their own identity within the community.',
      },
      profile: {
        image: {
          asset: 'case-filmtoro-profile.webp',
          alt: 'The posts tab of a Filmtoro profile on a coral panel and the followers list',
        },
        imagesMobile: [
          {
            asset: 'case-filmtoro-profile-mobile-1.webp',
            alt: 'The Filmtoro followers list and the posts tab of a profile on coral',
          },
          {
            asset: 'case-filmtoro-profile-mobile-2.webp',
            alt: 'The Filmtoro followers list and the posts tab of a profile on coral (continued)',
          },
        ],
        title: 'Profile',
        text: 'The Profile View is designed as a central hub where users can manage content, interact with the community, and personalize their experience. It seamlessly integrates watchlists, custom lists, and saved posts, making it easy to track activity.',
        note: '*Beyond content management,* the profile fosters meaningful connections — users can interact with followers, explore shared interests, and build their own identity within the community.',
      },
      details: {
        title: 'Details pages',
        lead: 'The Details Page provides users with all the key information about a movie in one place. It includes the cast, plot summary, trailers, and the latest news, making it easy to explore.',
        note: 'For convenience, the page shows where to watch the movie, including available streaming platforms, theaters, formats, and language options. Everything is structured to make finding relevant details quick and effortless.',
      },
      create: {
        image: {
          asset: 'case-filmtoro-create.webp',
          alt: 'Three Filmtoro post editors on a dark red background: a post with a picture, a top-10 list and a review with stars',
        },
        imagesMobile: [
          {
            asset: 'case-filmtoro-create-mobile-1.webp',
            alt: 'Filmtoro post editors: a top-10 list, a post with a picture and a review with stars',
          },
          {
            asset: 'case-filmtoro-create-mobile-2.webp',
            alt: 'Filmtoro post editors: a top-10 list, a post with a picture and a review with stars (continued)',
          },
        ],
        title: 'Create posts',
        text: 'The Create Post feature is designed to be flexible and easy to use, enabling users to share content in their preferred way. Whether posting a quick thought, a ranked list, or an in-depth review, the intuitive interface provides structured formatting, interactive elements, and engagement tools to enhance every post.',
        note: 'By encouraging creativity and interaction, this feature helps users connect, contribute, and be part of a vibrant movie-loving community.',
      },
      lists: {
        image: {
          asset: 'case-filmtoro-lists.webp',
          alt: 'Creating a Filmtoro list: searching for a film to add, and the lists tab of a profile on a tilted phone on coral',
        },
        imagesMobile: [
          {
            asset: 'case-filmtoro-lists-mobile-1.webp',
            alt: 'Creating a Filmtoro list and the lists tab of a profile on a tilted phone',
          },
          {
            asset: 'case-filmtoro-lists-mobile-2.webp',
            alt: 'Creating a Filmtoro list and the lists tab of a profile on a tilted phone (continued)',
          },
        ],
        title: 'Create post lists',
        text: 'The Create Post Lists feature allows users to easily share and organize their favorite movies and series in a structured way. With simple search, ranking, and customization options, users can quickly build lists that reflect their personal taste.',
        note: 'This feature helps users *share their favorites while encouraging* discovery and interaction, making the app’s community more engaging and connected.',
      },
      quizzes: {
        image: {
          asset: 'case-filmtoro-quizzes.webp',
          alt: 'Three Filmtoro quiz screens among sparks: the ranking of players, a question and the result of 80 percent',
        },
        imagesMobile: [
          {
            asset: 'case-filmtoro-quizzes-mobile-1.webp',
            alt: 'Filmtoro quiz screens: the ranking of players, a question and the result',
          },
          {
            asset: 'case-filmtoro-quizzes-mobile-2.webp',
            alt: 'Filmtoro quiz screens: the ranking of players, a question and the result (continued)',
          },
        ],
        title: 'Quizzes',
        text: 'The Quiz Flow makes movie trivia fun, interactive, and competitive. Users can test their knowledge, receive instant feedback, and track their ranking on the leaderboard.',
        note: 'Smooth navigation enables easy question answering and result checking, while rankings and performance insights motivate users to improve and play again. This feature turns simple quizzes into an engaging and rewarding experience that encourages users to come back.',
      },
      'about-project': {
        title: 'About the Filmtoro project',
        text: 'Filmtoro is a social media mobile app for movie and TV series fans: a place to discover films, find out where to watch them and talk about them with other movie lovers.\nK&Z Design designed the app from discovery to hand-off: competitor analysis, personas and user journeys, information architecture, wireframes, a visual style and design system, high fidelity screens, user testing and clickable prototypes. Users follow a personal feed, filter titles by streaming service, watch trailers as reels, publish posts, reviews, blog stories and top-10 lists, build their profile and compete in movie quizzes.',
        links: [
          { label: 'Mobile app design services', href: '/services/mobile', external: false },
          { label: 'All case studies', href: '/cases', external: false },
        ],
      },
    },
  },
});
