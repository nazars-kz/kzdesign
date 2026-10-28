import Image from 'next/image';

import type { SitePageContent } from '@/core/content/loader';

import { SectionHeader } from '../components/section-header';
import { ContentLink } from '../components/ui/content-link';
import { Container } from '../components/ui/layout';
import { LinkCta } from '../components/ui/link-cta';

/** "Our Approach": the pitch with a link, and four cards (Discovery, Strategy, UX/UI Design, Prototyping). */
export function Approach({ content }: { content: SitePageContent<'home'>['approach'] }) {
  return (
    <section className="approach" aria-labelledby="approach-title">
      <Container className="approach__inner">
        <div>
          <SectionHeader eyebrow={content.eyebrow} title={content.title} id="approach-title" />
          <p className="approach__text text-body-lg">{content.text}</p>
          <div className="approach__link">
            <LinkCta href={content.link.href} external={content.link.external}>
              {content.link.label}
            </LinkCta>
          </div>
        </div>
        <ul className="approach__grid">
          {content.cards.map((card) => (
            <li key={card._key}>
              <ContentLink href={card.link.href} external={card.link.external} className="a-card">
                <span className="a-card__title text-body">{card.link.label}</span>
                {card.image ? (
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    width={card.image.width}
                    height={card.image.height}
                    sizes="260px"
                  />
                ) : null}
              </ContentLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
