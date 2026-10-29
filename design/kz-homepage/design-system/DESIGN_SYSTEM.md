# K&Z Design: design system and build guideline

Status: v1.3 · font: Google Sans Flex · was v1.2 · 2026-10-28 (decisions: no tablet layout, weight 600, fluid page margin like the live site)
Sources:
- Figma file `4dIoweNB6cpI8OD8W7DOEL`, page "🧩 UI kit" (`1:4`)
- Homepage desktop `13203:2` and mobile `13203:1895`
- Hover specs `13220:4376`
- Live site https://www.kz.design/

Files in this folder:
- `tokens.css` holds every design token, with its Figma name in a comment.
- `components.css` holds reference implementations of the kit components and homepage patterns, built on tokens only.
- `index.html` is the living style guide. Open it in a browser and hover the elements.
- `fonts.css` contains the Google Sans Flex `@font-face` rules (self-hosted, `../fonts/`).

This document is written to be dropped into `docs/project/DESIGN_ANALYSIS.md` of the Next.js project (`site-from-design` skill, phase 2). The token, component and motion sections map 1:1 to `src/site/theme/` and the primitives/patterns layers.

---

## 0. Ground rules for every new page

1. **Tokens only.** No hex, px font sizes or durations in components. If a value is missing, add a token first and name it after the Figma variable.
2. **Figma names win.**
   - Use the names of variables, text styles, effect styles and grid styles as they are in the kit (`Grayscale/Content/high` → `--content-high`).
   - If code and Figma disagree, Figma is right unless it is listed under "Known inconsistencies".
3. **One component, one place.**
   - Buttons, links, eyebrows, section headers, cards, tags, accordions, inputs and slider arrows exist once.
   - Variants are modifiers or props, never copies.
4. **Light/dark through roles.**
   - Dark sections use `.on-dark` (or `variant="dark"`). Components switch to the `*-alt` content roles automatically.
   - No separate "white" component copies.
5. **Exact content.**
   - Text is copied verbatim from Figma or the live site: no paraphrasing, no "improving", no shortening.
   - Headings never end with a full stop (decision 2026-10-28; removed from "…look cool" and "We're Ready to Listen").
   - Missing text is marked as `TODO: copy` and the item is listed in the open questions. It is never invented.
   - Images that are not available are placeholders with the correct aspect ratio.
6. **Fonts.** Google Sans Flex replaces Nekst everywhere (decision 2026-10-28; Outfit was used in between, it is no longer loaded anywhere). Self-hosted variable font, weights 100–1000, files `fonts/google-sans-flex-latin(-ext)-wght-normal.woff2` (OFL). Satoshi is used only for Body 4. Fallback is `system-ui`.
7. **Breakpoints: two layouts only, no tablet** (decision 2026-10-28).
   - Desktop is 768 and up (layout 1440). The page margin is fluid (4.1667vw, 60 at 1440, 72 at 1728, max 75, min 40), the content stretches with the window.
   - Mobile is up to 767 (layout 375).
   - The kit's Tablet mode and the Tablet/768 grid are not used.
   - One technical exception: the header nav collapses into the burger at ≤1100, because the full nav does not fit. This is not a separate layout.
8. **Accessibility.**
   - Every interactive element is a `<button>` or an `<a>`.
   - Focus is visible: use the hover style plus a 2px `--accent-primary` outline with 2px offset.
   - Accordions use `aria-expanded`.
   - All motion stops under `prefers-reduced-motion`.
9. **SEO rules** come from the kit's "SEO Instructions for Developers" (section 9 below) and are mandatory.

---

## 1. Design tokens

### 1.1 Colours: collection "Colour Palette" (mode Light)

| CSS token | Figma variable | Value | Use |
|---|---|---|---|
| `--accent-primary` | Accent/primary · Accent/Brand/primary | #FC814A | brand orange: CTA circles, icon buttons, eyebrow mark, focus |
| `--accent-primary-darker` | Accent/primary-shade-darker | #FF7A00 | hover of orange elements |
| `--accent-primary-lighter` | Accent/primary-shade-lighter | #FF9465 | input hover border |
| `--accent-secondary` | Accent/secondary | #262930 | dark surfaces, cards on dark, hover of dark buttons |
| `--accent-secondary-darker` | Accent/secondary-shade-darker | #181B22 | primary button, dark sections |
| `--accent-secondary-lighter` | Accent/secondary-shade-lighter | #303642 | raised surface on dark |
| `--content-high` | Grayscale/Content/high | #181B22 | main text on light |
| `--content-medium` | Grayscale/Content/medium | #181B22 80% | body text on light |
| `--content-low` | Grayscale/Content/low | #181B22 50% | captions, placeholders, help text |
| `--content-high-alt` | Grayscale/Content/high-alternate | #FFFFFF | main text on dark |
| `--content-medium-alt` | Grayscale/Content/medium-alternate | #FFF 80% | body text on dark |
| `--content-low-alt` | Grayscale/Content/low-alternate | #FFF 50% | captions on dark |
| `--content-disabled` | (no variable, used in Button/Disabled) | #AAA9B8 | disabled text and icons |
| `--bg-default` | Grayscale/Background/default | #FFFFFF | page |
| `--bg-secondary` | Grayscale/Background/secondary | #F2F2F2 | light alt band, disabled input |
| `--bg-alternate` | Grayscale/Background/alternate | #181B22 | dark sections |
| `--bg-accent-primary` | Grayscale/Background/accent-primary | #FC814A | |
| `--bg-accent-secondary` | Grayscale/Background/accent-secondary | #262930 | |
| `--outline-on-white` | Grayscale/Outline/on-white | #181B22 10% | dividers, borders on light |
| `--outline-on-dark` | Grayscale/Outline/on-dark | #FFF 10% | dividers, borders on dark |
| `--semantic-negative` | Semantic/negative | #D72929 | error |
| `--semantic-positive` | Semantic/positive | #22BA5F | success |
| `--semantic-warning` | Semantic/warning | #D9A136 | warning |
| `--semantic-notification` | Semantic/notification | #267DE3 | info |

