import { type Page } from '@playwright/test';

import { admin } from './support/admin';
import { login } from './support/auth';
import { expect, test } from './support/test';
import { E2E_MANAGER } from './support/users';

/** Pastes text into the focused element (a synthetic paste event with clipboard data). */
async function paste(page: Page, selector: string, text: string): Promise<void> {
  await page.locator(selector).evaluate((element, value) => {
    const data = new DataTransfer();
    data.setData('text/plain', value);
    element.dispatchEvent(
      new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }),
    );
  }, text);
}

test.describe('list editing', () => {
  test('tags (case study): Enter adds, paste adds many, Delete and × remove, keyboard moves; saved as plain values', async ({
    page,
  }) => {
    await login(page, E2E_MANAGER);
    await page.goto(admin('/pages/collections/cases'));
    await page.getByRole('table').getByRole('link', { name: 'Touren' }).first().click();
    await expect(page.locator('form[data-hydrated]')).toBeVisible();
    const tags = page.locator('[data-list-display="tags"]').first();
    const input = tags.getByRole('textbox', { name: 'Add to Tags' });
    const chips = tags.getByRole('listitem');
    await expect(chips).toHaveText(['sport', 'Saas', 'Web', 'navigation', 'b2c']);

    await input.fill('Product');
    await input.press('Enter');
    await expect(chips).toHaveText(['sport', 'Saas', 'Web', 'navigation', 'b2c', 'Product']);
    await expect(input).toBeFocused();

    await paste(page, '[aria-label="Add to Tags"]', 'Design, Speed\nNews');
    await expect(chips).toHaveText([
      'sport',
      'Saas',
      'Web',
      'navigation',
      'b2c',
      'Product',
      'Design',
      'Speed',
    ]);

    await tags.getByRole('button', { name: 'Remove Design' }).click();
    await expect(chips).toHaveText([
      'sport',
      'Saas',
      'Web',
      'navigation',
      'b2c',
      'Product',
      'Speed',
    ]);

    const speed = tags.getByRole('button', { name: /^Speed/ });
    await speed.focus();
    await page.keyboard.press('Alt+ArrowLeft');
    await expect(chips).toHaveText([
      'sport',
      'Saas',
      'Web',
      'navigation',
      'b2c',
      'Speed',
      'Product',
    ]);
    await page.keyboard.press('Delete');
    await expect(chips).toHaveText(['sport', 'Saas', 'Web', 'navigation', 'b2c', 'Product']);

    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(page.getByText(/Saved/).first()).toBeVisible();
    await page.reload();
    await expect(
      page.locator('[data-list-display="tags"]').first().getByRole('listitem'),
    ).toHaveText(['sport', 'Saas', 'Web', 'navigation', 'b2c', 'Product']);
    // The site receives plain strings.
    const html = await (await page.request.get('/cases')).text();
    expect(html).toContain('Product');
  });
});
