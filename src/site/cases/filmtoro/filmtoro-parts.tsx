/**
 * Building blocks of the Filmtoro case page: a slide (a block with its desktop and phone picture
 * and the texts placed on it), the art-directed picture, and text helpers (rows of a title,
 * highlighted words, lines and lists).
 */
import Image, { getImageProps } from 'next/image';
import { type CSSProperties, Fragment, type ReactNode } from 'react';

import type { ResolvedImage } from '@/core/content/define';
import type { PageViewProps } from '@/core/content/page-route';

import { cx } from '../../components/ui/cn';

export type FilmtoroContent = PageViewProps<'case-filmtoro'>['content'];

/** The desktop layout starts here (the same value as the CSS breakpoint). */
const DESKTOP_MEDIA = '(min-width: 64rem)';
/** Desktop pictures fill the page width up to 1920 px; phone pictures up to 40rem. */
const DESKTOP_SIZES = '(min-width: 120rem) 1920px, 100vw';
const PHONE_SIZES = '(min-width: 40rem) 40rem, 100vw';

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

/** "Plain *highlighted* text": the words between asterisks get the coral highlight. */
export function Marked({ text }: { text: string }) {
  return text.split('*').map((part, index) =>
    index % 2 === 1 ? (
      <mark key={`${index}-${part}`} className="filmtoro-mark">
        {part}
      </mark>
    ) : (
      <Fragment key={`${index}-${part}`}>{part}</Fragment>
    ),
  );
}

/** A title written on several lines: every line is a row of its own. */
export function Rows({ text }: { text: string }) {
  return linesOf(text).map((row) => (
    <span key={row} className="filmtoro-row">
      {row}
    </span>
  ));
}

/**
 * The picture of a slide: the phone picture by default and the desktop one from 64rem (one
 * `<picture>`, so a device downloads only its own file). Either may be missing.
 */
export function ArtImage({
  desktop,
  mobile,
  priority = false,
}: {
  desktop: ResolvedImage | null;
  mobile?: ResolvedImage | null;
  priority?: boolean;
}) {
  const main = mobile ?? desktop;
  if (!main) return null;
  const common = { loading: priority ? ('eager' as const) : ('lazy' as const) };
  const { props: img } = getImageProps({
    ...common,
    src: main.src,
    width: main.width,
    height: main.height,
    alt: main.alt,
    sizes: mobile ? PHONE_SIZES : DESKTOP_SIZES,
    fetchPriority: priority ? 'high' : 'auto',
  });
  const desktopSet =
    desktop && mobile
      ? getImageProps({
          ...common,
          src: desktop.src,
          width: desktop.width,
          height: desktop.height,
          alt: desktop.alt,
          sizes: DESKTOP_SIZES,
        }).props.srcSet
      : undefined;
  return (
    <picture
      className={cx(
        'filmtoro-pic',
        !mobile && 'filmtoro-pic--desktop',
        !desktop && 'filmtoro-pic--mobile',
      )}
    >
      {desktopSet ? (
        <source media={DESKTOP_MEDIA} srcSet={desktopSet} sizes={DESKTOP_SIZES} />
      ) : null}
      <img {...img} className="filmtoro-img" alt={desktop && mobile ? desktop.alt : main.alt} />
    </picture>
  );
}

/** A lower part of a tall phone picture (phones only; the first part carries the alt text). */
function MobilePart({ image }: { image: ResolvedImage }) {
  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt=""
      sizes={PHONE_SIZES}
      className="filmtoro-img filmtoro-pic--mobile"
    />
  );
}

/** A block of the page: its pictures and the texts placed on them (see the CSS). */
export function Slide({
  name,
  labelledBy,
  label,
  desktop,
  mobile = [],
  priority,
  children,
}: {
  name: string;
  labelledBy?: string;
  label?: string;
  desktop?: ResolvedImage | null;
  /** The phone pictures, top to bottom (a tall one is cut into parts). */
  mobile?: readonly (ResolvedImage | null)[];
  priority?: boolean;
  children?: ReactNode;
}) {
  const [first = null, ...rest] = mobile;
  return (
    <section
      className={cx('filmtoro-slide', `filmtoro-${name}`)}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
    >
      {desktop || first ? (
        <div className="filmtoro-pics">
          <ArtImage desktop={desktop ?? null} mobile={first} priority={priority} />
          {rest.map((part, index) =>
            part ? <MobilePart key={part.id ?? index} image={part} /> : null,
          )}
        </div>
      ) : null}
      {children}
    </section>
  );
}
