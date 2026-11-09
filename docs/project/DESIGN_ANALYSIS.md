# Design analysis: K&Z Design

Sources (all in `design/KZ/`, git-ignored):

- `kz-homepage/` — since 2026-10-29 `index.html` in the root and the other pages in `pages/` (cases in `pages/cases/`): 25 ready HTML pages + `css/` (`style.css`, `about.css`, `service.css`, `cases.css`, `case.css`), `js/` (`main.js`, `about.js`, `service.js`, `cases.js`, `case.js`, `vendor/lottie_svg.min.js`), `assets/`, `fonts/` (Google Sans Flex variable font since 2026-10-28; Outfit files remain unused), `tools/` (Python page generators, reference only).
- `kz-homepage/design-system/` — `DESIGN_SYSTEM.md` (v1.2, tokens, component inventory, motion table, SEO rules), `tokens.css`, `components.css`, `fonts.css`, `index.html` (living style guide). **This is the main spec; it wins over guesses.**
- `KZ/logo.svg`, `icon.svg`, `KZ Showreel.mp4`, `Partners/*.png` (24 logos, originals), `Кейси/*.png` (4 case covers), `kz-logo-3d/` (GLB + three.js demo + renders; not used by the pages seen so far).

Design language (texts): **English**. Viewports: desktop (layout 1440, fluid) and mobile (layout 375). No tablet layout (decision in DESIGN_SYSTEM.md): desktop ≥ 768, mobile ≤ 767; the nav collapses into a burger at ≤ 1100.
Figma: file `4dIoweNB6cpI8OD8W7DOEL` (homepage desktop `13203:2`, mobile `13203:1895`, hover specs `13220:4376`). Live site: https://www.kz.design/

## Pages

| #    | Page                                                                           | Proposed path                                                                                                     | Parent | Source file                                                                                                                                                                                 | Notes                                                                   |
| ---- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1    | Home                                                                           | `/`                                                                                                               | —      | `index.html`                                                                                                                                                                                | first to build (Figma exists)                                           |
| 2    | About us                                                                       | `/about-us`                                                                                                       | —      | `about-us.html`                                                                                                                                                                             | Lottie cards, leaders, breadcrumbs                                      |
| 3    | Service: SaaS                                                                  | `/saas`                                                                                                           | —      | `saas.html`                                                                                                                                                                                 | one template for 3 services                                             |
| 4    | Service: Mobile                                                                | `/mobile`                                                                                                         | —      | `mobile.html`                                                                                                                                                                               | same template                                                           |
| 5    | Service: Web                                                                   | `/web`                                                                                                            | —      | `web.html`                                                                                                                                                                                  | same template                                                           |
| 6    | Cases list                                                                     | `/cases`                                                                                                          | —      | `cases.html`                                                                                                                                                                                | 16 cases, filter pills                                                  |
| 7–22 | Case study ×16                                                                 | `/<slug>` (or `/cases/<slug>`, see question)                                                                      | Cases  | touren, onground, brightgate, hr-hub, signal-sigma, filmtoro, print-buy, listen-upp, mynqs, momento, quintessia, hotsheet, signature-pharmacy, persuasion-systems, vidsprint, whodunnit-2-0 | one template; body = ordered list of exported images (desktop + mobile) |
| —    | Approach, Reviews, Contact us, Privacy Policy, Terms of Service, Refund Policy | `/approach`, `/reviews`, `/contact-us`, `/privacy-policy`, `/terms-of-service`, `/cancellation-and-refund-policy` | —      | **no design**, links point to the live site                                                                                                                                                 | gap → question                                                          |
| —    | 404, maintenance, thank-you                                                    | —                                                                                                                 | —      | no design                                                                                                                                                                                   | gap → same style as the site                                            |

## Sections per page

### Home (`index.html`)

