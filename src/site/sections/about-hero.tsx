import { getTranslations } from 'next-intl/server';

import type { SitePageContent } from '@/core/content/loader';

import { Breadcrumbs } from '../components/breadcrumbs';
import { KzLogo3D } from '../components/kz-logo-3d';
import { Container } from '../components/ui/layout';
import { Heading } from '../components/ui/typography';

/** Top of the About page: breadcrumbs, the h1, the intro and the rotating 3D logo. */
export async function AboutHero({ content }: { content: SitePageContent<'about'>['hero'] }) {
  const t = await getTranslations('about');
  return (
    <>
      <Container className="ab-crumbs">
        <Breadcrumbs
          variant="page"
          label={t('breadcrumb')}
          items={[{ label: t('home'), href: '/' }, { label: t('aboutUs') }]}
        />
      </Container>
      <section className="ab-hero" aria-labelledby="about-title">
        <Container>
          <Heading level={1} variant="plain" id="about-title" className="ab-hero__title">
            {content.title}
          </Heading>
          <p className="ab-hero__sub">{content.sub}</p>
          <KzLogo3D className="ab-hero__logo" />
        </Container>
      </section>
    </>
  );
}
