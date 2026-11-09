'use client';

import type { ReactNode } from 'react';

import { useLottieHover } from './use-lottie-hover';

/**
 * A "What makes us different" card with a Lottie illustration: it plays to the middle on hover
 * (or once when scrolled into view on touch screens) and returns on mouse out.
 */
export function DiffCard({ src, children }: { src: string; children: ReactNode }) {
  const { host, box } = useLottieHover<HTMLElement>(src);
  return (
    <article ref={host} className="diff-card">
      <div ref={box} className="diff-card__anim" aria-hidden="true" />
      <div className="diff-card__text">{children}</div>
    </article>
  );
}
