/**
 * Placeholder pages: real pages in the admin (title, SEO, header and footer in
 * place) whose content the client provides later. Replace a placeholder with a
 * full page definition when its design arrives.
 */
import { definePage, defineSection } from '@/core/content/define';
import { f } from '@/core/content/fields';

const SITE_NAME = 'K&Z Design';

export function definePlaceholderPage<const Id extends string>({
  id,
  path,
  label,
  title,
  description,
}: {
  id: Id;
  path: `/${string}`;
  label: string;
  /** H1 shown until the content is provided. */
  title: string;
  description: string;
}) {
  return definePage({
    id,
    path,
    label,
    parent: null,
    seo: { title: `${title} | ${SITE_NAME}`, description },
    sections: [
      defineSection({
        id: 'intro',
        label: 'Page',
        description: 'Placeholder: the real content of this page is added later.',
        fields: {
          title: f.text({ label: 'Title', required: true, max: 120 }),
          body: f.richText({ label: 'Text' }),
        },
      }),
    ],
    seed: { en: { intro: { title } } },
  });
}
