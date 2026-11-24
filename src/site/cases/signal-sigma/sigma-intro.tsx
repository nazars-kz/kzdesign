/**
 * Signal Sigma, first half of the page: hero, overview, client feedback, about, research and the
 * laptop between rocks.
 */
import type { ResolvedImage } from '@/core/content/define';
import type { PageViewProps } from '@/core/content/page-route';

import { cx } from '../../components/ui/cn';
import { SiteImage } from '../../components/ui/site-image';
import { Heart, Note, QuoteMark, Rows, StonesMark, Strip } from './sigma-parts';

export type SigmaContent = PageViewProps<'case-signal-sigma'>['content'];

/** The chapter strip, the block title (h2) and its text. */
export function BlockHead({
  strip,
  title,
  text,
  id,
  className,
}: {
  strip?: readonly string[];
  title: string;
  text?: string;
  id: string;
  className?: string;
}) {
  return (
    <header className={cx('sigma-head', className)}>
      {strip && strip.length > 0 ? <Strip labels={strip} /> : null}
      <h2 id={id} className="sigma-title">
        <Rows text={title} />
      </h2>
      {text ? <p className="sigma-lead">{text}</p> : null}
    </header>
  );
}

/** A picture laid over another one (a card with its own shadow); decorative copies use alt="". */
export function Overlay({
  image,
  sizes,
  className,
}: {
  image: ResolvedImage | null;
  sizes: string;
  className: string;
}) {
  if (!image) return null;
  return (
    <div className={cx('sigma-overlay', className)}>
      <SiteImage image={image} sizes={sizes} className="sigma-img" />
    </div>
  );
}

export function SigmaHero({ hero }: { hero: SigmaContent['hero'] }) {
  return (
    <section className="sigma-hero">
      <div className="sigma-hero__stage">
        <SiteImage
          image={hero.image}
          sizes="(max-width: 63.9375rem) 900px, (min-width: 120rem) 1920px, 100vw"
          priority
          className="sigma-hero__image"
        />
        {hero.facts.length > 0 ? (
          <dl className="sigma-facts">
            {hero.facts.map((fact) => (
              <div key={fact._key} className="sigma-facts__row">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
      <div className="sigma-intro">
        <p className="sigma-intro__title">{hero.title}</p>
        {hero.text ? <p className="sigma-intro__text">{hero.text}</p> : null}
      </div>
    </section>
  );
}

export function SigmaOverview({
  overview,
  strip,
}: {
  overview: SigmaContent['overview'];
  strip: readonly string[];
}) {
  return (
    <section className="sigma-overview" aria-labelledby="sigma-overview-title">
      <BlockHead
        strip={strip}
        title={overview.title}
        text={overview.text}
        id="sigma-overview-title"
      />
      <div className="sigma-scene sigma-scene--overview">
        <figure className="sigma-photo sigma-overview__photo">
          <SiteImage
            image={overview.photo}
            sizes="(max-width: 63.9375rem) 100vw, 58vw"
            className="sigma-img"
          />
        </figure>
        <Note text={overview.note} className="sigma-overview__note" />
        <Overlay
          image={overview.card}
          sizes="(max-width: 63.9375rem) 80vw, 30vw"
          className="sigma-overview__card"
        />
      </div>
    </section>
  );
}

export function SigmaFeedback({
  feedback,
  strip,
}: {
  feedback: SigmaContent['feedback'];
  strip: readonly string[];
}) {
  return (
    <section className="sigma-feedback" aria-labelledby="sigma-feedback-title">
      <BlockHead strip={strip} title={feedback.title} id="sigma-feedback-title" />
      <figure className="sigma-quote">
        <figcaption className="sigma-quote__author">
          <SiteImage image={feedback.photo} sizes="6rem" className="sigma-quote__photo" />
          <span className="sigma-quote__who">
            <span className="sigma-quote__name">{feedback.name}</span>
            {feedback.role ? <span className="sigma-quote__role">{feedback.role}</span> : null}
          </span>
          <QuoteMark className="sigma-quote__mark" />
        </figcaption>
        <blockquote className="sigma-quote__text">
          <p>{feedback.quote}</p>
        </blockquote>
      </figure>
      {feedback.metrics.length > 0 ? (
        <ul className="sigma-metrics">
          {feedback.metrics.map((metric) => (
            <li key={metric._key} className="sigma-metric">
              <h3 className="sigma-metric__head">
                <span className="sigma-metric__value">{metric.value}</span>
                <span className="sigma-metric__label">{metric.label}</span>
              </h3>
              {metric.text ? <p className="sigma-metric__text">{metric.text}</p> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function SigmaAbout({
  about,
  strip,
}: {
  about: SigmaContent['about'];
  strip: readonly string[];
}) {
  return (
    <section className="sigma-about" aria-labelledby="sigma-about-title">
      <BlockHead strip={strip} title={about.title} text={about.text} id="sigma-about-title" />
      <div className="sigma-scene sigma-scene--about">
        <figure className="sigma-photo sigma-about__photo">
          <SiteImage
            image={about.photo}
            sizes="(max-width: 63.9375rem) 100vw, 58vw"
            className="sigma-img"
          />
        </figure>
        <Overlay
          image={about.card}
          sizes="(max-width: 63.9375rem) 90vw, 34vw"
          className="sigma-about__card"
        />
        <Note text={about.note} card className="sigma-about__note">
          <StonesMark className="sigma-about__stones" />
        </Note>
      </div>
    </section>
  );
}

/** "Fintech, Clarity" → ["Fintech", "Clarity"]. */
const splitTags = (text: string) =>
  text
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

/** "/ FINTECH   / CLARITY": the hashtags under a card. */
export function Tags({ tags }: { tags: readonly string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="sigma-tags">
      {tags.map((tag, index) => (
        <li key={`${index}-${tag}`} className="sigma-tag">
          {tag}
        </li>
      ))}
    </ul>
  );
}

export function SigmaResearch({ research }: { research: SigmaContent['research'] }) {
  return (
    <section className="sigma-research" aria-labelledby="sigma-research-title">
      <BlockHead title={research.title} id="sigma-research-title" className="sigma-head--inset" />
      <ul className="sigma-cards">
        {research.cards.map((card) => (
          <li key={card._key} className="sigma-card">
            <p className="sigma-card__mark" aria-hidden="true">
              / <Heart />
            </p>
            <h3 className="sigma-card__title">{card.title}</h3>
            {card.text ? <p className="sigma-card__text">{card.text}</p> : null}
            <Tags tags={splitTags(card.tags)} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** A wide picture across the page (a laptop or a tablet in its scene). */
export function Wide({
  image,
  className,
  priority = false,
}: {
  image: ResolvedImage | null;
  className?: string;
  priority?: boolean;
}) {
  if (!image) return null;
  return (
    <figure className={cx('sigma-wide', className)}>
      <SiteImage
        image={image}
        sizes="(max-width: 63.9375rem) 200vw, (min-width: 120rem) 1920px, 100vw"
        priority={priority}
        className="sigma-img"
      />
    </figure>
  );
}
