import Link from 'next/link';
import type { ReactNode } from 'react';

import { localizeHref } from '@/core/i18n/href';

import { ButtonArrow } from './button-arrow';
import { buttonClasses, type ButtonSize, type ButtonVariant } from './button-styles';

export type { ButtonSize, ButtonVariant } from './button-styles';

/** Native button (form submits, actions) with the shared button styles. */
export function Button({
  type = 'button',
  variant = 'primary',
  size,
  disabled,
  className,
  children,
}: {
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type={type} disabled={disabled} className={buttonClasses(variant, className, { size })}>
      {children}
      <ButtonArrow />
    </button>
  );
}

/** Link styled as a button. Internal links get the locale prefix; external links open safely. */
export async function ButtonLink({
  href,
  external = false,
  variant = 'primary',
  size,
  drawer,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Opens the contact panel on that tab (the link stays as the no-JavaScript fallback). */
  drawer?: 'book' | 'message';
  className?: string;
  children: ReactNode;
}) {
  const classes = buttonClasses(variant, className, { size });
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
        <ButtonArrow />
      </a>
    );
  }
  return (
    <Link
      href={await localizeHref(href)}
      className={classes}
      data-drawer={drawer}
      aria-haspopup={drawer ? 'dialog' : undefined}
    >
      {children}
      <ButtonArrow />
    </Link>
  );
}
