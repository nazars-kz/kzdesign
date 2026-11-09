import { getTranslations } from 'next-intl/server';

import type { SitePageContent } from '@/core/content/loader';

import { Author } from '../components/author';
import { Breadcrumbs } from '../components/breadcrumbs';
import { Container } from '../components/ui/layout';
import { PlainRichText } from '../components/ui/rich-text';
import { Heading } from '../components/ui/typography';

/** Top of the Approach page: breadcrumbs, the h1, the intro, jump links to the phases and the founder quote. */
export async function ApproachHero({
  content,
  phases,
}: {
  content: SitePageContent<'approach'>['hero'];
  /** The phases the pills jump to: their anchor and label. */
  phases: readonly { id: string; label: string }[];
}) {
  const t = await getTranslations('approach');
  return (
    <>
      <Container className="ap-crumbs">
        <Breadcrumbs
          variant="page"
          label={t('breadcrumb')}
          items={[{ label: t('home'), href: '/' }, { label: t('approach') }]}
        />
      </Container>
      <section className="ap-hero" aria-labelledby="approach-title">
        <Container>
          <Heading level={1} variant="plain" id="approach-title" className="ap-hero__title">
            {content.title}
          </Heading>
          <div className="ap-hero__row">
            <div>
              <p className="ap-hero__sub">{content.sub}</p>
              <nav className="ap-pills" aria-label={t('steps')}>
                {phases.map((phase) => (
                  <a key={phase.id} href={`#${phase.id}`}>
                    {phase.label}
                  </a>
                ))}
              </nav>
            </div>
            <figure className="ap-quote">
              <blockquote>
                <PlainRichText doc={content.quote} />
              </blockquote>
              <figcaption>
                <Author
                  photo={content.photo}
                  name={content.name}
                  role={content.role}
                  photoSize={48}
                />
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>
    </>
  );
}
