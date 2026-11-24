/**
 * The blocks of the Filmtoro case, in page order. Each block is a slide: the picture of the
 * design without its texts and the live texts placed where the design has them
 * (positions: `filmtoro-t` rules in case-filmtoro.css).
 */
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import { cx } from '../../components/ui/cn';
import { SiteImage } from '../../components/ui/site-image';
import {
  cssVars,
  type FilmtoroContent,
  linesOf,
  Marked,
  Rows,
  Slide,
  splitList,
} from './filmtoro-parts';

type Props<K extends keyof FilmtoroContent> = { content: FilmtoroContent[K] };

/** A text placed on a slide. */
function T({
  as: Tag = 'p',
  name,
  id,
  children,
}: {
  as?: 'p' | 'h2';
  name: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <Tag id={id} className={cx('filmtoro-t', `filmtoro-${name}`)}>
      {children}
    </Tag>
  );
}

export function FilmtoroHero({ content }: Props<'hero'>) {
  return (
    <Slide
      name="hero"
      label="Filmtoro"
      desktop={content.image}
      mobile={content.imagesMobile}
      priority
    />
  );
}

export function FilmtoroAbout({ content }: Props<'about'>) {
  return (
    <Slide name="about" labelledBy="filmtoro-about-title">
      <T as="h2" name="about-title" id="filmtoro-about-title">
        <Rows text={content.title} />
      </T>
      {content.text ? <T name="about-text">{content.text}</T> : null}
      {content.photos.length > 0 ? (
        <ul className="filmtoro-faces" aria-hidden="true">
          {content.photos.map((photo, index) => (
            <li key={photo ? photo.id : index}>
              <SiteImage
                image={photo ? { ...photo, alt: '' } : null}
                sizes="4rem"
                className="filmtoro-faces__img"
              />
            </li>
          ))}
        </ul>
      ) : null}
      {content.quote ? (
        <T name="about-quote">
          <Marked text={content.quote} />
        </T>
      ) : null}
    </Slide>
  );
}

