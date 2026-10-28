import { cx } from './ui/cn';

export interface SocialLink {
  readonly key: string;
  readonly network: string;
  readonly href: string;
  readonly label: string;
}

/** Round icon links to the social profiles (footer; reusable anywhere). */
export function SocialLinks({
  links,
  label,
  className,
}: {
  links: readonly SocialLink[];
  /** Accessible name of the group. */
  label: string;
  className?: string;
}) {
  if (links.length === 0) return null;
  return (
    <ul className={cx('socials', className)} aria-label={label}>
      {links.map((link) => (
        <li key={link.key}>
          <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
            {/* eslint-disable-next-line @next/next/no-img-element -- small static SVG icons */}
            <img src={`/icons/${link.network}.svg`} alt="" data-network={link.network} />
          </a>
        </li>
      ))}
    </ul>
  );
}
