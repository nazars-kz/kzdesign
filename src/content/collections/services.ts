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
        },
      },
    },
    {
      slug: 'mobile',
      publishedAt: '2026-01-02',
      content: {
        en: {
          order: 2,
          navLabel: 'Mobile',
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
        },
      },
    },
    {
      slug: 'web',
      publishedAt: '2026-01-03',
      content: {
        en: {
          order: 3,
          navLabel: 'Web',
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
        },
      },
    },
  ],
});
