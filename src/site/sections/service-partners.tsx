import { getTranslations } from 'next-intl/server';

import type { SitePageContent } from '@/core/content/loader';

import { PartnerMarquee } from '../components/partner-marquee';
import { Eyebrow } from '../components/ui/eyebrow';
import { Container } from '../components/ui/layout';
import { Heading } from '../components/ui/typography';

/** "Partners who trust us" on a service page: the same logos as on Home, in a scrolling row. */
export async function ServicePartners({
  content,
}: {
  content: SitePageContent<'services'>['partners'];
}) {
  const t = await getTranslations('services');
  return (
    <section className="svc-partners" aria-labelledby="svc-partners-title">
      <Container>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading level={2} variant="plain" id="svc-partners-title" className="svc-partners__title">
          {content.title}
        </Heading>
        <PartnerMarquee
          label={t('partnersLabel')}
          logos={content.logos.filter((logo) => logo !== null)}
        />
      </Container>
    </section>
  );
}
