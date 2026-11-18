import type { PageViewProps } from '@/core/content/page-route';

import { SiteImage } from '../../components/ui/site-image';
import { Accent, cssVars, Head, Shot } from './onground-parts';

type Content = PageViewProps<'case-onground'>['content'];

/** The dark first screen: a thin bar with the studio, the service and the year over the picture. */
export function OngroundHero({ hero }: { hero: Content['hero'] }) {
  return (
    <section className="og-hero" aria-labelledby="og-title">
      <h1 id="og-title" className="sr-only">
        {hero.heading}
      </h1>
      <SiteImage image={hero.image} sizes="100vw" priority className="og-hero__image" />
      <div className="og-hero__bar">
        <span>{hero.studio}</span>
        <span>{hero.service}</span>
        <span>{hero.year}</span>
      </div>
    </section>
  );
}

/** "// About": the title, a short intro and the lead. */
export function OngroundOverview({ overview }: { overview: Content['overview'] }) {
  return (
    <section className="og-overview og-grey" aria-labelledby="og-overview-title">
      <div className="og-overview__grid">
        <div className="og-overview__left">
          <Head eyebrow={overview.eyebrow} title={overview.title} id="og-overview-title" />
          <p className="og-small og-overview__intro">{overview.intro}</p>
        </div>
        <div className="og-overview__right">
          <p className="og-lead">
            <Accent text={overview.lead} />
          </p>
          <p className="og-note">{overview.note}</p>
        </div>
      </div>
    </section>
  );
}

/** "// Process": the design phases as a zig-zag of chips. */
export function OngroundProcess({ process }: { process: Content['process'] }) {
  return (
    <section className="og-process" aria-labelledby="og-process-title">
      <Head eyebrow={process.eyebrow} title={process.title} id="og-process-title" />
      <p className="og-small og-process__text">{process.text}</p>
      <ol className="og-phases">
        {process.phases.map((phase, index) => (
          <li
            key={phase._key}
            className="og-phase"
            data-tone={phase.tone}
            data-lowered={phase.lowered}
            style={cssVars({ '--og-i': index })}
          >
            {phase.label}
          </li>
        ))}
      </ol>
    </section>
  );
}

/** The sign-up laptop and the plane, then the yellow block that links to the motion video. */
export function OngroundVisuals({
  visuals,
  video,
}: {
  visuals: Content['visuals'];
  video: Content['video'];
}) {
  return (
    <>
      <div className="og-pair">
        <Shot image={visuals.signup} sizes="(min-width: 48rem) 50vw, 100vw" />
        <figure className="og-tile og-tile--plane">
          <SiteImage
            image={visuals.plane}
            sizes="(min-width: 48rem) 70vw, 140vw"
            className="og-plane"
          />
        </figure>
      </div>
      <section className="og-video">
        <a
          className="og-video__link"
          href={video.link.href || undefined}
          {...(video.link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {video.link.label}
        </a>
        <span className="og-video__badge">{video.badge}</span>
      </section>
    </>
  );
}

/** "// Task and Goals": the four goals next to the title, then two pictures. */
export function OngroundGoals({ goals }: { goals: Content['goals'] }) {
  return (
    <>
      <section className="og-goals" aria-labelledby="og-goals-title">
        <span className="og-swoosh og-swoosh--goals" aria-hidden="true" />
        <div className="og-goals__grid">
          <Head eyebrow={goals.eyebrow} title={goals.title} id="og-goals-title" />
          <ul className="og-goals__list">
            {goals.goals.map((goal) => (
              <li key={goal._key} className="og-goal">
                <h3 className="og-goal__title">{goal.title}</h3>
                <p className="og-goal__text">{goal.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="og-pair">
        <Shot image={goals.sky} sizes="(min-width: 48rem) 50vw, 100vw" />
        <Shot image={goals.badge} sizes="(min-width: 48rem) 50vw, 100vw" />
      </div>
    </>
  );
}
