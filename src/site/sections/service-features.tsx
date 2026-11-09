import type { SitePageContent } from '@/core/content/loader';

import { Container } from '../components/ui/layout';
import { Lines } from '../components/ui/lines';
import { SiteImage } from '../components/ui/site-image';

/** The three promises (no middlemen, updates, developer-ready design): cards with a picture. */
export function ServiceFeatures({ content }: { content: SitePageContent<'services'>['features'] }) {
  return (
    <section className="svc-features">
      <Container className="svc-features__list">
        {content.cards.map((card) => (
          <article key={card._key} className="feature">
            <div className="feature__text">
              <h2 className="feature__title">
                <Lines text={card.title} />
              </h2>
              <p>{card.text}</p>
            </div>
            <SiteImage image={card.image} sizes="(min-width: 1100px) 429px, 100vw" />
          </article>
        ))}
      </Container>
    </section>
  );
}
