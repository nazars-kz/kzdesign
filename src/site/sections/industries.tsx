import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { getCollectionList } from '@/core/collections/loader';
import type { SitePageContent } from '@/core/content/loader';

import { Accordion } from '../components/accordion';
import { SectionHeader } from '../components/section-header';
import { Container, Section } from '../components/ui/layout';

/** "Industries": an accordion; each industry lists the case studies tagged with it. */
export async function Industries({
  content,
  locale,
}: {
  content: SitePageContent<'home'>['industries'];
  locale: string;
}) {
  const [{ items: cases }, t] = await Promise.all([
    getCollectionList('cases', locale),
    getTranslations('home'),
  ]);

  const items = content.items.map((industry) => {
    const related = cases
      .filter((item) => item.content.industries.includes(industry.key))
      .sort(
        (a, b) => (a.content.industryOrder ?? Infinity) - (b.content.industryOrder ?? Infinity),
      );
    return {
      key: industry._key,
      head: (
        <>
          <span className="accordion__icon" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element -- small static SVG icons */}
            <img src={`/icons/industries/${industry.key}.svg`} alt="" />
          </span>
          <span className="accordion__label">{industry.label}</span>
        </>
      ),
      body: (
        <>
          <p>{industry.text}</p>
          {related.length > 0 ? (
            <ul className="ind-cases">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={item.href} className="ind-case">
                    {item.content.industryThumb ? (
                      <Image
                        src={item.content.industryThumb.src}
                        alt=""
                        width={58}
                        height={58}
                        sizes="58px"
                      />
                    ) : null}
                    <span>
                      <b>{item.content.industryLabel || item.content.title}</b>
                      <em>{t('viewCaseStudy')}</em>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ),
    };
  });

  return (
    <Section tone="inverse" spacing="none" className="industries" labelledBy="industries-title">
      <Container className="industries__inner">
        <div className="industries__intro">
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            id="industries-title"
            className="industries__header"
          />
          <p className="industries__text text-body-lg">{content.text}</p>
        </div>
        <Accordion
          variant="industries"
          items={items}
          initialOpen={content.initiallyOpen > 0 ? content.initiallyOpen - 1 : null}
          className="industries__list"
        />
      </Container>
    </Section>
  );
}
