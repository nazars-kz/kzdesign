import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { getCollectionList } from '@/core/collections/loader';
import { getGlobalContent } from '@/core/content/loader';
import { localeInfo } from '@/core/i18n/locales';
import { localizedPath } from '@/core/i18n/routing';
import type { SiteLogo } from '@/core/media/branding';

import { NavLink } from '../components/nav-link';
import { ButtonLink } from '../components/ui/button';
import { MAIN_NAV, type NavTarget, pagePath } from '../navigation';
import { HeaderShell } from './header-shell';
import { LanguageSwitcher } from './language-switcher';
import { MegaCard, MegaPanel, MegaTrigger } from './mega-menu';

/** The site logo: the one uploaded in Settings → Branding, else the bundled K&Z logo. */
const FALLBACK_LOGO = { src: '/brand/logo.svg', width: 126, height: 32 } as const;

export async function SiteHeader({
  locale,
  defaultLocale,
  enabledLocales,
  siteName,
  logo,
}: {
  locale: string;
  defaultLocale: string;
  enabledLocales: readonly string[];
  siteName: string;
  logo: SiteLogo | null;
}) {
  const t = await getTranslations('nav');
  const common = await getTranslations('common');
  const [{ header }, services] = await Promise.all([
    getGlobalContent('site', locale),
    getCollectionList('services', locale),
  ]);
  const href = ({ pageId, anchor }: NavTarget) =>
    localizedPath(pagePath(pageId ?? 'home'), locale, defaultLocale) + (anchor ? `#${anchor}` : '');
  /** Items of the Services menu: every published service, in the editors' order. */
  const serviceCards = services.items.map((item) => ({
    key: item.slug,
    title: item.content.menuTitle || item.content.navLabel || item.content.title,
    label: item.content.navLabel || item.content.title,
    href: item.href,
    image: item.content.menuImage,
  }));
  const mark = logo
    ? {
        src: logo.src,
        width: logo.width || FALLBACK_LOGO.width,
        height: logo.height || FALLBACK_LOGO.height,
        unoptimized: logo.isSvg,
      }
    : { ...FALLBACK_LOGO, unoptimized: true };

  return (
    <HeaderShell
      labels={{ open: common('menu'), close: common('closeMenu') }}
      logo={
        <Link
          href={href({ pageId: 'home' })}
          className="site-header__logo"
          aria-label={common('home')}
        >
          <Image {...mark} alt={siteName} preload />
        </Link>
      }
      nav={
        <nav className="nav" aria-label={common('mainNavigation')}>
          {MAIN_NAV.map((item) =>
            item.submenu && serviceCards.length > 0 ? (
              <MegaTrigger
                key={item.key}
                name="services"
                panelId="mega-services"
                hrefs={serviceCards.map((card) => card.href)}
              >
                {t(item.key)}
              </MegaTrigger>
            ) : (
              <NavLink key={item.key} href={href(item)}>
                {t(item.key)}
              </NavLink>
            ),
          )}
        </nav>
      }
      languages={
        <LanguageSwitcher
          locales={enabledLocales.map((code) => ({ code, label: localeInfo(code).label }))}
          current={locale}
          defaultLocale={defaultLocale}
          label={common('language')}
        />
      }
      cta={
        <ButtonLink
          href={header.cta.href}
          external={header.cta.external}
          variant="light"
          drawer="book"
          className="site-header__cta"
        >
          {header.cta.label}
        </ButtonLink>
      }
      compactCta={
        <ButtonLink
          href={header.cta.href}
          external={header.cta.external}
          variant="light"
          drawer="book"
          className="site-header__cta-compact"
        >
          {header.cta.label}
        </ButtonLink>
      }
      mega={
        <>
          {serviceCards.length > 0 ? (
            <MegaPanel name="services" id="mega-services" columns={3}>
              {serviceCards.map((card) => (
                <MegaCard key={card.key} href={card.href} title={card.title} image={card.image} />
              ))}
            </MegaPanel>
          ) : null}
        </>
      }
      menu={
        <nav aria-label={common('mobileNavigation')}>
          {MAIN_NAV.flatMap((item) => [
            <Link key={item.key} href={href(item)}>
              {t(item.key)}
            </Link>,
            ...(item.submenu ? serviceCards : []).map((child) => (
              <Link key={child.key} href={child.href} className="is-sub">
                {child.label}
              </Link>
            )),
          ])}
        </nav>
      }
    />
  );
}
