'use client';

import { type ReactNode, useEffect, useRef } from 'react';

import { loadScript, whenIdle } from './ui/load-script';

interface LottieAnimation {
  totalFrames: number;
  addEventListener(name: 'DOMLoaded', callback: () => void): void;
  goToAndStop(value: number, isFrame: boolean): void;
  destroy(): void;
}

declare global {
  interface Window {
    /** Set by /vendor/lottie_svg.min.js. */
    lottie?: {
      loadAnimation(options: Record<string, unknown>): LottieAnimation;
    };
  }
}

/** The animation plays up to this share of its length on hover. */
const HOVER_POSITION = 0.5;
/** Duration of the move (ms). */
const TWEEN_MS = 500;

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/**
 * A "What makes us different" card with a Lottie illustration. The illustration rests on its
 * first frame, plays to the middle on hover and returns on mouse out; on touch screens it plays
 * once when the card scrolls into view. The Lottie player loads after the page is idle.
 */
export function DiffCard({ src, children }: { src: string; children: ReactNode }) {
  const card = useRef<HTMLElement>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = card.current;
    const boxElement = box.current;
    if (!cardElement || !boxElement) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;
    let animation: LottieAnimation | null = null;
    let ready = false;
    let position = 0;
    let frame = 0;
    let observer: IntersectionObserver | null = null;
    let cancelled = false;

    const tweenTo = (target: number) => {
      if (!ready || !animation) return;
      const player = animation;
      cancelAnimationFrame(frame);
      const from = position;
      const total = player.totalFrames - 1;
      const duration = reduce ? 0 : TWEEN_MS;
      let start: number | null = null;
      const step = (time: number) => {
        start ??= time;
        const t = duration ? Math.min(1, (time - start) / duration) : 1;
        position = from + (target - from) * ease(t);
        player.goToAndStop(position * total, true);
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };
    const onEnter = () => tweenTo(HOVER_POSITION);
    const onLeave = () => tweenTo(0);

    const cancelIdle = whenIdle(() => {
      loadScript('/vendor/lottie_svg.min.js')
        .then(() => {
          if (cancelled || !window.lottie) return;
          animation = window.lottie.loadAnimation({
            container: boxElement,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: src,
            rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
          });
          animation.addEventListener('DOMLoaded', () => {
            ready = true;
            animation?.goToAndStop(0, true);
          });
          if (canHover) {
            cardElement.addEventListener('mouseenter', onEnter);
            cardElement.addEventListener('mouseleave', onLeave);
          } else if ('IntersectionObserver' in window) {
            observer = new IntersectionObserver(
              (entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) return;
                observer?.disconnect();
                const play = () => (ready ? tweenTo(HOVER_POSITION) : window.setTimeout(play, 200));
                play();
              },
              { threshold: 0.5 },
            );
            observer.observe(cardElement);
          }
        })
        .catch(() => undefined);
    });

    return () => {
      cancelled = true;
      cancelIdle();
      cancelAnimationFrame(frame);
      observer?.disconnect();
      cardElement.removeEventListener('mouseenter', onEnter);
      cardElement.removeEventListener('mouseleave', onLeave);
      animation?.destroy();
    };
  }, [src]);

  return (
    <article ref={card} className="diff-card">
      <div ref={box} className="diff-card__anim" aria-hidden="true" />
      <div className="diff-card__text">{children}</div>
    </article>
  );
}
