/**
 * Signal Sigma, the product chapters: UI (type and colors), the team chat, Orders & Trades,
 * Watchlist, Stock Screener, Journalling, Technical Analysis and Fundamentals.
 */
import { SiteImage } from '../../components/ui/site-image';
import { BlockHead, Overlay, type SigmaContent, Tags, Wide } from './sigma-intro';
import { Clover, cssVars, Heart, Note, Rows } from './sigma-parts';

type ChatLine = SigmaContent['measurements']['chat'][number];

/** One line of the team chat: the person (photo, handwritten name, role) and the speech bubble. */
function ChatBubble({
  photo,
  tone,
  name,
  role,
  message,
  side,
}: Pick<ChatLine, 'photo' | 'tone' | 'name' | 'role' | 'message' | 'side'>) {
  return (
    <li className="sigma-chat__line" data-side={side}>
      <figure className="sigma-chat__person">
        <span className="sigma-chat__avatar" data-tone={tone}>
          <SiteImage image={photo} sizes="7.5rem" className="sigma-chat__photo" />
        </span>
        <figcaption>
          <span className="sigma-chat__name">{name}</span>
          {role ? <span className="sigma-chat__role">{role}</span> : null}
        </figcaption>
      </figure>
      <p className="sigma-chat__bubble">{message}</p>
    </li>
  );
}

