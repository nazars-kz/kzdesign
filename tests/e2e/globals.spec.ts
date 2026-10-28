import { type Page } from '@playwright/test';
import { expect, test } from './support/test';

import { login } from './support/auth';
import { E2E_MANAGER } from './support/users';
import { admin } from './support/admin';

const VISITOR = { 'user-agent': 'Mozilla/5.0 Chrome/150', 'accept-language': 'en' };

async function html(page: Page, path: string): Promise<string> {
  const response = await page.context().request.fetch(path, { headers: VISITOR });
  expect(response.status()).toBe(200);
  return response.text();
}

/** Header and footer of every page. */
const PAGES = ['/', '/about-us', '/cases', '/services', '/contact-us'];

test('editing the email in Site-wide updates the footer of every page', async ({ page }) => {
  const email = `hello${Date.now()}@kz.design`;
  const aboutBefore = /<h1[^>]*>([^<]*)/.exec(await html(page, '/about-us'))?.[1];

  await login(page, E2E_MANAGER);
  await page.goto(admin('/pages/site-wide/site'));
  await expect(page.locator('form[data-hydrated]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Header & footer', level: 1 })).toBeVisible();
  // Site-wide content has no Google & sharing tab.
  await expect(page.getByRole('tab', { name: 'Google & sharing' })).toHaveCount(0);
  await page.getByRole('button', { name: /^Company details/ }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByText(/^Saved\./)).toBeVisible();

  for (const path of PAGES) {
    await expect
      .poll(async () => (await html(page, path)).split(email).length - 1, { message: path })
      .toBeGreaterThanOrEqual(1);
  }
  // Other content is untouched.
  expect(/<h1[^>]*>([^<]*)/.exec(await html(page, '/about-us'))?.[1]).toBe(aboutBefore);
});

test('an invalid email is rejected in the editor', async ({ page }) => {
  await login(page, E2E_MANAGER);
  await page.goto(admin('/pages/site-wide/site'));
  await expect(page.locator('form[data-hydrated]')).toBeVisible();
  await page.getByRole('button', { name: /^Company details/ }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('not an email');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByText(/valid email/i).first()).toBeVisible();
});
