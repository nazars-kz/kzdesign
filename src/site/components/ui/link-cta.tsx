import Link from 'next/link';
import type { ReactNode } from 'react';

import { localizeHref } from '@/core/i18n/href';

import { cx } from './cn';

/**
 * Text link with the orange arrow circle ("See all cases"). On hover the circle
 * shrinks away and a line grows under the label. Dark bands recolor the label.
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
  const classes = cx('link-cta text-button', className);
  const content = (
    <>
      <span>{children}</span>
      <span className="link-cta__icon" aria-hidden="true" />
    </>
  );
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={await localizeHref(href)} className={classes}>
      {content}
    </Link>
  );
}
