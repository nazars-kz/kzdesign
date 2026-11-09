'use client';

import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { Container } from './ui/layout';
import { RoundButton } from './ui/round-button';

/** Distance (px) the track may be off its ends and still count as at the end. */
const END_TOLERANCE = 2;
/** Gap between the cards (px); equals the CSS value. */
const CARD_GAP = 20;

/**
 * "Other case studies": a horizontally scrolling track of case cards. The arrows scroll by one
 * card and are disabled at the ends; on phones the cards are swiped and the arrows are hidden.
 * The heading and the cards are server-rendered slots.
 */
export function CaseSlider({
  heading,
  labels,
  children,
}: {
  heading: ReactNode;
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

  return (
    <>
      <Container className="cother__head">
        <div>{heading}</div>
        <div className="cother__nav">
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
        </div>
      </Container>
      <div
        ref={track}
        className="cother__track"
        onScroll={update}
        role="region"
        aria-label={labels.region}
      >
        {children}
      </div>
    </>
  );
}
