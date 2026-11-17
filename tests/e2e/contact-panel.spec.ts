import { type Browser, type Page } from '@playwright/test';

import { admin } from './support/admin';
import { login } from './support/auth';
import { expect, test } from './support/test';
import { E2E_ADMIN } from './support/users';

/** Signed timing token on site forms: humans need ≥ 3 s. */
const FILL_DELAY_MS = 3200;
const stamp = Date.now();
let ipCounter = 0;

/** Each scenario gets its own client IP so per-visitor rate limits don't interfere. */
async function visitor(browser: Browser) {
  ipCounter += 1;
  const context = await browser.newContext({
    extraHTTPHeaders: { 'x-forwarded-for': `192.0.2.${(stamp % 200) + ipCounter}` },
  });
  return { context, page: await context.newPage() };
}

const drawer = (page: Page) => page.locator('#contact-drawer');

async function openDrawer(page: Page): Promise<void> {
  await page.goto('/');
  await page.waitForLoadState('networkidle'); // hydrated: the link opens the panel instead of navigating
  await page.locator('.site-header__cta').click();
  await expect(drawer(page).getByRole('dialog', { name: 'Get in touch' })).toBeVisible();
}

/** Submissions in the admin inbox of `formId` whose data contains `search`. */
async function inboxCount(page: Page, formId: string, search: string): Promise<number> {
  await page.goto(admin(`/pages/forms/${formId}?status=all&q=${encodeURIComponent(search)}`));
  const rows = page.getByRole('table', { name: 'Requests' }).getByRole('row');
  await expect(rows.first()).toBeVisible();
  if (await page.getByText('No requests here.').isVisible()) return 0;
  return (await rows.count()) - 1;
}

