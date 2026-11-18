import type { PageViewProps } from '@/core/content/page-route';

import { SiteImage } from '../../components/ui/site-image';
import { Accent, Chips, cssVars, Head, Rows, Shot } from './onground-parts';

type Content = PageViewProps<'case-onground'>['content'];
type Screen = Content['booking']['rowA'][number];

/** Two rows of tablet screens: the middle screen is centered, the others run off the page. */
function ScreenRows({ rowA, rowB }: { rowA: readonly Screen[]; rowB: readonly Screen[] }) {
  return (
    <div className="og-screens">
      {[rowA, rowB].map((row, rowIndex) => (
        <ul key={`row-${rowIndex}`} className="og-row-screens" data-row={rowIndex}>
          {row.map((screen) => (
            <li key={screen._key} className="og-screen">
              <SiteImage
                image={screen.image}
                sizes="(min-width: 48rem) 50vw, 80vw"
                className="og-screen__img"
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

/** "// Booking": the booking flow in two rows of screens. */
export function OngroundBooking({ booking }: { booking: Content['booking'] }) {
  return (
    <section className="og-grey og-booking" aria-labelledby="og-booking-title">
      <Head eyebrow={booking.eyebrow} title={booking.title} id="og-booking-title" />
      <div className="og-block">
        <div className="og-columns">
          <p className="og-small">{booking.textLeft}</p>
          <div className="og-stack">
            <p className="og-small og-small--dark">{booking.textRightA}</p>
            <p className="og-small">{booking.textRightB}</p>
          </div>
        </div>
        <Chips items={booking.chips} />
      </div>
      <ScreenRows rowA={booking.rowA} rowB={booking.rowB} />
    </section>
  );
}

/** "// Booking Details": the completed service screen and a photo. */
export function OngroundDetails({ details }: { details: Content['details'] }) {
  return (
    <section className="og-details" aria-labelledby="og-details-title">
      <Head eyebrow={details.eyebrow} title={details.title} id="og-details-title" />
      <div className="og-block">
        <div className="og-columns">
          <p className="og-small">{details.textLeft}</p>
          <p className="og-small">{details.textRight}</p>
        </div>
      </div>
      <div className="og-pair">
        <Shot image={details.laptop} sizes="(min-width: 48rem) 50vw, 100vw" />
        <Shot image={details.window} sizes="(min-width: 48rem) 50vw, 100vw" />
      </div>
    </section>
  );
}

/** "// Inbox": direct messages with a full-width laptop picture. */
export function OngroundInbox({ inbox }: { inbox: Content['inbox'] }) {
  return (
    <section className="og-inbox" aria-labelledby="og-inbox-title">
      <div className="og-inbox__top">
        <Head eyebrow={inbox.eyebrow} title={inbox.title} id="og-inbox-title" />
        <div className="og-stack">
          <p className="og-small og-small--dark">{inbox.textA}</p>
          <p className="og-small">{inbox.textB}</p>
        </div>
      </div>
      <Shot image={inbox.image} sizes="100vw" className="og-tile--wide" />
    </section>
  );
}

/** "// Admin": the admin workspace in two rows of screens. */
export function OngroundAdmin({ admin }: { admin: Content['admin'] }) {
  return (
    <section className="og-grey og-booking og-admin" aria-labelledby="og-admin-title">
      <Head eyebrow={admin.eyebrow} title={admin.title} id="og-admin-title" />
      <div className="og-block">
        <div className="og-columns">
          <p className="og-small">{admin.textLeft}</p>
          <div className="og-stack">
            <p className="og-small og-small--dark">{admin.textRightA}</p>
            <p className="og-small">{admin.textRightB}</p>
          </div>
        </div>
        <Chips items={admin.chips} />
      </div>
      <ScreenRows rowA={admin.rowA} rowB={admin.rowB} />
    </section>
  );
}

/** The closing line with the yellow lines and the team of the case. */
export function OngroundOutro({ outro }: { outro: Content['outro'] }) {
  return (
    <section className="og-outro" aria-labelledby="og-outro-title">
      <span className="og-swoosh og-swoosh--outro-top" aria-hidden="true" />
      <span className="og-swoosh og-swoosh--outro-bottom" aria-hidden="true" />
      <div className="og-outro__grid">
        <h2 id="og-outro-title" className="og-outro__title">
          <Rows text={outro.title} />
          <span className="og-outro__sub">
            <Accent text={outro.subtitle} start={12} />
          </span>
        </h2>
        <h3 className="sr-only">{outro.teamTitle}</h3>
        <ul className="og-team">
          {outro.team.map((member, index) => (
            <li key={member._key} className="og-member" style={cssVars({ '--og-i': index })}>
              <span className="og-member__photo">
                <SiteImage image={member.photo} sizes="10rem" />
              </span>
              <span className="og-member__role">{member.role}</span>
              <span className="og-member__name">{member.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
