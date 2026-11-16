import type { SitePageContent } from '@/core/content/loader';

import { InfoCard } from '../components/info-card';
import { Eyebrow } from '../components/ui/eyebrow';
import { Container } from '../components/ui/layout';
import { Heading } from '../components/ui/typography';

/** "What's included": label on the left, title and a grid of icon cards on the right. */
export function Included({ content }: { content: SitePageContent<'home'>['included'] }) {
  if (content.cards.length === 0) return null;
  return (
    <section className="included" aria-labelledby="included-title">
      <Container className="included__inner">
        {content.eyebrow ? <Eyebrow>{content.eyebrow}</Eyebrow> : null}
        <div>
          <Heading
            level={2}
            variant="section-title"
            id="included-title"
            className="included__title"
          >
            {content.title}
          </Heading>
          <div className="info-cards">
            {content.cards.map((card) => (
              <InfoCard
                key={card._key}
                icon={card.icon ? `included/${card.icon}` : undefined}
                title={card.title}
                text={card.text}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
