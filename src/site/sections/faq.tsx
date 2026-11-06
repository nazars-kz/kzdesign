import { getTranslations } from 'next-intl/server';
import type { SitePageContent } from '@/core/content/loader';

import { JsonLd } from '@/core/seo/json-ld';

import { Accordion } from '../components/accordion';
import { SectionHeader } from '../components/section-header';
import { ButtonLink } from '../components/ui/button';
import { Container } from '../components/ui/layout';

/** "We were asked these": the questions accordion; the button sits next to the title (under the list on phones). */
export async function Faq({ content }: { content: SitePageContent<'home'>['faq'] }) {
  const t = await getTranslations('home');
  return (
    <section className="faq" aria-labelledby="faq-title">
      {/* Every question is in the page (the extra ones wait behind "Show all"), so FAQPage data is honest. */}
      <JsonLd
        data={{
          '@type': 'FAQPage',
          mainEntity: content.items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }}
      />
      <Container className="faq__inner">
        <div className="faq__intro">
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            id="faq-title"
            className="faq__header"
          />
          <p className="faq__sub text-body-lg">{content.subtitle}</p>
          <div className="faq__cta">
            <ButtonLink href={content.cta.href} external={content.cta.external} size="xl">
              {content.cta.label}
            </ButtonLink>
          </div>
        </div>
        <div>
          <Accordion
            variant="faq"
            initialOpen={content.initiallyOpen > 0 ? content.initiallyOpen - 1 : null}
            items={content.items.map((item) => ({
              key: item._key,
              head: <span className="accordion__label">{item.question}</span>,
              body: <p>{item.answer}</p>,
            }))}
            collapsedCount={content.visibleCount}
            moreLabels={{ showAll: t.raw('faqShowAll') as string, showFewer: t('faqShowFewer') }}
            className="faq__list"
          />
          <div className="faq__after">
            <p className="faq__sub text-body-lg">{content.subtitle}</p>
            <ButtonLink
              href={content.ctaAfter.href}
              external={content.ctaAfter.external}
              size="lg"
              drawer="book"
            >
              {content.ctaAfter.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
