/**
 * Small building blocks of the PrintBuy case page: text helpers (rows, paragraphs), the
 * handwritten note, the outline icons of the feature cards and the image wrapper.
 */
import { type CSSProperties, Fragment, type ReactNode } from 'react';

import type { ResolvedImage } from '@/core/content/define';
import type { PageViewProps } from '@/core/content/page-route';

import { cx } from '../../components/ui/cn';
import { SiteImage } from '../../components/ui/site-image';

export type PrintbuyContent = PageViewProps<'case-printbuy'>['content'];

/** Full-width pictures fill the page up to 1920 px. */
export const WIDE_SIZES = '(min-width: 120rem) 1920px, 100vw';

/** Inline style that only sets CSS custom properties (the token rule allows nothing else). */
export const cssVars = (vars: Record<`--${string}`, string | number>) => vars as CSSProperties;

/** The non-empty lines of a textarea. */
export const linesOf = (text: string | null | undefined) =>
  (text ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

/** The comma-separated items of a text field. */
export const splitList = (text: string | null | undefined) =>
  (text ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

/**
 * A title written on several lines: every line is a row (a block on wide screens) and every word
 * sits in a clipping mask with its index (`--printbuy-w`), so the words can rise one by one.
 */
export function Rows({ text }: { text: string }) {
  let index = 0;
  return linesOf(text).map((line, lineIndex) => (
    <span key={`${lineIndex}-${line}`} className="printbuy-row">
      {line.split(/\s+/).map((word, wordIndex) => {
        const node = (
          <Fragment key={`${wordIndex}-${word}`}>
            <span className="printbuy-w">
              <span className="printbuy-w__in" style={cssVars({ '--printbuy-w': index })}>
                {word}
              </span>
            </span>{' '}
          </Fragment>
        );
        index += 1;
        return node;
      })}
    </span>
  ));
}

/** One paragraph per line of a textarea. */
export function Paragraphs({ text, className }: { text: string; className?: string }) {
  return linesOf(text).map((line, index) => (
    <p key={`${index}-${line}`} className={className}>
      {line}
    </p>
  ));
}

/** A handwritten note with the colored mark at its start. */
export function Note({
  text,
  tone,
  className,
}: {
  text: string | null | undefined;
  tone: 'purple' | 'green';
  className?: string;
}) {
  if (!text) return null;
  return (
    <div className={cx('printbuy-note', `printbuy-note--${tone}`, className)}>
      <span className="printbuy-note__mark" aria-hidden="true" />
      <p className="printbuy-note__text">{text}</p>
    </div>
  );
}

/** A content picture; renders nothing while the field is empty. */
export function Picture({
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
    <SiteImage
      image={image}
      sizes={sizes}
      priority={priority}
      className={cx('printbuy-img', className)}
    />
  );
}

type IconName = NonNullable<PrintbuyContent['structure']['cards'][number]['icon']>;

/** The outline icons of the feature cards (24 × 24, drawn with the current color). */
const ICON_PATHS: Record<IconName, ReactNode> = {
  folder: (
    <>
      <path d="M3.5 7.5a2 2 0 0 1 2-2h3.6l2 2.2h7.4a2 2 0 0 1 2 2v7.8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />
      <path d="M3.5 10.5h17" />
    </>
  ),
  cursor: (
    <>
      <path d="M19.5 11V6.5a2 2 0 0 0-2-2h-11a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2H11" />
      <path d="m13 13 7.5 2.6-3.3 1.4-1.4 3.3z" />
    </>
  ),
  chat: (
    <>
      <path d="M16.5 9.5V6a2 2 0 0 0-2-2h-9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1v3l3-3" />
      <path d="M11 11.5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5v2.5L16 17.5h-3a2 2 0 0 1-2-2z" />
    </>
  ),
};

/** An outline icon of the design (decorative). */
export function Icon({ name }: { name: IconName }) {
  return (
    <svg className="printbuy-icon" viewBox="0 0 24 24" aria-hidden="true">
      {ICON_PATHS[name]}
    </svg>
  );
}
