import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { getCollectionList } from '@/core/collections/loader';
import { getGlobalContent } from '@/core/content/loader';
import { localizedPath } from '@/core/i18n/routing';
import type { SiteLogo } from '@/core/media/branding';

import { NavLink } from '../components/nav-link';
import { ButtonLink } from '../components/ui/button';
import { MAIN_NAV, type NavTarget, pagePath } from '../navigation';
import { HeaderShell } from './header-shell';

/** The site logo: the one uploaded in Settings → Branding, else the bundled K&Z logo. */
const FALLBACK_LOGO = { src: '/brand/logo.svg', width: 126, height: 32 } as const;

export async function SiteHeader({
  locale,
  defaultLocale,
  siteName,
  logo,
}: {
  locale: string;
  defaultLocale: string;
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
  /** Sub-items of the Services drop-down: every published service, in the editors' order. */
  const children = (submenu: 'services' | undefined) =>
    submenu === 'services'
      ? services.items.map((item) => ({
          key: item.slug,
          label: item.content.navLabel || item.content.title,
          href: item.href,
        }))
      : [];
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
          {MAIN_NAV.map((item) => {
            const sub = children(item.submenu);
            return sub.length > 0 ? (
              <div key={item.key} className="nav__drop">
                <NavLink href={href(item)}>
                  {t(item.key)}
                  <i className="nav__chev" aria-hidden="true" />
                </NavLink>
                <div className="nav__menu">
                  {sub.map((child) => (
                    <Link key={child.key} href={child.href} className="text-nav">
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink key={item.key} href={href(item)}>
                {t(item.key)}
              </NavLink>
            );
          })}
        </nav>
      }
      cta={
        <ButtonLink
          href={header.cta.href}
          external={header.cta.external}
          variant="light"
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
          className="site-header__cta-compact"
        >
          {header.cta.label}
        </ButtonLink>
      }
      menu={
        <nav aria-label={common('mobileNavigation')}>
          {MAIN_NAV.flatMap((item) => [
            <Link key={item.key} href={href(item)}>
              {t(item.key)}
            </Link>,
            ...children(item.submenu).map((child) => (
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
