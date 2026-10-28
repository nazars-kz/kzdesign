import { type Page } from '@playwright/test';
import { expect, test } from './support/test';

import { login } from './support/auth';
import { E2E_ADMIN, E2E_MANAGER } from './support/users';
import { admin } from './support/admin';

const heroTitle = (page: Page) => page.getByRole('textbox', { name: 'Title' }).first();

/** Opens the editor and waits until React has hydrated the form. */
async function openEditor(page: Page, path: string): Promise<void> {
  await page.goto(path);
  await expect(page.locator('form[data-hydrated]')).toBeVisible();
}
const saveButton = (page: Page) => page.getByRole('button', { name: 'Save', exact: true });

async function liveH1(page: Page, path: string): Promise<string> {
  const response = await page.request.get(path, {
    headers: { 'user-agent': 'Mozilla/5.0 Chrome/150', 'accept-language': 'en' },
  });
  const html = await response.text();
  return /<h1[^>]*>([^<]*)/.exec(html)?.[1] ?? '';
}

test.describe.serial('pages editor', () => {
  test('editing the text of a page updates only that page', async ({ page }) => {
    await login(page, E2E_MANAGER);
    await openEditor(page, admin('/pages/about'));
    await expect(page.getByRole('heading', { name: 'About us', level: 1 })).toBeVisible();

    const title = `About the team ${Date.now()}`;
    await heroTitle(page).fill(title);
    await expect(page.getByText('Unsaved changes')).toBeVisible();
    await saveButton(page).click();
    await expect(page.getByText('Saved. The live site updates in a few seconds.')).toBeVisible();

    await expect.poll(() => liveH1(page, '/about-us')).toBe(title);
    expect(await liveH1(page, '/approach')).toBe('Our approach');
  });

  test('a concurrent edit is detected', async ({ browser }) => {
    const first = await browser.newPage();
    const second = await browser.newPage();
    await login(first, E2E_ADMIN);
    await login(second, E2E_ADMIN);
    await openEditor(first, admin('/pages/contact-us'));
    await openEditor(second, admin('/pages/contact-us'));

    await heroTitle(first).fill('Contact (first editor)');
    await saveButton(first).click();
    await expect(first.getByText(/^Saved\./)).toBeVisible();

    await heroTitle(second).fill('Contact (second editor)');
    await saveButton(second).click();
    await expect(second.getByText('This was changed by someone else')).toBeVisible();
    expect(await liveH1(second, '/contact-us')).toBe('Contact (first editor)');
    await first.close();
    await second.close();
  });

  test('a revision can be restored', async ({ page }) => {
    await login(page, E2E_ADMIN);
    await openEditor(page, admin('/pages/contact-us'));
    await expect(heroTitle(page)).toHaveValue('Contact (first editor)');

    await heroTitle(page).fill('Temporary title');
    await saveButton(page).click();
    await expect(page.getByText(/^Saved\./)).toBeVisible();

    await page.getByRole('button', { name: 'History' }).click();
    const revisions = page.getByRole('list', { name: 'Revisions' }).getByRole('button');
    await expect(revisions).toHaveCount(2);
    await revisions.nth(1).click();
    await page.getByRole('button', { name: 'Restore this version' }).click();
    await expect(page.getByText('Revision restored.')).toBeVisible();
    await expect(heroTitle(page)).toHaveValue('Contact (first editor)');
    await expect.poll(() => liveH1(page, '/contact-us')).toBe('Contact (first editor)');
  });

  test('validation errors are shown on fields and nothing is saved', async ({ page }) => {
    await login(page, E2E_ADMIN);
    await openEditor(page, admin('/pages/privacy-policy'));
    await heroTitle(page).fill('');
    await saveButton(page).click();
    await expect(page.getByText('This field is required.').first()).toBeVisible();
    expect(await liveH1(page, '/privacy-policy')).toBe('Privacy Policy');
  });
});
