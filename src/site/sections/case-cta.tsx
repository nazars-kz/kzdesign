import type { SitePageContent } from '@/core/content/loader';

import { Author } from '../components/author';
import { ButtonLink } from '../components/ui/button';
import { Eyebrow } from '../components/ui/eyebrow';
import { Container } from '../components/ui/layout';
import { Heading } from '../components/ui/typography';

/** Dark call to action at the end of a case page: text and button, and the CEO's card. */
export function CaseCta({ content }: { content: SitePageContent<'cases'>['caseCta'] }) {
  return (
    <section className="ccta on-dark" aria-labelledby="case-cta-title">
      <Container className="ccta__inner">
        <div className="ccta__text">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <Heading level={2} variant="plain" id="case-cta-title" className="ccta__title">
            {content.titleBefore} <b>{content.titleBold}</b> {content.titleAfter}
          </Heading>
          <p className="ccta__sub">{content.sub}</p>
          <ButtonLink
            href={content.button.href}
            external={content.button.external}
            variant="light"
            drawer="book"
          >
            {content.button.label}
          </ButtonLink>
        </div>
        <div className="ccta__card">
          <Author photo={content.photo} name={content.name} role={content.role} photoSize={48} />
          <ul className="ccta__list">
            {content.points.map((point, index) => (
              <li key={`${point}-${index}`}>{point}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
