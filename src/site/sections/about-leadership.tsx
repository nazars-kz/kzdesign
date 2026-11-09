import Image from 'next/image';

import type { SitePageContent } from '@/core/content/loader';

import { ButtonLink } from '../components/ui/button';
import { Eyebrow } from '../components/ui/eyebrow';
import { Container } from '../components/ui/layout';
import { Heading } from '../components/ui/typography';

/** "K&Z Leadership": the founders with their photos, and a button. */
export function AboutLeadership({ content }: { content: SitePageContent<'about'>['leadership'] }) {
  return (
    <section className="lead" id="leadership" aria-labelledby="leadership-intro">
      <Container>
        <div className="lead__inner">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <p id="leadership-intro" className="lead__intro">
            {content.intro}
          </p>
          <div className="lead__list">
            {content.leaders.map((person) => (
              <article key={person._key} className="leader">
                {person.photo ? (
                  <Image
                    className="leader__photo"
                    src={person.photo.src}
                    alt={person.photo.alt}
                    width={321}
                    height={388}
                    sizes="(min-width: 768px) 321px, 100vw"
                  />
                ) : null}
                <div className="leader__text">
                  <Heading level={2} variant="plain" className="leader__name">
                    {person.firstName}{' '}
                    {person.lastName ? (
                      <>
                        <span className="hl">{person.lastName.slice(0, 1)}</span>
                        {person.lastName.slice(1)}
                      </>
                    ) : null}
                  </Heading>
                  <p className="leader__role">{person.role}</p>
                  <p className="leader__bio">{person.bio}</p>
                  <p className="leader__ex">{person.experience}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="lead__cta">
            <ButtonLink href={content.button.href} external={content.button.external}>
              {content.button.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
