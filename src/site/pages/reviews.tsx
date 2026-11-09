/** Reviews page (/reviews): title, the Clutch reviews widget, a call to action and the contact block. */
import { getTranslations } from 'next-intl/server';

import type { PageViewProps } from '@/core/content/page-route';

import { Breadcrumbs } from '../components/breadcrumbs';
import { ClutchWidget } from '../components/clutch-widget';
import { ButtonLink } from '../components/ui/button';
import { Container } from '../components/ui/layout';
import { Lines } from '../components/ui/lines';
import { Heading } from '../components/ui/typography';
import { Contact } from '../sections/contact';

export async function ReviewsView({ content, locale }: PageViewProps<'reviews'>) {
  const t = await getTranslations('reviews');
  const { hero, widget, cta } = content;
  return (
    <>
      <Container className="rv-crumbs">
        <Breadcrumbs
          variant="page"
          label={t('breadcrumb')}
          items={[{ label: t('home'), href: '/' }, { label: t('reviews') }]}
        />
      </Container>
      <section className="rv-hero" aria-labelledby="reviews-title">
        <Container>
          <Heading level={1} variant="plain" id="reviews-title" className="rv-hero__title">
            {hero.title}
          </Heading>
          <p className="rv-hero__sub">{hero.sub}</p>
        </Container>
      </section>
      <section className="rv-list" aria-label={t('widget')}>
        <Container>
          <ClutchWidget companyId={widget.companyId} className="rv-widget" />
          <noscript>
            <a href={widget.profile.href}>{widget.profile.label}</a>
          </noscript>
        </Container>
      </section>
      <section className="rv-cta" aria-labelledby="reviews-cta-title">
        <Container>
          <div className="rv-cta__card">
            <span className="rv-cta__mark" aria-hidden="true" />
            <Heading level={2} variant="plain" id="reviews-cta-title" className="rv-cta__title">
              <Lines text={cta.title} />
            </Heading>
            <p className="rv-cta__sub">{cta.sub}</p>
            <ButtonLink href={cta.button.href} external={cta.button.external} drawer="book">
              {cta.button.label}
            </ButtonLink>
          </div>
        </Container>
      </section>
      <Contact content={content.contact} locale={locale} />
    </>
  );
}