The raw grayscale values (`Grayscale/black`, `dark-high/middle/low/low-opacity`, `light-high/middle/low/low-opacity`, `white`) are also in `tokens.css` as `--gray-*`. Components must use the semantic roles, never `--gray-*`.

**Homepage-only colours** (`--x-*`, not in the kit). Use them only to port existing screens.

| Token | Value | Where | Map to kit |
|---|---|---|---|
| `--x-ink` | #121212 | text on white buttons | `--content-high` |
| `--x-ink-3` | #28282A | misc text | `--content-high` |
| `--x-dark-3` | #20232A | company details card in Contact | `--accent-secondary` |
| `--x-line-dark` | #343741 | dividers on dark (FAQ, Industries) | `--outline-on-dark` |
| `--x-line-light` | #E4E4E4 | dividers on white | `--outline-on-white` |
| `--x-muted` | #B9BBBD | secondary text on dark | `--content-medium-alt` |
| `--x-soft` | #E3E3E3 | text on dark cards | `--content-medium-alt` |
| `--x-gray-bg` | #F5F5F5 | dropdown hover, partner tiles (FAQ zebra rows are #FBFBFB, hover #F2F2F2) | `--bg-secondary` |
| `--x-hover-on-dark` | #333640 | industry case hover | `--accent-secondary-lighter` |
| `--x-border-on-dark` | #4C4E51 | chips, social icons | `--outline-on-dark` (more visible) |

### 1.2 Typography: text styles + collection "Typography" (modes Desktop / Mobile; Tablet not used)

Primary font: `Font Names/Primary Font` = **Google Sans Flex** (was Nekst, then Outfit).
Secondary font: `Font Names/Secondary Font` = **Satoshi**.

Letter-spacing in Figma is in %, so −3% becomes `-0.03em`.

| Text style | Family · weight | Size Desktop / Mobile | Line height | Letter spacing | Class / tokens |
|---|---|---|---|---|---|
| Headings/H1 | Google Sans Flex SemiBold 600 | 88 / 32 | 110% | 0 | `.t-h1` · `--fs-h1` |
| Headings/H2 | Google Sans Flex Light 300 | 64 / 40 | 120% | −3% | `.t-h2` |
| **Headings/Section title** (new 2026-10-28) | Google Sans Flex Regular 400 (light and dark) | 40 / 24 | 48px (120%) | −1% | `.t-section` · `.h-section` · `--fs-section`, `--lh-section` |
| Headings/H3 | Google Sans Flex Light 300 | 32 / 24 | 120% | 0 | `.t-h3` |
| Headings/H4 | Google Sans Flex Light 300 | 24 / 20 | 120% | −3% | `.t-h4` |
| Headings/H5 | Google Sans Flex Light 300 | 20 / 18 | 120% | −2% | `.t-h5` |
| Headings/H6 | Google Sans Flex Light 300 | 18 / 16 | 120% | −2% | `.t-h6` |
| Subheadings/Sub 1 | Google Sans Flex Regular 400 | 24 / 20 | 150% | 0 | `.t-sub1` |
| Subheadings/Sub 2 | Google Sans Flex Light 300 | 20 / 18 | 150% | 0 | `.t-sub2` |
| Subheadings/Sub 3 | Google Sans Flex Light 300 | 18 / 16 | 140% | 0 | `.t-sub3` |
| Subheadings/Sub 4 | Google Sans Flex Regular 400 | 16 | 140% | 0 | `.t-sub4` |
| Body/Body 1 Regular · Medium · Semibold | Google Sans Flex 300 · 500 · 600 | 18 / 16 | 140% | 0 | `.t-body1` + `.w-medium` / `.w-semibold` |
| Body/Body 2 Regular · Medium · Semibold | Google Sans Flex 300 · 500 · 600 | 16 | 140% | 0 · −2% · 0 | `.t-body2` |
| Body/Body 3 Regular · Medium · Semibold | Google Sans Flex 300 · 500 · 600 | 14 | 140% | −2% | `.t-body3` |
| Body/Body 4 Regular · Medium | Satoshi 400 · 500 | 12 | 150% | −2% | `.t-body4` |
| Body/Body 4 CAPS | Google Sans Flex SemiBold 600 | 12 | 18px | 0, uppercase | `.t-caps` (eyebrow) |
| Body/Body 4 CAPS-light | Google Sans Flex Light 300 | 14 | 21px | 0 | `.t-caps-light` |

Usage:
- **Page structure:**
  - one H1 per page, in the hero
  - section titles under an eyebrow use **Section title 40** (`.h-section` / `.t-section`, decision 2026-10-28; replaced H3 32 in Figma and 28 in the old homepage CSS). Applied to every section title on all ported pages: Cases, Uniqueness, Approach, Testimonials, Partners, Industries, FAQ, service Process/Partners, case "Other case studies". Mobile sizes stay as measured (24–28).
  - H2 = large section titles (64)
  - H3 = card and block titles
  - H4 = accordion questions
  - avoid H5–H6 as real `<h*>` tags; use the class on a `<p>` or `<span>`
- **Button, link and eyebrow labels** use Google Sans Flex SemiBold 600 (decision 2026-10-28). The homepage CSS was switched from 700 to 600.
- **Body copy** uses Body 1 on desktop and Body 2 for dense text. Secondary text on light is `--content-medium`, captions are `--content-low`.

