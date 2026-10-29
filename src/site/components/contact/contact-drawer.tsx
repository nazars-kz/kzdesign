'use client';

/**
 * The slide-in contact panel: opens from every element with `data-drawer` ("book" | "message",
 * the link's own href stays as the no-JavaScript fallback). Focus is trapped inside while it
 * is open, Esc / the overlay / × close it, the page does not scroll under it and focus
 * returns to the button. The form state is mounted on the first opening only.
 */
import { useEffect, useRef, useState } from 'react';

import { cx } from '../ui/cn';
import { ContactPanel, type ContactPanelProps, type PanelTab } from './contact-panel';

/** The close animation of the panel (matches `--dw-dur-xslow`). */
const CLOSE_MS = 600;
const FOCUSABLE =
  '.dw__panel button, .dw__panel a[href], .dw__panel input, .dw__panel select, .dw__panel textarea';

export function ContactDrawer(
  props: Omit<ContactPanelProps, 'mode' | 'tab' | 'onTabChange' | 'onClose'>,
) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<PanelTab>('book');
  const root = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const openDrawer = (name: PanelTab) => {
    window.clearTimeout(closeTimer.current);
    lastFocus.current = document.activeElement as HTMLElement | null;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.classList.add('dw-lock');
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    document.body.classList.remove('menu-open');
    setTab(name);
    setMounted(true);
    setClosing(false);
    setOpen(true);
    window.setTimeout(() => {
      const selected = root.current?.querySelector<HTMLElement>('.dw__tab[aria-selected="true"]');
      (selected ?? root.current?.querySelector<HTMLElement>('.dw__panel'))?.focus({
        preventScroll: true,
      });
    }, 50);
  };

  const closeDrawer = () => {
    setOpen(false);
    setClosing(true);
    closeTimer.current = window.setTimeout(() => {
      setClosing(false);
      document.documentElement.classList.remove('dw-lock');
      document.body.style.paddingRight = '';
    }, CLOSE_MS);
    lastFocus.current?.focus({ preventScroll: true });
  };

  // Any [data-drawer] element opens the panel (the buttons are server-rendered links).
  const openRef = useRef(openDrawer);
  const closeRef = useRef(closeDrawer);
  useEffect(() => {
    openRef.current = openDrawer;
    closeRef.current = closeDrawer;
  });
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as Element).closest<HTMLElement>('[data-drawer]');
      if (!trigger || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey) return;
      // capture phase: runs before the router's own link handler
      event.preventDefault();
      event.stopPropagation();
      openRef.current(trigger.dataset.drawer === 'message' ? 'message' : 'book');
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = Array.from(root.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
        (el) => !(el as HTMLButtonElement).disabled && el.offsetParent !== null,
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div
      ref={root}
      id="contact-drawer"
      className={cx('dw', open && 'is-open', closing && 'is-closing')}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="dw__overlay" onClick={closeDrawer} />
      {mounted ? (
        <ContactPanel
          {...props}
          mode="drawer"
          tab={tab}
          onTabChange={setTab}
          onClose={closeDrawer}
        />
      ) : null}
    </div>
  );
}
