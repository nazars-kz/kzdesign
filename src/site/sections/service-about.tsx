import Image from 'next/image';

import type { SiteCollectionItem } from '@/core/collections/loader';
import type { SitePageContent } from '@/core/content/loader';

import { Eyebrow } from '../components/ui/eyebrow';
import { Container } from '../components/ui/layout';

/** "About": the paragraphs of the service and, when it has them, the founders behind it. */
export function ServiceAbout({
  item,
  content,
}: {
  item: SiteCollectionItem<'services'>;
  content: SitePageContent<'services'>['about'];
}) {
  const { about, founders } = item.content;
  if (about.length === 0 && founders.length === 0) return null;
  return (
    <section className="svc-about">
      <Container className="svc-about__inner">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <div>
          <div className="svc-about__text">
            {about.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {founders.length > 0 ? (
            <div className="svc-founders">
              {founders.map((person) => (
                <div key={person._key} className="founder">
                  {person.photo ? (
                    <Image src={person.photo.src} alt={person.photo.alt} width={94} height={113} />
                  ) : null}
                  <div className="founder__text">
                    <h3 className="founder__name">{person.name}</h3>
                    <Eyebrow>{person.role}</Eyebrow>
                    <p className="founder__bio">{person.bio}</p>
                    <p className="founder__ex">{person.experience}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
