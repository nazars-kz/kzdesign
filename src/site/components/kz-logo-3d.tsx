'use client';

import { useEffect, useRef } from 'react';

import { loadScript, whenIdle } from './ui/load-script';

interface LogoHandle {
  destroy(): void;
}

declare global {
  interface Window {
    /** Set by /vendor/kz-logo-3d.js (needs three.js). */
    mountKzLogo?: (container: HTMLElement, options: Record<string, unknown>) => LogoHandle;
  }
}

const OPTIONS = {
  autoRotate: 0.6,
  followPointer: true,
  drag: true,
  clickSpin: true,
  float: true,
  shimmer: true,
  movingLights: true,
  glow: true,
} as const;

/**
 * The 3D K&Z logo of the About hero: spins slowly, follows the pointer, turns when dragged or
 * clicked. three.js (~650 KB) loads from /vendor after the page is idle, so it never delays the
 * first paint. Without WebGL, or if the scripts fail, the hero simply has no logo.
 */
export function KzLogo3D({ className }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = box.current;
    if (!element) return;
    let handle: LogoHandle | null = null;
    let cancelled = false;
    const cancelIdle = whenIdle(() => {
      loadScript('/vendor/three.min.js')
        .then(() => loadScript('/vendor/kz-logo-3d.js'))
        .then(() => {
          if (cancelled || !window.mountKzLogo) return;
          handle = window.mountKzLogo(element, OPTIONS);
        })
        .catch(() => {
          element.hidden = true;
        });
    });
    return () => {
      cancelled = true;
      cancelIdle();
      handle?.destroy();
    };
  }, []);

  return <div ref={box} className={className} />;
}
