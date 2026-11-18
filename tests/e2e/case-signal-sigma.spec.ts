import { expect, test } from './support/test';

const PATH = '/cases/signal-sigma';

test.describe('case study: Signal Sigma', () => {
  test('one h1, ordered blocks, every picture has an alt text', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('Signal Sigma');
    // overview, feedback, about, research, UI, orders, watchlist, screener, journal,
    // technical, fundamentals, summary
    await expect(page.locator('.sigma-title')).toHaveCount(12);
    const missing = await page.locator('.sigma-case img:not([alt])').count();
    expect(missing).toBe(0);
    await expect(page.locator('.sigma-metric')).toHaveCount(4);
    await expect(page.locator('.sigma-card')).toHaveCount(4);
    await expect(page.locator('.sigma-swatch')).toHaveCount(11);
    await expect(page.locator('.sigma-member')).toHaveCount(6);
  });

  test('the chapter strip marks the current chapter', async ({ page }) => {
    await page.goto(PATH);
    const strip = page.locator('.sigma-about .sigma-strip__item');
    await expect(strip).toHaveCount(3);
    await expect(strip.last()).toHaveAttribute('aria-current', 'step');
    await expect(page.locator('.sigma-summary .sigma-strip__item')).toHaveCount(1);
  });

  test('uses its own typefaces and the Cases item is marked in the menu', async ({ page }) => {
    await page.goto(PATH);
    const title = await page
      .locator('.sigma-title')
      .first()
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(title).toContain('sigmaInter');
    const note = await page
      .locator('.sigma-note__text')
      .first()
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(note).toContain('sigmaHand');
    await expect(page.locator('.nav__link[aria-current="page"]')).toHaveText('Cases');
  });

  for (const width of [375, 768, 1024, 1440]) {
    test(`no horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(PATH);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test('on a phone the cards sit under their pictures', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto(PATH);
    const photo = await page.locator('.sigma-about__photo').boundingBox();
    const note = await page.locator('.sigma-about__note').boundingBox();
    expect(photo && note && note.y > photo.y + photo.height - 1).toBe(true);
  });

  test('is listed on the Cases page', async ({ page }) => {
    await page.goto('/cases');
    await expect(page.locator(`a[href$="${PATH}"]`).first()).toBeVisible();
  });
});

test.describe('case study: Signal Sigma motion', () => {
  test('blocks are armed and play their entrance when scrolled into view', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('.sigma-case')).toHaveClass(/sigma-armed/);
    const block = page.locator('.sigma-showcase');
    await expect(block).toHaveClass(/sigma-r/);
    await block.scrollIntoViewIfNeeded();
    await expect(block).toHaveClass(/is-in/);
  });

  test('with "reduce motion" nothing is hidden or animated', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto(PATH);
    await expect(page.locator('.sigma-case')).not.toHaveClass(/sigma-armed/);
    await expect(page.locator('.sigma-showcase')).not.toHaveClass(/sigma-r/);
    await context.close();
  });
});
