'use client';

import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { Container } from './ui/layout';
import { RoundButton } from './ui/round-button';

/** Distance (px) the slider may be off its ends and still count as at the end. */
const END_TOLERANCE = 2;
/** Gap between the cards (px); equals the CSS value. */
const CARD_GAP = 10;

/**
 * The testimonials slider: a horizontally scrolling track of cards with previous and
 * next buttons (disabled at the ends). The heading and the footer are server-rendered
 * slots; the buttons exist twice (next to the heading on desktop, under the cards on phones).
 */
export function TestimonialSlider({
  heading,
  footer,
  labels,
  children,
}: {
  heading: ReactNode;
  footer: ReactNode;
  labels: { previous: string; next: string; region: string };
  children: ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const element = track.current;
    if (!element) return;
    setCanPrevious(element.scrollLeft > END_TOLERANCE);
    setCanNext(element.scrollLeft < element.scrollWidth - element.clientWidth - END_TOLERANCE);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const move = (direction: 1 | -1) => {
    const element = track.current;
    const card = element?.firstElementChild;
    if (!element || !(card instanceof HTMLElement)) return;
    element.scrollBy({ left: direction * (card.offsetWidth + CARD_GAP), behavior: 'smooth' });
  };

  const buttons = (
    <>
      <RoundButton
        direction="prev"
        label={labels.previous}
        disabled={!canPrevious}
        onClick={() => move(-1)}
      />
      <RoundButton
        direction="next"
        label={labels.next}
        disabled={!canNext}
        onClick={() => move(1)}
      />
    </>
  );

  return (
    <>
      <Container className="testi__head">
        <div>{heading}</div>
        <div className="testi__nav">{buttons}</div>
      </Container>

      <div className="testi__viewport">
        <div
          ref={track}
          className="testi__track"
          role="region"
          aria-label={labels.region}
          onScroll={update}
        >
          {children}
        </div>
        <div className="testi__fade-l" />
        <div className="testi__fade-r" />
      </div>

      <Container>
        <div className="testi__mnav">{buttons}</div>
        {footer}
      </Container>
    </>
  );
}
