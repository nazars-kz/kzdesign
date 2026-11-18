/**
 * Small building blocks of the Signal Sigma case page: text helpers (rows and highlighted words),
 * the chapter strip, the handwritten note and the decorative glyphs of the design.
 */
import { type CSSProperties, Fragment, type ReactNode } from 'react';

import { cx } from '../../components/ui/cn';

/** Inline style that only sets CSS custom properties (the token rule allows nothing else). */
export const cssVars = (vars: Record<`--${string}`, string | number>) => vars as CSSProperties;

/** Number of words of a text (asterisks are not words): the next row of a title starts after it. */
const countWords = (text: string) => text.replace(/\*/g, '').split(/\s+/).filter(Boolean).length;

/**
 * "Plain *highlighted* text": the words between asterisks get the accent (light italic, yellow on
 * dark). Every word sits in a clipping mask with its index (`--sigma-w`), so the page can slide the
 * words up one after another.
 */
export function Accent({ text, start = 0 }: { text: string; start?: number }) {
  let index = start;
  return text.split('*').map((part, partIndex) => {
    const words = part.split(/(\s+)/).map((token, tokenIndex) => {
      if (token === '' || /^\s+$/.test(token)) return token;
      const word = index;
      index += 1;
      return (
        <span key={`${tokenIndex}-${token}`} className="sigma-w">
          <span className="sigma-w__in" style={cssVars({ '--sigma-w': word })}>
            {token}
          </span>
        </span>
      );
    });
    return partIndex % 2 === 1 ? (
      <em key={`${partIndex}-${part}`} className="sigma-accent">
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
      <span key={`${index}-${row}`} className="sigma-row">
        <Accent text={row} start={start} />
      </span>
    );
    start += countWords(row);
    return node;
  });
}

/**
 * The strip of chapters above a block ("/ UI   / ORDERS & TRADES   / WATCHLIST"): the chapters of
 * the same part up to the current one, the current one bright and underlined.
 */
export function Strip({ labels }: { labels: readonly string[] }) {
  const current = labels.length - 1;
  return (
    <ol className="sigma-strip">
      {labels.map((label, index) => (
        <li
          key={`${index}-${label}`}
          className="sigma-strip__item"
          aria-current={index === current ? 'step' : undefined}
        >
          {label}
        </li>
      ))}
    </ol>
  );
}

/** A handwritten note with the four strokes above it; `card` puts it on a raised card. */
export function Note({
  text,
  card = false,
  className,
  children,
}: {
  text: string;
  card?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  if (!text) return null;
  return (
    <div className={cx('sigma-note', card && 'sigma-note--card', className)}>
      {children}
      <Strokes className="sigma-note__strokes" />
      <p className="sigma-note__text">{text}</p>
    </div>
  );
}

// ── Decorative glyphs (aria-hidden) ───────────────────────────────────────────────────────────

type GlyphProps = { className?: string };

/** The four slanted strokes above every note (the design's quotation mark). */
export function Strokes({ className }: GlyphProps) {
  return (
    <svg className={cx('sigma-strokes', className)} viewBox="0 0 64 12" aria-hidden="true">
      <path d="M1 1.5 0 11h1.6l1-9.5z" />
      <path d="M14 1.5 13 11h1.6l1-9.5zM18 1.5 17 11h1.6l1-9.5z" />
      <path d="M33 1.5 32 11h1.6l1-9.5zM37 1.5 36 11h2.6l1-9.5z" />
      <path d="M52 1.5 51 11h2.6l1-9.5zM57 1.5 56 11h4.6l1.2-9.5z" />
    </svg>
  );
}

/** The quote mark of the client card: two slanted strokes. */
export function QuoteMark({ className }: GlyphProps) {
  return (
    <svg className={cx('sigma-quote-mark', className)} viewBox="0 0 30 34" aria-hidden="true">
      <path d="M3 2h6.5L8 32H1.5zM17 2h12L20 32h-8.5z" />
    </svg>
  );
}

/** The small heart after the slash above the research and UI blocks. */
export function Heart({ className }: GlyphProps) {
  return (
    <svg className={cx('sigma-heart', className)} viewBox="0 0 16 14" aria-hidden="true">
      <path d="M8 13.5C3.4 10.4.6 7.8.6 4.6A3.9 3.9 0 0 1 4.5.7c1.5 0 2.7.8 3.5 2 .8-1.2 2-2 3.5-2a3.9 3.9 0 0 1 3.9 3.9c0 3.2-2.8 5.8-7.4 8.9z" />
    </svg>
  );
}

/** The four-leaf mark of the lists (summary, screener points). */
export function Clover({ className }: GlyphProps) {
  return (
    <svg className={cx('sigma-clover', className)} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 1.2a2.6 2.6 0 0 1 2.4 3.6L8 7.2 5.6 4.8A2.6 2.6 0 0 1 8 1.2zM14.8 8a2.6 2.6 0 0 1-3.6 2.4L8.8 8l2.4-2.4A2.6 2.6 0 0 1 14.8 8zM8 14.8a2.6 2.6 0 0 1-2.4-3.6L8 8.8l2.4 2.4A2.6 2.6 0 0 1 8 14.8zM1.2 8a2.6 2.6 0 0 1 3.6-2.4L7.2 8 4.8 10.4A2.6 2.6 0 0 1 1.2 8z" />
    </svg>
  );
}

/** The stacked stones in a frame, next to the notes of the About block. */
export function StonesMark({ className }: GlyphProps) {
  return (
    <svg className={cx('sigma-stones-mark', className)} viewBox="0 0 50 104" aria-hidden="true">
      <rect className="sigma-stones-mark__frame" x="2" y="2" width="46" height="100" />
      <ellipse cx="22" cy="21" rx="12" ry="9" />
      <ellipse cx="24" cy="38" rx="15" ry="8.5" />
      <ellipse cx="22" cy="55" rx="16" ry="9" />
      <path d="M6 96c0-14 8-27 20-27s19 13 19 27z" />
    </svg>
  );
}
