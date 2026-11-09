import { expect, test } from './support/test';

test.describe('approach', () => {
  test('four phases with accordions; the pills jump to them; industries are shared with Home', async ({
    page,
  }) => {
    await page.goto('/approach');
    await page.waitForLoadState('networkidle'); // hydrated: the accordions need their handlers
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Approach');
    await expect(page.locator('section.phase')).toHaveCount(4);
    await expect(page.locator('#discovery')).toBeAttached();

    const pills = page.getByRole('navigation', { name: 'Process steps' });
    await expect(pills.getByRole('link')).toHaveText([
      'Discovery',
      'Strategy',
      'UX/UI design',
      'Prototyping',
    ]);
    await pills.getByRole('link', { name: 'Prototyping' }).click();
    await expect(page).toHaveURL(/#prototyping$/);

    // Steps are closed at first; one opens on click.
    const rows = page.locator('#strategy .accordion__head');
    await expect(rows.first()).toHaveAttribute('aria-expanded', 'false');
    await rows.first().click();
    await expect(rows.first()).toHaveAttribute('aria-expanded', 'true');

    await expect(page.locator('section.industries')).toBeVisible();
  });
});

test.describe('reviews', () => {
  test('title, the Clutch widget with the company id, the call to action', async ({ page }) => {
    await page.goto('/reviews');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Reviews');
    await expect(page.locator('.clutch-widget')).toHaveAttribute(
      'data-clutchcompany-id',
      '2218631',
    );
    await expect(page.locator('.rv-cta__title')).toContainText("Let's increase chances");
    await expect(page.getByRole('region', { name: 'Clutch reviews' })).toBeAttached();
  });
});

test.describe('contact us', () => {
  test('the contact block is the page: one h1, the people and the form', async ({ page }) => {
    await page.goto('/contact-us');
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Let's take your product");
    await expect(page.locator('section.contact--page')).toBeVisible();
    await expect(page.locator('.team__row')).toHaveCount(2);
    await expect(page.locator('#contact-message')).toBeVisible();
  });
});
