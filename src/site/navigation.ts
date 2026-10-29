/**
 * PROJECT: header, mobile menu and footer navigation. Labels come from the
 * interface texts (src/site/messages: `nav`, `footer`); paths from the registry.
 */
import { registry } from '@/content';

export function pagePath(pageId: string): string {
  const page = registry.byId(pageId);
  if (!page) throw new Error(`Navigation refers to unknown page "${pageId}".`);
  return page.path;
}

/** `pageId` links to a registered page; `anchor` to a section of the home page. */
export interface NavTarget {
  readonly pageId?: string;
  readonly anchor?: string;
}

export interface NavItem extends NavTarget {
  readonly key: 'home' | 'services' | 'cases' | 'approach' | 'aboutUs' | 'reviews' | 'contactUs';
  /** The Services mega menu lists the items of the services collection. */
  readonly submenu?: 'services';
  /** Not in the desktop bar: it sits in the “=” menu (the burger and footer menus keep it). */
  readonly more?: true;
}

export const MAIN_NAV: readonly NavItem[] = [
  { key: 'home', pageId: 'home' },
  {
    key: 'services',
    pageId: 'home',
    anchor: 'services',
    submenu: 'services',
  },
  { key: 'cases', pageId: 'cases' },
  { key: 'approach', pageId: 'approach', more: true },
  { key: 'aboutUs', pageId: 'about', more: true },
  { key: 'reviews', pageId: 'reviews' },
  { key: 'contactUs', pageId: 'contact-us' },
];

export const LEGAL_NAV = [
  { key: 'privacy', pageId: 'privacy-policy' },
  { key: 'terms', pageId: 'terms-of-service' },
  { key: 'refund', pageId: 'refund-policy' },
] as const;
