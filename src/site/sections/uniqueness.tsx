import Image from 'next/image';

import type { SitePageContent } from '@/core/content/loader';

import { SectionHeader } from '../components/section-header';
import { Graphic } from '../components/ui/graphic';
import { Container, Section } from '../components/ui/layout';
import { PlainRichText } from '../components/ui/rich-text';
import { Heading } from '../components/ui/typography';
import { WHY_GRAPHICS } from '../theme/graphics';

/** "We are not design outsource…": cards with bullet points, a client quote and an illustration. */
export function Uniqueness({ content }: { content: SitePageContent<'home'>['uniqueness'] }) {
  return (
    <Section tone="inverse" spacing="none" className="uniq" labelledBy="uniqueness-title">
      <Container>
        <SectionHeader eyebrow={content.eyebrow} title={content.title} id="uniqueness-title" />
        <ul className="uniq__list">
          {content.cards.map((card) => (
            <li key={card._key}>
              <article className="u-card kzw-host">
                <div className="u-card__text">
                  <Heading level={3} variant="plain" className="u-card__title">
                    {card.title}
                  </Heading>
                  <ul className="u-card__bullets">
                    {card.bullets
                      .split('\n')
                      .filter((line) => line.trim() !== '')
                      .map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                  </ul>
                  <blockquote className="u-card__quote">
                    <PlainRichText doc={card.quote} />
                  </blockquote>
                  <div className="person">
                    {card.personAvatar ? (
                      <Image
                        src={card.personAvatar.src}
                        alt=""
                        width={48}
                        height={48}
                        sizes="48px"
                      />
                    ) : null}
                    <div>
                      <p className="person__name">{card.personName}</p>
                      <p className="person__role">{card.personRole}</p>
                    </div>
                  </div>
                </div>
                <div className="u-card__media">
                  {card.graphic ? <Graphic html={WHY_GRAPHICS[card.graphic]} /> : null}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
