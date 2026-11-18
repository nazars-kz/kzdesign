'use client';

import { useEffect } from 'react';

/** The blocks that play their entrance when they scroll into view (see "Motion" in the CSS). */
const BLOCKS = [
  '.sigma-head',
  '.sigma-scene',
  '.sigma-quote',
  '.sigma-metrics',
  '.sigma-cards',
  '.sigma-wide',
  '.sigma-type',
  '.sigma-swatches',
  '.sigma-chat',
  '.sigma-metricsbox',
  '.sigma-journal__posts',
  '.sigma-results',
  '.sigma-team',
].join(',');

/** A block starts when its top passes this share of the viewport height (from the top). */
const TRIGGER = 0.88;

/**
 * Arms the scroll entrances of the Signal Sigma page. Without JavaScript, or with "reduce motion"
 * on, nothing is armed and the page is simply shown. Each block gets `sigma-r`; when it is in view
 * it gets `is-in` and the CSS plays the entrance of everything inside it. The position is read
 * from the layout on scroll (an IntersectionObserver misses blocks hidden by their own clip-path).
 */
export function SigmaMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sigma-case');
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const pending = new Set(root.querySelectorAll<HTMLElement>(BLOCKS));
    for (const block of pending) block.classList.add('sigma-r');

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

    root.classList.add('sigma-armed');
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();

    return () => {
      stop();
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove('sigma-armed');
      for (const block of root.querySelectorAll(BLOCKS)) block.classList.remove('sigma-r', 'is-in');
    };
  }, []);

  return null;
}