1. **Header**: logo 126×32, nav (Home, Services ▾ [SaaS, Mobile, Web], Cases, Approach, About us, Reviews, Contact us), "Get in touch" button, burger ≤ 1100 + full-screen menu. 94px → 68px after scroll.
2. **Hero** (light): Clutch badge link, **H1** "Your reliable UX/UI design partner", sub with highlighted phrase, dark button, **Awards strip** (Clutch logo + 5 badges, collapsed shows 3, arrow expands, width animation).
3. **Services** (dark, photo bg): eyebrow, 3 pills/tabs (Saas, Apps, Web), title + description per tab, prev/next round arrows, 3 tabs with 10s autoplay progress line, "Learn more" link (changes per tab), right column: numbered list of 6 / 5 / 5 items.
4. **Case Studies** (light): eyebrow + H2, 4 large case cards (image 1320×637, shade, name, description, 3–6 tags), "See all cases".
5. **Uniqueness** (dark): eyebrow, H2, 3 cards (title, 2–5 bullets, quote with bold fragments, person, illustration).
6. **Our Approach** (light): eyebrow, H2, text, link, 4 cards (Discovery, Strategy, UX/UI Design, Prototyping) with image.
7. **Testimonials** (dark): eyebrow + H2, prev/next arrows, horizontal slider of 14 cards (photo, name + flag, role, project; quote with inner custom scrollbar; optional "View case study" mini-card or "Case study is coming soon"), "Read our reviews", Clutch rating strip (59 reviews).
8. **Partners** (light): eyebrow, H2, 24 logo tiles, 8 of them link to a case ("View case study" hover overlay).
9. **Industries** (dark): eyebrow, H2, text, accordion of 12 industries (icon, label, text, 1–4 case thumbnails). First open, one at a time.
10. **FAQ** (light): eyebrow, H2, "Have any other questions?" + button, accordion of 18 Q&A (first closed/open per spec), repeated CTA below the list on mobile.
11. **Contact** (dark, bg svg): H2 with lightning icon, lead, 2 team rows (photo, name, role, bio; mobile = accordion), form card (Name*, Email*, Message optional, Submit disabled until valid), company details card.
12. **Footer** (light): logo, nav, 3 social icons, © line with company data, 3 legal links.

### About us

Header → hero + breadcrumbs → story/leaders (Leader card: photo, name with orange initial, role, bio) → "What makes us different" cards (Lottie, hover frame 0→50%) → Uniqueness → Testimonials → Contact → Footer. (Details to be read page by page.)

### Service pages (SaaS / Mobile / Web)

Hero image with breadcrumbs, about paragraphs, founders mini cards (SaaS only), case studies list, features (3 cards, radial gradient), process (4 steps, second row shifted 108px), partners marquee (24 logos, endless, 80px/s), "Got an idea?" banner, "Next service" card, testimonials, contact, footer.

### Cases list

Hero, filter pills (All + categories), 16 case cards (large and `--stack` variant), contact, footer.

### Case study (×16)