### 1.3 Corner radius: collection "Corner Radius" (Desktop / Mobile)

| Token | Figma | Desktop / Mobile | Use |
|---|---|---|---|
| `--radius-small` | small | 4 / 8 | small chips, tags, thumbnails |
| `--radius-middle` | middle | 8 | inputs, menu items, quote cards |
| `--radius-large` | large | 12 | cards, dropdown, panels |
| `--radius-infinite` | infinite | 999 | buttons, pills, circles |

**All cards are rounded 8px** (`--radius-middle`, decision 2026-10-28): case cards, uniqueness, approach, testimonial, partner tiles, industry case items, form card, company details, "What makes us different", feature, process step, approach phase visual, "Got an idea" box, case CTA card, Approach quote card. Cards with images clip their content (`overflow: hidden`), except the "Got an idea" box, whose device image overflows the top. Case tags keep 1.5px.

### 1.4 Shadows: effect styles

| Token | Figma | Value | Use |
|---|---|---|---|
| `--shadow-default` | Shadows/Default (Z depth 1) | `0 5px 50px rgba(0,0,0,.02)` | cards on light background |
| `--x-shadow-menu` | — (homepage) | `0 12px 30px rgba(0,0,0,.08)` | Services dropdown |
| `--x-shadow-float` | — (homepage) | 4-layer soft shadow | awards arrow button |

### 1.5 Grid and layout: grid styles

| Grid style | Frame | Columns | Column | Gutter | Margin |
|---|---|---|---|---|---|
| Desktop | 1440 | 12 | fluid | 24 | fluid: `clamp(40px, 4.1667vw, 75px)` = 60 @1440, 72 @1728, 75 max; content stretches with the window up to 1850 (the kit style "Desktop/Centered" 12×76 = 1176 is not used) |
| Mobile/2 Col | 375 | 2 | stretch | 15 | 16 |

Layout tokens:

| Token | Desktop | Mobile | Note |
|---|---|---|---|
| `--container` | 1850 | 1850 | max content width (reached only above ~2000px) |
| `--gutter-page` | clamp(40, 4.1667vw, 75) | 16 | same margin as the live site; 60 at the 1440 layout |
| `--grid-columns` | 12 | 2 | |
| `--grid-gap` | 24 | 15 | |
| `--header-h` | 94 | 100 | header shrinks after scroll |
| `--header-h-scrolled` | 68 | 72 | |

`.container` = `max-width: var(--container) + 2 × gutter` with padding `var(--gutter-page)`. `.grid` = `repeat(var(--grid-columns), 1fr)`.

### 1.6 Spacing and vertical rhythm

- 4px base scale: `--space-4 … --space-140`.
- Kit spacer variables: 16, 24, 64, 72, 96, 128.
- **Section padding:**
  - `--section-y`: 140 desktop, 60 mobile. This is the default between large blocks; the homepage uses 140 for Cases, Approach bottom, Partners and FAQ.
  - `--section-y-compact`: 80 desktop, 40 mobile. Use it when a section continues the previous one visually (Uniqueness after Cases, Industries after Partners).
- **Inside a section:**
  - eyebrow → title: 16
  - title → content: 48–64 desktop, 32 mobile
  - card grid gap: 12 (Approach, Cases) or 24 (kit gutter)
- **Light/dark alternation** on the homepage: Hero (light) → Services (dark, photo bg) → Cases (light) → Uniqueness (light) → Approach (light) → Testimonials (dark) → Partners (light) → Industries (dark) → FAQ (light) → Contact (dark) → Footer (light). Never put two dark sections next to each other without a light one between them, except Contact → Footer, where the Footer is light.
- **Exact pixel paddings** per homepage section (desktop/mobile) are in `../css/style.css`. They were measured against Figma and are the reference when the homepage is rebuilt.

### 1.7 Motion

| Token | Value | Use |
|---|---|---|
| `--dur-fast` | 200ms | colour, border or background on links, chips, fields, icon buttons |
| `--dur-base` | 250ms | buttons, arrow reveal, chevrons, CTA circle shrink |
| `--dur-medium` | 350ms | underline grow, accordion open/close |
| `--dur-slow` | 450ms | tab content fade-in / fade-up 12px |
| `--dur-xslow` | 600ms | awards strip expand (`--ease-emphasized`) |
| `--dur-image` | 800ms | case image zoom |
| `--ease-standard` | ease | default |
| `--ease-emphasized` | cubic-bezier(.4,0,.2,1) | large layout changes |
| `--svc-autoplay` | 10s linear | Services progress line |

---

## 2. Component inventory

Layer column: **primitive** = small reusable element, **pattern** = composition of primitives, **section** = page block, **layout** = header/footer.

### 2.1 Kit components

| Component | Layer | Variants / states | Figma | Code |
|---|---|---|---|---|
| Button / Primary | primitive | Idle · Hover · Active · Disabled · `alternate` | Button 9289:5353 | `.btn.btn--primary` |
| Button / Primary Alternate | primitive | same | 9289:5353 | `.btn.btn--primary-alt` |
| Button / Secondary (link + circle) | primitive | same · on light / on dark | 9289:5353 | `.link-cta` |
| Button / Tertiary (text link) | primitive | same · on light / on dark | 9289:5353 | `.link` |
| Button / Icon | primitive | same · default / alternate (outlined) | 9289:5353 | `.icon-btn`, `.icon-btn--alt` |
| Text field | primitive | Filled / Outlined × Idle · Hover · Focus · Filled · Error · Disabled | Input 9292:491 | `.field`, `.field--outlined` |
| Link (standalone) | primitive | "Get in touch" with arrow, "See all cases" underlined | 13217:1364 / 1369 / 1376 | `.link-cta`, `.btn--reveal` |
| Icon | primitive | 24px, stroke 2, round caps (Untitled UI style set: General, Arrows, Charts, Users, Communication, Files…) | icon pack 3:3647 | `.icon` (inline SVG, `currentColor`) |
| Card | primitive | Z depth 1 | Shadow 3:3507 | `.card` |

