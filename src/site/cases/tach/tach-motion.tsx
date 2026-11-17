'use client';

import { useEffect } from 'react';

/** The blocks that play their entrance when they scroll into view (see "Motion" in case-tach.css). */
const BLOCKS = [
  '.tach-tile',
  '.tach-chapter',
  '.tach-overview',
  '.tach-workflow',
  '.tach-logogrid',
  '.tach-swatches',
  '.tach-outro__lines',
  '.tach-team',
].join(',');

/** A block starts when its top passes this share of the viewport height (from the top). */
const TRIGGER = 0.9;

/**
 * Arms the scroll entrances of the Tach page. Without JavaScript, or with "reduce motion" on,
 * nothing is armed and the page is simply shown. Each block gets `tach-r`; when it is in view it
 * gets `is-in` and the CSS plays the entrance of everything inside it.
 *
 * The position is read from the layout (not from an IntersectionObserver): a block that is hidden
 * by its own clip-path would never count as visible to an observer.
 */
export function TachMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.tach-case');
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const pending = new Set(root.querySelectorAll<HTMLElement>(BLOCKS));
    for (const block of pending) block.classList.add('tach-r');

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

    root.classList.add('tach-armed');
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();

    return () => {
      stop();
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove('tach-armed');
      for (const block of root.querySelectorAll(BLOCKS)) block.classList.remove('tach-r', 'is-in');
    };
  }, []);

  return null;
}
