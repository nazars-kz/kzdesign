import type { SitePageContent } from '@/core/content/loader';

import { PartnerTile } from '../components/partner-tile';
import { SectionHeader } from '../components/section-header';
import { Container } from '../components/ui/layout';

/** "Partners who trust us": the logo grid; some logos lead to a case study. */
export function Partners({ content }: { content: SitePageContent<'home'>['partners'] }) {
  return (
    <section className="partners" aria-labelledby="partners-title">
      <Container>
        <SectionHeader eyebrow={content.eyebrow} title={content.title} id="partners-title" />
        <ul className="partners__grid">
          {content.tiles.map((tile) => (
            <li key={tile._key}>
              <PartnerTile logo={tile.logo} caseSlug={tile.caseSlug || undefined} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
