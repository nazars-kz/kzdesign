'use client';

import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react';

import { cx } from './ui/cn';

/** Shortest scroll thumb (px). */
const MIN_THUMB = 30;
/** Distance from the end (px) under which the text counts as scrolled to the end. */
const END_TOLERANCE = 2;

/**
 * A testimonial text that scrolls inside its card: custom scroll bar on the right
 * (orange on hover) and a fade at the bottom until the end is reached.
 */
export function QuoteScroll({ paragraphs }: { paragraphs: readonly string[] }) {
  const text = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ scrollable: false, end: false, height: 0, offset: 0 });

  const update = useCallback(() => {
    const element = text.current;
    if (!element) return;
    const { scrollHeight, clientHeight, scrollTop } = element;
    const scrollable = scrollHeight > clientHeight + END_TOLERANCE;
    if (!scrollable) {
      setState((previous) => (previous.scrollable ? { ...previous, scrollable: false } : previous));
      return;
    }
    const height = Math.max(MIN_THUMB, (clientHeight * clientHeight) / scrollHeight);
    setState({
      scrollable: true,
      end: scrollTop >= scrollHeight - clientHeight - END_TOLERANCE,
      height,
      offset: (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - height),
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('load', update);
    };
  }, [update]);

  return (
    <div
      className={cx('t-card__scroll', state.scrollable && 'is-scrollable', state.end && 'is-end')}
      style={
        {
          '--thumb-height': `${state.height}px`,
          '--thumb-offset': `${state.offset}px`,
        } as CSSProperties
      }
    >
      <div
        ref={text}
        className="t-card__text text-lead"
        tabIndex={state.scrollable ? 0 : undefined}
        onScroll={update}
      >
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <div className="t-card__bar" aria-hidden="true">
        <i />
      </div>
    </div>
  );
}
