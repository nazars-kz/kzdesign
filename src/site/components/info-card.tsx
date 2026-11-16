import { Icon, type IconName } from './ui/icon';
import type { HeadingLevel } from './ui/typography';

/**
 * Gray card: icon at the top, title and text pinned to the bottom, so the titles of a row
 * line up with each other whatever the text length. Used in grids (`.info-cards`).
 */
export function InfoCard({
  icon,
  title,
  text,
  level = 3,
}: {
  icon?: IconName;
  title: string;
  text?: string;
  level?: HeadingLevel;
}) {
  const Title = `h${level}` as const;
  return (
    <article className="info-card">
      {icon ? <Icon name={icon} size="card" /> : null}
      <Title className="info-card__title">{title}</Title>
      {text ? <p className="info-card__text">{text}</p> : null}
    </article>
  );
}
