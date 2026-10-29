import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import type { SitePageContent } from '@/core/content/loader';

import { AwardsStrip } from '../components/awards-strip';
import { ButtonLink } from '../components/ui/button';
import { ContentLink } from '../components/ui/content-link';
import { Lines } from '../components/ui/lines';
import { Container } from '../components/ui/layout';
import { Heading } from '../components/ui/typography';

/** Home hero: Clutch badge, the h1, the promise with a highlighted end, the button and the awards. */
export async function Hero({ content }: { content: SitePageContent<'home'>['hero'] }) {
  const t = await getTranslations('home');
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container>
        <ContentLink
          href={content.badge.href}
          external={content.badge.external}
          className="hero__badge text-body-sm"
        >
          <Image src="/brand/clutch-logo.svg" alt="Clutch" width={64} height={18} unoptimized />
          <span>{content.badge.label}</span>
        </ContentLink>
        <Heading level={1} variant="h1" id="hero-title" className="hero__title">
          <Lines text={content.title} />
        </Heading>
        <p className="hero__sub text-lead">
          {content.subtitle} <mark>{content.highlight}</mark>
        </p>
        <div className="hero__cta">
          <ButtonLink
            href={content.cta.href}
            external={content.cta.external}
            size="lg"
            drawer="book"
          >
            {content.cta.label}
          </ButtonLink>
        </div>
        <AwardsStrip
          label={content.awardsLabel}
          awards={content.awards.filter((badge) => badge !== null)}
          labels={{ open: t('moreAwards'), close: t('fewerAwards') }}
        />
      </Container>
    </section>
  );
}
