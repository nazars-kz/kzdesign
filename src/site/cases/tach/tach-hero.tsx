import type { PageViewProps } from '@/core/content/page-route';

import { SiteImage } from '../../components/ui/site-image';
import { TachLogo } from './tach-logo';
import { Accent, BellIcon, cssVars, FuelIcon, GearIcon, MarkIcon, MoreIcon } from './tach-parts';

type Content = PageViewProps<'case-tach'>['content'];

/** The savings-goal card of the product ("Fuel 80%"): in the hero and on the cap mock-up. */
export function GoalCard({ hero }: { hero: Content['hero'] }) {
  return (
    <div className="tach-goal">
      <div className="tach-goal__head">
        <span className="tach-goal__title">
          <FuelIcon className="tach-goal__icon" />
          {hero.goalTitle}
        </span>
        <MoreIcon className="tach-goal__more" />
      </div>
      <p className="tach-goal__sum">
        <span>{hero.goalAmount}</span>
        <span>{hero.goalPercent}%</span>
      </p>
      <span
        className="tach-goal__bar"
        style={cssVars({ '--tach-progress': `${hero.goalPercent}%` })}
      />
      <p className="tach-goal__note">{hero.goalNote}</p>
    </div>
  );
}

/** First screen: the trucker photo, the orange line that passes behind him, the lead and two cards. */
export function TachHero({
  hero,
  avatar,
}: {
  hero: Content['hero'];
  avatar: Content['card']['industryThumb'];
}) {
  return (
    <section className="tach-hero" aria-labelledby="tach-title">
      <div className="tach-hero__stage" aria-hidden="true">
        <SiteImage
          image={hero.photo}
          sizes="(max-width: 60rem) 1100px, (min-width: 120rem) 3200px, 167vw"
          priority
          className="tach-hero__photo"
        />
        <div className="tach-hero__frame">
          <svg
            className="tach-hero__swoosh"
            viewBox="0 0 2304 718"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              pathLength="1"
              d="M-1400 1514L28.2971 636.216C247.769 501.182 689.168 269.347 972.843 239.808M972.843 239.808C1033.34 233.509 1086.66 236.41 1129.13 251.413C1431.14 358.103 973.117 690.676 936.718 357.909C932.21 316.699 945.562 276.62 972.843 239.808ZM972.843 239.808C1165.85 -20.6323 2055.99 -117.587 2250.61 704.707L2700 2650"
            />
          </svg>
          <SiteImage
            image={hero.person ? { ...hero.person, alt: '' } : null}
            sizes="(max-width: 60rem) 700px, (min-width: 120rem) 1920px, 100vw"
            className="tach-hero__person"
          />
        </div>
      </div>
      <div className="tach-hero__inner">
        <h1 id="tach-title" className="sr-only">
          {hero.heading}
        </h1>
        <TachLogo className="tach-hero__logo" />
        <p className="tach-hero__lead">
          <Accent text={hero.lead} />
        </p>
        <div className="tach-hero__cards">
          <div className="tach-screen">
            <span className="tach-screen__title">
              <MarkIcon className="tach-screen__mark" />
              {hero.screenTitle}
            </span>
            <span className="tach-screen__tools">
              <GearIcon className="tach-screen__tool" />
              <BellIcon className="tach-screen__tool" />
              <span className="tach-screen__avatar">
                <SiteImage image={avatar ? { ...avatar, alt: '' } : null} sizes="3rem" />
              </span>
            </span>
          </div>
          <GoalCard hero={hero} />
        </div>
      </div>
    </section>
  );
}
