/**
 * The blocks of the PrintBuy case page, in page order. Places and sizes come from the design
 * (case-printbuy.css); here only the structure and the content.
 */
import {
  Picture,
  type PrintbuyContent,
  Icon,
  Note,
  Paragraphs,
  Rows,
  WIDE_SIZES,
  cssVars,
  splitList,
} from './printbuy-parts';

export function PrintbuyHero({ hero }: { hero: PrintbuyContent['hero'] }) {
  return (
    <div className="printbuy-hero">
      <Picture image={hero.image} sizes={WIDE_SIZES} priority className="printbuy-hero__img" />
    </div>
  );
}

export function PrintbuyOverview({
  overview,
  focus,
}: {
  overview: PrintbuyContent['overview'];
  focus: PrintbuyContent['focus'];
}) {
  return (
    <div className="printbuy-overview">
      <div className="printbuy-overview__text">
        <Paragraphs text={overview.text} className="printbuy-lead" />
      </div>
      {overview.facts.length > 0 ? (
        <dl className="printbuy-facts">
          {overview.facts.map((fact, index) => (
            <div
              key={fact._key}
              className="printbuy-fact"
              style={cssVars({ '--printbuy-i': index })}
            >
              <dt className="printbuy-fact__label">{fact.label}</dt>
              <dd className="printbuy-fact__values">
                {splitList(fact.values).map((value) => (
                  <span key={value} className="printbuy-fact__value">
                    {value}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
      <section className="printbuy-focus" aria-labelledby="printbuy-focus-title">
        <h2 id="printbuy-focus-title" className="printbuy-title">
          {focus.title}
        </h2>
        {focus.text ? <p className="printbuy-text">{focus.text}</p> : null}
      </section>
    </div>
  );
}

export function PrintbuySchedules({ schedules }: { schedules: PrintbuyContent['schedules'] }) {
  return (
    <section className="printbuy-schedules" aria-labelledby="printbuy-users-title">
      <div className="printbuy-slide printbuy-schedules__slide">
        <Picture image={schedules.image} sizes={WIDE_SIZES} />
      </div>
      <div className="printbuy-schedules__text">
        <h2 id="printbuy-users-title" className="printbuy-title">
          {schedules.title}
        </h2>
        <div className="printbuy-text printbuy-paras">
          <Paragraphs text={schedules.text} />
        </div>
        <Note text={schedules.note} tone="purple" className="printbuy-schedules__note" />
      </div>
    </section>
  );
}

export function PrintbuyCurve({ curve }: { curve: PrintbuyContent['curve'] }) {
  return (
    <section className="printbuy-curve" aria-labelledby="printbuy-curve-title">
      <div className="printbuy-curve__stage">
        <div className="printbuy-curve__head">
          <h2 id="printbuy-curve-title" className="printbuy-curve__title">
            <Rows text={curve.title} />
          </h2>
          {curve.text ? (
            <p className="printbuy-curve__text">
              <Rows text={curve.text} />
            </p>
          ) : null}
        </div>
        <div className="printbuy-curve__art">
          <Picture image={curve.background} sizes={WIDE_SIZES} className="printbuy-curve__bg" />
          <Picture
            image={curve.phone}
            sizes="(max-width: 63.9375rem) 40vw, 36vw"
            className="printbuy-curve__phone"
          />
        </div>
      </div>
      <div className="printbuy-curve__after">
        <Note text={curve.note} tone="green" className="printbuy-card printbuy-curve__note" />
      </div>
    </section>
  );
}

export function PrintbuySync({ sync }: { sync: PrintbuyContent['sync'] }) {
  return (
    <section className="printbuy-sync" aria-labelledby="printbuy-sync-title">
      <h2 id="printbuy-sync-title" className="printbuy-display">
        <Rows text={sync.title} />
      </h2>
      {sync.steps.length > 0 ? (
        <ol className="printbuy-steps">
          {sync.steps.map((step, index) => (
            <li
              key={step._key}
              className="printbuy-step"
              style={cssVars({ '--printbuy-i': index })}
            >
              <h3 className="printbuy-label">{step.label}</h3>
              {step.text ? <p className="printbuy-step__text">{step.text}</p> : null}
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}

export function PrintbuyStructure({ structure }: { structure: PrintbuyContent['structure'] }) {
  return (
    <section className="printbuy-structure" aria-labelledby="printbuy-structure-title">
      <h2 id="printbuy-structure-title" className="printbuy-caps printbuy-structure__title">
        <Rows text={structure.title} />
      </h2>
      {structure.cards.length > 0 ? (
        <ul className="printbuy-structure__cards">
          {structure.cards.map((card, index) => (
            <li
              key={card._key}
              className="printbuy-glass"
              style={cssVars({ '--printbuy-i': index })}
            >
              <h3 className="printbuy-glass__title">
                {card.icon ? <Icon name={card.icon} /> : null}
                {card.title}
              </h3>
              {card.text ? <p className="printbuy-glass__text">{card.text}</p> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function PrintbuyWorkshop({ workshop }: { workshop: PrintbuyContent['workshop'] }) {
  return (
    <div className="printbuy-slide printbuy-workshop">
      <Picture image={workshop.image} sizes={WIDE_SIZES} />
    </div>
  );
}

export function PrintbuyScreens({
  control,
  screens,
}: {
  control: PrintbuyContent['control'];
  screens: PrintbuyContent['screens'];
}) {
  return (
    <section className="printbuy-screens" aria-labelledby="printbuy-control-title">
      <header className="printbuy-control">
        <h2 id="printbuy-control-title" className="printbuy-control__label">
          {control.label}
        </h2>
        <p className="printbuy-caps printbuy-control__text">{control.text}</p>
      </header>
      {screens.items.length > 0 ? (
        <ul className="printbuy-screens__list">
          {screens.items.map((item) => (
            <li key={item._key} className="printbuy-screen">
              <Picture
                image={item.image}
                sizes="(max-width: 63.9375rem) 100vw, 60vw"
                className="printbuy-screen__img"
              />
              <div className="printbuy-screen__body">
                <h3 className="printbuy-label">{item.label}</h3>
                <div className="printbuy-screen__text printbuy-paras">
                  <Paragraphs text={item.text} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function PrintbuyMobile({ mobile }: { mobile: PrintbuyContent['mobile'] }) {
  return (
    <section className="printbuy-mobile" aria-labelledby="printbuy-mobile-title">
      <div className="printbuy-slide printbuy-mobile__slide">
        <Picture image={mobile.image} sizes={WIDE_SIZES} />
        <h2 id="printbuy-mobile-title" className="printbuy-mobile__label">
          {mobile.label}
        </h2>
      </div>
      <div className="printbuy-mobile__after">
        <Note text={mobile.note} tone="green" className="printbuy-card printbuy-mobile__note" />
      </div>
    </section>
  );
}

export function PrintbuyPhones({ phones }: { phones: PrintbuyContent['phones'] }) {
  if (phones.items.length === 0) return null;
  return (
    <ul className="printbuy-phones">
      {phones.items.map((item) => (
        <li key={item._key} className="printbuy-slide printbuy-phone">
          <Picture image={item.image} sizes={WIDE_SIZES} className="printbuy-phone__img" />
          <div className="printbuy-phone__body">
            <h3 className="printbuy-label">{item.label}</h3>
            <div className="printbuy-phone__text printbuy-paras">
              <Paragraphs text={item.text} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function PrintbuyStudio({ studio }: { studio: PrintbuyContent['studio'] }) {
  return (
    <div className="printbuy-slide printbuy-studio">
      <Picture image={studio.image} sizes={WIDE_SIZES} className="printbuy-studio__img" />
      <div className="printbuy-studio__body">
        <Note text={studio.note} tone="purple" className="printbuy-studio__note" />
        <p className="printbuy-studio__title">
          <Rows text={studio.title} />
        </p>
      </div>
    </div>
  );
}

const isLight = (hex: string) => {
  const value = Number.parseInt(hex.replace('#', '').slice(0, 6), 16);
  if (Number.isNaN(value)) return true;
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
};

export function PrintbuyBrand({ brand }: { brand: PrintbuyContent['brand'] }) {
  return (
    <div className="printbuy-brand">
      <section className="printbuy-icons" aria-labelledby="printbuy-icons-title">
        <h2 id="printbuy-icons-title" className="printbuy-kicker">
          {brand.iconsLabel}
        </h2>
        <Picture
          image={brand.icons}
          sizes="(max-width: 63.9375rem) 100vw, 56vw"
          className="printbuy-icons__img"
        />
      </section>
      {brand.swatches.length > 0 ? (
        <section className="printbuy-palette" aria-labelledby="printbuy-palette-title">
          <h2 id="printbuy-palette-title" className="printbuy-kicker">
            {brand.paletteLabel}
          </h2>
          <ul className="printbuy-swatches">
            {brand.swatches.map((swatch, index) => (
              <li
                key={swatch._key}
                className="printbuy-swatch"
                style={cssVars({ '--printbuy-i': index, '--printbuy-color': swatch.color })}
              >
                {splitList(swatch.tints).map((tint, tintIndex) => (
                  <span
                    key={tint}
                    className="printbuy-swatch__tint"
                    style={cssVars({ '--printbuy-color': tint, '--printbuy-t': tintIndex })}
                    aria-hidden="true"
                  />
                ))}
                <span
                  className={
                    isLight(swatch.color)
                      ? 'printbuy-swatch__main'
                      : 'printbuy-swatch__main printbuy-swatch__main--dark'
                  }
                >
                  {swatch.color}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <section className="printbuy-type" aria-labelledby="printbuy-type-title">
        <h2 id="printbuy-type-title" className="printbuy-kicker">
          {brand.typeLabel}
        </h2>
        {brand.typeface ? (
          <p className="printbuy-type__name" aria-hidden="true">
            {brand.typeface}
          </p>
        ) : null}
        {brand.weights.length > 0 ? (
          <ul className="printbuy-type__weights">
            {brand.weights.map((weight, index) => (
              <li
                key={weight._key}
                style={cssVars({
                  '--printbuy-i': index,
                  '--printbuy-weight': weight.weight ?? 400,
                })}
              >
                {weight.label}
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </div>
  );
}

export function PrintbuyOutro({ outro }: { outro: PrintbuyContent['outro'] }) {
  return (
    <section className="printbuy-outro" aria-labelledby="printbuy-team-title">
      <h2 id="printbuy-team-title" className="printbuy-kicker">
        {outro.label}
      </h2>
      {outro.team.length > 0 ? (
        <ul className="printbuy-team">
          {outro.team.map((member, index) => (
            <li
              key={member._key}
              className="printbuy-member"
              style={cssVars({ '--printbuy-i': index })}
            >
              <Picture image={member.photo} sizes="128px" className="printbuy-member__photo" />
              {member.role ? <p className="printbuy-member__role">{member.role}</p> : null}
              <p className="printbuy-member__name">{member.name}</p>
            </li>
          ))}
        </ul>
      ) : null}
      {outro.line ? <p className="printbuy-outro__line">{outro.line}</p> : null}
      {outro.farewell ? <p className="printbuy-outro__farewell">{outro.farewell}</p> : null}
    </section>
  );
}
