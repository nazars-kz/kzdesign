import { expect, test } from './support/test';

const PATH = '/cases/touren';
/** The motion class alone (the block's own class `touren-rocks` starts the same way). */
const ARMED_BLOCK = /(^|\s)touren-r(\s|$)/;

test.describe('case study: Touren', () => {
  test('one h1, ordered blocks, every picture has an alt text', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('Touren');
    // process, goals, site map, identity, home, community, explore, profile, navigation,
    // mission, conditions, hazard, web, pages, highlights
    await expect(page.locator('.touren-title')).toHaveCount(15);
    const missing = await page.locator('.touren-case img:not([alt])').count();
    expect(missing).toBe(0);
    await expect(page.locator('.touren-step')).toHaveCount(6);
    await expect(page.locator('.touren-goal')).toHaveCount(6);
    await expect(page.locator('.touren-swatch')).toHaveCount(3);
    await expect(page.locator('.touren-card')).toHaveCount(3);
    await expect(page.locator('.touren-member')).toHaveCount(6);
  });

  test('the site map lists every screen with its pages', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('.touren-node--hub')).toHaveCount(4);
    await expect(page.locator('.touren-map__top .touren-node')).toHaveCount(4);
    await expect(page.locator('.touren-map__entry .touren-node')).toHaveCount(2);
  });

  test('uses its own typefaces and the Cases item is marked in the menu', async ({ page }) => {
    await page.goto(PATH);
    const title = await page
      .locator('.touren-title')
      .first()
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(title).toContain('tourenUrbanist');
    const specimen = await page
      .locator('.touren-type__name')
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(specimen).toContain('tourenInter');
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

  test('on a phone the feature panels stack under each other', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto(PATH);
    const text = await page.locator('.touren-navigation__panel').boundingBox();
    const phones = await page.locator('.touren-navigation__phones').boundingBox();
    expect(text && phones && phones.y > text.y + text.height - 1).toBe(true);
  });

  test('is listed on the Cases page', async ({ page }) => {
    await page.goto('/cases');
    await expect(page.locator(`a[href$="${PATH}"]`).first()).toBeVisible();
  });
});

test.describe('case study: Touren motion', () => {
  test('blocks are armed and play their entrance when scrolled into view', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('.touren-case')).toHaveClass(/touren-armed/);
    const block = page.locator('.touren-rocks');
    await expect(block).toHaveClass(ARMED_BLOCK);
    await block.scrollIntoViewIfNeeded();
    await expect(block).toHaveClass(/is-in/);
  });

  test('with "reduce motion" nothing is hidden or animated', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto(PATH);
    await expect(page.locator('.touren-case')).not.toHaveClass(/touren-armed/);
    await expect(page.locator('.touren-rocks')).not.toHaveClass(ARMED_BLOCK);
    await context.close();
  });
});
