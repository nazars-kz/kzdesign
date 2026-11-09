import type { SiteCollectionItem } from '@/core/collections/loader';
import type { SitePageContent } from '@/core/content/loader';

import { CaseCard } from '../components/case-card';
import { Eyebrow } from '../components/ui/eyebrow';
import { Container } from '../components/ui/layout';

/** "Next service": cards of the other services at the end of a service page. */
export function ServiceNext({
  services,
  content,
}: {
  services: readonly SiteCollectionItem<'services'>[];
  content: SitePageContent<'services'>['nextService'];
}) {
  if (services.length === 0) return null;
  return (
    <section className="svc-next">
      <Container>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <ul className="svc-next__grid">
          {services.map((service) => (
            <li key={service.slug}>
              <CaseCard
                stacked
                href={service.href}
                title={service.content.nextTitle || service.content.title}
                description={service.content.nextText || service.content.description}
                tags={[]}
                cover={service.content.nextImage}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
