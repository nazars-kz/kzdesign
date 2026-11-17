/**
 * Small building blocks of the Tach case page: text helpers (rows and highlighted words), the
 * chapter intro, a picture tile and the interface icons used by the coded mock-ups.
 */
import { type CSSProperties, Fragment, type ReactNode } from 'react';

import type { ResolvedImage } from '@/core/content/define';

import { cx } from '../../components/ui/cn';
import { SiteImage } from '../../components/ui/site-image';
import { Heading } from '../../components/ui/typography';

/** Inline style that only sets CSS custom properties (the token rule allows nothing else). */
export const cssVars = (vars: Record<`--${string}`, string | number>) => vars as CSSProperties;

/** "Plain *highlighted* text": the words between asterisks get the case accent color. */
export function Accent({ text }: { text: string }) {
  return text.split('*').map((part, index) =>
    index % 2 === 1 ? (
      <span key={`${index}-${part}`} className="tach-accent">
        {part}
      </span>
    ) : (
      <Fragment key={`${index}-${part}`}>{part}</Fragment>
    ),
  );
}

/** A title written on several lines: every line is a row of its own. */
export function Rows({ text }: { text: string }) {
  return text.split('\n').map((row, index) => (
    <span key={`${index}-${row}`} className="tach-row">
      <Accent text={row} />
    </span>
  ));
}

/** "01 Brand Identity": the chapter label and title on the left, the short text on the right. */
export function Chapter({
  eyebrow,
  title,
  text,
  id,
}: {
  eyebrow: string;
  title: string;
  text: string;
  id: string;
}) {
  return (
    <header className="tach-chapter">
      <div className="tach-chapter__main">
        <p className="tach-chapter__eyebrow">{eyebrow}</p>
        <Heading level={2} variant="plain" id={id} className="tach-chapter__title">
          {title}
        </Heading>
      </div>
      {text ? <p className="tach-chapter__text">{text}</p> : null}
    </header>
  );
}

/** A rounded tile with a picture (a screen or a mock-up) that fills it. */
export function Shot({
  image,
  sizes,
  priority = false,
  className,
}: {
  image: ResolvedImage | null;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={cx('tach-tile', className)}>
      <SiteImage image={image} sizes={sizes} priority={priority} className="tach-shot" />
    </figure>
  );
}

// ── Icons of the coded interface mock-ups (decorative) ────────────────────────────────────────

type IconProps = { className?: string };

