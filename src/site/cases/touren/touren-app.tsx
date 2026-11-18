/**
 * Touren, the app part of the page: typography and colors, then one block per feature (home,
 * community, explore, profile, navigation, missions, condition reports, hazard alerts).
 */
import type { ReactNode } from 'react';

import { cx } from '../../components/ui/cn';
import { Band, Shot } from './touren-intro';
import { BlockHead, cssVars, Intro, Lines, Rows, Tags, type TourenContent } from './touren-parts';

type FeatureHead = {
  icon?: TourenContent['home']['icon'];
  label: string;
  title: string;
  lead?: string;
  note?: string;
  tags?: readonly string[];
};

/** A feature block: the head, the lead with its note and tags, then its pictures. */
function Feature({
  id,
  head,
  stacked = false,
  children,
}: {
  id: string;
  head: FeatureHead;
  stacked?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={cx('touren-feature', `touren-${id}`)}
      aria-labelledby={`touren-${id}-title`}
    >
      <BlockHead head={head} id={`touren-${id}-title`} stacked={stacked} />
      <Intro lead={head.lead} note={head.note} tags={head.tags} />
      {children}
    </section>
  );
}

export function TourenIdentity({ identity }: { identity: TourenContent['identity'] }) {
  const ink = identity.specimen ? (
    <>
      <span className="touren-abc touren-abc--ink">{identity.specimen}</span>
      <span className="touren-abc touren-abc--soft">{identity.specimen}</span>
      <span className="touren-abc touren-abc--paper">{identity.specimen}</span>
    </>
  ) : null;
  return (
    <section className="touren-identity" aria-labelledby="touren-identity-title">
      <BlockHead head={identity} id="touren-identity-title" />
      <div className="touren-type">
        <div className="touren-type__panel touren-type__panel--font">
          {identity.fontLabel ? <p className="touren-type__label">{identity.fontLabel}</p> : null}
          {identity.alphabet ? (
            <p className="touren-type__alphabet">
              <Lines text={identity.alphabet} />
            </p>
          ) : null}
        </div>
        <div className="touren-type__panel touren-type__panel--weights">
          {identity.typographyLabel ? (
            <p className="touren-type__label">{identity.typographyLabel}</p>
          ) : null}
          {identity.weights.length > 0 ? (
            <ul className="touren-type__weights">
              {identity.weights.map((weight, index) => (
                <li key={`${index}-${weight}`}>{weight}</li>
              ))}
            </ul>
          ) : null}
          <p className="touren-type__name">{identity.fontName}</p>
        </div>
        <div className="touren-type__specimen" aria-hidden="true">
          <ul className="touren-type__stripes">
            {identity.stripes.map((color, index) => (
              <li key={`${index}-${color}`} style={cssVars({ '--touren-stripe': color })} />
            ))}
          </ul>
          {ink}
          <span className="touren-type__veil" />
        </div>
        {identity.swatches.length > 0 ? (
          <ul className="touren-type__swatches">
            {identity.swatches.map((swatch) => (
              <li
                key={swatch._key}
                className={cx('touren-swatch', swatch.tone === 'light' && 'touren-swatch--light')}
                style={cssVars({ '--touren-swatch': swatch.hex })}
              >
                <span className="touren-swatch__name">{swatch.name}</span>
                <span className="touren-swatch__hex">
                  HEX {swatch.hex.replace('#', '').toUpperCase()}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <Band image={identity.icons} className="touren-identity__icons" />
    </section>
  );
}

export function TourenHome({ home }: { home: TourenContent['home'] }) {
  return (
    <Feature id="home" head={home}>
      <div className="touren-scene touren-scene--split">
        <span className="touren-panel touren-panel--left" />
        <span className="touren-panel touren-panel--right" />
        <Shot
          image={home.phone}
          sizes="(max-width: 63.9375rem) 80vw, 40vw"
          className="touren-home__phone"
        />
        <Shot
          image={home.leaderboard}
          sizes="(max-width: 63.9375rem) 80vw, 38vw"
          className="touren-home__leaderboard"
        />
      </div>
    </Feature>
  );
}

export function TourenCommunity({ community }: { community: TourenContent['community'] }) {
  return (
    <Feature id="community" head={community} stacked>
      <Shot
        image={community.image}
        sizes="(max-width: 63.9375rem) 100vw, 88vw"
        className="touren-wide-shot"
      />
    </Feature>
  );
}

export function TourenExplore({ explore }: { explore: TourenContent['explore'] }) {
  return (
    <Feature id="explore" head={explore}>
      <Band image={explore.image} className="touren-explore__band" />
    </Feature>
  );
}

export function TourenProfile({ profile }: { profile: TourenContent['profile'] }) {
  return (
    <Feature id="profile" head={profile} stacked>
      <Shot
        image={profile.image}
        sizes="(max-width: 63.9375rem) 100vw, 88vw"
        className="touren-wide-shot"
      />
    </Feature>
  );
}

export function TourenNavigation({ navigation }: { navigation: TourenContent['navigation'] }) {
  return (
    <Feature id="navigation" head={navigation} stacked>
      <div className="touren-scene touren-scene--navigation">
        <div className="touren-panel touren-panel--left touren-navigation__panel">
          {navigation.panelText ? <p className="touren-small">{navigation.panelText}</p> : null}
          <Tags items={navigation.panelTags} />
          {navigation.slogan ? (
            <p className="touren-slogan">
              <Lines text={navigation.slogan} />
            </p>
          ) : null}
        </div>
        <span className="touren-panel touren-panel--right" />
        <Shot
          image={navigation.image}
          sizes="(max-width: 63.9375rem) 100vw, 58vw"
          className="touren-navigation__phones"
        />
      </div>
    </Feature>
  );
}

export function TourenMission({ mission }: { mission: TourenContent['mission'] }) {
  return (
    <Feature id="mission" head={mission}>
      <div className="touren-scene touren-scene--split">
        <span className="touren-panel touren-panel--left" />
        <span className="touren-panel touren-panel--right" />
        <Shot
          image={mission.section}
          sizes="(max-width: 63.9375rem) 80vw, 37vw"
          className="touren-mission__section"
        />
        <Shot
          image={mission.level}
          sizes="(max-width: 63.9375rem) 80vw, 39vw"
          className="touren-mission__level"
        />
      </div>
    </Feature>
  );
}

export function TourenConditions({ conditions }: { conditions: TourenContent['conditions'] }) {
  return (
    <Feature id="conditions" head={conditions}>
      <Band image={conditions.image} className="touren-conditions__band" />
    </Feature>
  );
}

export function TourenHazard({ hazard }: { hazard: TourenContent['hazard'] }) {
  return (
    <Feature id="hazard" head={hazard}>
      <div className="touren-scene touren-scene--hazard">
        <span className="touren-panel touren-panel--left" />
        <Shot
          image={hazard.image}
          sizes="(max-width: 63.9375rem) 100vw, 48vw"
          className="touren-hazard__phones"
        />
        <div className="touren-panel touren-panel--right touren-hazard__panel">
          {hazard.panelTitle ? (
            <h3 className="touren-slogan">
              <Rows text={hazard.panelTitle} />
            </h3>
          ) : null}
          {hazard.panelText ? <p className="touren-small">{hazard.panelText}</p> : null}
          <Tags items={hazard.panelTags} />
        </div>
      </div>
    </Feature>
  );
}
