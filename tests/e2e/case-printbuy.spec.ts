import { expect, test } from './support/test';

const PATH = '/cases/printbuy';
/** The motion class alone (block classes such as `printbuy-row` start the same way). */
const ARMED_BLOCK = /(^|\s)printbuy-r(\s|$)/;

test.describe('case study: PrintBuy', () => {
  test('one h1, ordered blocks, every picture has an alt text', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('PrintBuy');
    const missing = await page.locator('.printbuy-case img:not([alt])').count();
    expect(missing).toBe(0);
    await expect(page.locator('.printbuy-fact')).toHaveCount(4);
    await expect(page.locator('.printbuy-step')).toHaveCount(6);
    await expect(page.locator('.printbuy-glass')).toHaveCount(3);
    await expect(page.locator('.printbuy-screen')).toHaveCount(3);
    await expect(page.locator('.printbuy-phone')).toHaveCount(3);
    await expect(page.locator('.printbuy-swatch')).toHaveCount(4);
    await expect(page.locator('.printbuy-member')).toHaveCount(7);
    await expect(page.locator('.printbuy-note')).toHaveCount(4);
  });

  test('uses its own typefaces and the Cases item is marked in the menu', async ({ page }) => {
    await page.goto(PATH);
    const specimen = await page
      .locator('.printbuy-type__name')
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(specimen).toContain('printbuyInter');
    const note = await page
      .locator('.printbuy-note__text')
      .first()
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(note).toContain('printbuyHand');
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

  test('on a phone the texts of the screens come before their pictures', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto(PATH);
    const body = await page.locator('.printbuy-screen__body').first().boundingBox();
    const image = await page.locator('.printbuy-screen__img').first().boundingBox();
    expect(body && image && image.y > body.y + body.height - 1).toBe(true);
  });

  test('on a wide screen the screens sit beside their texts', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PATH);
    const body = await page.locator('.printbuy-screen__body').first().boundingBox();
    const image = await page.locator('.printbuy-screen__img').first().boundingBox();
    expect(body && image && body.x > image.x + image.width * 0.9).toBe(true);
  });

  test('is listed on the Cases page', async ({ page }) => {
    await page.goto('/cases');
    await expect(page.locator(`a[href$="${PATH}"]`).first()).toBeVisible();
  });
});

test.describe('case study: PrintBuy motion', () => {
  test('blocks are armed and play their entrance when scrolled into view', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('.printbuy-case')).toHaveClass(/printbuy-armed/);
    const block = page.locator('.printbuy-swatches');
    await expect(block).toHaveClass(ARMED_BLOCK);
    await block.scrollIntoViewIfNeeded();
    await expect(block).toHaveClass(/is-in/);
  });

  test('with "reduce motion" nothing is hidden or animated', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto(PATH);
    await expect(page.locator('.printbuy-case')).not.toHaveClass(/printbuy-armed/);
    await expect(page.locator('.printbuy-swatches')).not.toHaveClass(ARMED_BLOCK);
    await context.close();
  });
});
