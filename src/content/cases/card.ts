/**
 * CASE STUDIES: the data every case page has in common, its "card": how the case appears on the
 * Cases page, on Home, in the Industries block and on the service pages. Every case is a unique
 * page (see docs/project/CASES.md); each one includes this section through `caseCardSection()`.
 */
import { defineSection } from '@/core/content/define';
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

/** Filters of the Cases page, in the order of the pills. A case lists the ones it belongs to. */
export const CASE_CATEGORIES = [
  { value: 'HR', label: 'HR' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'SaaS', label: 'SaaS' },
  { value: 'Logistics', label: 'Logistics' },
  { value: 'B2B', label: 'B2B' },
  { value: 'Web', label: 'Web' },
  { value: 'Mobile', label: 'Mobile' },
  { value: 'E-Commerce', label: 'E-Commerce' },
  { value: 'CRM', label: 'CRM' },
  { value: 'Proptech', label: 'Proptech' },
  { value: 'Web3', label: 'Web3' },
  { value: 'Gaming', label: 'Gaming' },
  { value: 'Marketplace', label: 'Marketplace' },
  { value: 'B2C', label: 'B2C' },
  { value: 'LMS', label: 'LMS' },
  { value: 'ERP', label: 'ERP' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Social Media', label: 'Social Media' },
] as const;

/** The "Card" section of a case page: the data of its card on the list, Home, Industries and services. */
export function caseCardSection() {
  return defineSection({
    id: 'card',
    label: 'Card (lists and Home)',
    description:
      'How this case study appears on the Cases page, in “Other case studies”, on Home, in the Industries block and on the service pages.',
    fields: {
      order: f.number({
        label: 'Order in the lists',
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
        help: 'Shown on the card.',
      }),
      cover: f.image({
        label: 'Card cover',
        localized: false,
        recommendedSize: '1320×637',
        help: 'The wide picture of the card (Cases page, Home, other case studies).',
      }),
      coverMobile: f.image({
        label: 'Card cover: phone',
        localized: false,
        recommendedSize: '750×1000',
        help: 'Shown on phones instead of the cover above. Leave empty to use the same cover.',
      }),
      hidden: f.boolean({
        label: 'Hide from the lists',
        localized: false,
        help: 'The case is left out of the Cases page and of “Other case studies” (its own page still works).',
      }),
      categories: f.list({
        label: 'Filters',
        of: f.select({ options: CASE_CATEGORIES }),
        localized: false,
        help: 'The filters of the Cases page this case appears under.',
      }),
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
  });
}
