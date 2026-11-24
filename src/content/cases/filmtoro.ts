/**
 * CASE STUDY: Filmtoro (/cases/filmtoro). A unique page: its layout is built for this case
 * (src/site/cases/filmtoro/). Design: design/cases/filmtoro (Frame.png and assets, not committed).
 *
 * Every text and picture is a field. Product screens, phone mockups and the photo scenes are
 * images; the rest (project facts, process list, community card, site map list for phones, type
 * specimen, palette, panels, team) is code. Convention in titles: a new line starts a new row and
 * words in *asterisks* get the coral accent.
 */
import { definePage, defineSection } from '@/core/content/define';
import { f } from '@/core/content/fields';
import { useShared } from '@/core/content/shared-section';

import { relatedCasesShared } from '../shared/related-cases';
import { caseCardSection } from './card';
import { caseAboutSection, caseIntroSection } from './page-parts';

const TITLE_HELP = 'A new line starts a new row; words in *asterisks* are coral.';
const PHONE = 'A transparent PNG of the phone with its shadow.';

/** The picture of a screen / mockup: a non-localized image with an alt text. */
const picture = (label: string, recommendedSize: string, help?: string) =>
  f.image({ label, localized: false, recommendedSize, ...(help ? { help } : {}) });

/** The head of a block: title (h2), the bigger text and the small text. */
const head = (options: { lead?: boolean; note?: boolean } = {}) => ({
  title: f.textarea({ label: 'Title', required: true, max: 80, rows: 2, help: TITLE_HELP }),
  ...(options.lead === false
    ? {}
    : { lead: f.textarea({ label: 'Text', max: 500, rows: 4, help: 'The bigger text.' }) }),
  ...(options.note === false
    ? {}
    : { note: f.textarea({ label: 'Small text', max: 500, rows: 4 }) }),
});

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
      description: 'The first screen: the project facts, the big name and two phones.',
      fields: {
        facts: f.list({
          label: 'Project facts',
          itemLabelField: 'label',
          max: 6,
          of: {
            label: f.text({ label: 'Name', required: true, max: 30 }),
            value: f.text({ label: 'Value', required: true, max: 40 }),
          },
        }),
        name: f.text({ label: 'Big name', max: 20, help: 'The dim word behind the phones.' }),
        phones: picture('Phones', '1306×1896', PHONE),
      },
    }),
    defineSection({
      id: 'about',
      label: 'About',
      fields: {
        label: f.text({ label: 'Label', max: 30 }),
        lead: f.textarea({ label: 'Text', required: true, max: 300, rows: 3 }),
        note: f.textarea({ label: 'Small text', max: 400, rows: 3 }),
      },
    }),
    defineSection({
      id: 'process',
      label: 'Design process',
      fields: {
        ...head(),
        groups: f.list({
          label: 'Stages',
          itemLabelField: 'title',
          max: 6,
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
        scene: picture('Scene', '2880×2160', 'The phone in a hand with the post card, on posters.'),
        icon: picture('Card: app icon', '100×100'),
        title: f.text({ label: 'Card: title', required: true, max: 80 }),
        text: f.textarea({ label: 'Card: text', max: 300, rows: 4 }),
      },
    }),
    defineSection({
      id: 'brand',
      label: 'Logo and screens',
      fields: {
        logoLabel: f.text({ label: 'Logo: label', max: 30 }),
        logo: picture('Logo', '420×420'),
        phone: picture('Phone tile', '1296×1650', 'The whole right tile with its background.'),
        menuLabel: f.text({ label: 'Menu view: label', max: 30 }),
        menu: picture('Menu view', '950×800', 'Sits on the right of the tile.'),
      },
    }),
    defineSection({
      id: 'architecture',
      label: 'Info architecture',
      fields: {
        ...head({ lead: false }),
        map: picture('Map', '2640×1922', 'Shown from 1024 px; phones show the list below.'),
        hubs: f.list({
          label: 'Map on phones',
          itemLabelField: 'name',
          max: 10,
          help: 'The same map as a list, shown on phones and read by search engines.',
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
      fields: {
        tile: picture('Profile on a phone', '2640×2795'),
        bento: picture('Lists, poster and cinemas', '2640×1746'),
      },
    }),
    defineSection({
      id: 'identity',
      label: 'Colors and typography',
      fields: {
        ...head({ lead: false }),
        fontLabel: f.text({ label: 'Typeface: label', max: 30 }),
        sizes: f.list({ label: 'Text sizes', of: f.text({ max: 10 }), display: 'tags', max: 6 }),
        fontName: f.text({ label: 'Typeface name', required: true, max: 20 }),
        fontCredit: f.text({ label: 'Typeface: credit', max: 80 }),
        alphabet: f.textarea({
          label: 'Alphabet',
          max: 120,
          rows: 3,
          help: 'One line per row.',
        }),
        specimen: f.text({ label: 'Big letters', max: 4 }),
        swatches: f.list({
          label: 'Palette',
          itemLabelField: 'name',
          max: 6,
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
        ...head(),
        phones: picture('Phones', '2640×1958', PHONE),
        searchPhone: picture('Search: phone on coral', '798×1636', PHONE),
        notificationsPhone: picture('Notifications: phone', '617×1690', PHONE),
        discoverNote: f.textarea({ label: 'Text next to the notifications', max: 400, rows: 4 }),
      },
    }),
    defineSection({
      id: 'reels',
      label: 'Reels',
      fields: {
        ...head({ lead: false }),
        background: picture('Background', '2880×2555', 'Fades to the page color at the bottom.'),
        phones: picture('Phones', '2640×1956', PHONE),
      },
    }),
    defineSection({
      id: 'posts',
      label: 'Posts',
      fields: {
        ...head(),
        phones: picture('Phones', '2640×1722', PHONE),
      },
    }),
    defineSection({
      id: 'profile',
      label: 'Profile',
      fields: {
        ...head(),
        followersPhone: picture('Followers: phone', '617×1690', PHONE),
        postsPhone: picture('Posts: phone on coral', '586×1200', PHONE),
      },
    }),
    defineSection({
      id: 'create',
      label: 'Create posts',
      fields: {
        ...head(),
        post: picture('Post', '694×1422', PHONE),
        list: picture('List post', '694×1422', PHONE),
        review: picture('Review', '694×1422', PHONE),
        gif: picture('Gif search', '694×1422', PHONE),
      },
    }),
    defineSection({
      id: 'lists',
      label: 'Create post lists',
      fields: {
        ...head(),
        tile: picture('Create list: big', '1515×1862', 'The tile with its background.'),
        phone: picture('Create list: phone', '694×1422', PHONE),
        bandPhone: picture('Phone on coral', '1968×2967', 'Cut by the coral band.'),
      },
    }),
    defineSection({
      id: 'quizzes',
      label: 'Quizzes',
      fields: {
        ...head(),
        intro: picture('Quiz', '699×1434', PHONE),
        ranking: picture('Ranking', '699×1434', PHONE),
        question: picture('Question', '699×1434', PHONE),
        result: picture('Result', '699×1434', PHONE),
      },
    }),
    defineSection({
      id: 'outro',
      label: 'Team',
      fields: {
        title: f.textarea({ label: 'Title', required: true, max: 160, rows: 4, help: TITLE_HELP }),
        word: f.text({ label: 'Word behind the team', max: 12, help: 'Repeated along the line.' }),
        team: f.list({
          label: 'Team',
          itemLabelField: 'name',
          max: 12,
          of: {
            photo: picture('Photo', '200×200'),
            name: f.text({ label: 'Name', required: true, max: 60 }),
            role: f.text({ label: 'Role', max: 80 }),
          },
        }),
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
        industryThumb: {
          asset: 'case-filmtoro-thumb.webp',
          alt: 'The Filmtoro app icon',
        },
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
        facts: [
          { label: 'Made by', value: 'K&Z Design' },
          { label: 'Date', value: '2024' },
          { label: 'Service', value: 'UX/UI Design' },
          { label: 'Product', value: 'Mobile App' },
          { label: 'Industry', value: 'Social Media' },
        ],
        name: 'Filmtoro',
        phones: {
          asset: 'case-filmtoro-hero-phones.webp',
          alt: 'Two Filmtoro screens: the Dune: Part Two page with tags and cast, and the search with streaming services',
        },
      },
      about: {
        label: 'About',
        lead: 'Our client asked us to create a mobile app that would outshine competitors by offering movie lovers a more interactive and community-driven experience.',
        note: 'The challenge wasn’t just to design another movie database — it was to build a platform where users could actively engage, discover films in new ways, and easily find streaming options.',
      },
      process: {
        title: 'Design Process',
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
          {
            title: 'Prototyping',
            items: 'Interactive (Clickable) Prototypes\nAnimated Video',
          },
        ],
      },
      community: {
        scene: {
          asset: 'case-filmtoro-community.webp',
          alt: 'A hand in a black glove holds a phone with the Filmtoro feed; a post about Doctor Who is shown enlarged next to it',
        },
        icon: { asset: 'case-filmtoro-icon.webp', alt: 'The Filmtoro app icon' },
        title: 'Share Your Thoughts on Movies With the Community',
        text: 'Movies spark emotions and insights — now you have the perfect space to discuss them. Connect, comment, and discover different perspectives in a lively film-loving community.',
      },
      brand: {
        logoLabel: 'Logo',
        logo: {
          asset: 'case-filmtoro-logo.webp',
          alt: 'The Filmtoro app icon: a white bull head mark on a coral rounded square',
        },
        phone: {
          asset: 'case-filmtoro-artist-phone.webp',
          alt: 'The Filmtoro page of Timothée Chalamet with his top movies',
        },
        menuLabel: 'Menu view',
        menu: {
          asset: 'case-filmtoro-menu-view.webp',
          alt: 'The Filmtoro icon on an iPhone home screen next to Calendar, Photos, Mail and Notes',
        },
      },
      architecture: {
        title: 'Info Architecture',
        note: 'We structured the app based on actual user behavior to make navigation simple and intuitive. By organizing content into clear flows and logical sections, we established a system that assists users in quickly finding what they prefer, and keeps them engaged with the platform.',
        map: {
          asset: 'case-filmtoro-architecture.webp',
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
        tile: {
          asset: 'case-filmtoro-profile-tile.webp',
          alt: 'A tilted phone with the Filmtoro profile: followers, bio and the saved House of the Dragon post',
        },
        bento: {
          asset: 'case-filmtoro-profile-bento.webp',
          alt: 'The profile lists tab among sparks, the House of the Dragon poster and cinema showtimes with languages and prices',
        },
      },
      identity: {
        title: 'Colors and\nTypography',
        note: 'The Geist typeface together with balanced color palette create a clean, modern, and cinematic vibe. The mindful design improves readability, strengthens emotional connection, and makes the app experience enjoyable and captivating for film lovers.',
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
        title: 'Home Page and\nmain navigation',
        lead: 'The Filmtoro Home Page is designed for smooth exploration and interaction, keeping movie and series enthusiasts engaged. It highlights trending content, user reviews, and personalized recommendations, making it easy to navigate through over 30,000 titles.',
        note: 'Well-structured sections like “New Trailers” and “Top 10 Films & TV Shows” keep users up to date on the latest releases. A streaming filter optimizes content discovery by showing where movies are available to watch instantly.',
        phones: {
          asset: 'case-filmtoro-home-phones.webp',
          alt: 'Three Filmtoro screens: a profile with saved posts, the home feed with streaming services and the top-10 films and TV shows',
        },
        searchPhone: {
          asset: 'case-filmtoro-search-phone.webp',
          alt: 'The Filmtoro search: streaming services and movie cards with likes and saves',
        },
        notificationsPhone: {
          asset: 'case-filmtoro-notifications-phone.webp',
          alt: 'The Filmtoro notifications: news about new movies and series with their posters',
        },
        discoverNote:
          'The dark mode design enhances readability and gives the app a cinematic feel. The Reels feature lets users discover trailers effortlessly with intuitive gestures and controls. Every detail is crafted to make discovering movies simple, social, and engaging.',
      },
      reels: {
        title: 'Reels',
        note: 'The reels feature makes trailer discovery quick and immersive. With smooth navigation, users can easily browse and watch without interruptions, enhancing engagement while maintaining a clean, visually appealing interface.',
        background: {
          asset: 'case-filmtoro-reels-bg.webp',
          alt: 'A dim still of a woman in armour on the deck of a sailing ship',
        },
        phones: {
          asset: 'case-filmtoro-reels-phones.webp',
          alt: 'Two Filmtoro reels: the Shōgun trailer with the hint to swipe up for more trailers, and the Pirates of the Caribbean trailer',
        },
      },
      posts: {
        title: 'Posts',
        lead: 'Our app’s post system makes sharing and exploring movie content easy and interactive. Users can publish quick updates, create posts for rankings like “Top 10 lists”, write detailed reviews, or share blog-style stories — all in a format that suits their style.',
        note: 'Whether users want to share a quick thought or dive deep into a review, the system makes it effortless to connect, express, and discover new films while fostering a vibrant and engaged community of movie lovers.',
        phones: {
          asset: 'case-filmtoro-posts-phones.webp',
          alt: 'Three Filmtoro feeds: a blog post about the Deadpool and Wolverine trailer, a review with a star rating and a top-10 list',
        },
      },
      profile: {
        title: 'Profile',
        lead: 'The Profile View is designed as a central hub where users can manage content, interact with the community, and personalize their experience. It seamlessly integrates watchlists, custom lists, and saved posts, making it easy to track activity.',
        note: 'Beyond content management, the profile fosters meaningful connections — users can interact with followers, explore shared interests, and build their own identity within the community.',
        followersPhone: {
          asset: 'case-filmtoro-followers-phone.webp',
          alt: 'The Filmtoro followers list with Follow and Unfollow buttons',
        },
        postsPhone: {
          asset: 'case-filmtoro-profile-posts-phone.webp',
          alt: 'The posts tab of a Filmtoro profile',
        },
      },
      create: {
        title: 'Create posts',
        lead: 'The Create Post feature is designed to be flexible and easy to use, enabling users to share content in their preferred way. Whether posting a quick thought, a ranked list, or an in-depth review, the intuitive interface provides structured formatting, interactive elements, and engagement tools to enhance every post.',
        note: 'By encouraging creativity and interaction, this feature helps users connect, contribute, and be part of a vibrant movie-loving community.',
        post: {
          asset: 'case-filmtoro-create-post.webp',
          alt: 'Creating a Filmtoro post: a message with a picture and the Publish a post button',
        },
        list: {
          asset: 'case-filmtoro-create-list-post.webp',
          alt: 'Creating a list post: the chosen top-10 list and a message',
        },
        review: {
          asset: 'case-filmtoro-create-review.webp',
          alt: 'Creating a review: the film, a four-star rating and the message',
        },
        gif: {
          asset: 'case-filmtoro-create-gif.webp',
          alt: 'Searching for a gif to add to a post',
        },
      },
      lists: {
        title: 'Create post lists',
        lead: 'The Create Post Lists feature allows users to easily share and organize their favorite movies and series in a structured way. With simple search, ranking, and customization options, users can quickly build lists that reflect their personal taste.',
        note: 'This feature helps users share their favorites while encouraging discovery and interaction, making the app’s community more engaging and connected.',
        tile: {
          asset: 'case-filmtoro-list-tile.webp',
          alt: 'Creating a list: searching for a film to add as number one',
        },
        phone: {
          asset: 'case-filmtoro-create-list.webp',
          alt: 'A finished list of four films: Dune: Part Two, The Matrix, The Good, the Bad and the Ugly, Seven Samurai',
        },
        bandPhone: {
          asset: 'case-filmtoro-lists-phone.webp',
          alt: 'The lists tab of a Filmtoro profile on a tilted phone',
        },
      },
      quizzes: {
        title: 'Quizzes',
        lead: 'The Quiz Flow makes movie trivia fun, interactive, and competitive. Users can test their knowledge, receive instant feedback, and track their ranking on the leaderboard.',
        note: 'Smooth navigation enables easy question answering and result checking, while rankings and performance insights motivate users to improve and play again. This feature turns simple quizzes into an engaging and rewarding experience that encourages users to come back.',
        intro: {
          asset: 'case-filmtoro-quiz-intro.webp',
          alt: 'A Filmtoro quiz about The Hobbit and The Lord of the Rings',
        },
        ranking: {
          asset: 'case-filmtoro-quiz-ranking.webp',
          alt: 'The ranking of movie quiz players and more quizzes',
        },
        question: {
          asset: 'case-filmtoro-quiz-question.webp',
          alt: 'A quiz question with three answers and the progress bar',
        },
        result: {
          asset: 'case-filmtoro-quiz-result.webp',
          alt: 'The quiz result: 80 percent with the correct and wrong answers',
        },
      },
      outro: {
        title: 'Eat veggies, embrace UX,\nand stay tuned.\n*See ya in the next*\n*case study.*',
        word: 'Team.',
        team: [
          {
            photo: { asset: 'case-filmtoro-team-vladyslav.webp', alt: 'Vladyslav Kyrieiev' },
            name: 'Vladyslav Kyrieiev',
            role: 'Co-Founder & CEO',
          },
          {
            photo: { asset: 'case-filmtoro-team-nick.webp', alt: 'Nick Zhurenko' },
            name: 'Nick Zhurenko',
            role: 'Co-Founder & Head of Design',
          },
          {
            photo: { asset: 'case-filmtoro-team-alina.webp', alt: 'Alina Tkachenko' },
            name: 'Alina Tkachenko',
            role: 'UX/UI Designer',
          },
          {
            photo: { asset: 'case-filmtoro-team-eleonora.webp', alt: 'Eleonora Shymova' },
            name: 'Eleonora Shymova',
            role: 'UX/UI & Case Designer',
          },
          {
            photo: { asset: 'case-filmtoro-team-vlada.webp', alt: 'Vlada Hetun' },
            name: 'Vlada Hetun',
            role: 'Case Designer',
          },
          {
            photo: { asset: 'case-filmtoro-team-dasha.webp', alt: 'Dasha Popadynets' },
            name: 'Dasha Popadynets',
            role: 'Case Designer',
          },
          {
            photo: { asset: 'case-filmtoro-team-anastasiia.webp', alt: 'Anastasiia Husieva' },
            name: 'Anastasiia Husieva',
            role: 'Motion Designer',
          },
          {
            photo: { asset: 'case-filmtoro-team-maksim.webp', alt: 'Maksim Blyznyuk' },
            name: 'Maksim Blyznyuk',
            role: 'Head of Web / Case Study Designer',
          },
        ],
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