Button spec (kit):
- **Base:** Google Sans Flex SemiBold 18/1.4, padding 16×32 (height ≈ 57), radius infinite, icon 18px, gap 11.
- **Primary:**
  - idle: bg `--accent-secondary-darker`, text `--content-high-alt`
  - hover: bg `--bg-default`, text `--content-high`, 1px dark border
  - active: back to dark
  - disabled: bg `--outline-on-white`, text `--content-low`
- **Primary Alternate:** idle is white with a 1px `#181B22` border; hover and active are dark.
- **Secondary:**
  - label plus a 40px `--accent-primary` circle with the arrow, gap 8
  - hover/active: the circle disappears (scale .4 + fade), a 1px underline grows under the label left→right, and the arrow stays
  - alternate: white label
  - disabled: grey label, circle `--outline-on-white`
- **Tertiary:**
  - label with optional icons, gap 6
  - hover: `--accent-primary`; on dark, hover is `--content-medium-alt`
- **Icon:**
  - 40px orange circle; hover/active `--accent-primary-darker`
  - alternate: transparent with a `--content-low-alt` border; hover border is `--content-high-alt`

Text field spec (kit):
- **Label:** Google Sans Flex SemiBold 14 (−2%), gap 5, required mark `*` in `--accent-primary`.
- **Filled (light):**
  - white bg, 1px `--outline-on-white` border, radius middle 8, padding 16
  - text Body 2 Light 16, placeholder `--content-low`
  - border by state: hover `--accent-primary-lighter`, focus `--accent-primary`, success `--semantic-positive`, error `--semantic-negative`
  - disabled: bg `--bg-secondary`
- **Outlined (dark):**
  - bottom border only, padding 12 0
  - border by state: idle `--outline-on-dark`, hover `--content-medium-alt`, focus orange, success green, error red
- **Help text:** Google Sans Flex Medium 14, `--content-low`; it takes the state colour on success and error.

### 2.2 Homepage patterns (reuse on all pages)

| Component | Layer | Variants | Appears on | Notes |
|---|---|---|---|---|
| Eyebrow | primitive | light / dark | every section (11) | orange K&Z mark 30×10.4 + CAPS 12/18, homepage weight 700 |
| SectionHeader | pattern | left · with/without action (link-cta) · light/dark | Services, Cases, Uniq, Approach, Testimonials, Partners, Industries, FAQ, Contact | eyebrow + H2 (+ lead) (+ action right) |
| Button with arrow reveal | primitive | dark / light · md 54 / lg 60–67 | header, hero, FAQ CTA, form | homepage hover; see ⚠ 1 |
| Round slider arrow | primitive | prev / next · disabled | Testimonials | 45px, border white 80% |
| Header | layout | default 94 → scrolled 68 · mobile burger + full-screen menu | all | grid `1fr auto 1fr`, so the nav never shifts; Services dropdown |
| Footer | layout | — | all | contacts and socials should be global content |
| Awards strip | pattern | collapsed (3 badges) / expanded (all 5) | Hero | width animates, `--dur-xslow` |
| Service tabs | pattern | 3 tabs, autoplay, progress line, arrows | Services | content fades on switch |
| Case card | pattern | large / small · tags | Cases, (case listing) | image zoom 1.03, name arrow +4px |
| Tag | primitive | default | case cards | 31.5 height, radius 1.5 |
| Uniqueness card | pattern | — | Uniqueness | icon + title + text |
| Approach card | pattern | 4 steps | Approach | image lifts 4px on hover |
| Testimonial card | pattern | with case link / "Case study soon" | Testimonials | 987×405 desktop; inner scroll with custom bar and fade |
| Partner tile | pattern | logo / logo + case link (hover reveals "View case study") | Partners | 24 tiles, 8 linked |
| Accordion | pattern | light (FAQ) / dark (Industries) · first open · one at a time | FAQ, Industries | grid 0fr→1fr; Industries row hover bg |
| Industry case item | pattern | thumbnail + title + "View case study" | Industries | hover bg + arrow slides in |
| Chip | primitive | on dark | Industries | border → orange on hover |
| Person / team row | pattern | desktop row / mobile accordion | Contact | photo 48–64 round |
| Contact form | pattern | outlined fields on dark glass card | Contact | backend not connected (mailto fallback) |
| Company details card | pattern | — | Contact | `--x-dark-3` |
| Clutch widget | embed | — | Testimonials footer | third-party |
| Contact drawer | pattern | tabs "Book a call" / "Send a message" · steps pick → details → sent | every page (header "Get in touch") | `css/drawer.css`, `js/drawer.js`; see §11 |

---

## 3. Motion and hover inventory (homepage, as built)

