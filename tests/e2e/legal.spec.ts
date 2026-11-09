import { expect, test } from './support/test';

const PAGES = [
  { path: '/privacy-policy', title: 'Privacy Policy', footer: 'Privacy Policy' },
  { path: '/terms-of-service', title: 'Terms of Service', footer: 'Terms of Service' },
  {
    path: '/cancellation-and-refund-policy',
    title: 'Cancellation and Refund Policy',
    footer: 'Refund Policy',
  },
];

test.describe('legal pages', () => {
  for (const { path, title, footer } of PAGES) {
    test(`${path} has breadcrumbs and its title as the h1`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
      const crumbs = page.getByRole('navigation', { name: 'Breadcrumb' });
      await expect(crumbs.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
      await expect(crumbs.getByText(title, { exact: true })).toHaveAttribute(
        'aria-current',
        'page',
      );
      // The footer links to every legal page.
      await expect(page.locator('footer').getByRole('link', { name: footer })).toBeVisible();
    });
  }
});
