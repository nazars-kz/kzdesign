import type { PageViewProps } from '@/core/content/page-route';

import { SiteImage } from '../../components/ui/site-image';
import { Chips, cssVars, Head, Lines, Shot } from './onground-parts';

type Content = PageViewProps<'case-onground'>['content'];

const lines = (text: string) => text.split('\n').filter(Boolean);

/** "// Info Architecture": three rows, an entry point and the sections of one side. */
export function OngroundArchitecture({ architecture }: { architecture: Content['architecture'] }) {
  return (
    <section className="og-dark og-architecture" aria-labelledby="og-arch-title">
      <Head eyebrow={architecture.eyebrow} title={architecture.title} id="og-arch-title" />
      <ul className="og-arch">
        {architecture.rows.map((row, index) => (
          <li key={row._key} className="og-arch__row" style={cssVars({ '--og-i': index })}>
            <span className="og-arch__entry">{row.entry}</span>
            <ul className="og-arch__steps">
              {lines(row.steps).map((step) => (
                <li key={step} className="og-arch__step">
                  {step}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** "// UI Design": the type specimen, the weights and the four colors. */
export function OngroundTypography({ typography }: { typography: Content['typography'] }) {
  const weights = lines(typography.weights);
  return (
    <section className="og-dark og-typography" aria-labelledby="og-type-title">
      <Head eyebrow={typography.eyebrow} title={typography.title} id="og-type-title" />
      <div className="og-specimen">
        <div className="og-specimen__yellow">
          <div className="og-specimen__in">
            <div className="og-specimen__top">
              <p className="og-specimen__label">{typography.typefaceLabel}</p>
              <p className="og-specimen__chars">
                <Lines text={typography.alphabet} />
              </p>
            </div>
            <p className="og-specimen__name">{typography.fontName}</p>
            <p className="og-specimen__text">{typography.fontText}</p>
          </div>
        </div>
        <div className="og-specimen__dark">
          <div className="og-specimen__in">
            <ul className="og-weights">
              {weights.map((weight, index) => (
                <li key={weight} className="og-weight" style={cssVars({ '--og-i': index })}>
                  <span className="og-weight__name">{weight}</span>
                  <span className="og-weight__glyph" aria-hidden="true">
                    {typography.glyph}
                  </span>
                </li>
              ))}
            </ul>
            <p className="og-specimen__credit">
              <Lines text={typography.credit} />
            </p>
          </div>
        </div>
      </div>
      <div className="og-colors">
        <span className="og-swoosh og-swoosh--colors-left" aria-hidden="true" />
        <span className="og-swoosh og-swoosh--colors-right" aria-hidden="true" />
        <ul className="og-colors__list">
          {typography.colors.map((color, index) => (
            <li
              key={color._key}
              className="og-color"
              data-tone={color.tone}
              style={cssVars({ '--og-swatch': color.hex, '--og-i': index })}
            >
              {color.hex.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** A label, two columns of text under a section title. */
function TextColumns({ chip, left, right }: { chip: string; left: string; right: string }) {
  return (
    <div className="og-block">
      <Chips items={[chip]} />
      <div className="og-columns">
        <p className="og-body">{left}</p>
        <p className="og-small">{right}</p>
      </div>
    </div>
  );
}

/** "// Dashboard": vendor and client dashboards with a coded chart and total card. */
export function OngroundDashboard({ dashboard }: { dashboard: Content['dashboard'] }) {
  return (
    <section className="og-dashboard" aria-labelledby="og-dashboard-title">
      <Head eyebrow={dashboard.eyebrow} title={dashboard.title} id="og-dashboard-title" />
      <TextColumns
        chip={dashboard.vendorChip}
        left={dashboard.vendorLeft}
        right={dashboard.vendorRight}
      />
      <div className="og-pair">
        <figure className="og-tile og-tile--phone">
          <SiteImage
            image={dashboard.phone}
            sizes="(min-width: 48rem) 34vw, 70vw"
            className="og-phone"
          />
        </figure>
        <figure className="og-tile og-tile--aisle">
          <SiteImage
            image={dashboard.aisle}
            sizes="(min-width: 48rem) 50vw, 100vw"
            className="og-shot"
          />
          <div className="og-overlay">
            <div className="og-chart">
              <p className="og-chart__title">
                {dashboard.chartTitle}
                <span className="og-chart__go" aria-hidden="true">
                  →
                </span>
              </p>
              <div className="og-chart__plot">
                <span className="og-chart__axis">{dashboard.chartAxis}</span>
                <ol className="og-chart__bars">
                  {dashboard.chartBars.map((bar) => (
                    <li
                      key={bar._key}
                      className="og-bar"
                      style={cssVars({
                        '--og-earn': `${(bar.earnings / 5) * 100}%`,
                        '--og-pend': `${(bar.pending / 5) * 100}%`,
                      })}
                    >
                      <span className="og-bar__pending" />
                      <span className="og-bar__earnings" />
                      <span className="og-bar__month">{bar.month}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="og-total">
              <p className="og-total__title">{dashboard.totalTitle}</p>
              <p className="og-total__note">{dashboard.totalNote}</p>
              <p className="og-total__row" data-tone="green">
                <span className="og-total__icon">$</span>
                <span className="og-total__label">{dashboard.earningsLabel}</span>
                <span className="og-total__value">
                  {dashboard.earningsValue}
                  <span className="og-total__delta">{dashboard.earningsDelta}</span>
                </span>
              </p>
              <p className="og-total__row" data-tone="yellow">
                <span className="og-total__icon">↻</span>
                <span className="og-total__label">{dashboard.payoutsLabel}</span>
                <span className="og-total__value">{dashboard.payoutsValue}</span>
              </p>
            </div>
          </div>
        </figure>
      </div>
      <TextColumns
        chip={dashboard.clientChip}
        left={dashboard.clientLeft}
        right={dashboard.clientRight}
      />
      <div className="og-pair">
        <Shot image={dashboard.clouds} sizes="(min-width: 48rem) 50vw, 100vw" />
        <figure className="og-tile og-tile--laptop">
          <SiteImage
            image={dashboard.laptop}
            sizes="(min-width: 48rem) 70vw, 140vw"
            className="og-laptop"
          />
        </figure>
      </div>
    </section>
  );
}
