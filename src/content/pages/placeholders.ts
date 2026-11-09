/**
 * Pages whose design or content is not delivered yet. Each one is a real page
 * (menu, SEO, admin editing) with a placeholder section; replace the entry with
 * a full definition when its page is built.
 */
import { definePlaceholderPage } from './placeholder';

export const privacyPage = definePlaceholderPage({
  id: 'privacy-policy',
  path: '/privacy-policy',
  label: 'Privacy Policy',
  title: 'Privacy Policy',
  description: 'Privacy Policy of K&Zh OÜ, the company behind K&Z Design.',
});

export const termsPage = definePlaceholderPage({
  id: 'terms-of-service',
  path: '/terms-of-service',
  label: 'Terms of Service',
  title: 'Terms of Service',
  description: 'Terms of Service of K&Zh OÜ, the company behind K&Z Design.',
});

export const refundPage = definePlaceholderPage({
  id: 'refund-policy',
  path: '/cancellation-and-refund-policy',
  label: 'Refund Policy',
  title: 'Cancellation and Refund Policy',
  description: 'Cancellation and Refund Policy of K&Zh OÜ, the company behind K&Z Design.',
});

export const placeholderPages = [privacyPage, termsPage, refundPage] as const;
