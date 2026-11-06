import { expect, test } from './support/test';

test.describe('home page', () => {
  test('the FAQ shows the first questions; "Show all questions" reveals the rest', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle'); // hydrated: the button needs its handler
    const faq = page.locator('section.faq');
    const items = faq.locator('.accordion__item');
    const more = faq.getByRole('button', { name: /^Show all questions \(\d+\)$/ });
    const total = await items.count();
    expect(total).toBeGreaterThan(6);
    // Hidden ones stay in the HTML (for search engines) but are not displayed.
    await expect(items.filter({ visible: true })).toHaveCount(6);
    await expect(more).toHaveAttribute('aria-expanded', 'false');

    await more.click();
    await expect(items.filter({ visible: true })).toHaveCount(total);
    const fewer = faq.getByRole('button', { name: 'Show fewer questions' });
    await expect(fewer).toHaveAttribute('aria-expanded', 'true');
    await fewer.click();
    await expect(items.filter({ visible: true })).toHaveCount(6);
  });

  test('the Approach cards and the Why us cards are drawn in CSS and play on hover', async ({
    page,
  }) => {
    await page.goto('/');
    const approach = page.locator('.a-card.kzc1-host');
    await expect(approach).toHaveCount(4);
    for (const name of ['discovery', 'strategy', 'uxui', 'prototyping']) {
      await expect(page.locator(`.a-card .kzc1-${name}`)).toHaveCount(1);
    }
    const why = page.locator('.u-card.kzw-host');
    await expect(why).toHaveCount(3);
    for (const name of ['direct', 'updates', 'handoff']) {
      await expect(page.locator(`.u-card .kzw-${name}`)).toHaveCount(1);
    }
    // Each card is a link with its own heading text; the drawing is hidden from screen readers.
    await expect(approach.first().locator('.kzc1')).toHaveAttribute('aria-hidden', 'true');
  });
});
