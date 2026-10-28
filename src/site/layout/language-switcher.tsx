'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type KeyboardEvent, useEffect, useId, useRef, useState } from 'react';

import { localizedPath, splitLocale } from '@/core/i18n/routing';

import { cx } from '../components/ui/cn';

export interface SwitcherLocale {
  readonly code: string;
  readonly label: string;
}

/**
 * Links to the current page in every published language: a drop-down with the native
 * names. Renders nothing while the site has one language (it is English only today;
 * editors can add languages in Settings → General).
 */
export function LanguageSwitcher({
  locales,
  current,
  defaultLocale,
  label,
}: {
  locales: readonly SwitcherLocale[];
  current: string;
  defaultLocale: string;
  label: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  if (locales.length < 2) return null;
  const { rest } = splitLocale(
    pathname,
    locales.map((locale) => locale.code),
  );
  const active = locales.find((locale) => locale.code === current);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      trigger.current?.focus();
      return;
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    if (!open) {
      setOpen(true);
      return;
    }
    const links = Array.from(root.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []);
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    const step = event.key === 'ArrowDown' ? 1 : -1;
    links[(index + step + links.length) % links.length]?.focus();
  };

  return (
    <div ref={root} className="lang" onKeyDown={onKeyDown}>
      <button
        ref={trigger}
        type="button"
        className="lang__button text-nav"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${label}: ${active?.label ?? current}`}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">{current}</span>
        <i className="lang__chev" aria-hidden="true" />
      </button>
      {open ? (
        <ul id={listId} aria-label={label} className="lang__list">
          {locales.map((locale) => {
            const isCurrent = locale.code === current;
            return (
              <li key={locale.code}>
                <Link
                  href={localizedPath(rest, locale.code, defaultLocale)}
                  hrefLang={locale.code}
                  lang={locale.code}
                  aria-current={isCurrent ? 'true' : undefined}
                  prefetch={false}
                  className={cx('lang__item text-nav', isCurrent && 'is-current')}
                  onClick={() => setOpen(false)}
                >
                  {locale.label}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
