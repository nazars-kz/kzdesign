import { getTranslations } from 'next-intl/server';

import { getCollectionList } from '@/core/collections/loader';
import type { SitePageContent } from '@/core/content/loader';

import { ServiceTabs } from '../components/service-tabs';
import { Container, Section } from '../components/ui/layout';
import { Eyebrow } from '../components/ui/eyebrow';

/** "Our Services" on Home: the tabs are the published services (Pages → Blog & lists → Services). */
export async function Services({
  content,
  locale,
}: {
  content: SitePageContent<'home'>['services'];
  locale: string;
}) {
  const [list, t, tServices] = await Promise.all([
    getCollectionList('services', locale),
    getTranslations('home'),
    getTranslations('services'),
  ]);
  const services = list.items.map((item) => ({
    key: item.slug,
    pill: item.content.pillLabel || item.content.navLabel,
    title: item.content.homeTitle || item.content.title,
    text: item.content.homeText || item.content.description,
    items: item.content.homeItems,
    href: item.href,
  }));
  if (services.length === 0) return null;

  return (
    <Section tone="inverse" spacing="none" id="services" className="services">
      <Container>
        <ServiceTabs
          services={services}
          eyebrow={<Eyebrow>{content.eyebrow}</Eyebrow>}
          learnMore={tServices('learnMore')}
          labels={{
            tabs: t('servicesTabs'),
            previous: t('previousService'),
            next: t('nextService'),
          }}
        />
      </Container>
    </Section>
  );
}
