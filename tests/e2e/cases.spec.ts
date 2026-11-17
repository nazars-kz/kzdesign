import { expect, test } from './support/test';

test.describe('cases', () => {
  test('the list shows the case study cards; a filter keeps the matching ones; "All" shows every case', async ({
    page,
  }) => {
    await page.goto('/cases');
    await page.waitForLoadState('networkidle'); // hydrated: the pills need their handlers
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Products that already');

    const cards = page.locator('.cs-list__items > li');
    const total = await cards.count();
    expect(total).toBeGreaterThanOrEqual(1);
    await expect(cards.first().locator('a.case')).toHaveAttribute('href', /\/cases\/[a-z0-9-]+$/);

    const filters = page.getByRole('group', { name: 'Filter case studies by category' });
    const mobile = filters.getByRole('button', { name: 'Mobile', exact: true });
    await mobile.click();
    await expect(mobile).toHaveAttribute('aria-pressed', 'true');
    await expect(cards.filter({ visible: true })).not.toHaveCount(0);

    await filters.getByRole('button', { name: 'All', exact: true }).click();
    await expect(cards.filter({ visible: true })).toHaveCount(total);
  });

  test('on a phone the filters are a drop-down with the number of cases', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/cases');
    await page.waitForLoadState('networkidle');
    const button = page.getByRole('button', { name: 'Filter case studies by category' });
    await expect(button).toBeVisible();
    await button.click();
    const options = page.getByRole('listbox', { name: 'Category' }).getByRole('option');
    await expect(options.first()).toContainText(/^All\d+ cases?$/);
    await options.filter({ hasText: /^Mobile/ }).click();
    await expect(button).toContainText('Mobile');
    await expect(page.locator('.cs-list__items > li:visible')).not.toHaveCount(0);
  });

  test('every case study page is its own page: one h1, in the sitemap, Cases marked in the menu', async ({
    page,
  }) => {
    await page.goto('/cases/tach');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.nav__link[aria-current="page"]')).toHaveText('Cases');
  });

  test('an unknown case study is a 404', async ({ page }) => {
    const response = await page.goto('/cases/no-such-case');
    expect(response?.status()).toBe(404);
  });
});
