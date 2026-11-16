# Components: K&Z Design

Kept up to date while building. Layers: tokens → primitives → patterns → sections → page views → layout.
Every repeated element exists once; variants are typed props; `className` is for placement only.

## Where styles live

- `src/site/theme/tokens.css`: every raw value (colors, type styles, radii, shadows, motion, layout).
- `src/site/theme/components.css`: styles of primitives, patterns and layout, built only from tokens
  (`.btn`, `.link-cta`, `.eyebrow`, `.round-btn`, `.plus`, `.nav*`, `.site-header*`, `.site-footer*`, `.socials`).
- `src/site/theme/sections.css`: styles of page sections, one block per section.
- React components use these classes through their props and Tailwind token utilities.
  `pnpm tokens:check` allows raw values only inside `src/site/theme/`.

Dark bands: `<Section tone="inverse">` adds `.on-dark`; eyebrow, link-cta and headings recolor from that one class.

## Primitives (`src/site/components/ui/`)

| Component                                | File                             | Variants / props                                                                                                                          | Used in                                        |
| ---------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Heading / Text                           | `typography.tsx`                 | Heading: h1–h6, `section-title`; Text: lead, body-lg, body, body-sm, caption, overline, label; tone                                       | everywhere                                     |
| Container / Section                      | `layout.tsx`                     | width content/wide/prose; tone default/surface/inverse; spacing default/tight/none; `id`                                                  | every section                                  |
| Button / ButtonLink / `buttonClasses`    | `button.tsx`, `button-styles.ts` | variant `primary` (dark) / `light`; size md 54 / lg 57 / xl 67; arrow slides in on hover (`ButtonArrow`)                                  | header (×2), hero, FAQ, form                   |
| LinkCta                                  | `link-cta.tsx`                   | external; recolors on dark                                                                                                                | Services, Cases, Approach, Testimonials        |
| Eyebrow                                  | `eyebrow.tsx`                    | recolors on dark                                                                                                                          | every section                                  |
| RoundButton                              | `ui/round-button.tsx`            | direction prev/next; disabled; client-safe                                                                                                | Services tabs, Testimonials, later case slider |
| Icon                                     | `ui/icon.tsx`                    | typed `name` from `ICON_NAMES`; size sm 20 / md 24 / lg 50; `label` when the icon carries meaning                                         | social links, industries, storybook            |
| Field, Input, Textarea, Select, Checkbox | `ui/field.tsx`                   | outlined fields on dark (a filled/light variant is not needed by the design yet); floating label, hidden label, error line, required mark | every form (the contact form)                  |
| BurgerButton                             | `components/burger-button.tsx`   | open / closed                                                                                                                             | header                                         |
| SiteImage, RichText, form styles         | template                         |                                                                                                                                           | content images, rich text, forms               |

## Patterns (`src/site/components/`)

| Component        | File               | Notes                                   | Used in                      |
| ---------------- | ------------------ | --------------------------------------- | ---------------------------- |
| NavLink (client) | `nav-link.tsx`     | `aria-current` for the current page     | header, footer               |
| SocialLinks      | `social-links.tsx` | icons from `public/icons/<network>.svg` | footer (contact block later) |

## Layout (`src/site/layout/`)

| Component                                  | File                                  | Notes                                                                                        |
| ------------------------------------------ | ------------------------------------- | -------------------------------------------------------------------------------------------- |
| SiteLayout                                 | `site-layout.tsx`                     | skip link, header, main, footer                                                              |
| SiteHeader (server) + HeaderShell (client) | `site-header.tsx`, `header-shell.tsx` | compact after 4px scroll, Services drop-down, burger + full-screen menu ≤ 1100px, Esc closes |
| SiteFooter                                 | `site-footer.tsx`                     | nav, socials, © line, legal links, cookie settings                                           |
| 404                                        | `src/site/pages/not-found.tsx`        |                                                                                              |
| Placeholder page                           | `src/site/pages/placeholder.tsx`      | title + optional rich text, for pages whose content comes later                              |

## Home components (built with the Home page)

