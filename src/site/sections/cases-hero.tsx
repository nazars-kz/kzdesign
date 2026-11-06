import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import type { SitePageContent } from '@/core/content/loader';

import { Breadcrumbs } from '../components/breadcrumbs';
import { Eyebrow } from '../components/ui/eyebrow';
import { Container } from '../components/ui/layout';
import { Lines } from '../components/ui/lines';
import { Heading } from '../components/ui/typography';

/** Top of the Cases page: picture, breadcrumbs, the h1, the intro and the four numbers. */
export async function CasesHero({ content }: { content: SitePageContent<'cases'>['hero'] }) {
  const t = await getTranslations('cases');
  const { background } = content;
  return (
    <section className="cs-hero on-dark" aria-labelledby="cases-title">
      {background ? (
        <Image
          src={background.src}
          alt=""
          fill
          preload
          sizes="100vw"
          placeholder={background.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={background.blurDataURL ?? undefined}
          className="cs-hero__bg"
        />
      ) : null}
      <Container className="cs-hero__crumbs">
        <Breadcrumbs
          label={t('breadcrumb')}
          items={[{ label: t('home'), href: '/' }, { label: t('caseStudies') }]}
        />
      </Container>
      <Container className="cs-hero__body">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading level={1} variant="plain" id="cases-title" className="cs-hero__title">
          <Lines text={content.title} />
        </Heading>
        <div className="cs-hero__foot">
          <p className="cs-hero__sub">{content.sub}</p>
          <dl className="cs-stats">
            {content.stats.map((stat) => (
              <div key={stat._key} className="cs-stat">
                <dt className="cs-stat__label">{stat.label}</dt>
                <dd className="cs-stat__num">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
