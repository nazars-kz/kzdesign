import type { SitePageContent } from '@/core/content/loader';

import { getListedCases } from '../case-cards';
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
  const cases = (await getListedCases(locale))
    .filter((card) => card.showOnHome)
    .sort((a, b) => (a.homeOrder ?? Infinity) - (b.homeOrder ?? Infinity));

  return (
    <section className="cases" id="cases" aria-labelledby="cases-title">
      <Container>
        <div className="cases__head">
          <SectionHeader eyebrow={content.eyebrow} title={content.title} id="cases-title" />
        </div>
        <ul className="cases__list">
          {cases.map((card) => (
            <li key={card.slug}>
              <CaseCard
                href={card.href}
                title={card.title}
                description={card.homeDescription || card.description}
                tags={card.homeTags.length > 0 ? card.homeTags : card.tags}
                cover={card.cover}
                coverMobile={card.coverMobile}
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
