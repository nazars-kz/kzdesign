import type { PageViewProps } from '@/core/content/page-route';

import { SiteImage } from '../../components/ui/site-image';
import { TachLogo } from './tach-logo';
import {
  Accent,
  BookmarkIcon,
  Chapter,
  ClockIcon,
  EyeIcon,
  GlobeIcon,
  LayersIcon,
  PhoneIcon,
  PinIcon,
  RouteIcon,
  Rows,
  Shot,
  StarIcon,
} from './tach-parts';

type Content = PageViewProps<'case-tach'>['content'];

/** 02 Platform: the laptop, the Overview and Home screens and the two feature tiles. */
export function TachPlatform({ platform }: { platform: Content['platform'] }) {
  return (
    <section className="tach-chapter-block" aria-labelledby="tach-platform-title">
      <Chapter
        id="tach-platform-title"
        eyebrow={platform.eyebrow}
        title={platform.title}
        text={platform.text}
      />
      <Shot image={platform.laptop} sizes="100vw" />
      <div className="tach-duo">
        <Shot
          image={platform.overview}
          sizes="(min-width: 64rem) 50vw, 100vw"
          className="tach-tile--green"
        />
        <div className="tach-tile tach-note">
          <div className="tach-note__in">
            <span className="tach-note__icon">
              <EyeIcon className="tach-note__glyph" />
            </span>
            <h3 className="tach-note__title">
              <Rows text={platform.controlTitle} />
            </h3>
            <p className="tach-note__text">{platform.controlText}</p>
          </div>
        </div>
      </div>
      <Shot image={platform.home} sizes="100vw" className="tach-tile--orange tach-home" />
      <div className="tach-features">
        <div className="tach-tile tach-feature" data-tone="dark">
          <div className="tach-feature__in">
            <h3 className="tach-feature__title">
              <Rows text={platform.bankingTitle} />
            </h3>
            <p className="tach-feature__text">{platform.bankingText}</p>
          </div>
        </div>
        <Shot
          image={platform.withdraw}
          sizes="(min-width: 64rem) 50vw, 100vw"
          className="tach-features__phone"
        />
        <div className="tach-tile tach-feature" data-tone="light">
          <div className="tach-feature__in">
            <h3 className="tach-feature__title">
              <Rows text={platform.vendorTitle} />
            </h3>
            <p className="tach-feature__text">{platform.vendorText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 03 Finances: the monitor, the "at a glance" tile and the dark statement band. */
export function TachFinances({ finances }: { finances: Content['finances'] }) {
  return (
    <section className="tach-chapter-block" aria-labelledby="tach-finances-title">
      <Chapter
        id="tach-finances-title"
        eyebrow={finances.eyebrow}
        title={finances.title}
        text={finances.text}
      />
      <Shot image={finances.monitor} sizes="100vw" />
      <div className="tach-duo">
        <div className="tach-tile tach-note">
          <div className="tach-note__in">
            <span className="tach-note__icon">
              <LayersIcon className="tach-note__glyph" />
            </span>
            <h3 className="tach-note__title">
              <Rows text={finances.glanceTitle} />
            </h3>
            <p className="tach-note__text">{finances.glanceText}</p>
          </div>
        </div>
        <Shot image={finances.phone} sizes="(min-width: 64rem) 50vw, 100vw" />
      </div>
      <div className="tach-band tach-tile">
        <TachLogo className="tach-band__logo" />
        <p className="tach-band__statement">
          <Accent text={finances.statement} />
        </p>
        <span className="tach-band__deco" aria-hidden="true" />
        <p className="tach-band__note">{finances.statementNote}</p>
      </div>
    </section>
  );
}

/** 04 Vendor marketplace: the map screens and a vendor card over a truck photo (coded). */
export function TachVendors({ vendors }: { vendors: Content['vendors'] }) {
  return (
    <section className="tach-chapter-block" aria-labelledby="tach-vendors-title">
      <Chapter
        id="tach-vendors-title"
        eyebrow={vendors.eyebrow}
        title={vendors.title}
        text={vendors.text}
      />
      <Shot image={vendors.laptop} sizes="100vw" />
      <div className="tach-pair">
        <div className="tach-tile tach-vendor">
          <SiteImage
            image={vendors.truck}
            sizes="(min-width: 64rem) 50vw, 100vw"
            className="tach-shot"
          />
          <div className="tach-vendor__stage">
            <div className="tach-vcard">
              <div className="tach-vcard__top">
                <p className="tach-vcard__name">{vendors.vendorName}</p>
                <span className="tach-vcard__pills">
                  <span className="tach-vcard__pill">
                    <PinIcon className="tach-vcard__pill-icon" />
                    {vendors.vendorDistance}
                  </span>
                  <span className="tach-vcard__pill">
                    <StarIcon className="tach-vcard__pill-icon" />
                    {vendors.vendorRating}
                  </span>
                </span>
              </div>
              <p className="tach-vcard__desc">{vendors.vendorDescription}</p>
              <p className="tach-vcard__row">
                <ClockIcon className="tach-vcard__icon" />
                <span>{vendors.vendorHours}</span>
                <span className="tach-vcard__badge">{vendors.vendorBadge}</span>
              </p>
              <p className="tach-vcard__row">
                <GlobeIcon className="tach-vcard__icon" />
                <span className="tach-vcard__link">{vendors.vendorSite}</span>
              </p>
              <p className="tach-vcard__row">
                <PhoneIcon className="tach-vcard__icon" />
                <span className="tach-vcard__link">{vendors.vendorPhone}</span>
              </p>
              <span className="tach-vcard__actions">
                <BookmarkIcon className="tach-vcard__action tach-vcard__action--orange" />
                <RouteIcon className="tach-vcard__action" />
              </span>
            </div>
          </div>
        </div>
        <Shot image={vendors.phone} sizes="(min-width: 64rem) 50vw, 100vw" />
      </div>
    </section>
  );
}

/** 05 Assets: the laptop, the dusk truck with its caption and the phone. */
export function TachAssets({ assets }: { assets: Content['assets'] }) {
  return (
    <section className="tach-chapter-block" aria-labelledby="tach-assets-title">
      <Chapter
        id="tach-assets-title"
        eyebrow={assets.eyebrow}
        title={assets.title}
        text={assets.text}
      />
      <Shot image={assets.laptop} sizes="100vw" />
      <div className="tach-pair">
        <div className="tach-tile tach-dusk">
          <SiteImage
            image={assets.truck}
            sizes="(min-width: 64rem) 50vw, 100vw"
            className="tach-shot"
          />
          <div className="tach-dusk__caption">
            <h3 className="tach-dusk__title">
              <Rows text={assets.tileTitle} />
            </h3>
            <p className="tach-dusk__text">{assets.tileText}</p>
          </div>
        </div>
        <Shot image={assets.phone} sizes="(min-width: 64rem) 50vw, 100vw" />
      </div>
    </section>
  );
}