export function SigmaUi({ ui, strip }: { ui: SigmaContent['ui']; strip: readonly string[] }) {
  return (
    <section className="sigma-ui sigma-light" aria-labelledby="sigma-ui-title">
      <BlockHead strip={strip} title={ui.title} id="sigma-ui-title" className="sigma-head--inset" />
      <div className="sigma-type">
        <div className="sigma-type__specimen" aria-hidden="true">
          {ui.weights.length > 0 ? (
            <ul className="sigma-type__weights">
              {ui.weights.map((weight, index) => (
                <li key={`${index}-${weight}`} data-weight={index}>
                  {weight}
                </li>
              ))}
            </ul>
          ) : null}
          <p className="sigma-type__name">{ui.fontName}</p>
        </div>
        <figure className="sigma-type__stones">
          <SiteImage
            image={ui.stones}
            sizes="(max-width: 63.9375rem) 50vw, 23vw"
            className="sigma-img"
          />
        </figure>
        <div className="sigma-type__info sigma-type__info--type">
          <p className="sigma-card__mark" aria-hidden="true">
            / <Heart />
          </p>
          <h3 className="sigma-card__title">{ui.typographyTitle}</h3>
          <p className="sigma-card__text">{ui.typographyText}</p>
          <p className="sr-only">
            {ui.fontName}: {ui.weights.join(', ')}
          </p>
        </div>
        <div className="sigma-type__info sigma-type__info--colors">
          <p className="sigma-card__mark" aria-hidden="true">
            / <Heart />
          </p>
          <h3 className="sigma-card__title">{ui.colorsTitle}</h3>
          <p className="sigma-card__text">{ui.colorsText}</p>
          <Tags tags={ui.colorsTags} />
        </div>
        <Note text={ui.note} className="sigma-type__note" />
      </div>
      {ui.swatches.length > 0 ? (
        <ul className="sigma-swatches">
          {ui.swatches.map((swatch) => (
            <li
              key={swatch._key}
              className="sigma-swatch"
              data-size={swatch.size}
              style={cssVars({ '--sigma-swatch': swatch.hex })}
            >
              {swatch.hex.toUpperCase()}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function SigmaMeasurements({
  measurements,
}: {
  measurements: SigmaContent['measurements'];
}) {
  return (
    <div className="sigma-measurements">
      <Wide image={measurements.image} className="sigma-measurements__screen" />
      {measurements.chat.length > 0 ? (
        <ol className="sigma-chat">
          {measurements.chat.map((line) => (
            <ChatBubble key={line._key} {...line} />
          ))}
        </ol>
      ) : null}
    </div>
  );
}

export function SigmaOrders({
  orders,
  strip,
}: {
  orders: SigmaContent['orders'];
  strip: readonly string[];
}) {
  return (
    <section className="sigma-orders" aria-labelledby="sigma-orders-title">
      <BlockHead strip={strip} title={orders.title} text={orders.text} id="sigma-orders-title" />
      <div className="sigma-scene sigma-scene--orders">
        <Overlay
          image={orders.image}
          sizes="(max-width: 63.9375rem) 120vw, 75vw"
          className="sigma-orders__screens"
        />
        <Note text={orders.note} className="sigma-orders__note" />
      </div>
    </section>
  );
}

export function SigmaWatchlist({
  watchlist,
  strip,
}: {
  watchlist: SigmaContent['watchlist'];
  strip: readonly string[];
}) {
  return (
    <section className="sigma-watchlist" aria-labelledby="sigma-watchlist-title">
      <BlockHead strip={strip} title={watchlist.title} id="sigma-watchlist-title" />
      <div className="sigma-scene sigma-scene--watchlist">
        <figure className="sigma-watchlist__screen">
          <SiteImage
            image={watchlist.image}
            sizes="(max-width: 63.9375rem) 100vw, 84vw"
            className="sigma-img"
          />
        </figure>
        <Note text={watchlist.note} card className="sigma-watchlist__note" />
      </div>
    </section>
  );
}

export function SigmaScreener({
  screener,
  strip,
}: {
  screener: SigmaContent['screener'];
  strip: readonly string[];
}) {
  return (
    <section className="sigma-screener sigma-light" aria-labelledby="sigma-screener-title">
      <BlockHead
        strip={strip}
        title={screener.title}
        text={screener.text}
        id="sigma-screener-title"
        className="sigma-head--inset"
      />
      <div className="sigma-scene sigma-scene--screener">
        <Wide image={screener.laptop} className="sigma-screener__laptop" />
        <Note text={screener.note} card className="sigma-screener__note" />
      </div>
      <div className="sigma-metricsbox">
        <div className="sigma-metricsbox__text">
          {screener.metricsTitle ? (
            <h3 className="sigma-metricsbox__title">
              <Rows text={screener.metricsTitle} />
            </h3>
          ) : null}
          {screener.points.length > 0 ? (
            <ul className="sigma-points">
              {screener.points.map((point, index) => (
                <li key={`${index}-${point}`} className="sigma-point">
                  <Clover className="sigma-point__mark" />
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
          {screener.chatMessage ? (
            <ol className="sigma-chat sigma-chat--single">
              <ChatBubble
                photo={screener.chatPhoto}
                tone="none"
                name={screener.chatName}
                role={screener.chatRole}
                message={screener.chatMessage}
                side="left"
              />
            </ol>
          ) : null}
        </div>
        <figure className="sigma-metricsbox__dialog">
          <SiteImage
            image={screener.dialog}
            sizes="(max-width: 63.9375rem) 100vw, 50vw"
            className="sigma-img"
          />
        </figure>
      </div>
    </section>
  );
}

export function SigmaJournal({
  journal,
  strip,
}: {
  journal: SigmaContent['journal'];
  strip: readonly string[];
}) {
  return (
    <section className="sigma-journal" aria-labelledby="sigma-journal-title">
      <BlockHead strip={strip} title={journal.title} text={journal.text} id="sigma-journal-title" />
      <div className="sigma-scene sigma-scene--journal">
        <Wide image={journal.tablet} className="sigma-journal__tablet" />
        <Overlay
          image={journal.signals}
          sizes="(max-width: 63.9375rem) 70vw, 40vw"
          className="sigma-journal__signals"
        />
        <Note text={journal.note} className="sigma-journal__note" />
      </div>
      <figure className="sigma-journal__posts">
        <SiteImage
          image={journal.posts}
          sizes="(max-width: 63.9375rem) 160vw, 62vw"
          className="sigma-img"
        />
      </figure>
    </section>
  );
}

export function SigmaTechnical({
  technical,
  strip,
}: {
  technical: SigmaContent['technical'];
  strip: readonly string[];
}) {
  return (
    <section className="sigma-technical" aria-labelledby="sigma-technical-title">
      <BlockHead
        strip={strip}
        title={technical.title}
        text={technical.text}
        id="sigma-technical-title"
      />
      <Wide image={technical.laptop} className="sigma-technical__laptop" />
      <div className="sigma-scene sigma-scene--campus">
        <Wide image={technical.photo} className="sigma-technical__photo" />
        <Overlay
          image={technical.chart}
          sizes="(max-width: 63.9375rem) 90vw, 36vw"
          className="sigma-technical__chart"
        />
      </div>
    </section>
  );
}

export function SigmaFundamentals({
  fundamentals,
}: {
  fundamentals: SigmaContent['fundamentals'];
}) {
  return (
    <section className="sigma-fundamentals sigma-light" aria-labelledby="sigma-fundamentals-title">
      <BlockHead
        title={fundamentals.title}
        text={fundamentals.text}
        id="sigma-fundamentals-title"
        className="sigma-head--inset"
      />
      <Wide image={fundamentals.laptop} className="sigma-fundamentals__laptop" />
    </section>
  );
}
