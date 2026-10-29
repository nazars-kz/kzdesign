'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/** Footer menu link; the current page is orange and underlined. */
export function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className="footer__link"
      aria-current={pathname === href ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}
