import type { ReactNode } from 'react';

/** Classes of the arrow link; client components that cannot use `LinkCta` build the link with these. */
export const LINK_CTA_CLASS = 'link-cta text-button';

/** Label + the orange arrow circle (decorative). Client-safe: no server imports. */
export function LinkCtaContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="link-cta__text">{children}</span>
      <span className="link-cta__icon" aria-hidden="true" />
    </>
  );
}
