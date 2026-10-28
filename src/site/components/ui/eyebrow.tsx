import type { ReactNode } from 'react';

import { cx } from './cn';

/** Small CAPS label above a section title, with the orange K&Z mark. Dark bands recolor it. */
export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cx('eyebrow text-overline', className)}>{children}</p>;
}
