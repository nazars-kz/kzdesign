/**
 * Small building blocks of the Filmtoro case page: text helpers (rows, coral words, paragraphs),
 * the block head (h2 with its texts) and a picture.
 */
import { type CSSProperties, Fragment } from 'react';

import type { ResolvedImage } from '@/core/content/define';
import type { PageViewProps } from '@/core/content/page-route';

import { cx } from '../../components/ui/cn';
import { SiteImage } from '../../components/ui/site-image';

export type FilmtoroContent = PageViewProps<'case-filmtoro'>['content'];

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

/** "Plain *coral* text": the words between asterisks get the accent color. */
function Accent({ text }: { text: string }) {
  return text.split('*').map((part, index) =>
    index % 2 === 1 ? (
      <em key={`${index}-${part}`} className="filmtoro-accent">
        {part}
      </em>
    ) : (
      <Fragment key={`${index}-${part}`}>{part}</Fragment>
    ),
  );
}

/**
 * A title written on several lines: every line is a row in its own clipping mask, numbered
 * (`--filmtoro-i`) so the rows can slide up one after another.
 */
export function Rows({ text }: { text: string }) {
  return text.split('\n').map((row, index) => (
    <span key={`${index}-${row}`} className="filmtoro-row">
      <span className="filmtoro-row__in" style={cssVars({ '--filmtoro-i': index })}>
        <Accent text={row} />
      </span>
    </span>
  ));
}

/**
 * A picture in a figure (phones, scenes, tiles). No blur placeholder: most pictures are
 * transparent phones and the blurred box would show around them while they load.
 */
export function Picture({
  image,
  sizes,
  className,
  priority = false,
  decorative = false,
}: {
  image: ResolvedImage | null;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** A duplicate of what the text already says: rendered with an empty alt. */
  decorative?: boolean;
}) {
  if (!image) return null;
  return (
    <figure className={cx('filmtoro-pic', className)}>
      <SiteImage
        image={{ ...image, alt: decorative ? '' : image.alt, blurDataURL: null }}
        sizes={sizes}
        priority={priority}
        className="filmtoro-img"
      />
    </figure>
  );
}

/** Size hints of the pictures: a phone, the content width, half of it. */
export const SIZES = {
  phone: '(max-width: 47.9375rem) 46vw, 25vw',
  wide: '(min-width: 90rem) 1320px, 92vw',
  half: '(max-width: 63.9375rem) 92vw, 46vw',
  full: '(min-width: 90rem) 1440px, 100vw',
} as const;

/** The block head: the h2 on the left, the bigger text and the small text. */
export function Head({
  id,
  head,
  className,
}: {
  id: string;
  head: { title: string; lead?: string; note?: string };
  className?: string;
}) {
  return (
    <header className={cx('filmtoro-head', className)}>
      <h2 id={id} className="filmtoro-title">
        <Rows text={head.title} />
      </h2>
      {head.lead ? <p className="filmtoro-lead">{head.lead}</p> : null}
      {head.note ? <p className="filmtoro-note">{head.note}</p> : null}
    </header>
  );
}
