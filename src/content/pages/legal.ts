/**
 * PAGES: the legal pages (Privacy Policy, Terms of Service, Refund Policy). They share one
 * template: breadcrumbs, the title, "last updated" and the text. The texts come from the client
 * (issue #9): until then a page shows only its title. Editors write the text in the page editor.
 */
import { definePage, defineSection } from '@/core/content/define';
import { f } from '@/core/content/fields';

const SITE_NAME = 'K&Z Design';

function defineLegalPage<const Id extends string>({
  id,
  path,
  label,
  title,
  description,
}: {
  id: Id;
  path: `/${string}`;
  label: string;
  /** H1 of the page. */
  title: string;
  description: string;
}) {
  return definePage({
    id,
    path,
    label,
    parent: null,
    uiTexts: ['legal'],
    seo: { title: `${title} | ${SITE_NAME}`, description },
    sections: [
      defineSection({
        id: 'intro',
        label: 'Page',
        description: 'Title, the date of the last update and the text of the document.',
        fields: {
          title: f.text({ label: 'Title', required: true, max: 120 }),
          updated: f.text({
            label: 'Last updated',
            max: 40,
            help: 'For example “1 January 2026”. Leave empty to hide.',
          }),
          body: f.richText({
            label: 'Text',
            help: 'Headings, paragraphs, lists and links. The text of the document comes from the client.',
          }),
        },
      }),
    ],
    seed: { en: { intro: { title } } },
  });
}

export const privacyPage = defineLegalPage({
  id: 'privacy-policy',
  path: '/privacy-policy',
  label: 'Privacy Policy',
  title: 'Privacy Policy',
  description: 'Privacy Policy of K&Zh OÜ, the company behind K&Z Design.',
});

export const termsPage = defineLegalPage({
  id: 'terms-of-service',
  path: '/terms-of-service',
  label: 'Terms of Service',
  title: 'Terms of Service',
  description: 'Terms of Service of K&Zh OÜ, the company behind K&Z Design.',
});

export const refundPage = defineLegalPage({
  id: 'refund-policy',
  path: '/cancellation-and-refund-policy',
  label: 'Refund Policy',
  title: 'Cancellation and Refund Policy',
  description: 'Cancellation and Refund Policy of K&Zh OÜ, the company behind K&Z Design.',
});

export const legalPages = [privacyPage, termsPage, refundPage] as const;
