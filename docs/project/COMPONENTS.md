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

| Component                             | File                                        | Variants / props                                                                                         | Used in                                                                    |
| ------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Heading / Text                        | `typography.tsx`                            | Heading: h1–h6, `section-title`; Text: lead, body-lg, body, body-sm, caption, overline, label; tone      | everywhere                                                                 |
| Container / Section                   | `layout.tsx`                                | width content/wide/prose; tone default/surface/inverse; spacing default/tight/none; `id`                 | every section                                                              |
| Button / ButtonLink / `buttonClasses` | `button.tsx`, `button-styles.ts`            | variant `primary` (dark) / `light`; size md 54 / lg 57 / xl 67; arrow slides in on hover (`ButtonArrow`) | header (×2), hero, FAQ, form                                               |
| LinkCta                               | `link-cta.tsx`                              | external; recolors on dark                                                                               | Services, Cases, Approach, Testimonials                                    |
| Eyebrow                               | `eyebrow.tsx`                               | recolors on dark                                                                                         | every section                                                              |
| Round arrow button                    | CSS class `round-btn` (+ `--prev`/`--next`) | disabled                                                                                                 | Services, Testimonials, case slider (component with state comes with Home) |
| SiteImage, RichText, form styles      | template                                    |                                                                                                          | content images, rich text, forms                                           |

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

| Component | File | Notes | Used in |
|---|---|---|---|
| SectionHeader | `components/section-header.tsx` | eyebrow + title; gap via `--section-header-gap` set by the section | all sections |
| Tag / TagList | `components/ui/tag.tsx` | CAPS tags | case cards |
| CaseCard | `components/case-card.tsx` | cover, name, description, tags; heading level prop | Home, Cases list, later case sliders |
| AwardsStrip (client) | `components/awards-strip.tsx` | expand / collapse, width via CSS variable | Hero |
| ServiceTabs (client) | `components/service-tabs.tsx` | autoplay 10 s with progress line, pills on phones | Home |
| Accordion (client) | `components/accordion.tsx` | variants `industries` (dark) / `faq` (light); one open at a time | Industries, FAQ |
| TestimonialSlider (client) + TestimonialCard + QuoteScroll (client) | `components/testimonial-*.tsx`, `quote-scroll.tsx` | scroll-snap track, arrows with disabled ends, quote with own scroll bar | Testimonials (Home, About, Reviews) |
| PartnerTile | `components/partner-tile.tsx` | logo, optional case link with hover | Partners |
| TeamMember (client) | `components/team-member.tsx` | row on desktop, accordion on phones | Contact block |
| ContactForm / ContactFormBlock | `components/contact-form.tsx`, `contact-form-server.tsx` | outlined fields on dark, submit enabled when valid | Contact block |
| CompanyCard | `components/company-card.tsx` | from the `site` global | Contact block |
| ContentLink, Lines, PlainRichText, ButtonArrow, LinkCtaContent | `components/ui/*` | small shared helpers; client components import only the client-safe ones | everywhere |

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
