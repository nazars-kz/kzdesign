import type { SiteCollectionItem } from '@/core/collections/loader';
import type { SitePageContent } from '@/core/content/loader';

import { ButtonLink } from '../components/ui/button';
import { Container } from '../components/ui/layout';
import { Lines } from '../components/ui/lines';
import { SiteImage } from '../components/ui/site-image';
import { Heading } from '../components/ui/typography';

/** The dark "Got an Idea?" banner with a button and the service's device picture. */
export function ServiceIdea({
  item,
  content,
}: {
  item: SiteCollectionItem<'services'>;
  content: SitePageContent<'services'>['idea'];
}) {
  const { bannerImage } = item.content;
  return (
    <section className="git" aria-labelledby="svc-idea-title">
      <Container>
        <div className="git__box on-dark">
          <Heading level={2} variant="plain" id="svc-idea-title" className="git__title">
            <Lines text={content.title} />
          </Heading>
          <ButtonLink
            href={content.button.href}
            external={content.button.external}
            variant="light"
            drawer="book"
          >
            {content.button.label}
          </ButtonLink>
          {/* Decorative: the title and the button say it all. */}
          <SiteImage
            image={bannerImage ? { ...bannerImage, alt: '' } : null}
            sizes="(min-width: 1100px) 700px, 100vw"
            className="git__device"
          />
        </div>
      </Container>
    </section>
  );
}
