# Plan: K&Z Design website

Template version: v1.8.3 · Locales: en (default, only) · Hosting: Vercel · Admin path: `/kzds-admin`
Mode: **B, page by page**. Specs: `docs/project/DESIGN_ANALYSIS.md`, `docs/project/BRIEF.md`, design sources in `design/KZ/kz-homepage/` (`design-system/DESIGN_SYSTEM.md` is binding).

## Page map

| id               | path                                      | parent   | label                   | sections / notes                                                                                                                            |
| ---------------- | ----------------------------------------- | -------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| home             | `/`                                       | —        | Home                    | hero, services, cases (teasers), uniqueness (shared), approach, testimonials (shared), partners (shared), industries, faq, contact (shared) |
| about            | `/about-us`                               | —        | About us                | hero + breadcrumbs, story/leaders, differences (Lottie), uniqueness (shared), testimonials (shared), contact (shared)                       |
| cases            | `/cases`                                  | —        | Cases                   | hero, filter pills, case list (collection), contact (shared)                                                                                |
| case item        | `/cases/<slug>`                           | cases    | (collection `cases`)    | details, feedback, desktop+mobile images, other cases, CTA block                                                                            |
| service item     | `/services/<slug>` (saas, mobile, web, …) | services | (collection `services`) | hero, about, founders (SaaS), cases, features, process, partners marquee, idea banner, next service, testimonials, contact                  |
| approach         | `/approach`                               | —        | Our approach            | empty placeholder (client adds later)                                                                                                       |
| reviews          | `/reviews`                                | —        | Reviews                 | empty placeholder (Clutch widget later)                                                                                                     |
| contact-us       | `/contact-us`                             | —        | Contact us              | empty placeholder (+ contact form section later)                                                                                            |
| privacy-policy   | `/privacy-policy`                         | —        | Privacy Policy          | empty                                                                                                                                       |
| terms-of-service | `/terms-of-service`                       | —        | Terms of Service        | empty                                                                                                                                       |
| refund-policy    | `/cancellation-and-refund-policy`         | —        | Refund Policy           | empty                                                                                                                                       |
| 404, maintenance | —                                         | —        | —                       | site style                                                                                                                                  |

### Home: sections and fields (seed = verbatim text from `index.html`)

| section               | fields                                                                                                                                                      |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hero                  | badgeLabel, badgeLink, title (2 lines), subtitle (rich text with highlighted phrase), cta (label, link), awardsLabel, awards[] (image, alt) ×5, clutch logo |
| services              | eyebrow, services read from collection `services` (tab label, short title, description, items[] 5–6, learn-more link)                                       |
| cases                 | eyebrow, title, items = 4 picked cases (reference to collection `cases`), seeAll link                                                                       |
| uniqueness (shared)   | eyebrow, title, cards[] ×3 (title, bullets[], quote with bold parts, person (name, role, avatar), image)                                                    |
| approach              | eyebrow, title, text, link, cards[] ×4 (title, image, link)                                                                                                 |
| testimonials (shared) | eyebrow, title, items from collection `testimonials`, readReviews link, clutch strip (rating text, count, link)                                             |
| partners (shared)     | eyebrow, title, tiles[] ×24 (logo, name, optional case reference)                                                                                           |
| industries            | eyebrow, title, text, items[] ×12 (icon, label, text, cases[] references)                                                                                   |
| faq                   | eyebrow, title, subtitle, cta, items[] ×18 (question, answer)                                                                                               |
| contact (shared)      | title (with lightning icon), lead, team[] ×2 (photo, name, role, bio), form texts, company details (from global)                                            |

## Collections, globals, forms

