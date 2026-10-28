import type { ReactNode } from 'react';

import { cx } from './cn';

/** Small CAPS tag on case cards. */
export function Tag({ className, children }: { className?: string; children: ReactNode }) {
  return <span className={cx('tag text-overline', className)}>{children}</span>;
}

/** A row of tags. */
export function TagList({ tags, className }: { tags: readonly string[]; className?: string }) {
  if (tags.length === 0) return null;
  return (
    <ul className={cx('tag-list', className)}>
      {tags.map((tag, index) => (
        <li key={`${tag}-${index}`}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
  );
}
