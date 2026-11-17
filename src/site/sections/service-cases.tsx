import type { SiteCollectionItem } from '@/core/collections/loader';
import type { SitePageContent } from '@/core/content/loader';

import { getListedCases } from '../case-cards';
import { CaseCard } from '../components/case-card';
import { Eyebrow } from '../components/ui/eyebrow';
import { Container } from '../components/ui/layout';
import { Lines } from '../components/ui/lines';
import { LinkCta } from '../components/ui/link-cta';
import { Heading } from '../components/ui/typography';

/** "Case Studies" of a service: the cases the service lists, as cards, and a link to all of them. */
export async function ServiceCases({
  item,
  content,
  locale,
}: {
  item: SiteCollectionItem<'services'>;
  content: SitePageContent<'services'>['cases'];
  locale: string;
}) {
  const listed = await getListedCases(locale);
  const bySlug = new Map(listed.map((card) => [card.slug, card]));
  // Slugs of cases that do not exist (yet) are skipped.
  const cases = item.content.caseSlugs.flatMap((slug) => {
    const found = bySlug.get(slug);
    return found ? [found] : [];
  });
  if (cases.length === 0) return null;
  return (
    <section className="svc-cases" id="cases" aria-labelledby="svc-cases-title">
      <Container>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading
          level={2}
          variant="section-title"
          id="svc-cases-title"
          className="svc-cases__title"
        >
          <Lines text={content.title} />
        </Heading>
        <ul className="svc-cases__grid">
          {cases.map((card) => (
            <li key={card.slug}>
              <CaseCard
                stacked
                href={card.href}
                title={card.title}
                description={card.description}
                tags={card.tags}
                cover={card.cover}
                coverMobile={card.coverMobile}
              />
            </li>
          ))}
        </ul>
        <div className="svc-cases__all">
          <LinkCta href={content.seeAll.href} external={content.seeAll.external}>
            {content.seeAll.label}
          </LinkCta>
        </div>
      </Container>
    </section>
  );
}