function Svg({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={cx('tach-icon', className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const GearIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </Svg>
);

export const BellIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </Svg>
);

export const MoreIcon = (p: IconProps) => (
  <svg
    className={cx('tach-icon', p.className)}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="12" cy="5" r="2" fill="currentColor" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <circle cx="12" cy="19" r="2" fill="currentColor" />
  </svg>
);

export const FuelIcon = (p: IconProps) => (
  <svg
    className={cx('tach-icon', p.className)}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="5" y="3" width="11" height="18" rx="2" className="tach-pump-body" />
    <rect x="7.5" y="5.5" width="6" height="4.5" rx="1" className="tach-pump-glass" />
    <path
      d="M16 8l3 2.5V17a1.5 1.5 0 0 0 3 0v-6"
      fill="none"
      className="tach-pump-hose"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

/** The speedometer mark of the Tach logo (its orange part), drawn in the current color. */
export const MarkIcon = (p: IconProps) => (
  <svg
    className={cx('tach-icon', p.className)}
    viewBox="146 1 238 190"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M258.087 2.80826L383.229 149.961C383.7 150.473 383.992 151.13 384.06 151.828C384.128 152.526 383.968 153.228 383.605 153.825L363.61 188.952C363.335 189.466 362.926 189.893 362.428 190.186C361.931 190.478 361.364 190.626 360.789 190.613H320.047C319.36 190.647 318.68 190.45 318.114 190.052C317.548 189.654 317.126 189.077 316.913 188.41L252.446 6.00167C252.031 5.23942 251.929 4.34018 252.164 3.50175C252.399 2.66332 252.952 1.95438 253.7 1.53091C254.448 1.10744 255.331 1.00416 256.153 1.24371C256.976 1.48326 257.672 2.04601 258.087 2.80826ZM159.397 190.709H203.273C204.104 190.709 204.902 190.372 205.489 189.774C206.077 189.175 206.407 188.362 206.407 187.515V168.004C206.407 167.157 206.077 166.345 205.489 165.746C204.902 165.147 204.104 164.81 203.273 164.81H159.146C158.281 164.813 157.45 165.156 156.827 165.768L147.425 175.349C147.107 175.648 146.853 176.011 146.679 176.414C146.506 176.818 146.416 177.255 146.416 177.696C146.416 178.137 146.506 178.573 146.679 178.977C146.853 179.381 147.107 179.744 147.425 180.043L157.078 189.879C157.389 190.169 157.756 190.392 158.154 190.535C158.553 190.678 158.975 190.737 159.397 190.709ZM163.095 139.614L205.53 150.727C206.373 150.932 207.261 150.792 208.004 150.339C208.748 149.885 209.288 149.154 209.51 148.3L214.211 129.587C214.338 129.163 214.377 128.717 214.325 128.277C214.274 127.838 214.133 127.413 213.912 127.032C213.691 126.65 213.394 126.32 213.041 126.062C212.688 125.803 212.286 125.623 211.86 125.531L169.112 114.354C168.698 114.237 168.264 114.207 167.839 114.268C167.413 114.328 167.003 114.477 166.636 114.706L155.323 121.54C154.938 121.747 154.599 122.034 154.329 122.382C154.059 122.731 153.863 123.133 153.754 123.562C153.645 123.992 153.625 124.44 153.696 124.878C153.766 125.316 153.925 125.734 154.163 126.106L161.121 138.081C161.316 138.484 161.594 138.84 161.934 139.127C162.274 139.413 162.67 139.622 163.095 139.742V139.614ZM179.141 91.2021L217.502 112.694C217.873 112.926 218.288 113.077 218.72 113.137C219.152 113.196 219.592 113.163 220.011 113.04C220.429 112.917 220.818 112.706 221.153 112.421C221.487 112.136 221.759 111.783 221.952 111.384L231.103 94.4593C231.331 94.0808 231.479 93.6578 231.538 93.2177C231.596 92.7775 231.564 92.3298 231.443 91.903C231.322 91.4762 231.116 91.0798 230.836 90.7392C230.556 90.3985 230.21 90.1211 229.819 89.9246L191.144 68.2414C190.384 67.8314 189.5 67.7288 188.669 67.954L176.133 71.7222C175.711 71.8274 175.316 72.0205 174.972 72.2893C174.627 72.5582 174.341 72.8969 174.132 73.2841C173.923 73.6714 173.795 74.0986 173.757 74.5389C173.718 74.9791 173.769 75.4228 173.907 75.8418L177.7 89.1902C177.881 90.0792 178.399 90.8595 179.141 91.3617V91.2021ZM206.501 48.3784L238.406 78.9074C238.7 79.2367 239.057 79.4998 239.457 79.6798C239.856 79.8599 240.288 79.9529 240.725 79.9529C241.162 79.9529 241.593 79.8599 241.993 79.6798C242.392 79.4998 242.75 79.2367 243.044 78.9074L256.05 64.8244C256.643 64.1754 256.958 63.314 256.929 62.4284C256.899 61.5428 256.527 60.705 255.894 60.0981L223.738 29.3137C223.428 29.0077 223.059 28.7703 222.655 28.6165C222.25 28.4626 221.819 28.3955 221.388 28.4195L208.225 28.8347C207.794 28.8336 207.368 28.9229 206.973 29.0972C206.577 29.2715 206.222 29.5269 205.928 29.8475C205.634 30.1682 205.408 30.5471 205.264 30.9608C205.12 31.3744 205.061 31.8138 205.091 32.2516L205.53 46.1749C205.527 46.6104 205.612 47.0419 205.779 47.4428C205.946 47.8437 206.192 48.2055 206.501 48.506V48.3784Z"
      fill="currentColor"
    />
  </svg>
);

export const EyeIcon = (p: IconProps) => (
  <svg
    className={cx('tach-icon', p.className)}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M12 5c-5 0-9 4.2-10 7 1 2.8 5 7 10 7s9-4.2 10-7c-1-2.8-5-7-10-7z"
      fill="currentColor"
    />
    <circle cx="12" cy="12" r="3.8" className="tach-pump-glass" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" />
  </svg>
);

export const LayersIcon = (p: IconProps) => (
  <svg
    className={cx('tach-icon', p.className)}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 3l9 4.5-9 4.5-9-4.5z" fill="currentColor" />
    <path
      d="M3 12l9 4.5 9-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M3 16.5l9 4.5 9-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const CloseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);

export const PinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </Svg>
);

export const StarIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.3l1.1-6.2L3 9.7l6.2-.9z" />
  </Svg>
);

export const ClockIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);

export const GlobeIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
  </Svg>
);

export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </Svg>
);

export const BookmarkIcon = (p: IconProps) => (
  <svg
    className={cx('tach-icon', p.className)}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M6 3h12v18l-6-4.5L6 21z" fill="currentColor" />
  </svg>
);

export const RouteIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3l9 9-9 9-9-9z" />
    <path d="M9 12h6M13 10l2 2-2 2" />
  </Svg>
);
