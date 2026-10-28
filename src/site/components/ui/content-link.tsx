import Link from 'next/link';
import type { ReactNode } from 'react';

import { localizeHref } from '@/core/i18n/href';

/**
 * A link from the content (a `f.link` value or a case address): internal paths get
 * the locale prefix, external addresses open in a new tab safely.
 */
export async function ContentLink({
  href,
  external = false,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={await localizeHref(href)} className={className}>
      {children}
    </Link>
  );
}

/** Address of a case study page from its slug (the editors type only the end of it). */
export function caseHref(slug: string): string {
  return `/cases/${slug.replace(/^\/+|\/+$/g, '')}`;
}
