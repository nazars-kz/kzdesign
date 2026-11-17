# Case studies: how they work and how to add one

Every case study is a **unique page**: its own layout, built for that case, at `/cases/<slug>`.
There is no case template and no `cases` collection. What every case page has in common:

- the site **header and footer**;
- the **"Related case studies"** slider just before the footer (shared section `related`,
  component `src/site/cases/related-cases.tsx`);
- the **card data** (`caseCardSection()`): how the case looks on the Cases page, on Home, in the
  Industries block and on service pages.

Everything else (sections, grid, typography, colors, animation) is made for the case.

## Where things live

| What                       | Where                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| Content schema + seed text | `src/content/cases/<slug>.ts` (`definePage`, `adminGroup: 'Case studies'`, `parent: 'cases'`)    |
| Case registry              | `src/content/cases/index.ts` (`casePages`)                                                       |
| Shared card section        | `src/content/cases/card.ts` (`caseCardSection()`, `CASE_CATEGORIES`, `INDUSTRIES`)               |
| View (the layout)          | `src/site/cases/<slug>/` (`<slug>-view.tsx` and its parts)                                       |
| Styles                     | `src/site/theme/case-<slug>.css`, imported in `site.css`, every class prefixed `<slug>-`         |
| Route                      | `src/app/(site)/[locale]/(pages)/cases/<slug>/page.tsx` (`createPageRoute('case-<slug>', View)`) |
| Images                     | `src/content/seed/assets/case-<slug>-*.webp` (seed images, imported by `content:sync`)           |
| Related block              | `src/content/shared/related-cases.ts`, `src/site/cases/related-cases.tsx` (do not copy)          |
| Card loaders               | `src/site/case-cards.ts` (`getCaseCards`, `getListedCases`)                                      |

In the admin the case appears in the sidebar group **Case studies** (a page with `adminGroup`),
not in the page tree. Editors change texts, replace images, edit the card and the SEO there.
New cases are not created in the admin: a developer (or a Claude agent) builds them.

## Adding a case from a screenshot and assets

The input is a full-page screenshot of the case and a folder of assets (`design/cases/<slug>/`).

1. **Branch and issue.** An issue (milestone "3. Сторінки (чернетка)", label "Сторінка"), then
   `feature/case-<slug>` from `staging`; a pull request into `staging` with `Closes #N`.
2. **Read the screenshot in slices** and list the sections, their texts, the type scale, the
   colors and the spacing. Decide the mobile layout of every section (there is no mobile design):
   the case must be fully responsive and look as good on a phone as on desktop.
3. **Build with code everything that is not a product screen.** Text, headings, tables,
   timelines, color swatches, type specimens, badges, team blocks: HTML and CSS. Screens of the
   product and photographic mockups are inserted as **images**.
4. **Every text and image is a field** of the page schema (`f.text`, `f.textarea`, `f.richText`,
   `f.image`, `f.list`), with the design's text as the seed. Nothing visible is hardcoded in the
   view, except interface strings (`src/site/messages/en.json`, namespace `cases`).
5. **Images.** Convert the originals to WebP (or keep SVG), full width ≤ 2400 px and quality ~80,
   so they look sharp but stay light; keep originals out of `src/`. Give every image a real
   `alt` in the seed. Render with `next/image` (`SiteImage`): correct `sizes`, `priority` only
   for the first screen's image. Cover and card images are fields of the card section.
6. **SEO.** `seo.title` = `{Name}: {product type} UX/UI Case Study | K&Z Design`, a 150-160
   character `seo.description`, one `h1`, ordered `h2`/`h3`, descriptive `alt` text, semantic
   landmarks and lists, link text that says where it goes. The page route exports
   `generateMetadata`; structured data is added through `structuredData` of the page.
7. **Card.** Fill the card section seed (name, description, tags, categories (filters), cover and
   phone cover, Home flags, industries). Register the case in `src/content/cases/index.ts`. To
   show it on a service page add its slug to `caseSlugs` of that service.
8. **Check.** `pnpm typecheck && pnpm lint && pnpm test && pnpm content:check && pnpm tokens:check`;
   compare with the screenshot at 1440 and 375 (and 768); add `tests/e2e/case-<slug>.spec.ts`
   (one h1, sections, images have alt, mobile layout without horizontal scroll).

## Rules

- Colors, fonts and sizes live in `src/site/theme/` (the token rule of CLAUDE.md applies). A case
  may define its own palette as CSS variables scoped to its root class
  (`.<slug>-case { --<slug>-green: … }`) inside its CSS file.
- Fonts come from Google Fonts through `src/site/theme/fonts.ts` (`next/font`), never from a CDN link.
- One case never styles another: every selector starts with the case prefix.
- Never remove or restyle the header, footer or the Related block inside a case.
