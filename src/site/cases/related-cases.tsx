import { getTranslations } from 'next-intl/server';

import { type CaseCardData, getListedCases } from '../case-cards';
import { CaseCard } from '../components/case-card';
import { CaseSlider } from '../components/case-slider';
import { Eyebrow } from '../components/ui/eyebrow';
import { Heading } from '../components/ui/typography';

/**
 * "Related case studies": the block every case page ends with, just before the footer. The
 * other listed cases in a slider; nothing is rendered while there are no other cases.
 */
export async function RelatedCases({
  content,
  current,
  locale,
}: {
  content: { readonly eyebrow: string; readonly title: string };
  /** Slug of the case page being shown (it is not offered again). */
  current: string;
  locale: string;
}) {
  const [t, listed] = await Promise.all([getTranslations('cases'), getListedCases(locale)]);
  const cases: readonly CaseCardData[] = listed.filter((card) => card.slug !== current);
  if (cases.length === 0) return null;
  return (
    <section className="cother on-dark" aria-labelledby="related-cases-title">
      <CaseSlider
        labels={{ previous: t('previousCase'), next: t('nextCase'), region: t('otherCases') }}
        heading={
          <>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <Heading
              level={2}
              variant="section-title"
              id="related-cases-title"
              className="cother__title"
            >
              {content.title}
            </Heading>
          </>
        }
      >
        {cases.map((card) => (
          <CaseCard
            key={card.slug}
            href={card.href}
            title={card.title}
            description={card.description}
            tags={card.tags}
            cover={card.cover}
            coverMobile={card.coverMobile}
          />
        ))}
      </CaseSlider>
    </section>
  );
}
