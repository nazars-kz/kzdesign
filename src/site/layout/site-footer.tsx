import { cacheLife } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { mailtoHref } from '@/core/content/contact-links';
import { getGlobalContent } from '@/core/content/loader';
import { localizedPath } from '@/core/i18n/routing';

import { NavLink } from '../components/nav-link';
import { SocialLinks } from '../components/social-links';
import { Container } from '../components/ui/layout';
import { LEGAL_NAV, MAIN_NAV, type NavTarget, pagePath } from '../navigation';
import { CookieSettings } from './consent';

export async function SiteFooter({
  locale,
  defaultLocale,
  siteName,
}: {
  locale: string;
  defaultLocale: string;
  siteName: string;
}) {
  const t = await getTranslations('footer');
  const common = await getTranslations('common');
  const [year, site] = await Promise.all([currentYear(), getGlobalContent('site', locale)]);
  const { company, social } = site;
  const href = ({ pageId, anchor }: NavTarget) =>
    localizedPath(pagePath(pageId ?? 'home'), locale, defaultLocale) + (anchor ? `#${anchor}` : '');

  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__top">
          <Link
            href={href({ pageId: 'home' })}
            className="site-footer__logo"
            aria-label={common('home')}
          >
            <Image src="/brand/logo.svg" alt={siteName} width={126} height={32} unoptimized />
          </Link>
          <nav className="site-footer__nav" aria-label={t('navigation')}>
            {MAIN_NAV.map((item) => (
              <NavLink key={item.key} href={href(item)}>
                {t(item.key)}
                {item.submenu ? <i className="nav__chev nav__chev--up" aria-hidden="true" /> : null}
              </NavLink>
            ))}
          </nav>
          <SocialLinks
            label={t('social')}
            links={social.links.map((item) => ({
              key: item._key,
              network: item.network,
              href: item.link.href,
              label: item.link.label,
            }))}
          />
        </div>
        <div className="site-footer__bottom text-body-sm">
          <p>
            © {year} {company.footerLine}
            {company.email ? (
              <>
                {' · '}
                <a href={mailtoHref(company.email)}>
                  <u>{company.email}</u>
                </a>
              </>
            ) : null}
          </p>
          <nav className="site-footer__legal" aria-label={t('legal')}>
            {LEGAL_NAV.map((item) => (
              <Link key={item.key} href={href(item)}>
                {t(item.key)}
              </Link>
            ))}
            <CookieSettings />
          </nav>
        </div>
      </Container>
    </footer>
  );
}

/** Cached so the static shell can include it (refreshed daily). */
async function currentYear(): Promise<number> {
  'use cache';
  cacheLife('days');
  return new Date().getFullYear();
}
