# Brief: K&Z Design website

Date: 2026-10-28 · Answers from: Nazar (nazar.s@kz.design)

## Languages

- Site languages: **en** · Main language: **en** (English only; admin also English).
- Texts for other languages: not needed.

## Pages (confirmed)

| Page             | Path                                                               | Notes                                                                                   |
| ---------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Home             | `/`                                                                | design: `index.html` — **first to build**                                               |
| About us         | `/about-us`                                                        | design: `about-us.html`                                                                 |
| Services         | `/services`, `/services/saas`, `/services/mobile`, `/services/web` | one template, "services" collection: new services are added in the admin                |
| Cases (list)     | `/cases`                                                           | design: `cases.html`                                                                    |
| Case study ×16   | `/cases/<slug>`                                                    | one template, "cases" collection                                                        |
| Approach         | `/approach`                                                        | page will be added later by the client → create an **empty page** now                   |
| Reviews          | `/reviews`                                                         | later; will contain a **Clutch reviews widget** (client adds it later) → empty page now |
| Contact us       | `/contact-us`                                                      | later, with the contact form → empty page now                                           |
| Privacy Policy   | `/privacy-policy`                                                  | texts provided later → empty page now                                                   |
| Terms of Service | `/terms-of-service`                                                | texts provided later → empty page now                                                   |
| Refund Policy    | `/cancellation-and-refund-policy`                                  | texts provided later → empty page now                                                   |
| 404, maintenance | —                                                                  | in the site's style                                                                     |

"Empty page" = real page in the admin (title, SEO fields, header/footer in place) with a placeholder section the client fills later. Header, footer and Home links point to these internal pages (no more links to the live kz.design).

## Page map

- **Unique pages:** Home, About us, Cases (list), Approach, Reviews, Contact us, Privacy, Terms, Refund.
- **Template pages (collections):** Services (list page `/services`, item `/services/<slug>`; the menu and the Home tabs read the collection, new services are added in the admin); Cases ×16 (list page `/cases`, item `/cases/<slug>`, added by the client in the admin).
- **Shared sections (one content, many pages):** Testimonials (Home, About, later Reviews), Contact (Home, About, Cases, services), Uniqueness (Home, About), Partners (Home, services marquee).
- **Shared parts (globals):** header, footer, company details, email, socials, legal links, Clutch link and rating.
- **Forms:** one Contact form.
- **System pages:** 404, maintenance, "thank you" message on the same page.

## Build mode

- **B (page by page).** Order: foundation (tokens, primitives, layout) → Home → About us → Cases list + case template → Service template → empty pages.

## Admin path

- `/kzds-admin` (from the project name; domain comes later — rename when the domain is final).

## Collections

| Collection   | Each item has a page                                                              | Categories/tags                          | Pagination                  | Missing translation |
| ------------ | --------------------------------------------------------------------------------- | ---------------------------------------- | --------------------------- | ------------------- |
| Cases        | yes, `/cases/<slug>` (client's choice; old live URLs `/<slug>` get 301 redirects) | tags + filter categories from the design | no (16 cases, filter pills) | n/a (English only)  |
| Testimonials | no (cards + optional link to a case)                                              | —                                        | slider                      | n/a                 |
| Services     | yes (`/services/<slug>`; old live URLs `/saas` etc. get 301 redirects)            | —                                        | —                           | n/a                 |

The client adds new cases and testimonials himself. The 14 testimonials from `index.html` are seeded now.

## Global content

- Editable once in the admin: company details (K&Zh OÜ, registry code, address), email, socials (LinkedIn, Dribbble, Behance), legal links, Clutch link and rating (59 reviews), nav labels.

## Forms

| Form    | Destination              | Recipient                    | Consent checkbox       |
| ------- | ------------------------ | ---------------------------- | ---------------------- |
| Contact | admin inbox only for now | none yet (client adds later) | no (not in the design) |

## Design decisions

- Mobile: from the CSS (≤ 767), no tablet layout.
- Fonts: Outfit (self-hosted, files in the design folder) + Satoshi (free from Fontshare, download and self-host with permission, granted).
- Images: hotlinked images from `cdn.prod.website-files.com` are downloaded into the project (permission granted).
- Primary button hover: **as on the homepage** (stays dark, arrow slides in).
- Animations: as in `DESIGN_SYSTEM.md` §3.

## Database

- Provider: **Neon** (chosen by the user on 2026-10-28). One Neon project, branches `production` and `staging`, Neon Object Storage; account owner: to be decided (studio or client).
- Environments: production (`main`) + staging (`staging`), each with its own database.

## Team

- Repository: `nazars-kz/kzdesign` (corporate GitHub account, SSH alias `github-kz`).
- Branches: `main` (live), `staging` (test), `feature/<task>` with pull requests into `staging` (`docs/TEAM.md`, skill `references/team.md`).
- People: Nazar (`nazars-kz`) and two more designer-developers (GitHub logins to be added). Tasks are GitHub issues with labels `task` and `status:*` (`team-status.mjs`).

## Integrations

- Analytics: Google Analytics and Hotjar, to be switched on by the team in **Settings → Integrations** (no code and no CSP changes are needed). The cookie banner appears automatically when one is on.
- Hosting: **Vercel** · Domain: later (`kz.design` expected).
- Clutch reviews widget on Reviews: later.

## Defaults applied (not explicitly answered)

- Case URLs `/cases/<slug>` (the client asked why not; this also gives the Home → Cases → Case breadcrumb) with redirects from the old `/<slug>`.
- Typos in the design copy are kept verbatim and listed for the client.
- Git identity: Nazar KZ <nazar.s@kz.design>; remote `origin` = `git@github-kz:nazars-kz/kzdesign.git` over SSH key `~/.ssh/id_ed25519_kzdesign`.
