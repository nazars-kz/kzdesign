import type { ReactNode } from 'react';

import { cx } from './ui/cn';
import { Eyebrow } from './ui/eyebrow';
import { Heading, type HeadingLevel } from './ui/typography';

/**
 * Eyebrow + section title. The gap between them is the `--section-header-gap`
 * custom property, set by the section that uses it (the design varies it per block).
 */
export function SectionHeader({
  eyebrow,
  title,
  level = 2,
  id,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  level?: HeadingLevel;
  /** id of the heading, for `aria-labelledby` of the section. */
  id?: string;
  className?: string;
}) {
  return (
    <div className={cx('section-header', className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading level={level} variant="section-title" id={id} className="section-header__title">
        {title}
      </Heading>
    </div>
  );
}
