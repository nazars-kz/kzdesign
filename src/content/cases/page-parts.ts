/**
 * CASE STUDIES: the two blocks every case page has around its own layout (docs/project/CASES.md):
 * the header at the top (breadcrumbs, the H1, the project details and the client feedback) and the
 * SEO text at the end (a short description of the project with links to the services and to all
 * cases). Each case includes them with `caseIntroSection()` and `caseAboutSection()`.
 */
import { defineSection } from '@/core/content/define';
import { f } from '@/core/content/fields';

/** The header of a case page: H1, details and the client's feedback. */
export function caseIntroSection() {
  return defineSection({
    id: 'intro',
    label: 'Header and client feedback',
    description:
      'The top of the page: breadcrumbs, the title, the project details and the client feedback.',
    fields: {
      title: f.text({
        label: 'Page title (H1)',
        required: true,
        max: 120,
        help: 'The only H1 of the page, read by search engines.',
      }),
      details: f.list({
        label: 'Details',
        itemLabelField: 'label',
        max: 6,
        help: 'Industry, platform, year…',
        of: {
          label: f.text({ label: 'Name', required: true, max: 30 }),
          value: f.text({ label: 'Value', required: true, max: 80 }),
        },
      }),
      quote: f.textarea({
        label: 'Client feedback',
        max: 1200,
        rows: 6,
        help: 'Each new line is a paragraph. Leave empty to hide the feedback.',
      }),
      author: f.text({ label: 'Feedback author', max: 60 }),
      authorRole: f.text({ label: 'Author role', max: 80 }),
      authorPhoto: f.image({ label: 'Author photo', localized: false, recommendedSize: '128×128' }),
      authorFlag: f.image({ label: 'Author country flag', localized: false }),
    },
  });
}

/** The SEO text at the end of a case page, before "Related case studies". */
export function caseAboutSection() {
  return defineSection({
    id: 'about-project',
    label: 'SEO text (end of page)',
    description:
      'A short text about the project for search engines and readers, with links to the services and to all case studies.',
    fields: {
      title: f.text({ label: 'Title (H2)', required: true, max: 100 }),
      text: f.textarea({
        label: 'Text',
        required: true,
        max: 1500,
        rows: 8,
        help: 'Each new line is a paragraph. Name the product type, the platforms and the work done.',
      }),
      links: f.list({
        label: 'Links',
        of: f.link(),
        max: 4,
        help: 'The related service pages and all case studies. Link text says where it goes.',
      }),
    },
  });
}