Title, details rows (Industry / Platform / Year), optional client feedback (quote, photo, flag, device visual), desktop image list + separate mobile image list, "Other case studies" slider (8), CTA block (Vlad's card).

## Component inventory

Names follow `DESIGN_SYSTEM.md` §2; Figma names win.

| Component                                                                | Layer     | Variants / sizes                                                                                                               | Appears on                                   | Notes                                               |
| ------------------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- | --------------------------------------------------- |
| Button (`.btn`)                                                          | primitive | primary dark, light/alt · md 54 / lg 60–67; with arrow reveal on hover (homepage behaviour); kit variants primary/alt/disabled | header (×2), hero, FAQ (×2), form, all pages | pill; label Outfit 600                              |
| Link CTA (`.link-arrow` / kit Secondary)                                 | primitive | on light / on dark; orange 40px circle + label; hover circle shrinks, underline grows                                          | Services, Cases, Approach, Testimonials      |                                                     |
| Text link (Tertiary)                                                     | primitive | light / dark                                                                                                                   | footer, nav                                  | hover orange                                        |
| Round slider arrow (`.round-btn`)                                        | primitive | prev / next · disabled · 45px                                                                                                  | Services, Testimonials (×2), Case slider     |                                                     |
| Icon button                                                              | primitive | orange / alternate outlined                                                                                                    | kit                                          |                                                     |
| Eyebrow                                                                  | primitive | light / dark; orange K&Z mark + CAPS 12/18                                                                                     | every section (11+)                          |                                                     |
| Heading / Text styles                                                    | primitive | H1–H4, Sub 1–4, Body 1–4, CAPS                                                                                                 | all                                          | tokens in `DESIGN_SYSTEM.md` §1.2                   |
| Tag                                                                      | primitive | default, radius 1.5, h 31.5                                                                                                    | case cards, cases list                       |                                                     |
| Chip                                                                     | primitive | on dark                                                                                                                        | Industries / filters                         | border → orange on hover                            |
| Field (input, textarea)                                                  | primitive | outlined (dark) / filled (light) × idle, hover, focus, filled, error, disabled                                                 | Contact form                                 | label with orange `*`                               |
| Breadcrumbs                                                              | pattern   | light                                                                                                                          | all inner pages                              | + schema.org BreadcrumbList                         |
| Icon                                                                     | primitive | 24px stroke 2                                                                                                                  | all                                          | inline SVG, `currentColor`                          |
| SectionHeader                                                            | pattern   | left; with/without action; light/dark                                                                                          | 9+ sections                                  | eyebrow + H2 (+ lead)                               |
| Case card                                                                | pattern   | large, small, `--stack`                                                                                                        | Home, Cases, services, case slider           | image zoom 1.03; one component for list and teasers |
| Uniqueness card                                                          | pattern   | —                                                                                                                              | Home, About                                  |                                                     |
| Approach card                                                            | pattern   | —                                                                                                                              | Home                                         | image lifts 4px                                     |
| Testimonial card                                                         | pattern   | with case link / "coming soon" / none                                                                                          | Home, About, Reviews                         | inner scroll with custom bar                        |
| Partner tile                                                             | pattern   | logo / logo + case link                                                                                                        | Home, service pages (marquee)                |                                                     |
| Accordion                                                                | pattern   | light (FAQ) / dark (Industries); first open; one at a time                                                                     | Home (×2)                                    | `aria-expanded`, grid 0fr→1fr                       |
| Industry case item                                                       | pattern   | —                                                                                                                              | Industries                                   |                                                     |
| Person / team row                                                        | pattern   | desktop row / mobile accordion; Leader card; Founder mini card                                                                 | Contact, About, services                     |                                                     |
| Awards strip                                                             | pattern   | collapsed / expanded                                                                                                           | Hero                                         |                                                     |
| Service tabs                                                             | pattern   | autoplay with progress line                                                                                                    | Home                                         | client component                                    |
| Feature card, Process step card, "Got an idea?" banner, Partners marquee | pattern   | —                                                                                                                              | service pages                                |                                                     |
| Contact form                                                             | pattern   | outlined fields on dark glass card                                                                                             | Home, About, Cases, services                 | one form definition reused                          |
| Company details card                                                     | pattern   | —                                                                                                                              | Contact                                      | from global                                         |
| Header / Mobile menu / Footer                                            | layout    | scrolled, burger                                                                                                               | all                                          | contacts + socials from global                      |

## Design tokens (candidates)

Full tables are in `design/KZ/kz-homepage/design-system/DESIGN_SYSTEM.md` §1 and `tokens.css`; they map 1:1 to `src/site/theme/`.

### Colors (kit)

`--accent-primary #FC814A` (orange), `-darker #FF7A00`, `-lighter #FF9465`; `--accent-secondary #262930`, `-darker #181B22`, `-lighter #303642`; content high/medium/low `#181B22` 100/80/50%; alternate `#FFF` 100/80/50%; `--content-disabled #AAA9B8`; bg default `#FFF`, secondary `#F2F2F2`, alternate `#181B22`; outline on white `#181B22` 10%, on dark `#FFF` 10%; semantic negative `#D72929`, positive `#22BA5F`, warning `#D9A136`, notification `#267DE3`.
Homepage-only `--x-*` greys (10 values, listed in the doc) — to be mapped to kit roles (open question #5 in the design system).

### Typography

Primary **Google Sans Flex** (variable 100–1000, self-hosted, replaced Outfit on 2026-10-28; before that Nekst), secondary **Satoshi** (Body 4 only, now from Fontshare CDN → self-host). H1 600 88/32 · H2 300 64/40 (−3%) · H3 300 32/24 · H4 300 24/20 · Sub 1–4 · Body 1–4 · CAPS 12/18 600. Line heights 110–150%. Buttons/links/eyebrows weight 600.

### Layout

Container max 1850; page margin `clamp(40px, 4.1667vw, 75px)` (60 @1440), mobile 16; grid 12 col / gap 24 (mobile 2 col / 15); section padding 140 / 60, compact 80 / 40; header 94→68 (mobile 100→72). Radii: small 4/8, middle 8, large 12, infinite 999 (+1.5 tags, 0 on case/testimonial/form cards). Shadow default `0 5px 50px rgba(0,0,0,.02)`, menu `0 12px 30px rgba(0,0,0,.08)`. Breakpoints: 767 / 1100.
Motion tokens: 200 / 250 / 350 / 450 / 600 / 800 ms, ease `cubic-bezier(.4,0,.2,1)` for large changes, services autoplay 10s linear.

## Content model

| Content                                                                          | Where                                                                                   | Proposed model                                                                                                          | Certain? |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------- |
| Case studies (16)                                                                | Home teasers, Cases list, services, case pages, partners, industries, testimonials link | **collection** `cases` (name, description, tags, categories, desktop+mobile cover, details rows, feedback, image lists) | ask      |
| Services (3)                                                                     | Home tabs, nav dropdown, service pages                                                  | **collection** `services` (per-service fields in DESIGN_SYSTEM §10)                                                     | likely   |
| Testimonials (14)                                                                | Home, About, Reviews                                                                    | **collection** `testimonials` (photo, name, flag, role, project, quote, linked case)                                    | ask      |
| Partners (24)                                                                    | Home, service marquee                                                                   | list field in a global/section (logo, name, optional case)                                                              | ask      |
| Industries (12)                                                                  | Home                                                                                    | list field (icon, label, text, linked cases)                                                                            | yes      |
| FAQ (18)                                                                         | Home                                                                                    | list field (question, answer)                                                                                           | yes      |
| Uniqueness (3), Approach (4), Awards (5 badges)                                  | Home / About                                                                            | list fields in the page                                                                                                 | yes      |
| Team (2 on Contact; leaders on About; founders on SaaS)                          | several                                                                                 | list field / collection                                                                                                 | ask      |
| Company details, email, socials, legal links, Clutch link and rating, nav labels | header, footer, contact                                                                 | **global**                                                                                                              | yes      |
| Contact form                                                                     | Home, About, Cases, services                                                            | form `contact` + admin inbox                                                                                            | yes      |
| UI strings ("Learn more", "View case study", "Get in touch", aria labels)        | everywhere                                                                              | `src/site/messages/<locale>.json`                                                                                       | yes      |

## Forms

| Form    | Page                                                  | Fields                                                                  | Destination                                                       |
| ------- | ----------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Contact | Home, About, Cases, services (shared Contact section) | Name* , Email* (valid), Message (optional); submit disabled until valid | now `mailto:hello@kz.design` fallback → admin inbox + email (ask) |

## Motion & interactions (from `DESIGN_SYSTEM.md` §3 and `js/main.js`; page-specific ones to be re-checked per page)

| Page / element                   | Trigger                   | What changes                                                                                           | Duration · easing | Repeats | Built? |
| -------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------- | ------- | ------ |
| Header                           | scroll > 4px              | height 94→68, button 54→44, hairline shadow                                                            | 300ms ease        | toggles |        |
| Nav link                         | hover / active            | underline scaleX 0→1 from left                                                                         | 300ms             | —       |        |
| Services dropdown                | hover / focus-within      | fade + translateY(−6→0), chevron rotates                                                               | 200 / 250ms       | —       |        |
| Button (homepage)                | hover                     | dark → #262930, arrow width 0→22 + margin 10, fade in                                                  | 250ms             | —       |        |
| Link CTA                         | hover                     | circle scale .4 + fade, underline grows left→right                                                     | 300 / 350ms ease  | —       |        |
| Awards arrow                     | click                     | strip expands to all badges, gap 0→12, arrow rotates                                                   | 600ms emphasized  | toggles |        |
| Services tabs                    | autoplay / click / arrows | progress line fills in 10s linear, next tab; text fades, items fade-up 12px; "Learn more" href changes | 10s · 450ms       | loops   |        |
| Case card                        | hover                     | image scale 1.03, name arrow +4px                                                                      | 800 / 250ms       | —       |        |
| Approach card                    | hover                     | image −4px, title arrow +4px                                                                           | 400 / 250ms       | —       |        |
| Testimonial slider               | click arrows / scroll     | scrollBy card width + 10, arrows disabled at the ends                                                  | smooth            | —       |        |
| Testimonial quote                | scroll / hover            | custom scrollbar thumb (orange on hover), bottom fade hides at end                                     | 200ms             | —       |        |
| Testimonial case link            | hover                     | arrow slides in                                                                                        | 250ms             | —       |        |
| Partner tile (linked)            | hover                     | border dark, overlay "View case study" + arrow slides                                                  | 200–250ms         | —       |        |
| Accordion (FAQ, Industries)      | click                     | grid 0fr→1fr, plus → minus, others close                                                               | 350ms ease        | —       |        |
| Industries row / case            | hover                     | row bg `--accent-secondary` / #333640, arrow fades in from −4px                                        | 250ms             | —       |        |
| Chip / Social icon               | hover                     | border+text orange / bg #F0F0F0                                                                        | 200ms             | —       |        |
| Burger / mobile menu             | click                     | lines → cross, menu fades in from −8px; closes on link click and when > 1100                           | 250ms             | —       |        |
| Team row (mobile)                | click                     | accordion open                                                                                         | —                 | —       |        |
| Contact form                     | input                     | submit enabled when name + valid email                                                                 | —                 | —       |        |
| About: "What makes us different" | hover / in view (touch)   | Lottie frame 0→50%, back on leave                                                                      | 500ms ease-in-out | —       |        |
| Service pages: partners marquee  | load                      | endless horizontal scroll 80px/s                                                                       | linear            | loops   |        |
| All motion                       | `prefers-reduced-motion`  | stops                                                                                                  | —                 | —       |        |

## Interactive behavior

Header compact on scroll; burger full-screen menu ≤ 1100; awards expand/collapse; services autoplay restarts on manual click; accordions one open at a time; testimonial slider by arrows; quote inner scroll; cases filter pills (All + categories, one active); contact form validation.

## Third-party embeds / integrations

- Clutch badge/rating links (static, no widget script found on the homepage).
- Satoshi from Fontshare CDN → self-host in production.
- ~25 images hotlinked from `cdn.prod.website-files.com` (testimonial photos, flags, case thumbnails in Industries) → must be downloaded into the project.
- Lottie (`js/vendor/lottie_svg.min.js`) on About.
- No analytics found in the HTML.

## Gaps and assumptions

- No design for: Approach, Reviews, Contact us, Privacy/Terms/Refund pages, 404, maintenance, thank-you. Links currently go to the live site.
- Mobile layouts exist in CSS (≤ 767) but there are no screenshots; we compare against the HTML in a mobile viewport.
- Primary button hover: kit (turns white) vs homepage (stays dark, arrow slides in) — postponed in the design system; we port the homepage behaviour.
- `--x-*` colours are not in the kit: map to kit roles where the doc says so, otherwise keep as tokens.
- Case-study body is a stack of exported images, not text → one ordered image list per case (desktop + mobile).
- Legal/company text: "K&Zh OÜ, Registry code 17092851, Kaupmehe tn 7-120, Tallinn, 10114, Estonia", hello@kz.design.
- Known inconsistencies (typo-level) in copy are kept verbatim ("research artifacts,.", "it's current state", missing `)` in FAQ) — flag to the client, don't silently fix.
- `KZ Showreel.mp4` and `kz-logo-3d/` are not referenced by the pages read so far.

## Open questions (input for the questions message)

1. Languages (English only?).
2. Which lists are collections the client grows (cases, testimonials) vs fixed lists.
3. URLs of case pages (`/touren` as in the design or `/cases/touren`).
4. Pages with no design (Approach, Reviews, Contact us, legal) — build, link to the live site, or later.
5. Where form requests go (email address), consent checkbox.
6. Hosting (Netlify/Vercel), domain, analytics.
7. Hotlinked images: OK to download them from the old site, or do they have the originals?
8. Commit identity (name/email) for the corporate GitHub account.

## Design update 2026-10-29 (design-system v1.3): what changed and where it is built

Compared file by file with the previous design folder (`design/KZ/kz-homepage` → `design/kz-homepage`). Home first; the other pages follow one by one.

| Change in the design                                                                                                                                                                                                                                | Built on Home | Notes                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Font: Google Sans Flex instead of Outfit; new text style **Section title** 40/48 (mobile 24/33.6), weight 400, replaces H3 32 / 28 for titles under an eyebrow                                                                                      | yes           | `fonts.ts`, `tokens.css` (`--type-section-title-*`)                                                                                                 |
| Headings never end with a full stop                                                                                                                                                                                                                 | yes           | Approach title seed                                                                                                                                 |
| Header: Services is a button with a **mega menu** of image cards (SaaS web apps, Mobile apps, Websites); a round **"=" button** holds Approach and About us; the page is dimmed while a panel is open; nav links are light pills on hover / current | yes           | `mega-menu.tsx`; cards read the services collection (`menuTitle`, `menuImage`) and the global `site → menu`; burger menu and footer keep every link |
| **Contact drawer**: every "Get in touch" opens a panel from the right with tabs _Book a call_ (day → time → details → sent) and _Send a message_ (needs / budget chips, source, NDA, privacy)                                                       | yes           | `components/contact/`; forms `booking` and `project`; texts in Interface texts → Contact panel                                                      |
| Home **contact block** uses the same panel embedded (_Send a message_ first: Name, Email address, Message; _Book a call_ second)                                                                                                                    | yes           | form `contact` for the message, `booking` for calls                                                                                                 |
| **Footer**: brand + claim + button, columns Services / Company / Contact with socials, legal row                                                                                                                                                    | yes           | `site-footer.tsx`                                                                                                                                   |
| **Drag to scroll** on the Testimonials slider with a round "Drag" cursor (mouse only)                                                                                                                                                               | yes           | `use-drag-scroll.ts`                                                                                                                                |
| Cards rounded 8px; case covers keep their proportions; uniqueness cards **stack** while scrolling; Approach / Industries / FAQ layouts and hover motions; industry icons from the K&Z icon pack (no circle)                                         | yes           | `sections.css`; icons in `public/icons/industries`                                                                                                  |
| Light button hover stays light (never dark)                                                                                                                                                                                                         | yes           | `components.css`                                                                                                                                    |
| Pages moved to `pages/`, new pages Reviews, Contact us, Approach; 3D logo on About and case CTA; Lottie hovers; Clutch widget on Reviews; mobile case filter; sticky filter on Cases                                                                | **not yet**   | built with their pages (issues #5–#9)                                                                                                               |

Open points from the design: the booking has **no calendar behind it** (availability is mocked: Mon–Fri 10:00–17:30 Tallinn, 30-minute slots). On the site the request lands in the admin inbox (form `booking`: start time in UTC and the visitor's time zone) and the team confirms by email; a real calendar (Cal.com / Google Calendar) is a separate task. The option lists of the drawer (needs, budgets, "How did you hear about us?") are placeholders in the design; they are editable in the admin.

## Design update 2026-11 (design folder uploaded again): what changed and where it is built

Compared with the previous upload (`git diff` of `design/kz-homepage`). Home first.

| Change in the design                                                                                                                                                                                                                                                                                                                                                                    | Built on Home                          | Notes                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| The round **"=" button and its Approach / About us mega menu are removed**; the nav is Home · Services (mega menu) · Cases · Approach · About us · Reviews · Contact us                                                                                                                                                                                                                 | yes                                    | `navigation.ts`, `site-header.tsx`; the global `site → menu` section and its images are removed                   |
| **"Send a message" form redesigned** and shared by the drawer and every contact block: "Email us at hello@kz.design" box, "or fill out the form below", Your name / Email, "How can we help you?", **Advanced Options** switch (needs chips, project scope MVP / Full-scale, Company, Competitors, NDA), budget chips, "How did you hear about us?" chips, Privacy checkbox, **Submit** | yes, except _Attach file_              | forms `contact` (contact block) and `project` (panel) share `message-fields.ts`; option lists are interface texts |
| **Attach file** (pill, one file up to 10 MB)                                                                                                                                                                                                                                                                                                                                            | **no**                                 | the form engine has no file upload (core). Options: add upload to the template, or drop the pill                  |
| FAQ: the first 6 questions, the rest behind **"Show all questions (19)"** (all in the HTML)                                                                                                                                                                                                                                                                                             | yes                                    | field `visibleCount` in Home → FAQ; texts in Interface texts → Home page                                          |
| **Approach cards**: four pure-CSS illustrations (search typing, MoSCoW, email field, payment toast) that play on card hover                                                                                                                                                                                                                                                             | yes                                    | `theme/graphics.ts` + `graphics-approach.css`; card field `graphic` replaces the picture                          |
| **Why us / Uniqueness cards**: three pure-CSS illustrations (chat, daily update, handoff)                                                                                                                                                                                                                                                                                               | yes                                    | `graphics-why.css`; the design's CSS has an invalid selector (`.sel,@H .hdl`) that browsers ignore: dropped       |
| Case page CTA without the 3D logo; About keeps the 3D logo                                                                                                                                                                                                                                                                                                                              | not yet                                | with the case template (#6)                                                                                       |
| **SEO_BRIEF.md** (titles, descriptions, H1, redirects from Webflow URLs, JSON-LD, alt texts, robots/sitemap, analytics)                                                                                                                                                                                                                                                                 | Home: title, description, FAQPage data | the rest goes to issue #15; the H1 text and the "who we are" paragraph need the client's answer                   |
