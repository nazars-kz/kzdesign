import Link from 'next/link';
import type { ReactNode } from 'react';

import { localizeHref } from '@/core/i18n/href';

import { cx } from './cn';
import { LINK_CTA_CLASS, LinkCtaContent } from './link-cta-parts';

/**
 * Text link with the orange arrow circle ("See all cases"). On hover the circle
 * shrinks away and a line grows under the label. Dark bands recolor the label.
 * Internal content links get the locale prefix.
 */
export async function LinkCta({
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
  const classes = cx(LINK_CTA_CLASS, className);
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        <LinkCtaContent>{children}</LinkCtaContent>
      </a>
    );
  }
  return (
    <Link href={await localizeHref(href)} className={classes}>
      <LinkCtaContent>{children}</LinkCtaContent>
    </Link>
  );
}
