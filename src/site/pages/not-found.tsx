/** PROJECT: localized 404 content (used by the 404 route and the not-found boundary). */
import { getTranslations } from 'next-intl/server';

import { ButtonLink } from '../components/ui/button';
import { Eyebrow } from '../components/ui/eyebrow';
import { Container, Section } from '../components/ui/layout';
import { Heading, Text } from '../components/ui/typography';

export async function NotFoundView() {
  const t = await getTranslations('notFound');
  return (
    <Section labelledBy="not-found-title" className="min-h-160">
      <Container className="flex flex-col items-start gap-6">
        <Eyebrow>404</Eyebrow>
        <Heading level={1} variant="h2" id="not-found-title">
          {t('title')}
        </Heading>
        <Text variant="lead" className="max-w-prose">
          {t('body')}
        </Text>
        <ButtonLink href="/" size="lg">
          {t('back')}
        </ButtonLink>
      </Container>
    </Section>
  );
}
