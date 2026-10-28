'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { cx } from './ui/cn';

/** Menu link; marks the current page with `aria-current` (the underline stays). */
export function NavLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [path = '/'] = href.split('#');
  const current = !href.includes('#') && pathname === path;
  return (
    <Link
      href={href}
      className={cx('nav__link text-nav', className)}
      aria-current={current ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}
