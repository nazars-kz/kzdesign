import type { PageViewProps } from '@/core/content/page-route';

import { SiteImage } from '../../components/ui/site-image';
import { GoalCard } from './tach-hero';
import { TachLogo } from './tach-logo';
import { Chapter, cssVars, MarkIcon, Rows, Shot } from './tach-parts';

type Content = PageViewProps<'case-tach'>['content'];

/** The two type specimens: the first over the photo (Hanken Grotesk), the second on white (IBM Plex Sans). */
const FONT_VARIANTS = ['hanken', 'plex'] as const;

/** 01 Brand identity: logo, colors, fonts, branded mock-ups. Everything but the photos is code. */
export function TachBrand({ brand, hero }: { brand: Content['brand']; hero: Content['hero'] }) {
  return (
    <section className="tach-brand" aria-labelledby="tach-brand-title">
      <Chapter
        id="tach-brand-title"
        eyebrow={brand.eyebrow}
        title={brand.title}
        text={brand.text}
      />

      <div className="tach-logogrid" aria-hidden="true">
        <div className="tach-logogrid__frame">
          <TachLogo />
          <span className="tach-logogrid__measure tach-logogrid__measure--wide">
            {brand.gridWide}
          </span>
          <span className="tach-logogrid__measure tach-logogrid__measure--tall">
            {brand.gridTall}
          </span>
        </div>
      </div>

      <div className="tach-logopanel tach-tile" aria-hidden="true">
        <TachLogo className="tach-logopanel__logo" />
      </div>

      <ul className="tach-swatches">
        {brand.colors.map((color, index) => (
          <li
            key={color._key}
            className="tach-swatch"
            data-tone={color.tone}
            style={cssVars({ '--tach-swatch': color.hex })}
          >
            <p className="tach-swatch__name">{color.name}</p>
            <p className="tach-swatch__code">
              {brand.hexLabel} {color.hex.toUpperCase()}
              <br />
              {brand.rgbLabel} {color.rgb}
            </p>
            {index === 0 ? (
              <div className="tach-swatch__intro">
                <h3 className="tach-swatch__title">
                  <Rows text={brand.colorsTitle} />
                </h3>
                <p className="tach-swatch__text">{brand.colorsText}</p>
              </div>
            ) : null}
          </li>
        ))}
      </ul>

      <div className="tach-fonts">
        {brand.fonts.map((font, index) => {
          const variant = FONT_VARIANTS[index] ?? FONT_VARIANTS[1];
          return (
            <div key={font._key} className="tach-font tach-tile" data-font={variant}>
              {index === 0 ? (
                <SiteImage
                  image={brand.fontPhoto}
                  sizes="(min-width: 64rem) 50vw, 100vw"
                  className="tach-shot tach-font__photo"
                />
              ) : null}
              <div className="tach-font__in">
                <p className="tach-font__label">{brand.fontLabel}</p>
                <p className="tach-font__name">
                  <Rows text={font.name} />
                </p>
                <p className="tach-font__alphabet">{font.alphabet}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="tach-pair">
        <div className="tach-tile tach-cards">
          <SiteImage
            image={brand.cardsImage}
            sizes="(min-width: 64rem) 40vw, 80vw"
            className="tach-cards__img"
          />
        </div>
        <div className="tach-tile tach-cap">
          <SiteImage
            image={brand.capImage}
            sizes="(min-width: 64rem) 40vw, 90vw"
            className="tach-cap__img"
          />
          <div className="tach-cap__goal">
            <GoalCard hero={hero} />
          </div>
          <div className="tach-cap__carrier">
            <span className="tach-cap__badge">
              <MarkIcon className="tach-cap__mark" />
            </span>
            <div>
              <p className="tach-cap__role">{brand.carrierTitle}</p>
              <p className="tach-cap__text">{brand.carrierText}</p>
            </div>
          </div>
        </div>
      </div>

      <Shot image={brand.billboard} sizes="100vw" />
    </section>
  );
}
