import { type Page } from '@playwright/test';

import { admin } from './support/admin';
import { login } from './support/auth';
import { expect, test } from './support/test';
import { E2E_ADMIN } from './support/users';

/** The contact block is a shared section (src/content/shared/contact.ts), used on Home. */
const TITLE = 'Title: before the arrow';
const saveButton = (page: Page) => page.getByRole('button', { name: 'Save', exact: true });

async function openEditor(page: Page, path: string): Promise<void> {
  await page.goto(path);
  await expect(page.locator('form[data-hydrated]')).toBeVisible();
}

/** Opens the shared "Contact block" section (sections start collapsed except the first). */
async function openContactBlock(page: Page): Promise<void> {
  const field = page.getByRole('textbox', { name: TITLE });
  if ((await field.count()) === 0) {
    await page.getByRole('button', { name: /^Contact block/ }).click();
  }
  await expect(field).toBeVisible();
}

async function liveHtml(page: Page, path: string): Promise<string> {
  const response = await page.request.get(path, {
    headers: { 'user-agent': 'Mozilla/5.0 Chrome/150', 'accept-language': 'en' },
  });
  return response.text();
}

test.describe.serial('shared sections', () => {
  test('a shared section shows in place on its page; editing it updates the live site', async ({
    page,
  }) => {
    await login(page, E2E_ADMIN);
    await openEditor(page, admin('/pages/home'));
    // Home's sections in site order, with the shared ones in place.
    const headings = page.locator('form h2');
    await expect(headings).toContainText(['Hero', 'Our Services', 'Case Studies', 'Contact block']);
    await openContactBlock(page);
    const block = page
      .locator('[data-slot="collapsible"]')
      .filter({ has: page.getByRole('textbox', { name: TITLE }) })
      .first();
    await expect(block.getByText('Shared', { exact: true })).toBeVisible();

    const title = `Shared contact ${Date.now()}`;
    await page.getByRole('textbox', { name: TITLE }).fill(title);
    await saveButton(page).click();
    await expect(page.getByText('Saved. The live site updates in a few seconds.')).toBeVisible();

    await expect.poll(async () => liveHtml(page, '/')).toContain(title);

    // "Every page" lists it for an overview.
    const everyPage = page.getByRole('region', { name: 'Every page' });
    await expect(everyPage.getByRole('link', { name: /Contact block/ })).toBeVisible();
  });

  test('editing the same shared section from two editors at once is a conflict naming it', async ({
    browser,
  }) => {
    const first = await browser.newPage();
    const second = await browser.newPage();
    await login(first, E2E_ADMIN);
    await login(second, E2E_ADMIN);
    await openEditor(first, admin('/pages/home'));
    await openEditor(second, admin('/pages/home'));
    await openContactBlock(first);
    await openContactBlock(second);

    await first.getByRole('textbox', { name: TITLE }).fill(`From first ${Date.now()}`);
    await saveButton(first).click();
    await expect(first.getByText('Saved. The live site updates in a few seconds.')).toBeVisible();

    await second.getByRole('textbox', { name: TITLE }).fill(`From second ${Date.now()}`);
    await saveButton(second).click();
    await expect(second.getByText('This was changed by someone else')).toBeVisible();
    await expect(
      second.getByRole('alert').filter({ hasText: 'This was changed by someone else' }),
    ).toContainText('shared section “Contact block”');
    await first.close();
    await second.close();
  });
});
