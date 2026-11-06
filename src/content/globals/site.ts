/**
 * GLOBAL: header & footer content shared by every page (header button, company
 * details, email, social links). Menu and footer link labels are interface
 * texts (src/site/messages). See docs/CONTENT_SCHEMA.md § Globals.
 */
import { defineSection } from '@/core/content/define';
import { f } from '@/core/content/fields';
import { defineGlobal } from '@/core/content/global';

export const SOCIAL_NETWORKS = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'dribbble', label: 'Dribbble' },
  { value: 'behance', label: 'Behance' },
] as const;

export const siteGlobals = defineGlobal({
  id: 'site',
  label: 'Header & footer',
  uiTexts: ['common', 'nav', 'footer', 'contact', 'cookie', 'notFound'],
  sections: [
    defineSection({
      id: 'header',
      label: 'Header',
      description: 'The button on the right of the header. Menu labels are in Interface texts.',
      fields: {
        cta: f.link({ label: 'Header button', required: true }),
      },
    }),
    defineSection({
      id: 'company',
      label: 'Company details',
      description: 'Shown in the footer and in the contact block.',
      fields: {
        name: f.text({ label: 'Company name', max: 80 }),
        details: f.textarea({
          label: 'Full details',
          max: 400,
          rows: 4,
          help: 'Registry code and full address, shown under the contact form.',
        }),
        footerClaim: f.text({
          label: 'Footer claim',
          max: 120,
          help: 'The line under the logo in the footer.',
        }),
        footerLine: f.text({
          label: 'Footer line',
          max: 200,
          help: 'Shown after “© year” at the bottom of the footer; the email is added automatically.',
        }),
        email: f.email({ label: 'Email', localized: false }),
      },
    }),
    defineSection({
      id: 'social',
      label: 'Social links',
      fields: {
        links: f.list({
          label: 'Links',
          max: 6,
          itemLabelField: 'network',
          localized: false,
          of: {
            network: f.select({ label: 'Network', options: SOCIAL_NETWORKS }),
            link: f.link({ label: 'Profile link', required: true }),
          },
        }),
      },
    }),
  ],
  seed: {
    en: {
      header: {
        cta: { label: 'Get in touch', href: '/contact-us', external: false },
      },
      company: {
        name: 'K&Zh OÜ',
        footerClaim: 'No calls with sales. Contact us and get to chat with our CEO.',
        details:
          'Registry code: 17092851 Kaupmehe tn 7-120, Kesklinna linnaosa, Tallinn, Harju maakond, 10114, Estonia',
        footerLine: 'K&Zh OÜ · Registry code 17092851 · Kaupmehe tn 7-120, Tallinn, 10114, Estonia',
        email: 'hello@kz.design',
      },
      social: {
        links: [
          {
            network: 'linkedin',
            link: {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/kyzh-studio/',
              external: true,
            },
          },
          {
            network: 'dribbble',
            link: { label: 'Dribbble', href: 'https://dribbble.com/kyzh-studio', external: true },
          },
          {
            network: 'behance',
            link: { label: 'Behance', href: 'https://www.behance.net/kz_design', external: true },
          },
        ],
      },
    },
  },
});
