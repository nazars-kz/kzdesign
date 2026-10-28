import { ADMIN } from './support/admin';
import { request } from '@playwright/test';
import { expect, test } from './support/test';

import { login } from './support/auth';
import { updateSiteStatus, VISITOR_HEADERS, waitForPublicSite } from './support/settings';
import { E2E_ADMIN } from './support/users';

test.describe.serial('SEO and i18n', () => {
  test('pages carry canonical, hreflang, OG tags and JSON-LD', async ({ baseURL }) => {
    // Read from the server's HTML: the head crawlers get, whatever the browser streams.
    const visitor = await request.newContext({ baseURL, extraHTTPHeaders: VISITOR_HEADERS });
    const html = await (await visitor.get('/cases/touren')).text();
    expect(html).toMatch(/<title>Touren<\/title>/);
    expect(html).toMatch(/<link rel="canonical" href="[^"]*\/cases\/touren"\/?>/);
    expect(html).toMatch(/<link rel="alternate" hrefLang="en" href="[^"]*\/cases\/touren"\/?>/);
    expect(html).toMatch(
      /<link rel="alternate" hrefLang="x-default" href="[^"]*\/cases\/touren"\/?>/,
    );
    expect(html).toMatch(/<meta property="og:title" content="Touren"\/?>/);
    expect(html).toMatch(/<meta property="og:image" content="https?:\/\/[^"]+"\/?>/);
    const jsonLd = /<script type="application\/ld\+json"[^>]*>([^<]*)<\/script>/.exec(html)?.[1];
    expect(jsonLd).toContain('BreadcrumbList');

    // A page without its own picture falls back to the generated social image.
    const policy = await (await visitor.get('/privacy-policy')).text();
    expect(policy).toMatch(/<meta property="og:image" content="[^"]*\/og\/en\/[^"/]+\.png"\/?>/);
    await visitor.dispose();
  });

  test('unknown URLs return the 404 page with status 404', async ({ baseURL }) => {
    const visitor = await request.newContext({ baseURL, extraHTTPHeaders: VISITOR_HEADERS });
    const response = await visitor.get('/no-such-page');
    expect(response.status()).toBe(404);
    expect(await response.text()).toContain('Page not found');
    await visitor.dispose();
  });

  test('indexing ON: robots allows the site and the sitemap lists every locale with hreflang', async ({
    baseURL,
  }) => {
    const visitor = await request.newContext({ baseURL });
    const robots = await (await visitor.get('/robots.txt')).text();
    expect(robots).toContain('Allow: /');
    expect(robots).toContain('Disallow: /admin');
    // A custom admin path is never revealed.
    expect(robots).not.toContain(ADMIN);
    const sitemap = await (await visitor.get('/sitemap.xml')).text();
    expect(sitemap).toMatch(/<loc>[^<]*\/about-us<\/loc>/);
    expect(sitemap).toMatch(/<loc>[^<]*\/cases\/touren<\/loc>/);
    expect(sitemap).toMatch(/<loc>[^<]*\/services\/saas<\/loc>/);
    expect(sitemap).toMatch(/hreflang="en"/);
    await visitor.dispose();
  });

  test('indexing OFF: robots disallows everything and responses send noindex', async ({
    page,
    baseURL,
  }) => {
    await login(page, E2E_ADMIN);
    await updateSiteStatus(page, { indexing: false });
    const visitor = await request.newContext({ baseURL, extraHTTPHeaders: VISITOR_HEADERS });
    await expect
      .poll(async () => (await visitor.get('/about-us')).headers()['x-robots-tag'] ?? '', {
        timeout: 15_000,
      })
      .toContain('noindex');
    await expect
      .poll(async () => (await visitor.get('/robots.txt')).text(), { timeout: 15_000 })
      .toMatch(/Disallow: \/\s*$/m);
    const html = await (await visitor.get('/about-us')).text();
    expect(html).toMatch(/<meta name="robots" content="noindex, ?nofollow"/);
    await visitor.dispose();
    await updateSiteStatus(page, { indexing: true });
    await waitForPublicSite(baseURL);
  });
});
