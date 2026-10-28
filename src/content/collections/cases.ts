/**
 * COLLECTION: case studies. Each case has its own page at /cases/<slug>; editors add
 * new cases in Pages → Blog & lists → Case studies. The fields here are the card data
 * used on Home, the Industries block and the list; the page body is built on the Cases step.
 */
import { defineCollection, MissingTranslation } from '@/core/content/collection';
import { f } from '@/core/content/fields';

/** Industries of the Home "Industries" block; a case lists the ones it belongs to. */
export const INDUSTRIES = [
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'logistics', label: 'Logistics Software' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'hr', label: 'HR' },
  { value: 'ai', label: 'AI' },
  { value: 'energy', label: 'Energy' },
  { value: 'sales', label: 'Sales' },
  { value: 'proptech', label: 'Proptech' },
  { value: 'social', label: 'Social media & Networking' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'retail', label: 'Retail & Omnichannel' },
  { value: 'web3', label: 'Web3' },
] as const;

export const cases = defineCollection({
  id: 'cases',
  label: 'Case studies',
  itemLabel: 'Case study',
  listPageId: 'cases',
  itemPath: '/cases/:slug',
  uiTexts: ['preview'],
  fields: {
    order: f.number({
      label: 'Order in the list',
      localized: false,
      integer: true,
      min: 1,
      help: 'Position on the Cases page: 1 is first.',
    }),
    title: f.text({ label: 'Name', required: true, max: 80 }),
    description: f.text({ label: 'Short description', max: 160 }),
    tags: f.list({
      label: 'Tags',
      of: f.text({ max: 30 }),
      display: 'tags',
      max: 8,
      help: 'Shown on the case card.',
    }),
    cover: f.image({ label: 'Card cover', localized: false, recommendedSize: '1320×637' }),
    showOnHome: f.boolean({
      label: 'Show on Home',
      localized: false,
      help: 'The case appears in the “Case Studies” block of the home page.',
    }),
    homeOrder: f.number({
      label: 'Order on Home',
      localized: false,
      integer: true,
      min: 1,
      help: 'Position in the Home block: 1 is first.',
    }),
    homeDescription: f.text({
      label: 'Description on Home',
      max: 160,
      help: 'Leave empty to use the short description.',
    }),
    homeTags: f.list({
      label: 'Tags on Home',
      of: f.text({ max: 30 }),
      display: 'tags',
      max: 8,
      help: 'Leave empty to use the tags.',
    }),
    industries: f.list({
      label: 'Industries',
      of: f.select({ options: INDUSTRIES }),
      localized: false,
      help: 'The case is listed under these industries in the Home “Industries” block.',
    }),
    industryLabel: f.text({
      label: 'Name in Industries',
      max: 80,
      help: 'Leave empty to use the name.',
    }),
    industryThumb: f.image({
      label: 'Thumbnail in Industries',
      localized: false,
      recommendedSize: '116×116',
    }),
    industryOrder: f.number({
      label: 'Order in Industries',
      localized: false,
      integer: true,
      min: 1,
      help: 'Position inside an industry: 1 is first.',
    }),
  },
  titleField: 'title',
  summaryField: 'description',
  imageField: 'cover',
  sort: { by: 'order', direction: 'asc' },
  pageSize: 100,
  missingTranslation: MissingTranslation.Fallback,
  seed: [
    seedCase(
      1,
      'signal-sigma',
      'Signal Sigma',
      'Investment Strategy Platform',
      ['FinTech', 'Web App', 'UI/UX Design'],
      { industries: ['fintech', 'energy'], thumb: 'industry-signal-sigma.jpg', industryOrder: 11 },
    ),
    seedCase(
      2,
      'touren',
      'Touren',
      'Off-road navigation & community platform',
      ['sport', 'Saas', 'Web', 'navigation', 'b2c'],
      {
        industries: ['social'],
        thumb: 'industry-touren.jpg',
        industryOrder: 10,
        cover: 'case-touren-cover.jpg',
        coverAlt: 'Touren mobile app',
        homeOrder: 1,
      },
    ),
    seedCase(3, 'filmtoro', 'Filmtoro', 'Creative Tech & Marketing', [
      'Marketing',
      'APP',
      'UI/UX Design',
    ]),
    seedCase(4, 'print-buy', 'Print buy', 'Creative Tech & Marketing', [
      'Saas',
      'web',
      'UI/UX Design',
    ]),
    seedCase(
      5,
      'onground',
      'Onground',
      'Private jet cleaning platform',
      ['SAAS', 'Web', 'Ui/ux design'],
      {
        industries: ['hr'],
        thumb: 'industry-onground.jpg',
        industryOrder: 6,
        cover: 'case-onground-cover.jpg',
        coverAlt: 'Onground dashboard',
        homeOrder: 2,
      },
    ),
    seedCase(
      6,
      'vidsprint',
      'VidSprint',
      'Order management & CRM for marketing agency',
      ['Marketing', 'CRM', 'SaaS', 'B2B', 'Web', 'Mobile'],
      { industries: ['social'], thumb: 'testi-case-vidsprint.jpg', industryOrder: 8 },
    ),
    seedCase(7, 'listen-upp', 'Listen Upp', 'Social & mental health app', ['Health', 'Mobile'], {
      industries: ['healthcare'],
      thumb: 'industry-listen-upp.jpg',
      industryOrder: 1,
    }),
    seedCase(
      8,
      'signature-pharmacy',
      'Signature Pharmacy',
      'SaaS web & mobile app for pharmacy order management and delivery',
      ['Healthcare', 'Logistics', 'SaaS', 'B2B', 'Web', 'Mobile'],
      {
        industries: ['healthcare', 'logistics'],
        thumb: 'industry-signature-pharmacy.jpg',
        industryOrder: 3,
      },
    ),
    seedCase(
      9,
      'hr-hub',
      'HR Hub',
      'SaaS web & mobile app for employee management',
      ['HR', 'ERP', 'SaaS', 'B2B', 'Web', 'Mobile'],
      {
        industries: ['hr'],
        thumb: 'industry-hr-hub.jpg',
        industryLabel: 'HR SaaS',
        industryOrder: 5,
        cover: 'case-hr-hub-cover.jpg',
        coverAlt: 'HR Hub schedule screen',
        homeOrder: 4,
      },
    ),
    seedCase(
      10,
      'persuasion-systems',
      'Persuasion Systems',
      'CRM for Healthcate',
      ['Healthcare', 'CRM', 'SaaS', 'B2B', 'Web'],
      {
        industries: ['healthcare', 'sales'],
        thumb: 'industry-persuasion-systems.jpg',
        industryOrder: 2,
      },
    ),
    seedCase(
      11,
      'brightgate',
      'Brightgate',
      'LMS for course management',
      ['LMS', 'SaaS', 'B2B', 'Web', 'Mobile'],
      {
        industries: ['ai', 'marketing'],
        thumb: 'industry-brightgate.jpg',
        industryLabel: 'Learning Management System',
        industryOrder: 12,
        cover: 'case-brightgate-cover.jpg',
        coverAlt: 'Brightgate learning management system',
        homeOrder: 3,
        homeDescription: 'Learning management System',
        homeTags: ['SaaS', 'Web', 'UX/UI Design'],
      },
    ),
    seedCase(
      12,
      'quintessia',
      'Quintessia',
      'Marketplace',
      ['E-Commerce', 'Marketplace', 'B2B', 'Web'],
      {
        industries: ['sales', 'retail'],
        thumb: 'industry-quintessia.jpg',
        industryLabel: 'Quintessia Marketplace',
        industryOrder: 7,
      },
    ),
    seedCase(
      13,
      'hotsheet',
      'HotSheet',
      'CRM for real estate agents',
      ['Proptech', 'CRM', 'B2B', 'Web', 'Mobile'],
      { industries: ['proptech'], thumb: 'industry-hotsheet.jpg', industryOrder: 13 },
    ),
    seedCase(
      14,
      'momento',
      'Momento',
      'Social media mobile app',
      ['Web3', 'Social Media', 'B2C', 'Mobile'],
      { industries: ['social', 'web3'], thumb: 'industry-momento.jpg', industryOrder: 9 },
    ),
    seedCase(15, 'whodunnit-2-0', 'Whodunnit', 'Party game mobile app', [
      'Gaming',
      'B2C',
      'Mobile',
    ]),
    seedCase(
      16,
      'mynqs',
      'MyNQS',
      'Injury registry platform for the US National Quality System',
      ['Health', 'SaaS', 'Web'],
      { industries: ['healthcare'], thumb: 'industry-mynqs.webp', industryOrder: 4 },
    ),
  ],
});

