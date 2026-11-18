/**
 * Small building blocks of the Touren case page: text helpers (rows and highlighted words), the
 * block head (round icon, label, title), the lead with its side note and tags, and the icons.
 */
import { type CSSProperties, Fragment, type ReactNode } from 'react';

import type { PageViewProps } from '@/core/content/page-route';

import { cx } from '../../components/ui/cn';

export type TourenContent = PageViewProps<'case-touren'>['content'];

/** Inline style that only sets CSS custom properties (the token rule allows nothing else). */
export const cssVars = (vars: Record<`--${string}`, string | number>) => vars as CSSProperties;

/** Number of words of a text (asterisks are not words): the next row of a title starts after it. */
const countWords = (text: string) => text.replace(/\*/g, '').split(/\s+/).filter(Boolean).length;

/**
 * "Plain *highlighted* text": the words between asterisks get the accent (the olive gradient, or
 * white on dark). Every word sits in a clipping mask with its index (`--touren-w`), so the page can
 * slide the words up one after another.
 */
export function Accent({ text, start = 0 }: { text: string; start?: number }) {
  let index = start;
  return text.split('*').map((part, partIndex) => {
    const words = part.split(/(\s+)/).map((token, tokenIndex) => {
      if (token === '' || /^\s+$/.test(token)) return token;
      const word = index;
      index += 1;
      return (
        <span key={`${tokenIndex}-${token}`} className="touren-w">
          <span className="touren-w__in" style={cssVars({ '--touren-w': word })}>
            {token}
          </span>
        </span>
      );
    });
    return partIndex % 2 === 1 ? (
      <em key={`${partIndex}-${part}`} className="touren-accent">
        {words}
      </em>
    ) : (
      <Fragment key={`${partIndex}-${part}`}>{words}</Fragment>
    );
  });
}

/** A title written on several lines: every line is a row of its own (the word index runs on). */
export function Rows({ text }: { text: string }) {
  let start = 0;
  return text.split('\n').map((row, index) => {
    const node = (
      <span key={`${index}-${row}`} className="touren-row">
        <Accent text={row} start={start} />
      </span>
    );
    start += countWords(row);
    return node;
  });
}

/** Plain text with a line break for every new line of the field. */
export function Lines({ text }: { text: string }) {
  return text.split('\n').map((line, index) => (
    <span key={`${index}-${line}`} className="touren-row">
      {line}
    </span>
  ));
}

/** The comma-separated items of a text field. */
export const splitList = (text: string) =>
  text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

type IconName = NonNullable<TourenContent['home']['icon']>;

/** The outline icons of the round badges (24 × 24, drawn with the current color). */
const ICON_PATHS: Record<IconName, ReactNode> = {
  gear: (
    <>
      <path d="M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4z" />
      <circle cx="12" cy="12" r="3.2" />
    </>
  ),
  puzzle: (
    <path d="M9 4.5a2 2 0 0 1 4 0V6h3.5a1 1 0 0 1 1 1v3.5H19a2 2 0 0 1 0 4h-1.5V18a1 1 0 0 1-1 1H13v-1.5a2 2 0 0 0-4 0V19H5.5a1 1 0 0 1-1-1v-3.5H6a2 2 0 0 0 0-4H4.5V7a1 1 0 0 1 1-1H9z" />
  ),
  chart: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="m7 15 3.5-4 3 2.5L17 9" />
    </>
  ),
  bars: <path d="M5 20V11M12 20V4M19 20v-6M3 20h18" />,
  bolt: <path d="M13.5 2.5 5 13.5h6.5l-1 8 8.5-11h-6.5z" />,
  home: (
    <>
      <path d="M4 10.2 12 4l8 6.2V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z" />
      <path d="M9 16.5h6" />
    </>
  ),
  chat: (
    <>
      <path d="M20.5 12a8.5 8.5 0 1 0-4.1 7.3l3.6.9-.9-3.4A8.4 8.4 0 0 0 20.5 12z" />
      <path d="M8.5 10.5h7M8.5 14h4" />
    </>
  ),
  route: (
    <>
      <circle cx="6.5" cy="7" r="2.2" />
      <circle cx="17.5" cy="17" r="2.2" />
      <path d="M8.7 7h7.8a3 3 0 0 1 0 6h-9a3 3 0 0 0 0 6h7.8" />
    </>
  ),
  helmet: (
    <>
      <path d="M20.5 13.5a8.5 8.5 0 1 0-15.6 4.7c.5.8 1.4 1.3 2.4 1.3h9.4c1.9 0 3.8-1.6 3.8-3.6z" />
      <path d="M20.5 13.5h-6.4a3.6 3.6 0 0 1-3.5-2.7l-.3-1.3c4.4-1.6 8.8-.6 10.2 4z" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12.5" rx="2.5" />
      <path d="M12 16.5V20M8 20h8" />
    </>
  ),
};

/** An outline icon of the design (decorative). */
export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={cx('touren-icon', className)} viewBox="0 0 24 24" aria-hidden="true">
      {ICON_PATHS[name]}
    </svg>
  );
}

/** The arrow after the step and page links. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={cx('touren-arrow', className)} viewBox="0 0 12 12" aria-hidden="true">
      <path d="M1 6h9.5M6.5 2l4 4-4 4" />
    </svg>
  );
}

/** The round badge with the block icon, the small label and the block title (h2). */
export function BlockHead({
  head,
  id,
  stacked = false,
  className,
}: {
  head: { icon?: IconName | null; label: string; title: string };
  id: string;
  stacked?: boolean;
  className?: string;
}) {
  return (
    <header className={cx('touren-head', stacked && 'touren-head--stacked', className)}>
      {head.icon ? (
        <span className="touren-badge">
          <Icon name={head.icon} />
        </span>
      ) : null}
      <div className="touren-head__text">
        <p className="touren-label">{head.label}</p>
        <h2 id={id} className="touren-title">
          <Rows text={head.title} />
        </h2>
      </div>
    </header>
  );
}

/** Pills under a note (a plain list for screen readers). */
export function Tags({ items, className }: { items: readonly string[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <ul className={cx('touren-tags', className)}>
      {items.map((tag, index) => (
        <li key={`${index}-${tag}`} className="touren-tag">
          {tag}
        </li>
      ))}
    </ul>
  );
}

/** The big lead on the left and the small note (with tags) on the right. */
export function Intro({
  lead,
  note,
  tags = [],
  className,
}: {
  lead?: string;
  note?: string;
  tags?: readonly string[];
  className?: string;
}) {
  if (!lead && !note && tags.length === 0) return null;
  return (
    <div className={cx('touren-intro', className)}>
      {lead ? <p className="touren-lead">{lead}</p> : <span />}
      {note || tags.length > 0 ? (
        <div className="touren-side">
          {note ? <p className="touren-note">{note}</p> : null}
          <Tags items={tags} />
        </div>
      ) : null}
    </div>
  );
}
