/** Case study page template (/cases/<slug>); the full design is built on the Cases step. */
import type { CollectionItemViewProps } from '@/core/collections/item-route';

import { PreviewNotice } from '../components/preview-notice';
import { Container, Section } from '../components/ui/layout';
import { Heading, Text } from '../components/ui/typography';

export function CaseView({ item, preview }: CollectionItemViewProps<'cases'>) {
  const { title, description } = item.content;
  return (
    <>
      {preview ? <PreviewNotice returnTo={item.href} /> : null}
      <Section labelledBy="page-title" className="min-h-160">
        <Container className="flex flex-col gap-8">
          <Heading level={1} variant="h2" id="page-title">
            {title}
          </Heading>
          {description ? (
            <Text variant="lead" className="max-w-prose">
              {description}
            </Text>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
