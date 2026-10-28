import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

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
  const { header } = await getGlobalContent('site', locale);
  const href = ({ pageId, anchor }: NavTarget) =>
    localizedPath(pagePath(pageId ?? 'home'), locale, defaultLocale) + (anchor ? `#${anchor}` : '');
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
            item.children ? (
              <div key={item.key} className="nav__drop">
                <NavLink href={href(item)}>
                  {t(item.key)}
                  <i className="nav__chev" aria-hidden="true" />
                </NavLink>
                <div className="nav__menu">
                  {item.children.map((child) => (
                    <Link key={child.key} href={href(child)} className="text-nav">
                      {t(child.key)}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink key={item.key} href={href(item)}>
                {t(item.key)}
              </NavLink>
            ),
          )}
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
            ...(item.children ?? []).map((child) => (
              <Link key={child.key} href={href(child)} className="is-sub">
                {t(child.key)}
              </Link>
            )),
          ])}
        </nav>
      }
    />
  );
}