test.describe.serial('contact panel', () => {
  test('the header button opens the panel; Esc closes it and focus goes back', async ({ page }) => {
    await openDrawer(page);
    await expect(page.locator('html')).toHaveClass(/dw-lock/);
    await expect(drawer(page).getByRole('tab', { name: 'Book a call' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await page.keyboard.press('Escape');
    await expect(drawer(page).getByRole('dialog')).toBeHidden();
    await expect(page.locator('.site-header__cta')).toBeFocused();
    await expect(page.locator('html')).not.toHaveClass(/dw-lock/);
    // The link keeps working without JavaScript: it points to the contact page.
    await expect(page.locator('.site-header__cta')).toHaveAttribute('href', '/contact-us');
  });

  test('booking: pick a day and a time, give the details, the request reaches the inbox', async ({
    browser,
    page,
  }) => {
    const { context, page: guest } = await visitor(browser);
    await openDrawer(guest);
    const panel = drawer(guest);
    const next = panel.getByRole('button', { name: 'Continue' });
    await expect(next).toBeDisabled();
    // The first open day is preselected; booked times are struck through and disabled.
    await panel.locator('.dw-slot:not([disabled])').first().click();
    await expect(next).toBeEnabled();
    await expect(panel.locator('.dw__sum').first()).not.toContainText('Pick a day and time');
    await next.click();

    const name = `Caller ${stamp}`;
    const submit = panel.getByRole('button', { name: 'Book call' });
    await expect(submit).toBeDisabled();
    await panel.locator('#booking-name').fill(name);
    await panel.locator('#booking-email').fill('caller@example.test');
    await expect(submit).toBeEnabled();
    await guest.waitForTimeout(FILL_DELAY_MS);
    await submit.click();
    await expect(panel.getByRole('status')).toContainText('Your Form Was Successfully Submitted!');
    await expect(panel.getByRole('status')).toContainText('caller@example.test');
    // "Make another submission" starts over from an empty calendar step.
    await panel.getByRole('button', { name: 'Make another submission' }).click();
    await expect(panel.getByRole('button', { name: 'Continue' })).toBeDisabled();
    await context.close();

    await login(page, E2E_ADMIN);
    expect(await inboxCount(page, 'booking', name)).toBe(1);
  });

  test('message: advanced options, chips and the privacy checkbox, then the request reaches the inbox', async ({
    browser,
    page,
  }) => {
    const { context, page: guest } = await visitor(browser);
    await openDrawer(guest);
    const panel = drawer(guest);
    await panel.getByRole('tab', { name: 'Send a message' }).click();
    // The extra fields open with the Advanced Options switch.
    const advanced = panel.getByRole('switch', { name: 'Advanced Options' });
    await expect(advanced).toHaveAttribute('aria-checked', 'false');
    await advanced.click();
    await panel.getByRole('button', { name: 'SaaS', exact: true }).click();
    await panel.getByRole('button', { name: 'Web', exact: true }).click();
    await panel.getByText('Full-scale').click();
    await panel.getByRole('button', { name: '$25–50k' }).click();
    await panel.getByRole('button', { name: 'Clutch', exact: true }).click();

    const name = `Project ${stamp}`;
    const submit = panel.getByRole('button', { name: 'Submit' });
    await panel.locator('#contact-panel-name').fill(name);
    await panel.locator('#contact-panel-email').fill('project@example.test');
    // Submit waits for the privacy checkbox.
    await expect(submit).toBeDisabled();
    await panel.locator('#contact-panel-privacy').check({ force: true });
    await expect(submit).toBeEnabled();
    await guest.waitForTimeout(FILL_DELAY_MS);
    await submit.click();
    await expect(panel.getByRole('status')).toContainText('Your Form Was Successfully Submitted!');
    await context.close();

    await login(page, E2E_ADMIN);
    expect(await inboxCount(page, 'contact', name)).toBe(1);
    // The chosen chips are in the request.
    await page.getByRole('table', { name: 'Requests' }).getByRole('link').first().click();
    await expect(page.getByText('SaaS, Web')).toBeVisible();
    await expect(page.getByText('$25–50k')).toBeVisible();
    await expect(page.getByText('Clutch')).toBeVisible();
    await expect(page.getByText('full-scale')).toBeVisible();
  });

  test('the Home contact block has the same panel: Send a message first, Book a call second', async ({
    page,
  }) => {
    await page.goto('/');
    const inline = page.locator('[data-contact-inline]');
    await expect(inline.getByRole('tab')).toHaveText(['Send a message', 'Book a call']);
    await expect(inline.locator('#contact-name')).toBeVisible();
    await inline.getByRole('tab', { name: 'Book a call' }).click();
    await expect(inline.getByRole('button', { name: 'Continue' })).toBeVisible();
    await inline.getByRole('tab', { name: 'Send a message' }).click();
    await expect(inline.locator('#contact-name')).toBeVisible();
  });
});

test.describe('header menus', () => {
  test('Services opens a panel with a card per service; Esc and a click outside close it', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const trigger = page.getByRole('button', { name: 'Services' });
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const panel = page.locator('#mega-services');
    await expect(panel.getByRole('link')).toHaveText(['SaaS web apps', 'Mobile apps', 'Websites']);
    await expect(panel.getByRole('link').first()).toHaveAttribute('href', '/services/saas');
    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await trigger.click();
    await page.mouse.click(700, 800);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('the nav lists every page; the Services panel is the only mega menu', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(nav.getByRole('link')).toHaveText([
      'Home',
      'Cases',
      'Approach',
      'About us',
      'Reviews',
      'Contact us',
    ]);
    await expect(nav.getByRole('button', { name: 'Services' })).toBeVisible();
    await expect(page.getByRole('button', { name: /More pages/ })).toHaveCount(0);
  });
});

test.describe('one message form in two places', () => {
  test('the block and the panel have distinct ids and tell the inbox where a request came from', async ({
    page,
  }) => {
    await page.goto('/');
    await page.locator('.site-header__cta').click();
    await expect(drawer(page)).toHaveClass(/is-open/);
    const duplicates = await page.evaluate(() => {
      const seen = new Set<string>();
      const dup: string[] = [];
      for (const el of document.querySelectorAll('[id]')) {
        if (seen.has(el.id)) dup.push(el.id);
        seen.add(el.id);
      }
      return dup;
    });
    expect(duplicates).toEqual([]);
    await expect(page.locator('[data-contact-inline] input[name="origin"]')).toHaveValue('block');
    await expect(page.locator('#contact-drawer input[name="origin"]')).toHaveValue('panel');
    // both post to the same form
    const forms = await page
      .locator('input[name="_form"]')
      .evaluateAll((inputs) => inputs.map((input) => (input as HTMLInputElement).value));
    expect(new Set(forms)).toEqual(new Set(['contact', 'booking']));
  });
});
