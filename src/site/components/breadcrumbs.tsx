import { Fragment } from 'react';

import { cx } from './ui/cn';
import { ContentLink } from './ui/content-link';

export interface Crumb {
  label: string;
  /** Internal path; the last crumb (the current page) has none. */
  href?: string;
}

/**
 * Breadcrumbs: Home › Case studies › Onground. `hero` is the light trail over a hero picture,
 * `case` the orange one above a case title. The last item is the current page.
 */
export function Breadcrumbs({
  items,
  label,
  variant = 'hero',
  className,
}: {
  items: readonly Crumb[];
  /** Accessible name of the trail ("Breadcrumb"). */
  label: string;
  variant?: 'hero' | 'case';
  className?: string;
}) {
  return (
    <nav className={cx('crumbs', `crumbs--${variant}`, className)} aria-label={label}>
      <ol>
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <Fragment key={`${item.label}-${index}`}>
              <li aria-current={current ? 'page' : undefined}>
                {item.href && !current ? (
                  <ContentLink href={item.href}>{item.label}</ContentLink>
                ) : (
                  item.label
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
