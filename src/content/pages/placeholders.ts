/**
 * Pages whose design or content is not delivered yet. Each one is a real page
 * (menu, SEO, admin editing) with a placeholder section; replace the entry with
 * a full definition when its page is built.
 */
import { definePlaceholderPage } from './placeholder';

export const aboutPage = definePlaceholderPage({
  id: 'about',
  path: '/about-us',
  label: 'About us',
  title: 'About us',
  description:
    'Meet K&Z Design: a product design team of UX/UI designers who partner with digital product businesses to grow and retain clients.',
});

export const approachPage = definePlaceholderPage({
  id: 'approach',
  path: '/approach',
  label: 'Our approach',
  title: 'Our approach',
  description:
    'How K&Z Design works: a business-first approach to UX/UI design with discovery, strategy, design and prototyping.',
});

export const reviewsPage = definePlaceholderPage({
  id: 'reviews',
  path: '/reviews',
  label: 'Reviews',
  title: 'Reviews',
  description:
    'What our partners say about working with K&Z Design, including reviews from Clutch.',
});

export const contactUsPage = definePlaceholderPage({
  id: 'contact-us',
  path: '/contact-us',
  label: 'Contact us',
  title: 'Contact us',
  description:
    'Contact K&Z Design: no calls with sales, talk to our CEO about your product design needs.',
});

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

export const servicesPage = definePlaceholderPage({
  id: 'services',
  path: '/services',
  label: 'Services',
  title: 'Services',
  description:
    'UX/UI design services of K&Z Design: SaaS web apps, mobile apps and websites for digital product businesses.',
});

export const placeholderPages = [
  aboutPage,
  approachPage,
  reviewsPage,
  contactUsPage,
  privacyPage,
  termsPage,
  refundPage,
  servicesPage,
] as const;
