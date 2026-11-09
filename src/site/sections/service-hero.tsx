import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import type { SiteCollectionItem } from '@/core/collections/loader';

import { Breadcrumbs } from '../components/breadcrumbs';
import { Container } from '../components/ui/layout';
import { Heading } from '../components/ui/typography';

/** Top of a service page: the wide picture with the breadcrumbs on it, and the h1 under it. */
export async function ServiceHero({ item }: { item: SiteCollectionItem<'services'> }) {
  const t = await getTranslations('services');
  const { heroImage, navLabel, title } = item.content;
  return (
    <>
      <div className="svc-hero on-dark">
        {heroImage ? (
          <Image
            src={heroImage.src}
            alt=""
            fill
            preload
            sizes="100vw"
            placeholder={heroImage.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={heroImage.blurDataURL ?? undefined}
            className="svc-hero__bg"
          />
        ) : null}
        <Container className="svc-hero__crumbs">
          <Breadcrumbs
            label={t('breadcrumb')}
            items={[{ label: t('home'), href: '/' }, { label: navLabel || title }]}
          />
        </Container>
      </div>
      <section className="svc-title" aria-label={title}>
        <Container>
          <Heading level={1} variant="plain">
            {title}
          </Heading>
        </Container>
      </section>
    </>
  );
}
