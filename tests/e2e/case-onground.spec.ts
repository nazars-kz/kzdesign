import { expect, test } from './support/test';

test.describe('case study: Onground', () => {
  test('one h1, the chapters in order, every picture has an alt text', async ({ page }) => {
    await page.goto('/cases/onground');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('Onground');
    await expect(page.locator('.og-title')).toHaveCount(10);
    const missing = await page.locator('.og-case img:not([alt])').count();
    expect(missing).toBe(0);
    await expect(page.locator('.og-phase')).toHaveCount(6);
    await expect(page.locator('.og-screen')).toHaveCount(12);
    await expect(page.locator('.og-member')).toHaveCount(6);
    await expect(page.locator('.nav__link[aria-current="page"]')).toHaveText('Cases');
  });

  test('uses its own typefaces', async ({ page }) => {
    await page.goto('/cases/onground');
    const family = await page
      .locator('.og-title')
      .first()
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(family).toContain('Inter');
  });

  for (const width of [375, 768, 1440, 2560]) {
    test(`no horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/cases/onground');
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test('the cases list offers it and the blocks play their entrance when scrolled into view', async ({
    page,
  }) => {
    await page.goto('/cases');
    await expect(page.locator('a.case[href$="/cases/onground"]').first()).toBeVisible();
    await page.goto('/cases/onground');
    await expect(page.locator('.og-case')).toHaveClass(/og-armed/);
    const block = page.locator('.og-video');
    await expect(block).toHaveClass(/og-r/);
    await block.scrollIntoViewIfNeeded();
    await expect(block).toHaveClass(/is-in/);
  });

  test('with "reduce motion" nothing is hidden or animated', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/cases/onground');
    await expect(page.locator('.og-case')).not.toHaveClass(/og-armed/);
    await context.close();
  });
});
