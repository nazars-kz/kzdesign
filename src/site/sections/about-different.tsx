import type { SitePageContent } from '@/core/content/loader';

import { DiffCard } from '../components/diff-card';
import { SectionHeader } from '../components/section-header';
import { Container } from '../components/ui/layout';
import { Lines } from '../components/ui/lines';
import { LinkCta } from '../components/ui/link-cta';

/** "What makes us different": four cards with a Lottie illustration that plays on hover. */
export function AboutDifferent({ content }: { content: SitePageContent<'about'>['different'] }) {
  return (
    <section className="diff" aria-labelledby="diff-title">
      <Container>
        <SectionHeader eyebrow={content.eyebrow} title={content.title} id="diff-title" />
        <div className="diff__list">
          {content.cards.map((card) => (
            <DiffCard key={card._key} src={`/animations/${card.animation}.json`}>
              <h3 className="diff-card__title">
                <Lines text={card.title} />
              </h3>
              <p>{card.text}</p>
            </DiffCard>
          ))}
        </div>
        <div className="diff__more">
          <LinkCta href={content.more.href} external={content.more.external}>
            {content.more.label}
          </LinkCta>
        </div>
      </Container>
    </section>
  );
}