| Component                                                           | File                                                     | Notes                                                                    | Used in                              |
| ------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------ |
| SectionHeader                                                       | `components/section-header.tsx`                          | eyebrow + title; gap via `--section-header-gap` set by the section       | all sections                         |
| Tag / TagList                                                       | `components/ui/tag.tsx`                                  | CAPS tags                                                                | case cards                           |
| CaseCard                                                            | `components/case-card.tsx`                               | cover, name, description, tags; heading level prop                       | Home, Cases list, later case sliders |
| AwardsStrip (client)                                                | `components/awards-strip.tsx`                            | expand / collapse, width via CSS variable                                | Hero                                 |
| ServiceTabs (client)                                                | `components/service-tabs.tsx`                            | autoplay 10 s with progress line, pills on phones                        | Home                                 |
| Accordion (client)                                                  | `components/accordion.tsx`                               | variants `industries` (dark) / `faq` (light); one open at a time         | Industries, FAQ                      |
| TestimonialSlider (client) + TestimonialCard + QuoteScroll (client) | `components/testimonial-*.tsx`, `quote-scroll.tsx`       | scroll-snap track, arrows with disabled ends, quote with own scroll bar  | Testimonials (Home, About, Reviews)  |
| PartnerTile                                                         | `components/partner-tile.tsx`                            | logo, optional case link with hover                                      | Partners                             |
| TeamMember (client)                                                 | `components/team-member.tsx`                             | row on desktop, accordion on phones                                      | Contact block                        |
| ContactForm / ContactFormBlock                                      | `components/contact-form.tsx`, `contact-form-server.tsx` | outlined fields on dark, submit enabled when valid                       | Contact block                        |
| CompanyCard                                                         | `components/company-card.tsx`                            | from the `site` global                                                   | Contact block                        |
| ContentLink, Lines, PlainRichText, ButtonArrow, LinkCtaContent      | `components/ui/*`                                        | small shared helpers; client components import only the client-safe ones | everywhere                           |

Sections (`src/site/sections`): Hero, Services, HomeCases, Uniqueness, Approach, Testimonials, Partners, Industries, Faq, Contact.

## Planned (built with the page that first needs them)

Breadcrumbs, Marquee, LeaderCard, FounderCard, FeatureCard, ProcessStep, filter pills (Cases list).

## Architecture notes

- **Services are a collection** (`services`, list page `/services`, items `/services/<slug>`): one page template, editors add new
  services in the admin and they appear in the Services menu, the mobile menu and (later) the Home tabs. The old live URLs
  `/saas`, `/mobile`, `/web` get 301 redirects when the domain moves.
- **Cases are a collection** (`/cases/<slug>`); old live URLs `/<slug>` get 301 redirects when the domain moves.
- **Placeholder pages** (`src/content/pages/placeholders.ts`) are real registered pages (menu, SEO, admin) until their content
  is delivered; replace an entry with a full page definition when its page is built.
- **Windows:** `corepack enable` needs admin rights, so run `corepack pnpm …`. If SWC fails with `ERR_SWC_NATIVE_CACHE`, set
  `SWC_NATIVE_BINDING_CACHE` to a folder in the user profile (e.g. `C:\Users\<you>\.swc-native`).
- **Template tests** that were written against the demo content (page `team`, collection `blog`, locale `uk`) are adapted
  after the Home page, when a real page with the needed fields exists.

## Added with the design update 2026-10-29

| Component                                                          | File                                          | Notes                                                                                               |
| ------------------------------------------------------------------ | --------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Mega menu (`MegaProvider`, `MegaTrigger`, `MegaPanel`, `MegaCard`) | `src/site/layout/mega-menu.tsx`               | one open panel at a time; Esc, click outside, resize close it; dims the page                        |
| Language switcher                                                  | `src/site/layout/language-switcher.tsx`       | drop-down, hidden while the site has one language                                                   |
| Footer link                                                        | `src/site/layout/footer-link.tsx`             | current page orange and underlined                                                                  |
| Contact panel (`ContactPanel`, `ContactDrawer`, `ContactInline`)   | `src/site/components/contact/`                | tabs, calendar, chips; the drawer opens from any `data-drawer` element (`ButtonLink drawer="book"`) |
| Booking time helpers                                               | `src/site/components/contact/booking-time.ts` | mocked availability; replace `slotsFor` with a real calendar                                        |
| Drag-to-scroll hook                                                | `src/site/components/ui/use-drag-scroll.ts`   | round cursor, snap to the nearest card                                                              |

