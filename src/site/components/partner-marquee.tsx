'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

import type { ResolvedImage } from '@/core/content/define';

/** How many times the logos repeat in the track (the track moves by one third, then jumps back). */
const COPIES = 3;
/** Scroll speed in px per second. */
const SPEED = 80;

/**
 * Partner logos scrolling left in an endless row. The set is repeated three times and the
 * track moves by one set, then jumps back, so the row never ends. Repeats are hidden from
 * screen readers; with "reduce motion" the row stands still. Without JavaScript it is a static row.
 */
export function PartnerMarquee({
  logos,
  label,
}: {
  logos: readonly ResolvedImage[];
  /** Accessible name of the row. */
  label: string;
}) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = track.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let offset = 0;
    let last: number | null = null;
    let frame = 0;
    const step = (time: number) => {
      if (last !== null) {
        const setWidth = element.scrollWidth / COPIES;
        offset -= (SPEED * (time - last)) / 1000;
        if (-offset >= setWidth) offset += setWidth;
        element.style.transform = `translate3d(${offset}px, 0, 0)`;
      }
      last = time;
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="marquee" role="group" aria-label={label}>
      <div ref={track} className="marquee__track">
        {Array.from({ length: COPIES }, (_, copy) =>
          logos.map((logo, index) => (
            <Image
              key={`${copy}-${index}`}
              src={logo.src}
              alt={copy === 0 ? logo.alt : ''}
              aria-hidden={copy === 0 ? undefined : true}
              width={200}
              height={94}
            />
          )),
        )}
      </div>
    </div>
  );
}
