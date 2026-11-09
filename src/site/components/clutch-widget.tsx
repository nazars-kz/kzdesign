'use client';

import { useEffect, useRef } from 'react';

import { tokens } from '../theme/tokens.generated';
import { loadScript } from './ui/load-script';

const WIDGET_ORIGIN = 'https://widget.clutch.co';

declare global {
  interface Window {
    /** Set by the Clutch widget script. */
    CLUTCHCO?: { Init?: () => void };
  }
}

/**
 * The Clutch reviews widget (all reviews of our profile). Clutch's script finds the
 * `.clutch-widget` element and fills it with an iframe; it is loaded only on this page.
 * The origin must be allowed in `csp` of project.config.ts.
 */
export function ClutchWidget({ companyId, className }: { companyId: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = box.current;
    if (!element) return;
    let cancelled = false;
    loadScript(`${WIDGET_ORIGIN}/static/js/widget.js`)
      .then(() => {
        if (!cancelled) window.CLUTCHCO?.Init?.();
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
      element.replaceChildren();
    };
  }, [companyId]);

  return (
    <div
      ref={box}
      className={`clutch-widget ${className ?? ''}`.trim()}
      data-url={WIDGET_ORIGIN}
      data-widget-type="5"
      data-height="auto"
      data-nofollow="true"
      data-expandifr="true"
      data-scale="100"
      data-header-color={tokens.color.ink950}
      data-footer-color={tokens.color.ink950}
      data-primary-color={tokens.color.orange500}
      data-secondary-color={tokens.color.orange500}
      data-clutchcompany-id={companyId}
    />
  );
}
