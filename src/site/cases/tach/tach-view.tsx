/** Tach case study (/cases/tach): a unique page. The layout is added in the next step of the case work. */
import type { PageViewProps } from '@/core/content/page-route';

import { Container } from '../../components/ui/layout';
import { Heading } from '../../components/ui/typography';
import { RelatedCases } from '../related-cases';

export function TachView({ content, locale }: PageViewProps<'case-tach'>) {
  return (
    <>
      <Container className="py-section">
        <Heading level={1} variant="h2">
          {content.card.title}
        </Heading>
      </Container>
      <RelatedCases content={content.related} current="tach" locale={locale} />
    </>
  );
}
