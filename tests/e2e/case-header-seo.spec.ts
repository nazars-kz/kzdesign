import { expect, test } from './support/test';

/** Every case page: the header (breadcrumbs, H1, details, feedback) and the SEO text at the end. */
const CASES = ['tach', 'signal-sigma', 'touren', 'filmtoro'] as const;

for (const slug of CASES) {
  test.describe(`case header and SEO text: ${slug}`, () => {
    test('the header comes first: breadcrumbs, the only H1 and the details', async ({ page }) => {
      await page.goto(`/cases/${slug}`);
      const header = page.locator('.cd');
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(header.locator('h1')).toHaveCount(1);
      await expect(header.locator('nav a[href$="/cases"]')).toBeVisible();
      expect(await header.locator('.cd__row').count()).toBeGreaterThan(0);
      const first = await page.locator('main section').first().getAttribute('class');
      expect(first).toContain('cd');
    });

    test('the SEO text sits before the related cases and links to all cases', async ({ page }) => {
      await page.goto(`/cases/${slug}`);
      const about = page.locator('.cab');
      await expect(about.locator('h2')).toHaveCount(1);
      await expect(about.locator('a[href$="/cases"]')).toHaveCount(1);
      const order = await page.evaluate(() => {
        const cab = document.querySelector('.cab');
        const related = document.querySelector('.cother');
        return Boolean(
          cab && related && cab.compareDocumentPosition(related) & Node.DOCUMENT_POSITION_FOLLOWING,
        );
      });
      expect(order).toBe(true);
    });
  });
}

test('the client feedback is shown only when the case has one', async ({ page }) => {
  await page.goto('/cases/touren');
  await expect(page.locator('.cd__quote .author__name')).toContainText('Denis Bondar');
  await page.goto('/cases/tach');
  await expect(page.locator('.cd__quote')).toHaveCount(0);
});
