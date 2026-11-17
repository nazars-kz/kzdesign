/**
 * COLLECTION: services (SaaS, Mobile, Web, …). One template page per service at
 * /services/<slug>; editors add new services in Pages → Blog & lists → Services
 * and they appear in the menu, in the footer and on the Home tabs automatically.
 * See docs/CONTENT_SCHEMA.md § Collections.
 */
import { defineCollection, MissingTranslation } from '@/core/content/collection';
import { f } from '@/core/content/fields';

export const services = defineCollection({
  id: 'services',
  label: 'Services',
  itemLabel: 'Service',
  listPageId: 'services',
  itemPath: '/services/:slug',
  uiTexts: ['services', 'preview'],
  fields: {
    order: f.number({
      label: 'Order',
      localized: false,
      integer: true,
      min: 1,
      help: 'Position in the menu and in the lists: 1 is first.',
    }),
    navLabel: f.text({
      label: 'Name in the menu',
      required: true,
      max: 40,
      help: 'Short name shown in the Services menu and in the breadcrumbs, e.g. “SaaS”.',
    }),
    menuTitle: f.text({
      label: 'Menu: card title',
      max: 40,
      help: 'Title on the card of the Services menu and in the footer, e.g. “SaaS web apps”.',
    }),
    menuImage: f.image({
      label: 'Menu: card picture',
      localized: false,
      recommendedSize: '640×400',
      help: 'Cover of the card in the Services menu.',
    }),
    title: f.text({ label: 'Page title (H1)', required: true, max: 120 }),
    description: f.textarea({
      label: 'Short description',
      max: 400,
      help: 'Also the default meta description of the page.',
    }),
    pillLabel: f.text({
      label: 'Home: short tab name',
      max: 20,
      help: 'Button label of the Services block on phones, e.g. “Saas”.',
    }),
    homeTitle: f.text({
      label: 'Home: title',
      max: 60,
      help: 'Title of the service in the Home “Our Services” block and its tab name.',
    }),
    homeText: f.textarea({ label: 'Home: description', max: 500 }),
    homeItems: f.list({
      label: 'Home: what we do',
      of: f.text({ max: 80 }),
      max: 8,
      help: 'The numbered list on the right of the Home “Our Services” block.',
    }),
    heroImage: f.image({
      label: 'Page: top picture',
      localized: false,
      recommendedSize: '2880×950',
      help: 'The wide picture above the title.',
    }),
    about: f.list({
      label: 'Page: About',
      of: f.textarea({ max: 700, rows: 4 }),
      max: 4,
      help: 'The paragraphs of the About block.',
    }),
    founders: f.list({
      label: 'Page: founders',
      itemLabelField: 'name',
      max: 4,
      help: 'Shown under the About text. Leave empty to hide.',
      of: {
        photo: f.image({ label: 'Photo', localized: false, recommendedSize: '188×226' }),
        name: f.text({ label: 'Name', required: true, max: 60 }),
        role: f.text({ label: 'Role', max: 60 }),
        bio: f.textarea({ label: 'About', max: 300, rows: 3 }),
        experience: f.text({ label: 'Previous job', max: 100 }),
      },
    }),
    caseSlugs: f.list({
      label: 'Page: case studies',
      of: f.text({ max: 80 }),
      localized: false,
      max: 8,
      help: 'The end of the case address, e.g. “onground” for /cases/onground. Shown as cards under “Case Studies”.',
    }),
    bannerImage: f.image({
      label: 'Page: “Got an Idea?” picture',
      localized: false,
      recommendedSize: '1316×732',
      help: 'The device picture at the right of the dark banner (wide screens).',
    }),
    nextTitle: f.text({
      label: 'Next service card: title',
      max: 80,
      help: 'Title of this service on the “Next service” cards of the other services.',
    }),
    nextText: f.textarea({
      label: 'Next service card: text',
      max: 300,
      rows: 3,
    }),
    nextImage: f.image({
      label: 'Next service card: picture',
      localized: false,
      recommendedSize: '1304×1100',
    }),
  },
  titleField: 'title',
  summaryField: 'description',
  sort: { by: 'order', direction: 'asc' },
  pageSize: 50,
  missingTranslation: MissingTranslation.Fallback,
  seed: [
    {
      slug: 'saas',
      publishedAt: '2026-01-01',
      content: {
        en: {
          order: 1,
          navLabel: 'SaaS',
          menuTitle: 'SaaS web apps',
          menuImage: { asset: 'menu-saas.webp', alt: 'SaaS web apps' },
          title: 'SaaS, Web App, Software',
          description:
            'Business needs and industry specifics driven SaaS, web app and software design with strong information architecture and design system foundation.',
          pillLabel: 'Saas',
          homeTitle: 'SaaS web apps',
          homeText:
            'Business needs & industry specifics driven design with strong information architecture & design system foundation that creates the best solution for your users and easy big deals for your sales team.',
          homeItems: [
            'Web Application UX design',
            'Software design',
            'User Flows optimization',
            'Design System UI design',
            'Dashboard & Analytics design',
            'User research & prototype testing',
          ],
          heroImage: {
            asset: 'service-saas-hero.webp',
            alt: 'SaaS, Web App, Software — top picture',
          },
          about: [
            'Business needs and industry specifics driven design with strong information architecture and design system foundation that creates the best solution for your users and effortless deals for your sales team.',
            'K&Z is driven by two founders who at the same time occupy C-level positions in SaaS startup themselves, also both founders have been Head of Designs in product companies before establishing K&Z. So we understand this world very well and know how to support business with design',
          ],
          founders: [
            {
              photo: { asset: 'service-founder-vlad.webp', alt: 'Vlad Kyrieiev' },
              name: 'Vlad Kyrieiev',
              role: '(CEO)',
              bio: 'Serial design entrepreneur & leader with 10+ years of experience solving the most challenging UX issues.',
              experience: 'Ex-Head of Design in US ERP product',
            },
            {
              photo: { asset: 'service-founder-nick.webp', alt: 'Nick Zhurenko' },
              name: 'Nick Zhurenko',
              role: '(COO & Head of Design)',
              bio: 'Design leader, AI-enthusiast, product builder, lecturer, design coach with 10+ years in the field.',
              experience: 'Ex Head of Design in US CRM development company',
            },
          ],
          caseSlugs: [],
          bannerImage: {
            asset: 'service-saas-banner.webp',
            alt: 'SaaS, Web App, Software on a device',
          },
          nextTitle: 'SaaS, Web App, Software',
          nextText:
            'Business needs and industry specifics driven design with strong information architecture and design system foundation that creates the best solution for your users and effortless deals for your sales team.',
          nextImage: { asset: 'service-next-saas.webp', alt: 'SaaS, Web App, Software' },
        },
      },
    },
    {
      slug: 'mobile',
      publishedAt: '2026-01-02',
      content: {
        en: {
          order: 2,
          navLabel: 'Mobile apps',
          menuTitle: 'Mobile apps',
          menuImage: { asset: 'menu-mobile.webp', alt: 'Mobile apps' },
          title: 'Mobile apps',
          description:
            'User flow and employee performance driven mobile app design for your B2B product. User-centered mobile experience to reach App Store and Google Play top.',
          pillLabel: 'Apps',
          homeTitle: 'Mobile apps',
          homeText:
            'User flow & employee performance driven mobile app design for your B2B product. User-centered and conversion-optimized mobile experience for your product to reach App Store & Google Play top for B2C.',
          homeItems: [
            'Mobile app design',
            'Wireframing',
            'Clickable prototype',
            'Conversion optimization',
            'User testing & data analysis',
          ],
          heroImage: { asset: 'service-mobile-hero.webp', alt: 'Mobile Apps — top picture' },
          about: [
            'User flow and employee performance driven mobile app design for your B2B product. User-centered and conversion-optimized mobile experience for your product to reach App Store and Google Play top for B2C.',
          ],
          caseSlugs: ['tach'],
          bannerImage: { asset: 'service-mobile-banner.webp', alt: 'Mobile Apps on a device' },
          nextTitle: 'Mobile Apps',
          nextText:
            'User flow and employee performance driven mobile app design for your B2B product.',
          nextImage: { asset: 'service-next-mobile.webp', alt: 'Mobile Apps' },
        },
      },
    },
    {
      slug: 'web',
      publishedAt: '2026-01-03',
      content: {
        en: {
          order: 3,
          navLabel: 'Websites',
          menuTitle: 'Websites',
          menuImage: { asset: 'menu-web.webp', alt: 'Websites' },
          title: 'Websites',
          description:
            'Conversion and brand positioning driven web design to help leads and visitors find the fastest way to actions necessary for your business.',
          pillLabel: 'Web',
          homeTitle: 'Websites',
          homeText:
            'Conversion & brand positioning driven web design for your website to help leads & visitors find the fastest way to actions necessary for your business',
          homeItems: [
            'Landing page',
            'Corporate website',
            'Conversion optimization',
            'Marketing website',
            'Sitemap creation',
          ],
          heroImage: { asset: 'service-web-hero.webp', alt: 'Web Design — top picture' },
          about: [
            'Conversion and brand positioning driven web design for your website to help leads and visitors find the fastest way to actions necessary for your business',
          ],
          caseSlugs: ['tach'],
          bannerImage: { asset: 'service-web-banner.webp', alt: 'Web Design on a device' },
          nextTitle: 'Web Design',
          nextText:
            'Conversion and brand positioning driven web design for your website to help leads and visitors find the fastest way to actions necessary for your business',
          nextImage: { asset: 'service-next-web.webp', alt: 'Web Design' },
        },
      },
    },
  ],
});
