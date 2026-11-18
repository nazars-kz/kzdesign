/**
 * Touren, first part of the page: hero, solution / goal / challenge, design process, task and
 * goals, site map, the team quote and the website showcase.
 */
import type { ResolvedImage } from '@/core/content/define';

import { cx } from '../../components/ui/cn';
import { SiteImage } from '../../components/ui/site-image';
import { BlockHead, cssVars, Lines, splitList, type TourenContent } from './touren-parts';

/** A picture across the whole page width (bands of the design). */
export function Band({
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
    <figure className={cx('touren-band', className)}>
      <SiteImage
        image={image}
        sizes="(min-width: 120rem) 1920px, 100vw"
        priority={priority}
        className="touren-img"
      />
    </figure>
  );
}

/** A picture placed on a panel (transparent phone mockups); positions live in the CSS. */
export function Shot({
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
    <figure className={cx('touren-shot', className)}>
      <SiteImage image={image} sizes={sizes} className="touren-img" />
    </figure>
  );
}

export function TourenHero({ hero }: { hero: TourenContent['hero'] }) {
  return (
    <section className="touren-hero" aria-labelledby="touren-title">
      <h1 id="touren-title" className="sr-only">
        {hero.heading}
      </h1>
      <div className="touren-hero__stage">
        <SiteImage
          image={hero.photo}
          sizes="(min-width: 120rem) 1920px, (max-width: 47.9375rem) 200vw, 100vw"
          priority
          className="touren-hero__photo"
        />
        {hero.facts.length > 0 ? (
          <dl className="touren-facts">
            {hero.facts.map((fact) => (
              <div key={fact._key} className="touren-facts__item">
                <dt>{fact.label}</dt>
                <dd>
                  <Lines text={fact.value} />
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
      <Shot
        image={hero.phone}
        sizes="(max-width: 63.9375rem) 70vw, 27vw"
        className="touren-hero__phone"
      />
      <div className="touren-request">
        {hero.requestLabel ? <p className="touren-dash">{hero.requestLabel}</p> : null}
        {hero.request ? <p className="touren-request__text">{hero.request}</p> : null}
      </div>
    </section>
  );
}

export function TourenBrief({ brief }: { brief: TourenContent['brief'] }) {
  return (
    <section className="touren-brief" aria-label={brief.items.map((item) => item.title).join(', ')}>
      {brief.items.length > 0 ? (
        <ul className="touren-brief__list">
          {brief.items.map((item) => (
            <li key={item._key} className="touren-brief__item">
              <h2 className="touren-brief__title">{item.title}</h2>
              {item.text ? <p className="touren-brief__text">{item.text}</p> : null}
            </li>
          ))}
        </ul>
      ) : null}
      <Shot
        image={brief.phones}
        sizes="(max-width: 63.9375rem) 90vw, 47vw"
        className="touren-brief__phones"
      />
    </section>
  );
}

/** "01.", "02." … */
const stepNumber = (index: number) => `${String(index + 1).padStart(2, '0')}.`;

export function TourenProcess({ process }: { process: TourenContent['process'] }) {
  return (
    <section className="touren-process" aria-labelledby="touren-process-title">
      <BlockHead head={process} id="touren-process-title" />
      <div className="touren-process__intro">
        {process.intro ? <p>{process.intro}</p> : null}
        {process.focus ? <p>{process.focus}</p> : null}
      </div>
      {process.steps.length > 0 ? (
        <ol className="touren-steps">
          {process.steps.map((step, index) => (
            <li key={step._key} className="touren-step">
              <h3 className="touren-dash">
                {stepNumber(index)} {step.title}
              </h3>
              {step.text ? <p className="touren-small">{step.text}</p> : null}
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}

export function TourenGoals({ goals }: { goals: TourenContent['goals'] }) {
  return (
    <>
      <section className="touren-goals" aria-labelledby="touren-goals-title">
        <BlockHead head={goals} id="touren-goals-title" stacked />
        {goals.items.length > 0 ? (
          <ul className="touren-goals__list">
            {goals.items.map((item) => (
              <li key={item._key} className="touren-goal">
                <h3 className="touren-dash">{item.title}</h3>
                {item.text ? <p className="touren-small">{item.text}</p> : null}
              </li>
            ))}
          </ul>
        ) : null}
      </section>
      <Band image={goals.image} className="touren-rocks" />
    </>
  );
}

/**
 * The site map: entry screens → onboarding → the main screens, each with its pages. The first
 * screen's pages sit in a row above it (as in the design), the others' to the right.
 */
export function TourenSitemap({ sitemap }: { sitemap: TourenContent['sitemap'] }) {
  const [first, ...rest] = sitemap.screens;
  return (
    <section className="touren-sitemap" aria-labelledby="touren-sitemap-title">
      <BlockHead head={sitemap} id="touren-sitemap-title" />
      <div className="touren-map">
        {first ? (
          <ul className="touren-map__top" aria-label={first.name}>
            {splitList(first.pages ?? '').map((page) => (
              <li key={page} className="touren-node">
                {page}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="touren-map__grid">
          {sitemap.entry.length > 0 ? (
            <ul className="touren-map__entry">
              {sitemap.entry.map((entry) => (
                <li key={entry} className="touren-node">
                  {entry}
                </li>
              ))}
            </ul>
          ) : null}
          {sitemap.onboarding ? (
            <p className="touren-node touren-map__onboarding">{sitemap.onboarding}</p>
          ) : null}
          {first ? (
            <div className="touren-map__hub touren-map__hub--first">
              <p className="touren-node touren-node--hub">{first.name}</p>
            </div>
          ) : null}
          {rest.map((screen, index) => (
            <div
              key={screen._key}
              className="touren-map__screen"
              style={cssVars({ '--touren-row': index + 2 })}
            >
              <div
                className={cx(
                  'touren-map__hub',
                  index === rest.length - 1 && 'touren-map__hub--last',
                )}
              >
                <p className="touren-node touren-node--hub">{screen.name}</p>
              </div>
              <ul className="touren-map__pages" aria-label={screen.name}>
                {splitList(screen.pages ?? '').map((page) => (
                  <li key={page} className="touren-node">
                    {page}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TourenQuote({ quote }: { quote: TourenContent['quote'] }) {
  return (
    <figure className="touren-quote">
      <figcaption className="touren-quote__who">
        {quote.bubble ? <span className="touren-quote__bubble">{quote.bubble}</span> : null}
        <SiteImage image={quote.photo} sizes="6rem" className="touren-quote__photo" />
        {quote.role ? <span className="touren-quote__role">{quote.role}</span> : null}
      </figcaption>
      <blockquote className="touren-quote__text">
        <p>{quote.quote}</p>
      </blockquote>
    </figure>
  );
}

export function TourenShowcase({ showcase }: { showcase: TourenContent['showcase'] }) {
  return (
    <div className="touren-showcase">
      <Band image={showcase.tablet} className="touren-showcase__tablet" />
      <Band image={showcase.bento} className="touren-showcase__bento" />
      <Band image={showcase.phone} className="touren-showcase__phone" />
    </div>
  );
}