## Added with the design update 2026-11

| Component                         | File                                            | Notes                                                                              |
| --------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------- |
| Graphic (pure-CSS illustration)   | `src/site/components/ui/graphic.tsx`            | renders trusted HTML from `src/site/theme/graphics.ts` (Approach and Why us cards) |
| Accordion "show more"             | `src/site/components/accordion.tsx`             | `collapsedCount`, `moreLabels`: extra items stay in the HTML, hidden with CSS      |
| Message form of the contact panel | `src/site/components/contact/contact-panel.tsx` | advanced switch, chips, scope cards; forms `contact` and `project`                 |

## Added with Cases

| Component               | File                                                                | Notes                                                                    |
| ----------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Breadcrumbs             | `src/site/components/breadcrumbs.tsx`                               | `hero` (light, on a picture) and `case` (orange mark) variants           |
| Author                  | `src/site/components/author.tsx`                                    | round photo, name, optional flag, role: client feedback and the CEO card |
| Cases list with filters | `src/site/components/cases-browser.tsx`                             | pills / phone drop-down, sticky bar                                      |
| Other cases slider      | `src/site/components/case-slider.tsx`                               | scroll track with round buttons                                          |
| Case card               | `src/site/components/case-card.tsx`                                 | now with an optional phone cover                                         |
| Case page sections      | `src/site/sections/case-*.tsx`, `other-cases.tsx`, `cases-hero.tsx` | details, screens, feedback, CTA, other cases, hero                       |

## Added with the service template

| Component                  | File                                      | Notes                                                                             |
| -------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------- |
| Partner marquee            | `src/site/components/partner-marquee.tsx` | three copies of the logos, moved by script at 80 px/s, still with "reduce motion" |
| Case card, stacked variant | `src/site/components/case-card.tsx`       | `stacked`: name, text and tags one under another (service pages, next service)    |
| Service page sections      | `src/site/sections/service-*.tsx`         | hero, about, features, cases, idea, process, partners, next                       |

## Added with About us

| Component                   | File                                    | Notes                                      |
| --------------------------- | --------------------------------------- | ------------------------------------------ |
| 3D logo                     | `src/site/components/kz-logo-3d.tsx`    | loads three.js and the logo script on idle |
| Difference card             | `src/site/components/diff-card.tsx`     | Lottie illustration that plays on hover    |
| Script loader               | `src/site/components/ui/load-script.ts` | `loadScript` (once per file), `whenIdle`   |
| Breadcrumbs, `page` variant | `src/site/components/breadcrumbs.tsx`   | dark trail at the top of a plain page      |

## Added with Approach, Reviews and Contact us

| Component                  | File                                      | Notes                                                   |
| -------------------------- | ----------------------------------------- | ------------------------------------------------------- |
| Lottie hover hook          | `src/site/components/use-lottie-hover.ts` | used by `DiffCard` (About) and `PhaseVisual` (Approach) |
| Phase visual               | `src/site/components/phase-visual.tsx`    | dark box with a hover animation                         |
| Clutch widget              | `src/site/components/clutch-widget.tsx`   | loads Clutch's script once, then initializes the widget |
| Accordion, `phase` variant | `src/site/components/accordion.tsx`       | light list of the Approach steps                        |
| Contact block, `asPage`    | `src/site/sections/contact.tsx`           | h1 and page spacing                                     |

## Added with the legal pages

| Component       | File                       | Notes                                                           |
| --------------- | -------------------------- | --------------------------------------------------------------- |
| Legal page view | `src/site/pages/legal.tsx` | replaces the placeholder view; fields title, last updated, text |