| Element | Trigger | What changes | Duration · easing |
|---|---|---|---|
| Primary button (homepage) | hover | dark → #262930, arrow width 0→22, +10 margin, fade in | 250ms |
| Light button | hover | white → dark, text white, arrow appears | 250ms |
| Header | scroll > 4px | height 94→68, button 54→44, hairline shadow | 300ms ease |
| Nav link (header) | hover / active / open | light pill background `--x-gray-bg` (#F5F5F5), padding 8×14 (no underline, decision 2026-10-28) | 200ms |
| Services dropdown | hover / focus-within | fade + translateY(−6→0), chevron rotates | 200ms / 250ms |
| Link-cta | hover | circle scale .4 + fade, underline grows left→right | 300ms / 350ms ease |
| Awards arrow | click | strip expands to all badges, gap 0→12, arrow rotates | 600ms emphasized |
| Services tabs | autoplay / click | progress line fills in 10s, next tab; text fades, items fade-up 12px | 10s linear · 450ms |
| Case card | hover | image scale 1.03, name arrow +4px | 800ms / 250ms |
| Approach card | hover | image −4px, title arrow +4px | 400ms / 250ms |
| Testimonial quote | scroll / hover | custom scrollbar thumb turns orange, bottom fade hides at end | 200ms |
| Testimonial case link | hover | arrow slides in | 250ms |
| Partner tile (linked) | hover | border dark, overlay "View case study" + arrow slides | 200–250ms |
| FAQ / Industries row | hover | row background changes (FAQ #FBFBFB/white → #F2F2F2, Industries → `--accent-secondary`), text slides right 12px | 250ms bg, 300ms move |
| Accordion | click | rows open (grid 0fr→1fr), plus → minus, other row closes | 350ms ease |
| Industries row | hover | row background `--accent-secondary` | 250ms |
| Industry case | hover | bg #333640, arrow fades in from −4px | 250ms |
| Chip | hover | border and text orange | 200ms |
| Social icon | hover | bg #F0F0F0 | 200ms |
| Drag cursor | hover / press on a slider | orange circle scales .3→1 and fades in; .9 while pressed; arrows move in 3px | 250ms ease |
| Burger / mobile menu | click | lines → cross, menu fades in from −8px | 250ms |
| Contact drawer | header "Get in touch" | panel slides in from the right, overlay fades in with 4px blur; steps fade-up 12px | 600ms emphasized / 450ms |

---

## 4. Content rules

- **Verbatim text.**
  - Headlines, paragraphs, FAQ answers, testimonials, button labels and legal text are copied exactly from the Figma layout or the live site.
  - Keep the punctuation, capitalisation and line order.
  - Never translate or rewrite unless Maks asks.
- **Source priority:**
  1. Figma layout of the page
  2. live site
  3. the "Industries" descriptions file `AP8ZpvqsiZl3f09wIyFP3W` (node 6012:35267)
- **Missing content:** use a visible placeholder (`TODO: copy`, grey image block with the correct ratio) and list it in the open questions. Never invent names, numbers, logos or quotes.
- **Collections:** cases, testimonials, partners, industries, FAQ items, team members and services are lists, so they become collections or list fields in the admin, not hardcoded markup.
- **Global content:** email, phone, address, company details, socials and the Clutch link appear on several pages, so they are global content edited once.
- **Images:**
  - descriptive lowercase hyphenated file names (`case-touren.jpg`)
  - meaningful `alt`
  - WebP where possible
  - lazy loading below the fold

---

## 5. Known inconsistencies and decisions

| # | Topic | Kit | Homepage | Decision |
|---|---|---|---|---|
| 1 | Primary button hover | turns white, dark text | stays dark (#262930), arrow slides in | **postponed** (buttons are not a priority). Both exist: `.btn--primary` (kit), `.btn--reveal` (homepage). Port pages with the homepage behaviour for now. |
| 2 | H2 tablet 32 < mobile 40 | Typography variable | — | **not relevant**: no tablet layout. |
| 3 | Button / eyebrow / link weight | SemiBold 600 | Bold 700 | **600** (2026-10-28). Homepage CSS updated. |
| 4 | Desktop content width / page margin | grid 12×76 = 1176 | fixed 1320 | **fluid margin like the live site** (2026-10-28): 4.1667vw (60 @1440, 72 @1728), max 75; no 1320 cap. Every page uses `.container`. |
| 5 | Homepage-only colours (`--x-*`) | — | 10 extra greys | **open**: add to the kit, or move the homepage to kit tokens? |
| 6 | Weight variables vs text styles | `Weight/*` says H2 SemiBold, Sub Medium, Body Regular | — | text styles win (they are what is applied). |
| 7 | Homepage section titles | H3 32 Light | 28/42 Medium (Nekst era) | **Section title 40/48** on desktop (2026-10-28), weight 400 everywhere (light and dark). Approach: two equal columns, title max 620 (4 lines); Industries title column widened (3 lines at 1440); FAQ title on one line. Add the style to the Figma kit. |
| 8 | Body 4 Semibold | mapped to Satoshi Medium | — | kept as Medium. |

## 6. Open questions for Maks

1. `--x-*` colours: add them to the kit, or switch the homepage to kit tokens?
2. Primary button hover standard (postponed).
3. Contact drawer copy: the "What do you need?" options, budget ranges and "How did you hear about us?" list are placeholders modelled on the reference, confirm or replace.
4. Contact drawer booking: real calendar (Cal.com / Google Calendar) and the forms endpoint.

## 7. Interactive behaviour

- Header becomes compact after scroll. Below 1100 the burger opens a full-screen menu; it closes on link click and on resize above 1100.
- Awards toggle expands and collapses the strip.
- Services autoplay restarts on manual tab or arrow click.
- Accordions are one-open-at-a-time; the first item is open by default (FAQ and Industries).
- Testimonials slider: arrows scroll by one card + 10px gap and are disabled at the ends. Each quote has an inner custom scrollbar.
- Uniqueness cards stack on scroll (desktop ≥768 and viewport height ≥700): each card is `position: sticky` with top = scrolled header + 24px + 88px × index, so the next card slides over the previous one and the previous titles stay visible. On mobile they are a normal list.
- Case covers keep their image proportions (`aspect-ratio` 1320/637 full width, 652/637 and 652/550 in the 2-column service grids, 1103/637 in the slider), so device mockups are never cropped on wide screens; from 1100 down the cards have a fixed height (460, mobile 500). The uniqueness illustrations keep 1302/1138.
- Booking meta (30 min · Google Meet · Free) are plain icon + text, not pills, so they don't look clickable.
- Drag to scroll (Testimonials and "Other case studies" sliders, mouse only): press and pull; a 96px orange round cursor with ← Drag → follows the mouse over the slider (hidden over links and buttons, shrinks while pressed). On release the slider lands on a card; a pull of about a third of a card moves to the next one. A drag never triggers a link click. Touch screens keep native swipe.
- Contact form: submit is enabled when name and a valid email are filled. It needs a real endpoint (admin inbox + email).

## 8. Third-party embeds

- Clutch review widget (Testimonials)
- Satoshi font from the Fontshare CDN (should be self-hosted in production)
- Images currently hotlinked from `cdn.prod.website-files.com` must be downloaded into the project before launch

## 9. SEO rules (from the kit, "SEO_Instructions_for_Developers" 9627:217)

1. One H1 per page, in the hero. H1/H2/H3 follow the token hierarchy, with the same structure on desktop and mobile. Avoid H4 and lower unless necessary.
2. Every page has a unique, descriptive `<title>` of up to 60 characters, including the brand (`Page | K&Z Design`).
3. Every page has a unique meta description of 150–160 characters with relevant keywords.
4. Every image has a meaningful `alt`. File names are lowercase and hyphenated (`mentor-profile-photo.png`, not `IMG_9382.png`).
5. URLs are clean, lowercase and hyphenated, with no `.html`, no `id=` parameters and no camelCase.
6. If the site gets several languages, add `hreflang` in `<head>` on all pages.
7. Pages with nested navigation get schema.org `BreadcrumbList` (Home → Services → SaaS; Home → Cases → Case).
8. Links:
   - Internal links are dofollow.
   - External links to important, trustworthy sources are dofollow; promotional links are nofollow.
   - Target ratio is about 60:40.
9. Speed: minify CSS/JS, lazy-load images, use WebP, and turn on caching, gzip/brotli and a CDN (Vercel gives these by default).
10. Content trust: press releases on niche and major sites. This is a marketing task, not a dev task.

## 10. Ported pages (HTML spec for the Next.js build)

Folder structure (2026-10-28):

```
kz-homepage/
  index.html            homepage (stays in the root: it is the site entry point)
  pages/                about-us, approach, cases, saas, mobile, web
  pages/cases/          16 case study pages
  css/  js/  assets/  fonts/
  design-system/
  tools/                builders; kzsite.py holds the page map and rewrites paths per folder
```

Do not move pages by hand: paths are relative and the builders write the files back to these places. All pages live in `kz-homepage/` and share `css/style.css`, `js/main.js`, `assets/`, `fonts/` and the tokens in `design-system/`. Links between ported pages are local (`index.html`, `about-us.html`); links to pages that are not ported yet still point to the live kz.design.

| File | Route | Source | Page-specific files | Shared sections (reuse as one component) |
|---|---|---|---|---|
| `index.html` | `/` | Figma `13203:2` / `13203:1895` | — | Header, Uniqueness, Testimonials, Contact, Footer |
| `pages/about-us.html` | `/about-us` | live site (no Figma layout) | `css/about.css`, `js/about.js`, `js/vendor/lottie_svg.min.js` | Header, Uniqueness, Testimonials, Contact, Footer |
| `pages/saas.html` | `/saas` | live site (no Figma layout) | `css/service.css`, `js/service.js` | Header, Case card, Testimonials, Contact, Footer |
| `pages/mobile.html` | `/mobile` | live site | same as saas | same as saas |
| `pages/web.html` | `/web` | live site | same as saas | same as saas |
| `pages/cases.html` | `/cases` | live site (no Figma layout) | `css/cases.css`, `js/cases.js` (+ `css/service.css` for breadcrumbs and `<picture>` covers) | Header, Case card, Contact, Footer |
| `pages/cases/<case>.html` ×16 (`pages/cases/touren.html`, …) | `/<case>` | live site (no Figma layout) | `css/case.css`, `js/case.js` (+ `css/service.css`) | Header, Case card (slider), Footer |
| `pages/contact-us.html` | `/contact-us` | live site + contact drawer | `css/drawer.css`, `js/drawer.js` | Header, Contact block (form = embedded drawer), Footer |
| `pages/reviews.html` | `/reviews` | live site | `css/reviews.css` (+ `css/service.css` for breadcrumbs), Clutch widget script | Header, Contact, Footer |
| `pages/approach.html` | `/approach` | live site (no Figma layout) | `css/approach.css`, `js/lottie-hover.js`, `js/vendor/lottie_svg.min.js` | Header, Industries accordion, Testimonials, Contact, Footer |

New on About: Breadcrumbs (pattern, every inner page), Leader card (photo + name with orange initial + role + bio), "What makes us different" card (Lottie: frame 0 → 50% on hover, 500ms ease-in-out, back on leave; plays once in view on touch screens).

**Service page = one template** (`/saas`, `/mobile`, `/web`), generated by `tools/build_services.py` from a data block per service. In Next.js this is one page template + a "services" collection. Per-service fields: title, breadcrumb label, hero image, about paragraphs, show founders (SaaS only), list of case studies, "Got an idea" device image, "Next service" card (title, text, image), meta description. Fixed for all services: features (3 cards), process (4 steps), partners marquee, testimonials, contact.

New on service pages: hero image with breadcrumbs on top (light variant), Founder mini card (photo 94×113, name, eyebrow role, bio, ex-role), Feature card (radial gradient #FFF → #EDF1F9, illustration at the bottom), "Got an idea?" banner (dark box, lightning pattern, device image overflowing the top, hidden on mobile), Process step card (2 rows, second row shifted 108px on desktop), Partners marquee (24 logos 200×94 / 150×70, gap 10, 80px/s, endless), Case card `--stack` variant (text and tags stacked, separate mobile cover via `<picture>`).

**Cases list** (`/cases`) = collection page: 16 cases, each with name, short description, visible tags, filter categories, desktop cover and optional mobile cover. In Next.js the cases are a collection; the list and the homepage/service "Case studies" blocks read from it. Filter pills: one active at a time, "All" shows everything, filtering by the case's categories. The live site's filter data is wrong for 7 cases (Signal Sigma, Touren, Filmtoro, Print buy, Onground, Listen Upp, MyNQS all carry "Gaming, B2C, Mobile"); here their categories come from their visible tags. Built by `tools/build_cases.py`.

**Case study page = one template** (16 pages), generated by `tools/build_case_pages.py` from `tools/cases_data.py` (content copied from the live pages and checked against them by checksum). Fields per case: title (may contain a line break), details rows (Industry / Platform / Year), optional client feedback (full quote for the details block; lead + paragraphs, photo, flag and a device visual for the feedback section), desktop screens (list of images, full-width), mobile screens (separate list, shown ≤767), "Other case studies" (list of 8 case slugs). Fixed for all cases: CTA block (Vlad's card), slider section. The case body on the live site is a stack of exported layout images, not text; in Next.js these are an ordered image list per case (desktop + mobile).
Live-site issues kept out: Filmtoro has 2 broken placeholder images on desktop and 2 on mobile (left out); Signal Sigma desktop image 02 and Whodunnit mobile image 16 are shown twice (shown once).

**Approach** (`/approach`): hero with anchor pills (Discovery / Strategy / UX/UI design / Prototyping → `#discovery` …) and Vlad's quote card; 4 phase blocks (eyebrow, intro, accordion of steps, dark visual with a Lottie), text and visual swap sides every other block, stacked on mobile; then the shared Industries, Testimonials, Contact. Built by `tools/build_approach.py`. Lottie behaviour is the same as on About: frame 0 at rest, plays to 50% on hover (500ms), back on leave; plays once in view on touch screens (`js/lottie-hover.js`, hover root = `.js-lottie-hover`).

**Breakpoint note:** the desktop layout must hold from 768 to 1440+. Fixed-width columns are written as fractions with minimums (e.g. `minmax(120px, 264fr) minmax(0, 1056fr)`), so they keep the 1440 proportions and shrink without horizontal scroll. Checked on every page at 375, 768, 1100, 1440, 1728 and 1920.

## 11. Contact drawer

Opens from the right when the header "Get in touch" button is clicked (desktop and mobile button), on every page. Any element with `data-drawer="book"` or `data-drawer="message"` opens it on that tab; the link `href` stays as the no-JS fallback. Markup is injected by `js/drawer.js`; in Next.js this is one client component mounted in the layout.

- **Panel:** `--bg-alternate`, 1px `--outline-on-dark`, radius `--radius-large`, 600 wide, 12 from the window edges; full screen on mobile. Overlay `rgba(24,27,34,.55)` + 4px blur. Closes on ×, overlay click and Esc; focus is trapped inside and returns to the button; the page does not scroll under it.
- **Top:** segmented tabs (white pill = active) and a 44px round close button.
- **Book a call:**
  1. Pick: Vlad's card (online dot), "Book a call", lead (verbatim from the Contact section), meta chips 30 min / Google Meet / Free, month calendar (Mon first, past days, weekends and full days disabled, today has an orange dot, selected day white), then the day title, visitor's time zone, 24h / am-pm toggle and 30-min slots (4 columns, 3 on mobile; booked slots struck through). The first open day is preselected. Sticky footer: summary + Continue (disabled until a slot is chosen).
  2. Details: "Change time", summary card (date, time range, Google Meet, time zone), Name*, Email*, Company, topic. Footer: summary + "Book call".
  3. Sent (both tabs, texts as live): orange check, "Your Form Was Successfully Submitted!", lead "We will be in touch with you shortly!" (booking: Vlad confirmation line), orange `.btn--accent` "Make another submission" (`[data-dw-again]`) that resets the pane to an empty form.
- **Send a message:** title, reply time + email link, "What do you need?" multi-select chips (plus → ×), budget single-select chips, Name*, Email*, Company, source select, "About the project" dashed field that expands into a textarea, NDA checkbox, Privacy Policy checkbox (required). Footer: green dot "We reply within one business day" + "Send message". Then a sent state.
- **Fields** reuse the homepage contact form pattern (`.field`, bottom border on dark, red `*`); buttons are `.btn--light` (hover = `--accent-secondary`, visible on the dark panel).
- **Data:** availability is mocked (Mon–Fri 10:00–17:30 Europe/Tallinn, ~25% busy, closed less than 2h ahead, 8 weeks). If `window.KZ_FORMS_ENDPOINT` is set, both forms POST JSON (`type: "call"` with `start` ISO / `duration` / `timezone`, or `type: "message"` with `needs`, `budget`, `source`, `about`, `nda`); otherwise they open a prefilled email to hello@kz.design.

## 12. Header navigation and mega menu (2026-10-28)

- Desktop nav: Home · Services (button, opens the Services mega menu) · Cases · Reviews · Contact us; on the right "Get in touch" (opens the contact drawer) and a round "=" button (opens the second mega menu). Approach and About us moved from the nav into the "=" menu. The footer and the mobile burger menu keep all links.
- Mega menu = one white panel under the header (radius 12, 1px `--x-line-light`, soft shadow, 16px padding and gap) with image cards: Services → SaaS web apps, Mobile apps, Websites (3 columns); "=" → Approach, About us (2 columns).
- Card: image cover, radius 8, dark gradient at the bottom, title Google Sans Flex 28/34 white, 44px white round button with a chevron (orange with a white chevron on hover, image zooms 1.03). The current page's card has an orange dot; its trigger is marked (underline on Services, orange dot on "=").
- While a panel is open the page under the header is dimmed (`.mega-dim`, rgba(24,27,34,.45)), so the focus is on the menu.
- Behaviour (`js/main.js`): click opens, a second click / click outside / Esc closes, one panel at a time; Services gets a light pill while open; "=" turns into a chevron-up. Hidden ≤1100 (the burger menu is used there).

## 13. Contact block (every page) and Contact us page

The Contact block is split in two equal columns (gap 64, 40 below 1360; one column ≤1100). The Contact block is the same everywhere (homepage, services, cases list, approach, about, contact page): left = title, lead and the team rows (avatar, name, role, bio) as on the live site; right = a card with two tabs in the drawer style: "Send a message" (default, the original fields Name* / Email address* / Message (optional) / Submit) and "Book a call" (the same booking flow as the drawer), then the company details card. The "Get in touch" drawer keeps its full message form (needs, budget, source, NDA).

`pages/contact-us.html` (built by `tools/build_contact.py`) = the homepage Contact block with the contact drawer embedded as the form (`<div data-contact-inline>`; `js/drawer.js` mounts the same component without overlay and close button, the footer with the main button is sticky, "Make another submission" after sending). All "Get in touch" buttons open the drawer; their link points to this page as a no-JS fallback. Every former kz.design/contact-us link now goes here.

## 14. Footer (2026-10-28)

Brand column (logo, "No calls with sales…" line, Get in touch button that opens the drawer) + three link columns with caps headings: Services (SaaS web apps, Mobile apps, Websites), Company (Cases, Approach, About us, Reviews), Contact (Contact us, email, socials). Bottom row: company line + legal links. The current page link is orange and underlined. ≤1100: brand on its own row, 3 columns; ≤767: 2 columns, Contact full width.

## 15. 3D logo (About hero)

`js/kz-logo-3d.js` (from the kz-logo-3d package, classic script so it also works from disk) + `js/vendor/three.min.js` (three.js r160, MIT), mounted by `js/about-logo.js` into `#kz-logo-3d` under the About hero text: spins slowly (`autoRotate` 0.6 rad/s), tilts after the cursor, drag to turn, click for a full turn, pauses off screen, no float with reduced motion. Loaded only on About.

**Case pages CTA** (`.ccta`, all 16 cases): the same logo sits in the CTA grid, `text | logo | CEO card` from 1800px up, under the CEO card at ≤1799 (`"text card" "text logo"`), and after the card on mobile (240px). `js/ccta-logo.js` loads three.js + kz-logo-3d.js only when the block is 400px from the screen, mounts with `autoRotate 0.5`, cursor tilt, no drag/click, no shadow; fades in (`.is-on`). No WebGL: the slot hides.

## 16. Icon pack (kz-icons, 2026-10-28)

`assets/icons/` = the K&Z icon pack: `services/` (16) and `industries/` (12), each in three styles: `glass-square` and `glass-circle` (96×96, dark glass tile with white + orange line icon, for dark sections) and `line` (32×32, `currentColor` + orange accent, for light UI). `kz-icons-overview.svg` shows the whole set.
- Industries accordion (homepage, Approach): `industries/line-on-dark` (the line icons with white at 60% opacity instead of `currentColor`, orange accent unchanged, for `<img>` on dark), no background, rendered 32px so the glyph is 24×24; replaces the old `assets/ind/*` icons and the circle.
- Services block on the homepage keeps the numbers 01–06 (no icons, decision 2026-10-28); the `services/` icons are available for other places.
- New icons in this style go into the same folders; use the pack before drawing anything new.

## 17. Reviews page and mobile case filter (2026-10-29)

- `pages/reviews.html` (built by `tools/build_reviews.py`): breadcrumbs, centered hero (H1 "Reviews" + intro, texts from the live page), the Clutch reviews widget (type 5, company id 2218631, orange accents, third-party script `widget.clutch.co/static/js/widget.js`), CTA card (#F5F5F5, radius 8, mark + Section title 40 + Get in touch → drawer), shared Contact block, footer. All "Reviews" / "Read our reviews" links now go to this page.
- Cases list on mobile (≤767): the filter pills become a dropdown (`.cs-select`): light pill field with the current filter ("All" by default) and a chevron; the list is a white card (radius 12, shadow) with every category and its number of cases, the current one marked with an orange dot. Closes on choice, outside click or Esc; arrow keys move through the list. Desktop keeps the pills.

**Sticky filter (Cases page):** the pills (desktop) and the dropdown (≤767) stick under the scrolled header (`top` 68px / 72px) on an edge-to-edge white band (`::before`, `.cs-list { overflow-x: clip }`). A hairline appears when stuck (`.is-stuck`, set in `js/cases.js`). Picking a filter while stuck scrolls smoothly back to the start of the list.

## 18. Buttons on dark boxes & "Got an Idea?" banner

- `.btn--light` (white pill) sits on dark boxes (Got an Idea, CTA cards, case pages). Hover keeps it light: `--gray-bg` background, ink text, dark arrow slides in. Exceptions: header `.btn--mobile` (hover dark) and the drawer (hover `--accent-secondary`).
- `.git__device` (service pages: laptop / phones / Mac Studio) follows live: `top:-120px; bottom:0; height:calc(100% + 120px); width:auto`, `object-fit:contain; object-position:right bottom`, so the image sticks out 120px above the box and its bottom edge rests on the box bottom (no floating cut edge). `max-width: min(58%, 100% - 480px)` keeps it off the title.
- ≤991px: box `overflow:hidden`, device 300px high at the bottom right; ≤767px: device hidden.
