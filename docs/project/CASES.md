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

## Lessons from the first case (Tach): reuse them

Tach (`src/content/cases/tach.ts`, `src/site/cases/tach/`) is the reference implementation.

- **Titles in fields.** A new line starts a new row and words in `*asterisks*` are highlighted: use `<Rows text>` / `<Accent text>` from `tach-parts.tsx` (copy the helpers into the new case folder; cases do not import each other).
- **Hero with a cut-out person.** Photo, an SVG line and a transparent cut-out of the same frame are stacked in one box with a fixed aspect ratio; the SVG passes behind the person. Crop the cut-out to the photo's frame (find the offset by template matching) so both layers align.
- **Coded mock-ups over a picture** (cards, dialogs, vendor card): size them in `em`, put `container-type: inline-size` on the tile and set the overlay's `font-size` in `cqw` on a **child** of the tile. `cqw` is measured on the content box of the nearest ancestor container, so the container itself must have no padding (use an inner element for padding) and never use `cqw` on the container's own properties.
- **Mobile.** A mock-up that cannot be read when scaled (dialog, floating cards) is moved under or above the picture on phones; a timeline becomes a list of labelled bars; stagger layouts (team) become a plain grid.
- **Images.** Convert with `sharp` to WebP (full width 2400 px, half width 1600 px, q 78–82, transparent PNGs keep alpha). `Hero`-like full-bleed photos weigh 150–300 KB, a whole case about 3 MB. Do not commit `design/`.
- **Alt texts.** The seed needs a non-empty `alt` for every image; for a decorative duplicate render the image with `alt=""` in the view.
- **Fonts.** Download the Google Fonts woff2 (latin) into `src/site/theme/fonts/`, declare them in `fonts.ts` with `preload: false` and apply the exported variable class on the case root only.
- **Screenshots.** Chrome cannot capture pages higher than 16 384 px in one piece: capture in 6 000 px chunks and stitch them; hide `position: fixed` elements first.

## Motion (every case gets entrances)

The Tach page is the reference (`tach-motion.tsx` and the "Motion" part of `case-tach.css`).

- The **hero** plays on load with CSS keyframes only. Everything below is armed by a tiny client component: it gives the blocks (tiles, chapters, lists) the class `tach-r` and, when a block's top passes 90% of the viewport, `is-in`. The position is read from the layout on scroll, **not** with an `IntersectionObserver`: a block hidden by its own `clip-path` would never count as visible.
- Without JavaScript or with "reduce motion" nothing is armed, so the page is just shown (e2e checks it).
- Signature moves: words slide up out of masks (`Accent` / `Rows` wrap every word and set `--tach-w`), tiles are uncovered by a curtain (left tile from the left, right tile from the right) while the picture settles from a zoom, the hero line draws itself, the logo letters rise and the needle swings, timeline bars grow along the months, the donut sweeps, overlays land with a spring and then float, the team rises one by one. Use `translate` / `rotate` / `scale` (individual properties) so transitions and scroll-linked drift (`animation-timeline: view()`) do not fight.
- Keep the hidden state in `.tach-armed .tach-r:not(.is-in) …` and the transition on the base rule; stagger with `--tach-w`, `--tach-i` and `--tach-d`.

## Lessons from Signal Sigma

Signal Sigma (`src/content/cases/signal-sigma.ts`, `src/site/cases/signal-sigma/`, prefix `sigma-`) is the
second reference.

- **Scaled design layout.** A design with many free-placed cards and notes is easiest to match when the
  page is the 1920 px design scaled to the window: `--u: calc(min(100vw, 1920px) / 1920)` is one design
  pixel and every position is `calc(N * var(--u))`; text sizes use `max(<readable px>, calc(N * var(--u)))`.
  Below 1024 px the scenes become a single column (cards and notes under their pictures).
- **Scenes.** A picture with cards/notes on it is `.sigma-scene` with a design height and absolutely placed
  children (design coordinates); on phones `position: relative` and `order` put them in reading order.
- **Overlay PNGs with shadows.** Place them by the opaque part: find the box of pixels with alpha > 230
  (`sharp` raw buffer) and offset the image so that box lands on the design coordinates.
- **Chapter strip.** One `chapter` field per block; the view groups the chapters into parts and shows the
  part up to the current one (`aria-current="step"`), so labels stay editable and never get out of order.
- **Lists inside lists** are not supported by the content schema: per-item tags are a comma-separated
  text field split in the view.
- **Comparing with the design**: screenshot the page at 1920 in 6 000 px chunks with the site header
  hidden, then put design and page side by side per block (aligned on each block's top).

## Lessons from Touren

Touren (`src/content/cases/touren.ts`, `src/site/cases/touren/`, prefix `touren-`) is the third reference, a
1440 px design.

- **Mobile-first base, design layout from 1024 px.** The base rules are the phone/tablet layout; the scaled
  design (`--u: calc(min(100vw, 1440px) / 1440)`) lives in one `@media (min-width: 64rem)` block, so nothing
  absolute has to be undone on phones.
- **Feature blocks** share one head (round icon, label, title), a lead with a side note and tags, then a
  `.touren-scene`: panels (`.touren-panel--left/right`, extended to the window edge with
  `box-shadow: 0 0 0 100vmax` + `clip-path`) and phone mockups placed by design coordinates. On phones the
  scene becomes a grid where each phone sits on its own panel.
- **Overlay phones** are cropped to their shadow (alpha > 6), placed by the opaque box, and saved at ~1.5× of
  their displayed width: phones with soft shadows are the heaviest files of a case.
- **A design-specific rule must beat the base rule**: a base selector like `.touren-scene .touren-shot`
  outranks `.touren-home__phone`; prefix the positioned rules with the same parent.
- **Site map** as data (entry screens, onboarding, screens with comma-separated pages): a CSS grid with dashed
  pseudo-element connectors on desktop, a plain list on phones.
- **Screenshots for comparison**: measure section positions only after scrolling through the page, lazy
  images change the heights.
