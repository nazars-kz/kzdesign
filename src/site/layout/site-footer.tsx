import { cacheLife } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { getCollectionList } from '@/core/collections/loader';
import { mailtoHref } from '@/core/content/contact-links';
import { getGlobalContent } from '@/core/content/loader';
import { localizedPath } from '@/core/i18n/routing';

import { SocialLinks } from '../components/social-links';
import { ButtonLink } from '../components/ui/button';
import { Container } from '../components/ui/layout';
import { LEGAL_NAV, type NavTarget, pagePath } from '../navigation';
import { CookieSettings } from './consent';
import { FooterLink } from './footer-link';

/** Pages of the "Company" column, in order. */
const COMPANY_LINKS = [
  { key: 'cases', pageId: 'cases' },
  { key: 'approach', pageId: 'approach' },
  { key: 'aboutUs', pageId: 'about' },
  { key: 'reviews', pageId: 'reviews' },
] as const;

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
  const [year, site, services] = await Promise.all([
    currentYear(),
    getGlobalContent('site', locale),
    getCollectionList('services', locale),
  ]);
  const { company, social, header } = site;
  const href = ({ pageId, anchor }: NavTarget) =>
    localizedPath(pagePath(pageId ?? 'home'), locale, defaultLocale) + (anchor ? `#${anchor}` : '');

  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link
              href={href({ pageId: 'home' })}
              className="site-footer__logo"
              aria-label={common('home')}
            >
              <Image src="/brand/logo.svg" alt={siteName} width={126} height={32} unoptimized />
            </Link>
            {company.footerClaim ? (
              <p className="site-footer__claim">{company.footerClaim}</p>
            ) : null}
            <ButtonLink
              href={header.cta.href}
              external={header.cta.external}
              variant="primary"
              drawer="book"
            >
              {header.cta.label}
            </ButtonLink>
          </div>
          {services.items.length > 0 ? (
            <nav className="site-footer__col" aria-label={t('servicesTitle')}>
              <p className="site-footer__heading">{t('servicesTitle')}</p>
              <ul>
                {services.items.map((item) => (
                  <li key={item.slug}>
                    <FooterLink href={item.href}>
                      {item.content.menuTitle || item.content.navLabel || item.content.title}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          <nav className="site-footer__col" aria-label={t('companyTitle')}>
            <p className="site-footer__heading">{t('companyTitle')}</p>
            <ul>
              {COMPANY_LINKS.map((item) => (
                <li key={item.key}>
                  <FooterLink href={href(item)}>{t(item.key)}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="site-footer__col">
            <p className="site-footer__heading">{t('contactTitle')}</p>
            <ul>
              <li>
                <FooterLink href={href({ pageId: 'contact-us' })}>{t('contactUs')}</FooterLink>
              </li>
              {company.email ? (
                <li>
                  <a className="footer__link" href={mailtoHref(company.email)}>
                    {company.email}
                  </a>
                </li>
              ) : null}
            </ul>
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
        </div>
        <div className="site-footer__bottom text-body-sm">
          <p>
            © {year} {company.footerLine}
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
