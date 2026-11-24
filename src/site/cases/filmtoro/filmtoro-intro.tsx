/**
 * Filmtoro, first part of the page: hero, about, design process, the phone in a hand with the
 * community card, logo and screens, info architecture, profile screens, colors and typography.
 */
import { getTranslations } from 'next-intl/server';

import { cx } from '../../components/ui/cn';
import { SiteImage } from '../../components/ui/site-image';
import {
  cssVars,
  type FilmtoroContent,
  Head,
  linesOf,
  Picture,
  SIZES,
  splitList,
} from './filmtoro-parts';

export function FilmtoroHero({ hero }: { hero: FilmtoroContent['hero'] }) {
  return (
    <section className="filmtoro-hero">
      {hero.facts.length > 0 ? (
        <dl className="filmtoro-facts">
          {hero.facts.map((fact) => (
            <div key={fact._key} className="filmtoro-facts__item">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {hero.name ? (
        <p className="filmtoro-hero__name" aria-hidden="true">
          {hero.name}
        </p>
      ) : null}
      <Picture
        image={hero.phones}
        sizes="(max-width: 63.9375rem) 80vw, 46vw"
        priority
        className="filmtoro-hero__phones"
      />
    </section>
  );
}

export function FilmtoroAbout({ about }: { about: FilmtoroContent['about'] }) {
  return (
    <section className="filmtoro-about" aria-labelledby="filmtoro-about-label">
      {about.label ? (
        <h2 id="filmtoro-about-label" className="filmtoro-kicker">
          {about.label}
        </h2>
      ) : null}
      <p className="filmtoro-about__lead">{about.lead}</p>
      {about.note ? <p className="filmtoro-note filmtoro-about__note">{about.note}</p> : null}
    </section>
  );
}

export function FilmtoroProcess({ process }: { process: FilmtoroContent['process'] }) {
  return (
    <section className="filmtoro-process" aria-labelledby="filmtoro-process-title">
      <Head id="filmtoro-process-title" head={process} className="filmtoro-head--stack" />
      {process.groups.length > 0 ? (
        <ol className="filmtoro-stages">
          {process.groups.map((group) => (
            <li key={group._key} className="filmtoro-stage">
              <h3 className="filmtoro-stage__title">{group.title}</h3>
              <ul className="filmtoro-stage__items">
                {linesOf(group.items).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}

export function FilmtoroCommunity({ community }: { community: FilmtoroContent['community'] }) {
  return (
    <section className="filmtoro-community" aria-labelledby="filmtoro-community-title">
      <Picture image={community.scene} sizes={SIZES.full} className="filmtoro-community__scene" />
      <div className="filmtoro-card">
        <SiteImage image={community.icon} sizes="3rem" className="filmtoro-card__icon" />
        <h2 id="filmtoro-community-title" className="filmtoro-card__title">
          {community.title}
        </h2>
        {community.text ? <p className="filmtoro-card__text">{community.text}</p> : null}
      </div>
    </section>
  );
}

export function FilmtoroBrand({ brand }: { brand: FilmtoroContent['brand'] }) {
  return (
    <div className="filmtoro-brand">
      <figure className="filmtoro-tile filmtoro-brand__logo">
        {brand.logoLabel ? (
          <figcaption className="filmtoro-tile__label">{brand.logoLabel}</figcaption>
        ) : null}
        <SiteImage image={brand.logo} sizes="14rem" className="filmtoro-brand__logo-img" />
      </figure>
      <Picture
        image={brand.phone}
        sizes={SIZES.half}
        className="filmtoro-tile filmtoro-brand__phone"
      />
      <figure className="filmtoro-tile filmtoro-brand__menu">
        {brand.menuLabel ? (
          <figcaption className="filmtoro-tile__label">{brand.menuLabel}</figcaption>
        ) : null}
        <SiteImage image={brand.menu} sizes={SIZES.half} className="filmtoro-brand__menu-img" />
      </figure>
    </div>
  );
}

export function FilmtoroArchitecture({
  architecture,
}: {
  architecture: FilmtoroContent['architecture'];
}) {
  return (
    <section className="filmtoro-architecture" aria-labelledby="filmtoro-architecture-title">
      <Head id="filmtoro-architecture-title" head={architecture} className="filmtoro-head--split" />
      <Picture image={architecture.map} sizes={SIZES.wide} className="filmtoro-architecture__map" />
      {architecture.hubs.length > 0 ? (
        <ul className="filmtoro-hubs">
          {architecture.hubs.map((hub) => (
            <li key={hub._key} className="filmtoro-hub">
              <h3 className="filmtoro-hub__name">{hub.name}</h3>
              <ul className="filmtoro-hub__pages">
                {splitList(hub.pages).map((page) => (
                  <li key={page}>{page}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function FilmtoroShowcase({ showcase }: { showcase: FilmtoroContent['showcase'] }) {
  return (
    <div className="filmtoro-showcase">
      <Picture image={showcase.tile} sizes={SIZES.wide} className="filmtoro-tile" />
      <Picture image={showcase.bento} sizes={SIZES.wide} className="filmtoro-tile" />
    </div>
  );
}

/** "#164364" → "22 / 67 / 100 / 100%" (red / green / blue / opacity), as in the design. */
const rgbOf = (hex: string) => {
  const value = hex.replace('#', '');
  const full = value.length === 3 ? [...value].map((digit) => digit + digit).join('') : value;
  const channels = [0, 2, 4].map((start) => Number.parseInt(full.slice(start, start + 2), 16));
  return channels.some(Number.isNaN) ? '' : `${channels.join(' / ')} / 100%`;
};

export async function FilmtoroIdentity({ identity }: { identity: FilmtoroContent['identity'] }) {
  const t = await getTranslations('cases');
  return (
    <section className="filmtoro-identity" aria-labelledby="filmtoro-identity-title">
      <Head id="filmtoro-identity-title" head={identity} className="filmtoro-head--split" />
      <div className="filmtoro-type">
        <div className="filmtoro-type__font">
          <div className="filmtoro-type__top">
            {identity.fontLabel ? <p>{identity.fontLabel}</p> : null}
            {identity.sizes.length > 0 ? (
              <ul className="filmtoro-type__sizes">
                {identity.sizes.map((size, index) => (
                  <li key={`${index}-${size}`}>{size}</li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="filmtoro-type__name">
            <p className="filmtoro-type__family">{identity.fontName}</p>
            {identity.fontCredit ? (
              <p className="filmtoro-type__credit">{identity.fontCredit}</p>
            ) : null}
          </div>
          {identity.alphabet ? (
            <p className="filmtoro-type__alphabet">
              {linesOf(identity.alphabet).map((line) => (
                <span key={line} className="filmtoro-line">
                  {line}
                </span>
              ))}
            </p>
          ) : null}
        </div>
        <p className="filmtoro-type__specimen" aria-hidden="true">
          <span>{identity.specimen}</span>
        </p>
      </div>
      {identity.swatches.length > 0 ? (
        <ul className="filmtoro-swatches">
          {identity.swatches.map((swatch) => (
            <li
              key={swatch._key}
              className={cx('filmtoro-swatch', swatch.tone === 'dark' && 'filmtoro-swatch--dark')}
              style={cssVars({ '--filmtoro-swatch': swatch.hex })}
            >
              <p className="filmtoro-swatch__name">{swatch.name}</p>
              <dl className="filmtoro-swatch__codes">
                <div>
                  <dt>{t('hex')}</dt>
                  <dd>{swatch.hex.toUpperCase()}</dd>
                </div>
                <div>
                  <dt>{t('rgb')}</dt>
                  <dd>{rgbOf(swatch.hex)}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
