/** Cases page (/cases): hero, the filterable list of case studies and the contact block. */
import { getTranslations } from 'next-intl/server';

import type { CollectionListViewProps } from '@/core/collections/list-route';

import { CASE_CATEGORIES } from '@/content/collections/cases';

import { isListedCase, listCoverOf } from '../cases';
import { type CaseListItem, CasesBrowser } from '../components/cases-browser';
import { Container } from '../components/ui/layout';
import { CasesHero } from '../sections/cases-hero';
import { Contact } from '../sections/contact';

export async function CasesView({
  content,
  list,
  locale,
}: CollectionListViewProps<'cases', 'cases'>) {
  const t = await getTranslations('cases');
  const items: CaseListItem[] = list.items
    .filter((item) => isListedCase(item.content))
    .map((item) => ({
      slug: item.slug,
      href: item.href,
      title: item.content.title,
      description: item.content.description,
      tags: item.content.tags,
      categories: item.content.categories,
      cover: listCoverOf(item.content),
      coverMobile: item.content.listCoverMobile,
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
