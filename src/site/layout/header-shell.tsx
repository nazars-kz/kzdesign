'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

import { cx } from '../components/ui/cn';

/** Scroll distance after which the header becomes compact. */
const SCROLL_THRESHOLD = 4;
/** The nav collapses into the burger up to this width (px, = 68.75rem). */
const BURGER_QUERY = '(max-width: 1100px)';

/**
 * Interactive frame of the header: compact state after scrolling, burger and the
 * full-screen mobile menu. Everything inside is server-rendered content passed in.
 */
export function HeaderShell({
  logo,
  nav,
  cta,
  compactCta,
  menu,
  labels,
}: {
  logo: ReactNode;
  nav: ReactNode;
  cta: ReactNode;
  compactCta: ReactNode;
  menu: ReactNode;
  labels: { open: string; close: string };
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!open) return;
    const burgerQuery = window.matchMedia(BURGER_QUERY);
    const closeWhenWide = () => {
      if (!burgerQuery.matches) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        burger.current?.focus();
      }
    };
    burgerQuery.addEventListener('change', closeWhenWide);
    window.addEventListener('keydown', onKey);
    return () => {
      burgerQuery.removeEventListener('change', closeWhenWide);
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  return (
    <>
      <header className={cx('site-header', scrolled && 'is-scrolled')}>
        <div className="mx-auto w-full max-w-content px-gutter">
          <div className="site-header__inner">
            {logo}
            {nav}
            <div className="site-header__actions">
              {cta}
              {compactCta}
              <button
                ref={burger}
                type="button"
                className="burger"
                aria-label={open ? labels.close : labels.open}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((value) => !value)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div
        id="mobile-menu"
        className={cx('mobile-menu', open && 'is-open')}
        inert={!open}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest('a')) setOpen(false);
        }}
      >
        {menu}
      </div>
    </>
  );
}
