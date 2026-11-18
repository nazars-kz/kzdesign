/**
 * Small building blocks of the Onground case page: text helpers (rows and highlighted words), the
 * section heading and a picture tile. Copied from the Tach case on purpose: cases do not import
 * each other.
 */
import { type CSSProperties, Fragment } from 'react';

import type { ResolvedImage } from '@/core/content/define';

import { cx } from '../../components/ui/cn';
import { SiteImage } from '../../components/ui/site-image';

/** Inline style that only sets CSS custom properties (the token rule allows nothing else). */
export const cssVars = (vars: Record<`--${string}`, string | number>) => vars as CSSProperties;

/** Number of words of a text (asterisks are not words): the next row of a title starts after it. */
const countWords = (text: string) => text.replace(/\*/g, '').split(/\s+/).filter(Boolean).length;

/**
 * "Plain *highlighted* text": the words between asterisks get the accent color. Every word is
 * wrapped in a clipping mask and carries its index (`--og-w`), so the page can slide the words up
 * one after another.
 */
export function Accent({ text, start = 0 }: { text: string; start?: number }) {
  let index = start;
  return text.split('*').map((part, partIndex) => {
    const words = part.split(/(\s+)/).map((token, tokenIndex) => {
      if (token === '' || /^\s+$/.test(token)) return token;
      const word = index;
      index += 1;
      return (
        <span key={`${tokenIndex}-${token}`} className="og-w">
          <span className="og-w__in" style={cssVars({ '--og-w': word })}>
            {token}
          </span>
        </span>
      );
    });
    return partIndex % 2 === 1 ? (
      <span key={`${partIndex}-${part}`} className="og-accent">
        {words}
      </span>
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
      <span key={`${index}-${row}`} className="og-row">
        <Accent text={row} start={start} />
      </span>
    );
    start += countWords(row);
    return node;
  });
}

/** Plain lines: a new line starts a new row, no word animation. */
export function Lines({ text }: { text: string }) {
  return text.split('\n').map((row, index) => (
    <span key={`${index}-${row}`} className="og-row">
      {row}
    </span>
  ));
}

/** "// About" and the big title under it. */
export function Head({
  eyebrow,
  title,
  id,
  className,
}: {
  eyebrow: string;
  title: string;
  id: string;
  className?: string;
}) {
  return (
    <header className={cx('og-head', className)}>
      <p className="og-eyebrow">
        <span className="og-eyebrow__slash" aria-hidden="true">
          {'//'}
        </span>{' '}
        {eyebrow}
      </p>
      <h2 id={id} className="og-title">
        <Rows text={title} />
      </h2>
    </header>
  );
}

/** A square-cornered tile with a picture that fills it. */
export function Shot({
  image,
  sizes,
  className,
  priority = false,
}: {
  image: ResolvedImage | null;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={cx('og-tile', className)}>
      <SiteImage image={image} sizes={sizes} priority={priority} className="og-shot" />
    </figure>
  );
}

/** The yellow chips under a section's text. */
export function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className="og-chips">
      {items.map((item) => (
        <li key={item} className="og-chip">
          {item}
        </li>
      ))}
    </ul>
  );
}
