import { expect, test } from './support/test';

test.describe('service pages', () => {
  test('SaaS: title, about with founders, three promises, case cards, process, next services', async ({
    page,
  }) => {
    await page.goto('/services/saas');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('SaaS, Web App, Software');
    const crumbs = page.getByRole('navigation', { name: 'Breadcrumb' });
    await expect(crumbs.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    await expect(crumbs.getByText('SaaS', { exact: true })).toHaveAttribute('aria-current', 'page');

    await expect(page.locator('.founder')).toHaveCount(2);
    await expect(page.locator('.feature')).toHaveCount(3);
    await expect(page.locator('.svc-cases__grid a.case')).toHaveCount(4);
    await expect(page.locator('.svc-cases__grid a.case').first()).toHaveAttribute(
      'href',
      /\/cases\/signal-sigma$/,
    );
    await expect(page.locator('.step')).toHaveCount(4);
    await expect(page.locator('.step__head span').first()).toHaveText('01');

    // The other services are offered, not this one.
    const next = page.locator('.svc-next a.case');
    await expect(next).toHaveCount(2);
    await expect(next.filter({ hasText: 'SaaS, Web App, Software' })).toHaveCount(0);

    // The Services trigger of the menu stays marked while a service page is open.
    await expect(page.locator('.nav .nav__trigger.is-active')).toHaveCount(1);
  });

  test('Mobile and Web have their own texts and no founders; the partner logos scroll', async ({
    page,
  }) => {
    await page.goto('/services/mobile');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Mobile apps');
    await expect(page.locator('.founder')).toHaveCount(0);
    await expect(page.locator('.svc-cases__grid a.case')).toHaveCount(4);

    await page.goto('/services/web');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Websites');
    await expect(page.locator('.svc-cases__grid a.case')).toHaveCount(2);

    // The marquee moves once the page is hydrated (the logos repeat three times).
    const track = page.locator('.marquee__track');
    await expect(track.locator('img')).toHaveCount(72);
    await expect(track.locator('img[aria-hidden="true"]')).toHaveCount(48);
    await page.waitForLoadState('networkidle');
    await expect
      .poll(() => track.evaluate((element: HTMLElement) => element.style.transform))
      .toContain('translate3d');
  });

  test('"Got an Idea?" opens the booking panel', async ({ page }) => {
    await page.goto('/services/web');
    await page.waitForLoadState('networkidle');
    await page.locator('.git').getByRole('link', { name: 'Get in touch' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });
});
