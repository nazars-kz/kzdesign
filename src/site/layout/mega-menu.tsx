'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { ResolvedImage } from '@/core/content/define';

import { cx } from '../components/ui/cn';
import { usePagePath } from '../components/ui/use-page-path';

/** The desktop nav collapses into the burger up to this width (px, = 68.75rem). */
const DESKTOP_QUERY = '(max-width: 1100px)';

interface MegaState {
  readonly open: string | null;
  readonly toggle: (name: string) => void;
}

const MegaContext = createContext<MegaState>({ open: null, toggle: () => undefined });

/**
 * State of the header's mega menus (Services and the “=” button): one panel at a time,
 * closed by a second click, a click outside, Esc, or a window narrower than the desktop
 * nav. While a panel is open the page under the header is dimmed.
 */
export function MegaProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = useCallback((name: string) => setOpen((now) => (now === name ? null : name)), []);
  const value = useMemo(() => ({ open, toggle }), [open, toggle]);

  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mega__panel') && !target.closest('[data-mega]')) setOpen(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(null);
      document.querySelector<HTMLElement>('[data-mega][aria-expanded="true"]')?.focus();
    };
    const query = window.matchMedia(DESKTOP_QUERY);
    const onResize = () => {
      if (query.matches) setOpen(null);
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    query.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
      query.removeEventListener('change', onResize);
    };
  }, [open]);

  return (
    <MegaContext.Provider value={value}>
      {children}
      <div className={cx('mega-dim', open && 'is-on')} aria-hidden="true" />
    </MegaContext.Provider>
  );
}

/** The "Services" button of the nav: opens the panel `name`. */
export function MegaTrigger({
  name,
  panelId,
  hrefs = [],
  children,
}: {
  name: string;
  panelId: string;
  /** Pages of the panel: the trigger is marked while one of them is open. */
  hrefs?: readonly string[];
  children: ReactNode;
}) {
  const { open, toggle } = useContext(MegaContext);
  const { isAt } = usePagePath();
  const expanded = open === name;
  const active = hrefs.some((href) => isAt(href));
  return (
    <button
      type="button"
      className={cx('nav__link nav__trigger text-nav', active && 'is-active')}
      data-mega={name}
      aria-expanded={expanded}
      aria-controls={panelId}
      onClick={() => toggle(name)}
    >
      {children}
      <i className="nav__chev" aria-hidden="true" />
    </button>
  );
}

/** A white panel of image cards under the header. */
export function MegaPanel({
  name,
  id,
  columns,
  children,
}: {
  name: string;
  id: string;
  columns: 3;
  children: ReactNode;
}) {
  const { open } = useContext(MegaContext);
  const isOpen = open === name;
  return (
    <div className={cx('mega', isOpen && 'is-open')} id={id} inert={!isOpen}>
      <div className="mx-auto w-full max-w-content px-gutter">
        <div className={cx('mega__panel', `mega__panel--${columns}`)}>{children}</div>
      </div>
    </div>
  );
}

/** One image card of a panel; the card of the current page gets a dot after its title. */
export function MegaCard({
  href,
  title,
  image,
}: {
  href: string;
  title: string;
  image: ResolvedImage | null;
}) {
  const { isAt } = usePagePath();
  return (
    <Link href={href} className="mega-card" aria-current={isAt(href) ? 'page' : undefined}>
      {image ? (
        <Image
          src={image.src}
          alt=""
          fill
          sizes="(min-width: 1101px) 33vw, 0px"
          placeholder={image.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={image.blurDataURL ?? undefined}
        />
      ) : null}
      <span className="mega-card__title">{title}</span>
      <span className="mega-card__go" aria-hidden="true" />
    </Link>
  );
}
