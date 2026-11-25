# SEO migration from Webflow to Vercel

Task: GitHub issue #59 (related: #13 domain and redirects, #15 title template, #14 analytics).

The live studio site runs on Webflow at `kz.design`. When the domain moves to this site, Google must
find the same pages at the same addresses or behind a 301 redirect. A moved page without a redirect
loses its rankings and its inbound links.

## Status

Not started. `next.config.ts` has no redirects yet. Do not close the Webflow site before the
redirects are verified.

## Before launch

1. Export every URL of the old site: `https://kz.design/sitemap.xml` and Google Search Console
   (Pages, and Performance for the last 16 months to see which pages bring traffic).
2. Fill the redirect map below (old URL → new URL). A page that no longer exists redirects to the
   closest page by meaning, never to the Home page and never to a 404.
3. Add `redirects()` to `next.config.ts` (`permanent: true`, a 301). `next.config.ts` is not core.
4. Add a test that walks the whole map and checks the status 301 and the target.
5. Compare title, description, h1 and body text of the pages that rank well with the old site (#15).
6. Check canonical, `sitemap.xml`, `robots.txt`, JSON-LD and image alt texts on the new site.
7. `staging` and `*.vercel.app` stay out of Google (D-097); indexing is on for `main` only.

## Launch day

1. Lower the DNS TTL a day before.
2. Point `kz.design` and `www` to Vercel; check HTTPS and the `www` ↔ apex redirect.
3. Settings: "Show the site in Google" on, "Private site" off (production only).
4. Run the redirect test against production: every old URL answers 301 → 200.
5. Search Console: verify the domain property and submit the new `sitemap.xml`.
6. Connect Google Analytics and Hotjar (#14).
7. Keep the Webflow copy on `*.webflow.io` out of Google (noindex or a password).

## After launch (2 to 4 weeks)

- Every week: Search Console → Pages (404, redirect errors, not indexed) and Performance.
- Add a redirect for every old URL that shows up as a 404.
- A short dip in positions is normal; a lasting drop means missing redirects or indexing left off.

## Redirect map

Fill from the real crawl of the old site. The rows below are the ones already known from the brief.

| Old URL (Webflow)  | New URL                  | Status |
| ------------------ | ------------------------ | ------ |
| `/saas`            | `/services/saas`         | todo   |
| `/mobile`          | `/services/mobile`       | todo   |
| `/web`             | `/services/web`          | todo   |
| `/<case-slug>`     | `/cases/<case-slug>`     | todo   |
| (rest of the list) | to be taken from the old | todo   |
