'use client';

import { type KeyboardEvent, useEffect, useRef, useState } from 'react';

import type { ResolvedImage } from '@/core/content/define';

import { CaseCard } from './case-card';
import { cx } from './ui/cn';

export interface CaseListItem {
  slug: string;
  href: string;
  title: string;
  description: string;
  tags: readonly string[];
  /** Filters (category values) the case belongs to. */
  categories: readonly string[];
  cover: ResolvedImage | null;
  coverMobile: ResolvedImage | null;
}

export interface CaseFilter {
  value: string;
  label: string;
}

export interface CasesBrowserLabels {
  /** Name of the filters (read by screen readers). */
  filters: string;
  /** Name of the phone drop-down. */
  category: string;
  /** The filter that shows every case. */
  all: string;
  /** "{count} case" / "{count} cases". */
  countOne: string;
  countMany: string;
}

/** Value of the "All" filter; category values are never empty, so it cannot clash with one. */
const ALL = '';
/** Space kept between the sticky bar and the top of the list after a filter is chosen (px). */
const LIST_GAP = 16;

function formatCount(template: string, count: number): string {
  return template.replace('{count}', String(count));
}

/**
 * The Cases list with its filters: pills on wide screens, a drop-down with the number of
 * cases per category on phones. One filter is active; "All" shows every case. The bar stays
 * under the header while the list scrolls. Every case is in the server HTML, so the page
 * works (and is indexed) without JavaScript; filtering only hides cards.
 */
export function CasesBrowser({
  items,
  filters,
  labels,
}: {
  items: readonly CaseListItem[];
  filters: readonly CaseFilter[];
  labels: CasesBrowserLabels;
}) {
  const [active, setActive] = useState(ALL);
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const select = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const options = useRef<(HTMLLIElement | null)[]>([]);

  const entries: readonly CaseFilter[] = [{ value: ALL, label: labels.all }, ...filters];
  const countOf = (value: string) =>
    value === ALL ? items.length : items.filter((item) => item.categories.includes(value)).length;
  const activeLabel = entries.find((entry) => entry.value === active)?.label ?? labels.all;

  // The hairline under the bar shows once the bar sits under the header with the list behind it.
  useEffect(() => {
    const update = () => {
      const element = bar.current;
      const items = list.current;
      if (!element || !items) return;
      const top = parseFloat(getComputedStyle(element).top) || 0;
      setStuck(
        element.getBoundingClientRect().top <= top + 1 &&
          items.getBoundingClientRect().top < top + element.offsetHeight + 1,
      );
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // A drop-down closes on an outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (select.current && !select.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener('click', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const choose = (value: string) => {
    setActive(value);
    setOpen(false);
    // With the bar stuck, bring the start of the list back under it.
    const element = bar.current;
    const items = list.current;
    if (!stuck || !element || !items) return;
    const top = parseFloat(getComputedStyle(element).top) || 0;
    window.scrollTo({
      top:
        items.getBoundingClientRect().top + window.scrollY - top - element.offsetHeight - LIST_GAP,
      behavior: 'smooth',
    });
  };

  const focusOption = (index: number) => options.current[index]?.focus();
  const onOptionKey = (event: KeyboardEvent<HTMLLIElement>, index: number, value: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      choose(value);
      button.current?.focus({ preventScroll: true });
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusOption(Math.min(index + 1, entries.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusOption(Math.max(index - 1, 0));
    }
  };
  const onButtonKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowDown') return;
    event.preventDefault();
    setOpen(true);
    const index = Math.max(
      entries.findIndex((entry) => entry.value === active),
      0,
    );
    // The list is visible only after this render; focus the chosen option then.
    requestAnimationFrame(() => focusOption(index));
  };

  return (
    <>
      <div ref={bar} className={cx('cs-bar', stuck && 'is-stuck')}>
        <div ref={select} className={cx('cs-select', open && 'is-open')}>
          <button
            ref={button}
            type="button"
            className="cs-select__btn"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={labels.filters}
            onClick={() => setOpen((value) => !value)}
            onKeyDown={onButtonKey}
          >
            <span>{activeLabel}</span>
            <i className="cs-select__chev" aria-hidden="true" />
          </button>
          <ul className="cs-select__list" role="listbox" aria-label={labels.category}>
            {entries.map((entry, index) => {
              const count = countOf(entry.value);
              return (
                <li
                  key={entry.value}
                  ref={(element) => {
                    options.current[index] = element;
                  }}
                  role="option"
                  tabIndex={-1}
                  aria-selected={entry.value === active}
                  onClick={() => choose(entry.value)}
                  onKeyDown={(event) => onOptionKey(event, index, entry.value)}
                >
                  <span>{entry.label}</span>
                  <span className="cs-select__n">
                    {formatCount(count === 1 ? labels.countOne : labels.countMany, count)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="cs-filters" role="group" aria-label={labels.filters}>
          {entries.map((entry) => (
            <button
              key={entry.value}
              type="button"
              className={cx('pill', entry.value === active && 'is-active')}
              aria-pressed={entry.value === active}
              onClick={() => choose(entry.value)}
            >
              {entry.label}
            </button>
          ))}
        </div>
      </div>
      <ul ref={list} className="cases__list cs-list__items">
        {items.map((item) => (
          <li key={item.slug} hidden={active !== ALL && !item.categories.includes(active)}>
            <CaseCard
              href={item.href}
              title={item.title}
              description={item.description}
              tags={item.tags}
              cover={item.cover}
              coverMobile={item.coverMobile}
              headingLevel={2}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
