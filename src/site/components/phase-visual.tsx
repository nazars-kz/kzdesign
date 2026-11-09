'use client';

import { useLottieHover } from './use-lottie-hover';

/** The dark box next to a phase of the process, with a Lottie animation that plays on hover. */
export function PhaseVisual({ src }: { src: string }) {
  const { host, box } = useLottieHover<HTMLDivElement>(src);
  return (
    <div ref={host} className="phase__visual">
      <div ref={box} aria-hidden="true" />
    </div>
  );
}
