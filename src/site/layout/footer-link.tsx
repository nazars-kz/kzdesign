'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import { usePagePath } from '../components/ui/use-page-path';

/** Footer menu link; the current page is orange and underlined. */
export function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const { isAt } = usePagePath();
  return (
    <Link href={href} className="footer__link" aria-current={isAt(href) ? 'page' : undefined}>
      {children}
    </Link>
  );
}
