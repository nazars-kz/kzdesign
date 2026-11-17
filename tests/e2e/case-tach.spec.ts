import { expect, test } from './support/test';

test.describe('case study: Tach', () => {
  test('one h1, ordered chapters, every picture has an alt text', async ({ page }) => {
    await page.goto('/cases/tach');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('Tach');
    const chapters = page.locator('.tach-chapter__title');
    await expect(chapters).toHaveCount(5);
    await expect(page.locator('.tach-workflow__title')).toHaveText('Workflow plan');
    const missing = await page.locator('.tach-case img:not([alt])').count();
    expect(missing).toBe(0);
    // the timeline has its bars, the team its people
    await expect(page.locator('.tach-bar')).toHaveCount(6);
    await expect(page.locator('.tach-member')).toHaveCount(6);
  });

  test('uses its own typeface and the Cases item is marked in the menu', async ({ page }) => {
    await page.goto('/cases/tach');
    const family = await page
      .locator('.tach-chapter__title')
      .first()
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(family).toContain('tachHanken');
    await expect(page.locator('.nav__link[aria-current="page"]')).toHaveText('Cases');
  });

  for (const width of [375, 768, 1440]) {
    test(`no horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/cases/tach');
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test('on a phone the timeline is a list of labelled bars', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/cases/tach');
    const first = page.locator('.tach-bar').first();
    const second = page.locator('.tach-bar').nth(1);
    const a = await first.boundingBox();
    const b = await second.boundingBox();
    expect(a && b && b.y > a.y + a.height - 1).toBe(true);
  });
});

test.describe('case study: Tach motion', () => {
  test('blocks are armed and play their entrance when scrolled into view', async ({ page }) => {
    await page.goto('/cases/tach');
    await expect(page.locator('.tach-case')).toHaveClass(/tach-armed/);
    const tile = page.locator('.tach-showcase');
    await expect(tile).toHaveClass(/tach-r/);
    await tile.scrollIntoViewIfNeeded();
    await expect(tile).toHaveClass(/is-in/);
  });

  test('with "reduce motion" nothing is hidden or animated', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/cases/tach');
    await expect(page.locator('.tach-case')).not.toHaveClass(/tach-armed/);
    await expect(page.locator('.tach-showcase')).not.toHaveClass(/tach-r/);
    await context.close();
  });
});
