/** Services list page (/services): every service of the collection, newest additions included. */
import { getTranslations } from 'next-intl/server';

import type { CollectionListViewProps } from '@/core/collections/list-route';

import { LinkCta } from '../components/ui/link-cta';
import { Container, Section } from '../components/ui/layout';
import { Heading, Text } from '../components/ui/typography';

export async function ServicesView({
  content,
  list,
}: CollectionListViewProps<'services', 'services'>) {
  const t = await getTranslations('services');
  return (
    <Section labelledBy="page-title" className="min-h-160">
      <Container className="flex flex-col gap-12">
        <Heading level={1} variant="h2" id="page-title">
          {content.intro.title}
        </Heading>
        <ul className="flex flex-col gap-10">
          {list.items.map((item) => (
            <li key={item.slug} className="flex max-w-prose flex-col gap-3">
              <Heading level={2} variant="h4">
                {item.content.title}
              </Heading>
              {item.content.description ? (
                <Text variant="body-lg">{item.content.description}</Text>
              ) : null}
              <LinkCta href={item.href}>{t('learnMore')}</LinkCta>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
