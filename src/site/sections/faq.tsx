import type { SitePageContent } from '@/core/content/loader';

import { Accordion } from '../components/accordion';
import { SectionHeader } from '../components/section-header';
import { ButtonLink } from '../components/ui/button';
import { Container } from '../components/ui/layout';

/** "We were asked these": the questions accordion; the button sits next to the title (under the list on phones). */
export function Faq({ content }: { content: SitePageContent<'home'>['faq'] }) {
  return (
    <section className="faq" aria-labelledby="faq-title">
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
