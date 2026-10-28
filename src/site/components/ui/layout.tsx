import type { ReactNode } from 'react';

import { cx } from './cn';

/** Horizontal container: max width and page margin come from tokens. */
export function Container({
  width = 'content',
  className,
  children,
}: {
  width?: 'content' | 'wide' | 'prose';
  className?: string;
  children: ReactNode;
}) {
  const widthClass = { content: 'max-w-content', wide: 'max-w-wide', prose: 'max-w-prose' }[width];
  return <div className={cx('mx-auto w-full px-gutter', widthClass, className)}>{children}</div>;
}

/** Vertical rhythm + surface for a page section. `inverse` is a dark band (`on-dark`). */
export function Section({
  tone = 'default',
  spacing = 'default',
  labelledBy,
  id,
  className,
  children,
}: {
  tone?: 'default' | 'surface' | 'inverse';
  spacing?: 'default' | 'tight' | 'none';
  /** id of the section heading (accessible name). */
  labelledBy?: string;
  /** Anchor target (e.g. `services`). */
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const toneClass = {
    default: 'bg-background text-foreground',
    surface: 'bg-surface text-foreground',
    inverse: 'on-dark',
  }[tone];
  const spacingClass = { default: 'py-section', tight: 'py-section-tight', none: '' }[spacing];
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx(toneClass, spacingClass, className)}
    >
      {children}
    </section>
  );
}