interface CaseExtras {
  industries?: readonly (typeof INDUSTRIES)[number]['value'][];
  thumb?: string;
  industryLabel?: string;
  industryOrder?: number;
  cover?: string;
  coverAlt?: string;
  homeOrder?: number;
  homeDescription?: string;
  homeTags?: readonly string[];
}

/** One seed item; keeps the 16 entries above readable. */
function seedCase(
  order: number,
  slug: string,
  title: string,
  description: string,
  tags: readonly string[],
  extras: CaseExtras = {},
) {
  return {
    slug,
    publishedAt: `2026-01-${String(order).padStart(2, '0')}`,
    content: {
      en: {
        order,
        title,
        description,
        tags: [...tags],
        ...(extras.cover ? { cover: { asset: extras.cover, alt: extras.coverAlt ?? title } } : {}),
        showOnHome: extras.homeOrder !== undefined,
        ...(extras.homeOrder !== undefined ? { homeOrder: extras.homeOrder } : {}),
        ...(extras.homeDescription ? { homeDescription: extras.homeDescription } : {}),
        ...(extras.homeTags ? { homeTags: [...extras.homeTags] } : {}),
        industries: [...(extras.industries ?? [])],
        ...(extras.industryLabel ? { industryLabel: extras.industryLabel } : {}),
        ...(extras.thumb
          ? { industryThumb: { asset: extras.thumb, alt: extras.industryLabel ?? title } }
          : {}),
        ...(extras.industryOrder !== undefined ? { industryOrder: extras.industryOrder } : {}),
      },
    },
  };
}
