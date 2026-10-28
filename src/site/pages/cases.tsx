/** Cases list page (/cases); the full design (filters, cards) is built on the Cases step. */
import type { CollectionListViewProps } from '@/core/collections/list-route';

import { CaseCard } from '../components/case-card';
import { Container, Section } from '../components/ui/layout';
import { Heading } from '../components/ui/typography';

export function CasesView({ content, list }: CollectionListViewProps<'cases', 'cases'>) {
  return (
    <Section labelledBy="page-title">
      <Container className="flex flex-col gap-12">
        <Heading level={1} variant="h2" id="page-title">
          {content.intro.title}
        </Heading>
        <ul className="cases__list">
          {list.items.map((item) => (
            <li key={item.slug}>
              <CaseCard
                href={item.href}
                title={item.content.title}
                description={item.content.description}
                tags={item.content.tags}
                cover={item.content.cover}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
