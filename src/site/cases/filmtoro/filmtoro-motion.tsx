'use client';

import { useEffect } from 'react';

/** The slides play their entrance when they scroll into view (see "Motion" in the CSS). */
const BLOCKS = '.filmtoro-slide:not(.filmtoro-hero)';

/** A block starts when its top passes this share of the viewport height (from the top). */
const TRIGGER = 0.88;

/**
 * Arms the scroll entrances of the Filmtoro page. Without JavaScript, or with "reduce motion" on,
 * nothing is armed and the page is simply shown. Each block gets `filmtoro-r`; when it is in view
 * it gets `is-in` and the CSS plays the entrance of everything inside it. The position is read
 * from the layout on scroll (an IntersectionObserver misses blocks hidden by their own clip-path).
 */
export function FilmtoroMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.filmtoro-case');
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const pending = new Set(root.querySelectorAll<HTMLElement>(BLOCKS));
    for (const block of pending) block.classList.add('filmtoro-r');

    let frame = 0;
    const check = () => {
      frame = 0;
      const limit = window.innerHeight * TRIGGER;
      for (const block of pending) {
        const { top, bottom } = block.getBoundingClientRect();
        if (top < limit && bottom > 0) {
          block.classList.add('is-in');
          pending.delete(block);
        }
      }
      if (pending.size === 0) stop();
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };
    const stop = () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };

    root.classList.add('filmtoro-armed');
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();

    return () => {
      stop();
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove('filmtoro-armed');
      for (const block of root.querySelectorAll(BLOCKS))
        block.classList.remove('filmtoro-r', 'is-in');
    };
  }, []);

  return null;
}
