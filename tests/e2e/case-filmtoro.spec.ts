import { expect, test } from './support/test';

const PATH = '/cases/filmtoro';
/** The motion class alone (other classes such as `filmtoro-row` start the same way). */
const ARMED_BLOCK = /(^|\s)filmtoro-r(\s|$)/;

test.describe('case study: Filmtoro', () => {
  test('one h1, ordered blocks, every picture has an alt text', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('Filmtoro');
    // process, info architecture, colors, home, reels, posts, profile, create, lists, quizzes
    await expect(page.locator('.filmtoro-title')).toHaveCount(10);
    const missing = await page.locator('.filmtoro-case img:not([alt])').count();
    expect(missing).toBe(0);
    await expect(page.locator('.filmtoro-facts__item')).toHaveCount(5);
    await expect(page.locator('.filmtoro-stage')).toHaveCount(4);
    await expect(page.locator('.filmtoro-swatch')).toHaveCount(4);
    await expect(page.locator('.filmtoro-member')).toHaveCount(8);
  });

  test('the palette shows the HEX and RGB values of every color', async ({ page }) => {
    await page.goto(PATH);
    const blue = page.locator('.filmtoro-swatch').first();
    await expect(blue).toContainText('#164364');
    await expect(blue).toContainText('22 / 67 / 100 / 100%');
  });

  test('uses its own typefaces and the Cases item is marked in the menu', async ({ page }) => {
    await page.goto(PATH);
    const title = await page
      .locator('.filmtoro-title')
      .first()
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(title).toContain('filmtoroUrbanist');
    const specimen = await page
      .locator('.filmtoro-type__family')
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(specimen).toContain('filmtoroGeist');
    await expect(page.locator('.nav__link[aria-current="page"]')).toHaveText('Cases');
  });

  test('the info architecture is a picture on desktop and a list on phones', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PATH);
    await expect(page.locator('.filmtoro-architecture__map')).toBeVisible();
    await expect(page.locator('.filmtoro-hubs')).toBeHidden();
    await page.setViewportSize({ width: 375, height: 800 });
    await expect(page.locator('.filmtoro-architecture__map')).toBeHidden();
    await expect(page.locator('.filmtoro-hub')).toHaveCount(8);
    await expect(page.locator('.filmtoro-hubs')).toBeVisible();
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

  test('on a phone the community card sits under the picture', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto(PATH);
    const scene = await page.locator('.filmtoro-community__scene').boundingBox();
    const card = await page.locator('.filmtoro-card').boundingBox();
    expect(scene && card && card.y > scene.y + scene.height - 1).toBe(true);
  });

  test('is listed on the Cases page', async ({ page }) => {
    await page.goto('/cases');
    await expect(page.locator(`a[href$="${PATH}"]`).first()).toBeVisible();
  });
});

test.describe('case study: Filmtoro motion', () => {
  test('blocks are armed and play their entrance when scrolled into view', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('.filmtoro-case')).toHaveClass(/filmtoro-armed/);
    const block = page.locator('.filmtoro-band');
    await expect(block).toHaveClass(ARMED_BLOCK);
    await block.scrollIntoViewIfNeeded();
    await expect(block).toHaveClass(/is-in/);
  });

  test('with "reduce motion" nothing is hidden or animated', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto(PATH);
    await expect(page.locator('.filmtoro-case')).not.toHaveClass(/filmtoro-armed/);
    await expect(page.locator('.filmtoro-band')).not.toHaveClass(ARMED_BLOCK);
    await context.close();
  });
});
