import { devices } from '@playwright/test';
import { expect, test } from './support/test';

// `h1: null` for pages whose content other specs edit (only structure is asserted there).
const PAGES: readonly { path: string; h1: string | RegExp | null }[] = [
  { path: '/', h1: /^Your reliable\s*UX\/UI design partner$/ },
  { path: '/about-us', h1: null },
  { path: '/cases', h1: null },
  { path: '/cases/touren', h1: 'Touren' },
  { path: '/services', h1: null },
  { path: '/services/saas', h1: 'SaaS, Web App, Software' },
  { path: '/approach', h1: 'Approach' },
  { path: '/reviews', h1: null },
  { path: '/contact-us', h1: null },
  { path: '/privacy-policy', h1: 'Privacy Policy' },
  { path: '/terms-of-service', h1: 'Terms of Service' },
  { path: '/cancellation-and-refund-policy', h1: 'Cancellation and Refund Policy' },
];

test.describe('site', () => {
  test.use({ extraHTTPHeaders: { 'accept-language': 'en' } });

  for (const { path, h1 } of PAGES) {
    test(`renders ${path} with one h1 and correct lang`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      if (h1) await expect(page.locator('h1')).toHaveText(h1);
      else await expect(page.locator('h1')).not.toBeEmpty();
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('main#main')).toBeVisible();
    });
  }

  test('the footer shows the company email from the global content', async ({ page }) => {
    await page.goto('/about-us');
    await expect(page.locator('footer').getByRole('link', { name: /@kz[.]design$/ })).toBeVisible();
  });

  test('images are served and have alt text', async ({ page }) => {
    await page.goto('/');
    const logo = page.locator('main img').first();
    await expect(logo).toHaveAttribute('alt', /.+/);
    expect(
      await logo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0),
    ).toBe(true);
  });

  test('the default locale prefix redirects to the unprefixed URL', async ({ page }) => {
    await page.goto('/en/about-us');
    await expect(page).toHaveURL(/\/about-us$/);
  });

  test('the main menu leads to the pages, the Services menu lists the services', async ({
    page,
  }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await nav.getByRole('link', { name: 'Cases', exact: true }).click();
    await expect(page).toHaveURL(/\/cases$/);
    await page.goto('/');
    await page.waitForLoadState('networkidle'); // hydrated: the Services button opens its panel
    await nav.getByRole('button', { name: 'Services' }).click();
    await page.locator('#mega-services').getByRole('link', { name: 'Mobile apps' }).click();
    await expect(page).toHaveURL(/\/services\/mobile$/);
  });

  test('the site is English only: no redirect from the browser language, crawlers get 200', async ({
    browser,
    request,
  }) => {
    const context = await browser.newContext({ ...devices['Desktop Chrome'], locale: 'uk-UA' });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await context.close();

    const bot = await request.get('/', {
      headers: { 'accept-language': 'uk', 'user-agent': 'Googlebot/2.1' },
      maxRedirects: 0,
    });
    expect(bot.status()).toBe(200);
  });

  test('unknown pages render the 404', async ({ page }) => {
    const response = await page.goto('/does-not-exist');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
  });

  test('an unknown case study or service is a 404', async ({ request }) => {
    expect((await request.get('/cases/nope')).status()).toBe(404);
    expect((await request.get('/services/nope')).status()).toBe(404);
  });
});
