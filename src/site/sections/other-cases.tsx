import { getTranslations } from 'next-intl/server';

import type { SiteCollectionItem } from '@/core/collections/loader';
import type { SitePageContent } from '@/core/content/loader';

import { listCoverOf } from '../cases';
import { CaseCard } from '../components/case-card';
import { CaseSlider } from '../components/case-slider';
import { Eyebrow } from '../components/ui/eyebrow';
import { Heading } from '../components/ui/typography';

/** "Other case studies": the other listed cases in a slider at the end of a case page. */
export async function OtherCases({
  content,
  cases,
}: {
  content: SitePageContent<'cases'>['otherCases'];
  cases: readonly SiteCollectionItem<'cases'>[];
}) {
  if (cases.length === 0) return null;
  const t = await getTranslations('cases');
  return (
    <section className="cother on-dark" aria-labelledby="other-cases-title">
      <CaseSlider
        labels={{ previous: t('previousCase'), next: t('nextCase'), region: t('otherCases') }}
        heading={
          <>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <Heading
              level={2}
              variant="section-title"
              id="other-cases-title"
              className="cother__title"
            >
              {content.title}
            </Heading>
          </>
        }
      >
        {cases.map((item) => (
          <CaseCard
            key={item.slug}
            href={item.href}
            title={item.content.title}
            description={item.content.description}
            tags={item.content.tags}
            cover={listCoverOf(item.content)}
            coverMobile={item.content.listCoverMobile}
          />
        ))}
      </CaseSlider>
    </section>
  );
}
