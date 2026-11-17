/** Cases page (/cases): hero, the filterable list of case studies and the contact block. */
import { getTranslations } from 'next-intl/server';

import { CASE_CATEGORIES } from '@/content/cases';
import type { PageViewProps } from '@/core/content/page-route';

import { getListedCases } from '../case-cards';
import { type CaseListItem, CasesBrowser } from '../components/cases-browser';
import { Container } from '../components/ui/layout';
import { CasesHero } from '../sections/cases-hero';
import { Contact } from '../sections/contact';

export async function CasesView({ content, locale }: PageViewProps<'cases'>) {
  const [t, cards] = await Promise.all([getTranslations('cases'), getListedCases(locale)]);
  const items: CaseListItem[] = cards.map((card) => ({
    slug: card.slug,
    href: card.href,
    title: card.title,
    description: card.description,
    tags: card.tags,
    categories: card.categories,
    cover: card.cover,
    coverMobile: card.coverMobile,
  }));
  const used = new Set(items.flatMap((item) => item.categories));
  const filters = CASE_CATEGORIES.filter((category) => used.has(category.value));

  return (
    <>
      <CasesHero content={content.hero} />
      <section className="cs-list" id="cases" aria-label={t('caseStudies')}>
        <Container>
          <CasesBrowser
            items={items}
            filters={filters}
            labels={{
              filters: t('filterLabel'),
              category: t('category'),
              all: t('all'),
              countOne: t.raw('countOne') as string,
              countMany: t.raw('countMany') as string,
            }}
          />
        </Container>
      </section>
      <Contact content={content.contact} locale={locale} />
    </>
  );
}