| Kind           | id                                          | Purpose           | Fields                                                                                                                                                                                                                                                                                                         | Routes / where shown                                                                      |
| -------------- | ------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| collection     | cases                                       | 16 case studies   | title (may have a line break), slug, shortDescription, tags[] (visible), categories[] (filter), coverDesktop, coverMobile?, details[] (Industry/Platform/Year), feedback? (lead, paragraphs, photo, flag, device image), imagesDesktop[], imagesMobile[], otherCases[] (refs, 8), homeThumb (Industries), meta | `/cases`, `/cases/:slug`, Home teasers, service pages, Industries, Partners, Testimonials |
| collection     | testimonials                                | 14 reviews        | name, flag (image), role, project, photo, quote (rich text paragraphs), case? (ref to cases), caseSoon (bool)                                                                                                                                                                                                  | Home slider, About, Reviews                                                               |
| collection     | services                                    | SaaS, Mobile, Web | slug (`saas`…), tabLabel, title, description, items[], heroImage, aboutParagraphs[], showFounders, caseList (refs), ideaDeviceImage, nextService (ref), meta                                                                                                                                                   | `/services`, `/services/:slug`, Home tabs, nav dropdown                                   |
| global         | site                                        | layout chrome     | nav (labels + links), headerCta, company (legal name, registry, address), email, socials[] (LinkedIn, Dribbble, Behance), legalLinks[], clutch (url, rating, count)                                                                                                                                            | header, footer, contact section, mobile menu                                              |
| shared section | uniqueness, testimonials, partners, contact | see Home table    |                                                                                                                                                                                                                                                                                                                | Home, About, services                                                                     |
| form           | contact                                     | contact requests  | name* , email* , message                                                                                                                                                                                                                                                                                       | Contact section → inline success ("Thank you!") ; admin inbox only                        |

Missing core features: none known. To verify while building: (1) reference fields between collections (cases ↔ testimonials/partners/industries) — if absent, use slug text fields + a lookup helper; (2) 301 redirects `/<slug>` → `/cases/<slug>` (not needed until the domain moves to this site; decide then, `next.config.ts` is not core).

## Tokens (from `design-system/tokens.css`, kit names kept)

- Colors: brand orange `#FC814A` (+darker `#FF7A00`, lighter `#FF9465`), secondary `#262930` (+`#181B22`, `#303642`), content high/medium/low (+alternate on dark), bg default/secondary/alternate, outlines on white/dark, semantic negative/positive/warning/notification; homepage-only `--x-*` greys mapped to kit roles where the doc says so.
- Fonts: Google Sans Flex (variable) self-hosted (`next/font/local`), Satoshi 400/500 (Body 4 only) self-hosted.
- Text styles: h1 600 88/32, h2 300 64/40 (−3%), h3 300 32/24, h4 300 24/20, h5, h6, sub1–sub4, body1–body4 (+medium/semibold), caps, caps-light; homepage section title (`h-section`) and button/nav labels as project styles.
- Layout: container 1850 max, page margin `clamp(40px, 4.1667vw, 75px)` / 16 mobile, section padding 140/60, compact 80/40, header 94→68 (mobile 100→72), radii 4/8/12/999 (+1.5), shadows default/menu, motion durations 200/250/350/450/600/800 ms, breakpoints 767 and 1100 (burger).

## Components (bottom-up build order)

