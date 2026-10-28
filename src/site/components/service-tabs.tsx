'use client';

import Link from 'next/link';
import { type ReactNode, useCallback, useEffect, useId, useState } from 'react';

import { cx } from './ui/cn';
import { LINK_CTA_CLASS, LinkCtaContent } from './ui/link-cta-parts';

/** Time a service stays open before the next one (ms); equals `--duration-autoplay` in tokens.css. */
const AUTOPLAY_MS = 10_000;

export interface ServiceTab {
  readonly key: string;
  /** Short name on the phone buttons. */
  readonly pill: string;
  readonly title: string;
  readonly text: string;
  readonly items: readonly string[];
  readonly href: string;
}

/**
 * "Our Services": tabs with an autoplay progress line (desktop) or pill buttons (phone),
 * the service text on the left and the numbered list on the right. Starts over on
 * any manual choice; autoplay is off for visitors who prefer reduced motion.
 */
export function ServiceTabs({
  services,
  eyebrow,
  learnMore,
  labels,
}: {
  services: readonly ServiceTab[];
  /** The label above the tabs, rendered on the server. */
  eyebrow: ReactNode;
  learnMore: string;
  labels: { tabs: string; previous: string; next: string };
}) {
  const base = useId();
  const [current, setCurrent] = useState(0);
  const [cycle, setCycle] = useState(0);
  const count = services.length;

  const show = useCallback(
    (index: number) => {
      setCurrent(((index % count) + count) % count);
      setCycle((value) => value + 1);
    },
    [count],
  );

  useEffect(() => {
    if (count < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => show(current + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [current, cycle, count, show]);

  const active = services[current];
  if (!active) return null;
  const tabId = (kind: string, key: string) => `${base}-${kind}-${key}`;
  const learnMoreLink = (
    <Link href={active.href} className={LINK_CTA_CLASS}>
      <LinkCtaContent>{learnMore}</LinkCtaContent>
    </Link>
  );

  return (
    <div className="services__inner">
      <div className="services__left">
        {eyebrow}

        <div className="services__pills" role="tablist" aria-label={labels.tabs}>
          {services.map((service, index) => (
            <button
              key={service.key}
              id={tabId('pill', service.key)}
              type="button"
              role="tab"
              aria-selected={index === current}
              aria-controls={tabId('text', service.key)}
              className={cx(index === current && 'is-active')}
              onClick={() => show(index)}
            >
              {service.pill}
            </button>
          ))}
        </div>

        {services.map((service, index) => (
          <div
            key={service.key}
            id={tabId('text', service.key)}
            role="tabpanel"
            aria-labelledby={tabId('tab', service.key)}
            className={cx('svc-text', index === current && 'is-active')}
          >
            <h2 className="services__title text-h2">{service.title}</h2>
            <p className="services__desc text-lead">{service.text}</p>
          </div>
        ))}

        <div className="services__arrows">
          <button
            type="button"
            className="round-btn round-btn--prev"
            aria-label={labels.previous}
            onClick={() => show(current - 1)}
          />
          <button
            type="button"
            className="round-btn round-btn--next"
            aria-label={labels.next}
            onClick={() => show(current + 1)}
          />
        </div>
        <div className="services__tabs" role="tablist" aria-label={labels.tabs}>
          {services.map((service, index) => (
            <button
              key={service.key}
              id={tabId('tab', service.key)}
              type="button"
              role="tab"
              aria-selected={index === current}
              aria-controls={tabId('text', service.key)}
              className={cx('services__tab text-body-sm', index === current && 'is-active')}
              onClick={() => show(index)}
            >
              {service.title}
              {index === current ? <span key={cycle} className="services__progress" /> : null}
            </button>
          ))}
        </div>
        <div className="services__more services__more--desk">{learnMoreLink}</div>
      </div>

      <div className="services__items">
        {services.map((service, index) => (
          <ol
            key={service.key}
            className={cx('svc-panel', index === current && 'is-active')}
            aria-hidden={index !== current}
          >
            {service.items.map((item, position) => (
              <li key={`${item}-${position}`} className="svc-item">
                <span className="svc-item__n">{String(position + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ol>
        ))}
      </div>

      <div className="services__more services__more--mob">{learnMoreLink}</div>
    </div>
  );
}
