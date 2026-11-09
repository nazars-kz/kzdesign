import { expect, test } from './support/test';

test.describe('about us', () => {
  test('hero, leadership with highlighted initials, four "different" cards, the menu marks the page', async ({
    page,
  }) => {
    await page.goto('/about-us');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'We tackle the toughest user experience challenges',
    );
    const crumbs = page.getByRole('navigation', { name: 'Breadcrumb' });
    await expect(crumbs.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');

    const leaders = page.locator('.leader');
    await expect(leaders).toHaveCount(2);
    await expect(leaders.first().getByRole('heading', { level: 2 })).toHaveText('Vlad Kyrieiev');
    await expect(leaders.first().locator('.hl')).toHaveText('K');
    await expect(page.locator('.diff-card')).toHaveCount(4);
    await expect(page.locator('.nav__link[aria-current="page"]')).toHaveText('About us');
  });

  test('the 3D logo and the card animations load after the page is idle', async ({ page }) => {
    await page.goto('/about-us');
    await page.waitForLoadState('networkidle');
    // three.js and lottie are loaded on demand from /vendor; each card then holds an SVG animation.
    await expect(page.locator('.ab-hero__logo canvas')).toHaveCount(1, { timeout: 15_000 });
    await expect(page.locator('.diff-card__anim svg')).toHaveCount(4, { timeout: 15_000 });
  });
});