Primitives (`src/site/components/ui/`, extending the template's): Button/ButtonLink (primary dark, light, with arrow reveal, sizes md/lg), LinkCta (circle + underline, light/dark), TextLink, RoundArrowButton (prev/next, disabled), IconButton, Eyebrow (K&Z mark, light/dark), Heading/Text styles, Tag, Chip, Field + Input + Textarea (outlined/filled, states), Icon set, Breadcrumbs, Avatar, Container/Section.
Patterns (`src/site/components/`): SectionHeader, CaseCard (large/small/stack), UniquenessCard, ApproachCard, TestimonialCard, PartnerTile, Accordion (light/dark), IndustryCaseItem, TeamRow/LeaderCard/FounderCard, AwardsStrip, ServiceTabs, ContactCard (company), ContactForm, Marquee.
Sections (`src/site/sections/`): Hero, Services, CasesTeaser, Uniqueness, Approach, Testimonials, Partners, Industries, Faq, ContactSection.
Layout: SiteHeader (scrolled state, dropdown, burger + full-screen menu), SiteFooter, 404, maintenance.
Client components (and why): header (scroll state, menu open, focus management), AwardsStrip (expand/collapse), ServiceTabs (autoplay/tabs), TestimonialSlider (scroll buttons + disabled state), TestimonialQuote scroll bar, Accordion (open state; native `details` not allowed by the animation spec), TeamRow (mobile accordion), ContactForm (`useSiteForm`).
Everything else is a Server Component. `docs/project/COMPONENTS.md` is created while building and kept up to date.

## Integrations

| Service               | Purpose      | Where it is switched on                                                          |
| --------------------- | ------------ | -------------------------------------------------------------------------------- |
| Google Analytics      | traffic      | Settings → Integrations (the team, later)                                        |
| Hotjar                | recordings   | Settings → Integrations (the team, later)                                        |
| Clutch reviews widget | Reviews page | later; needs a `projectConfig.csp` frame/script source when the widget is chosen |
| Satoshi, images       | self-hosted  | nothing                                                                          |

## Progress (page by page)

| #   | Page                                                                                           | Task (issue)      | Owner    | Branch                            | Asked / confirmed | Built | Checked                                                     | User OK |
| --- | ---------------------------------------------------------------------------------------------- | ----------------- | -------- | --------------------------------- | ----------------- | ----- | ----------------------------------------------------------- | ------- |
| 0   | Foundation (config, tokens, fonts, primitives, header, footer, 404, placeholder pages, global) | —                 | Nazar KZ | `main` (before the team workflow) | —                 | yes   | yes                                                         | yes     |
| 1   | Home                                                                                           | —                 | Nazar KZ | `main` (before the team workflow) | yes               | yes   | yes (1440: 0.17%, 375: 0.85% mismatch; interactions tested) |         |
| 2   | About us                                                                                       | #5                |          |                                   |                   |       |                                                             |         |
| 3   | Cases list + case template (all 16 cases)                                                      | #6                |          |                                   |                   |       |                                                             |         |
| 4   | Service template (SaaS, Mobile, Web)                                                           | #7                |          |                                   |                   |       |                                                             |         |
| 5   | Empty pages (Approach, Reviews, Contact us, legal ×3)                                          | #8, #9            |          |                                   |                   |       |                                                             |         |
| 6   | Full verification (gates, e2e, Lighthouse, audit), Vercel deploy                               | #16, #17, #11–#15 |          |                                   |                   |       |                                                             |         |

All tasks are GitHub issues (`nazars-kz/kzdesign`, labels `task` + `status:*` + a kind label); owners and branches are filled in when a task is claimed.

### Stages and kinds (skill `references/project-plan.md`)

The 8 stages are GitHub milestones (`team-task.mjs setup`): 1 Підготовка проєкту · 2 Дизайн-система · 3 Сторінки (чернетка) · 4 Перегляд чернетки · 5 Виправлення · 6 Фінальний перегляд · 7 Запуск · 8 Після запуску. Kinds are labels: Підготовка, Дизайн-система, Сторінка, Частина сторінки, Перегляд, Виправлення, Запуск, Оновлення.

| Stage | Cards                                                                                                                    |
| ----- | ------------------------------------------------------------------------------------------------------------------------ |
| 1     | #4 (skill update), #16 (e2e), #18 (branch protection), #20 (line endings)                                                |
| 2     | #1 (foundation: tokens, primitives, header, footer)                                                                      |
| 3     | #2 Home, #3 Services collection, #5 About us, #6 Cases, #7 Service template, #8 Approach/Reviews/Contact, #9 legal texts |
| 4     | #10 text errors to the client; a review card per page is created when the page is on staging                             |
| 6     | #17 final check                                                                                                          |
| 7     | #11 Neon, #12 Vercel, #13 domain, #14 analytics and mail, #15 SEO titles                                                 |

New remarks from reviewers become fix cards (stage 5) linked to the page card; see the skill's `project-plan.md` §4–5.

## Build order

1. Config (`/kzds-admin`, `siteRoutes`, English only), demo removal, download external images and Satoshi into `public/` / seeds
2. Tokens and fonts
3. Primitives (all from the inventory), then patterns
4. Layout: header, footer, mobile menu, 404, maintenance, global `site`
5. Empty pages (so the menu has no broken links)
6. Page by page: Home → About → Cases → Services (each: confirm understanding → build → check → hand over)
7. Verification and deploy
