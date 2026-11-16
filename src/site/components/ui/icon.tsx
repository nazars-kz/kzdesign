import { cx } from './cn';

/** Every icon of the site: the SVG files in `public/icons` (and `public/icons/industries`). */
export const ICON_NAMES = [
  'arrow-right',
  'arrow-right-white',
  'arrow-case',
  'arrow-circle',
  'chevron',
  'chev-left',
  'chev-right',
  'linkedin',
  'dribbble',
  'behance',
  'briefcase',
  'star-red',
  'next-arrow',
  'industries/ai',
  'industries/energy',
  'industries/fintech',
  'industries/healthcare',
  'industries/hr',
  'industries/logistics',
  'industries/marketing',
  'industries/proptech',
  'industries/retail',
  'industries/sales',
  'industries/social',
  'industries/web3',
] as const;
export type IconName = (typeof ICON_NAMES)[number];

/** Icon sizes: 20 px (social links), 24 px (lists, buttons), 50 px (round awards arrow). */
export type IconSize = 'sm' | 'md' | 'lg';
const SIZE_CLASS: Record<IconSize, string> = { sm: 'size-5', md: 'size-6', lg: 'size-12.5' };

/**
 * An icon from the site's icon set. Decorative by default (`alt=""`); pass `label` when the
 * icon alone carries the meaning. Plain `<img>` on purpose: the SVGs are tiny static files.
 */
export function Icon({
  name,
  size = 'md',
  label,
  className,
}: {
  name: IconName;
  size?: IconSize;
  label?: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- small static SVG icons
    <img
      src={`/icons/${name}.svg`}
      alt={label ?? ''}
      className={cx('icon object-contain', SIZE_CLASS[size], className)}
    />
  );
}
