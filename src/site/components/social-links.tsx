import { cx } from './ui/cn';
import { Icon, type IconName } from './ui/icon';

export interface SocialLink {
  readonly key: string;
  readonly network: Extract<IconName, 'linkedin' | 'dribbble' | 'behance'>;
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
            <Icon name={link.network} size="sm" />
          </a>
        </li>
      ))}
    </ul>
  );
}
