import { expect, test } from './support/test';

test.describe('cases', () => {
  test('the list shows listed cases; a filter hides the others; "All" brings them back', async ({
    page,
  }) => {
    await page.goto('/cases');
    await page.waitForLoadState('networkidle'); // hydrated: the pills need their handlers
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Products that already');

    const cards = page.locator('.cs-list__items > li');
    const total = await cards.count();
    expect(total).toBeGreaterThanOrEqual(3);
    await expect(cards.filter({ visible: true })).toHaveCount(total);

    const filters = page.getByRole('group', { name: 'Filter case studies by category' });
    const mobile = filters.getByRole('button', { name: 'Mobile', exact: true });
    await mobile.click();
    await expect(mobile).toHaveAttribute('aria-pressed', 'true');
    const shown = await cards.filter({ visible: true }).count();
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThan(total);

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
    await expect(options.first()).toContainText(/^All\d+ cases$/);
    await options.filter({ hasText: /^Mobile/ }).click();
    await expect(button).toContainText('Mobile');
    await expect(page.locator('.cs-list__items > li:visible')).not.toHaveCount(0);
  });

  test('a case page has details, feedback, screens, other cases and keeps Cases marked in the menu', async ({
    page,
  }) => {
    await page.goto('/cases/onground');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Onground');
    await expect(page.getByText('Industry', { exact: true })).toBeVisible();
    await expect(page.locator('blockquote')).toContainText('K&Z Design completed');
    await expect(page.locator('.cshots--desk img').first()).toBeAttached();
    await expect(page.locator('.cshots--mob img').first()).toBeAttached();
    await expect(page.getByRole('region', { name: 'Other case studies' })).toBeVisible();
    // The case being read is not offered again.
    await expect(page.locator('.cother__track a.case').filter({ hasText: 'Onground' })).toHaveCount(
      0,
    );
    await expect(page.locator('.nav__link[aria-current="page"]')).toHaveText('Cases');
    const crumbs = page.getByRole('navigation', { name: 'Breadcrumb' });
    await expect(crumbs.getByRole('link', { name: 'Case studies' })).toHaveAttribute(
      'href',
      /\/cases$/,
    );
  });

  test('a case without a full page still opens the template', async ({ page }) => {
    const response = await page.goto('/cases/touren');
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Touren');
  });
});
