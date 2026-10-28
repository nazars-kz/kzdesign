import { getCollectionList } from '@/core/collections/loader';
import type { SitePageContent } from '@/core/content/loader';

import { CaseCard } from '../components/case-card';
import { SectionHeader } from '../components/section-header';
import { Container } from '../components/ui/layout';
import { LinkCta } from '../components/ui/link-cta';

/** "Case Studies" on Home: the cases marked "Show on Home", in their Home order. */
export async function HomeCases({
  content,
  locale,
}: {
  content: SitePageContent<'home'>['cases'];
  locale: string;
}) {
  const { items } = await getCollectionList('cases', locale);
  const cases = items
    .filter((item) => item.content.showOnHome)
    .sort((a, b) => (a.content.homeOrder ?? Infinity) - (b.content.homeOrder ?? Infinity));

  return (
    <section className="cases" id="cases" aria-labelledby="cases-title">
      <Container>
        <div className="cases__head">
          <SectionHeader eyebrow={content.eyebrow} title={content.title} id="cases-title" />
        </div>
        <ul className="cases__list">
          {cases.map((item) => (
            <li key={item.slug}>
              <CaseCard
                href={item.href}
                title={item.content.title}
                description={item.content.homeDescription || item.content.description}
                tags={item.content.homeTags.length > 0 ? item.content.homeTags : item.content.tags}
                cover={item.content.cover}
              />
            </li>
          ))}
        </ul>
        <div className="cases__all">
          <LinkCta href={content.seeAll.href} external={content.seeAll.external}>
            {content.seeAll.label}
          </LinkCta>
        </div>
      </Container>
    </section>
  );
}
