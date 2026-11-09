'use client';

import { usePathname } from 'next/navigation';

/** A leading language segment such as `en` or `uk`, optionally with a region (no page of this site has a path like that). */
const LOCALE_SEGMENT = /^\/[a-z]{2}(?:-[A-Za-z]{2,4})?(?=\/|$)/;

/** A path without its locale prefix (`/en/cases` → `/cases`, `/en` → `/`). */
function withoutLocale(path: string): string {
  return path.replace(LOCALE_SEGMENT, '') || '/';
}

/**
 * Tells whether a menu link points at the page being shown (or at the section the page is in).
 * The router may report the internal path with the locale (`/en/cases/x`, from the proxy rewrite
 * of the production build) or the address bar's path, and the link may be prefixed too, so both
 * are compared without the locale.
 */
export function usePagePath(): {
  /** The page is at `href` (or, with `section`, below it). */
  isAt: (href: string, section?: boolean) => boolean;
} {
  const current = withoutLocale(usePathname());
  return {
    isAt: (href, section = false) => {
      const target = withoutLocale(href);
      return current === target || (section && target !== '/' && current.startsWith(`${target}/`));
    },
  };
}