export function FilmtoroProcess({ content }: Props<'process'>) {
  return (
    <Slide name="process" labelledBy="filmtoro-process-label">
      <h2 id="filmtoro-process-label" className="filmtoro-label filmtoro-process-label">
        {content.label}
      </h2>
      {content.lead ? <T name="process-lead">{content.lead}</T> : null}
      {content.note ? <T name="process-note">{content.note}</T> : null}
      {content.groups.length > 0 ? (
        <ol className="filmtoro-stages">
          {content.groups.map((group) => (
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
    </Slide>
  );
}

export function FilmtoroCommunity({ content }: Props<'community'>) {
  return (
    <Slide
      name="community"
      labelledBy="filmtoro-community-title"
      desktop={content.image}
      mobile={content.imagesMobile}
    >
      <T as="h2" name="community-title" id="filmtoro-community-title">
        {content.title}
      </T>
      {content.text ? <T name="community-text">{content.text}</T> : null}
    </Slide>
  );
}

export function FilmtoroBrand({ content }: Props<'brand'>) {
  return (
    <Slide
      name="brand"
      label={[content.logoLabel, content.menuLabel].filter(Boolean).join(', ')}
      desktop={content.image}
      mobile={content.imagesMobile}
    >
      {content.logoLabel ? <T name="brand-logo">{content.logoLabel}</T> : null}
      {content.menuLabel ? <T name="brand-menu">{content.menuLabel}</T> : null}
    </Slide>
  );
}

export function FilmtoroArchitecture({ content }: Props<'architecture'>) {
  return (
    <Slide name="architecture" labelledBy="filmtoro-architecture-label" desktop={content.image}>
      <T as="h2" name="architecture-label" id="filmtoro-architecture-label">
        {content.label}
      </T>
      {content.text ? (
        <T name="architecture-text">
          <Marked text={content.text} />
        </T>
      ) : null}
      {content.hubs.length > 0 ? (
        <ul className="filmtoro-hubs">
          {content.hubs.map((hub) => (
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
    </Slide>
  );
}

export function FilmtoroShowcase({ content }: Props<'showcase'>) {
  return (
    <Slide
      name="showcase"
      label={content.image?.alt}
      desktop={content.image}
      mobile={content.imagesMobile}
    />
  );
}

/** "#164364" → "22 / 67 / 100 / 100%" (red / green / blue / opacity), as in the design. */
const rgbOf = (hex: string) => {
  const value = hex.replace('#', '');
  const full = value.length === 3 ? [...value].map((digit) => digit + digit).join('') : value;
  const channels = [0, 2, 4].map((start) => Number.parseInt(full.slice(start, start + 2), 16));
  return channels.some(Number.isNaN) ? '' : `${channels.join(' / ')} / 100%`;
};

export async function FilmtoroIdentity({ content }: Props<'identity'>) {
  const t = await getTranslations('cases');
  return (
    <Slide name="identity" labelledBy="filmtoro-identity-label">
      <h2 id="filmtoro-identity-label" className="filmtoro-label filmtoro-identity-label">
        {content.label}
      </h2>
      {content.text ? <T name="identity-text">{content.text}</T> : null}
      <div className="filmtoro-type">
        <div className="filmtoro-type__top">
          {content.fontLabel ? <p>{content.fontLabel}</p> : null}
          {content.sizes.length > 0 ? (
            <ul className="filmtoro-type__sizes">
              {content.sizes.map((size, index) => (
                <li key={`${index}-${size}`}>{size}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <p className="filmtoro-type__family">{content.fontName}</p>
        {content.fontCredit ? <p className="filmtoro-type__credit">{content.fontCredit}</p> : null}
        {content.alphabet ? (
          <p className="filmtoro-type__alphabet">
            {linesOf(content.alphabet).map((line) => (
              <span key={line} className="filmtoro-row">
                {line}
              </span>
            ))}
          </p>
        ) : null}
      </div>
      <p className="filmtoro-specimen" aria-hidden="true">
        <span>{content.specimen}</span>
      </p>
      {content.swatches.length > 0 ? (
        <ul className="filmtoro-swatches">
          {content.swatches.map((swatch) => (
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
    </Slide>
  );
}

export function FilmtoroHome({ content }: Props<'home'>) {
  return (
    <Slide
      name="home"
      labelledBy="filmtoro-home-title"
      desktop={content.image}
      mobile={content.imagesMobile}
    >
      <T as="h2" name="home-title" id="filmtoro-home-title">
        <Rows text={content.title} />
      </T>
      {content.lead ? <T name="home-lead">{content.lead}</T> : null}
      {content.note ? (
        <T name="home-note">
          <Marked text={content.note} />
        </T>
      ) : null}
      {content.card ? <T name="home-card">{content.card}</T> : null}
    </Slide>
  );
}

export function FilmtoroDiscover({ content }: Props<'discover'>) {
  return (
    <Slide
      name="discover"
      label={content.image?.alt}
      desktop={content.image}
      mobile={content.imagesMobile}
    >
      {content.text ? (
        <T name="discover-text">
          <Marked text={content.text} />
        </T>
      ) : null}
    </Slide>
  );
}

/** A feature block: title (h2), its texts in order, on the pictures. */
function Feature({
  name,
  content,
  texts,
}: {
  name: string;
  content: {
    image: FilmtoroContent['reels']['image'];
    imagesMobile: FilmtoroContent['reels']['imagesMobile'];
    title: string;
  };
  texts: readonly (readonly [string, string | null | undefined])[];
}) {
  const id = `filmtoro-${name}-title`;
  return (
    <Slide name={name} labelledBy={id} desktop={content.image} mobile={content.imagesMobile}>
      <T as="h2" name={`${name}-title`} id={id}>
        <Rows text={content.title} />
      </T>
      {texts.map(([part, value]) =>
        value ? (
          <T key={part} name={`${name}-${part}`}>
            <Marked text={value} />
          </T>
        ) : null,
      )}
    </Slide>
  );
}

export function FilmtoroReels({ content }: Props<'reels'>) {
  return <Feature name="reels" content={content} texts={[['text', content.text]]} />;
}

export function FilmtoroPosts({ content }: Props<'posts'>) {
  return (
    <Feature
      name="posts"
      content={content}
      texts={[
        ['lead', content.lead],
        ['text', content.text],
        ['note', content.note],
      ]}
    />
  );
}

export function FilmtoroProfile({ content }: Props<'profile'>) {
  return (
    <Feature
      name="profile"
      content={content}
      texts={[
        ['text', content.text],
        ['note', content.note],
      ]}
    />
  );
}

export function FilmtoroDetails({ content }: Props<'details'>) {
  return (
    <Feature
      name="details"
      content={{ ...content, image: null, imagesMobile: [] }}
      texts={[
        ['lead', content.lead],
        ['note', content.note],
      ]}
    />
  );
}

export function FilmtoroCreate({ content }: Props<'create'>) {
  return (
    <Feature
      name="create"
      content={content}
      texts={[
        ['text', content.text],
        ['note', content.note],
      ]}
    />
  );
}

export function FilmtoroLists({ content }: Props<'lists'>) {
  return (
    <Feature
      name="lists"
      content={content}
      texts={[
        ['text', content.text],
        ['note', content.note],
      ]}
    />
  );
}

export function FilmtoroQuizzes({ content }: Props<'quizzes'>) {
  return (
    <Feature
      name="quizzes"
      content={content}
      texts={[
        ['text', content.text],
        ['note', content.note],
      ]}
    />
  );
}
