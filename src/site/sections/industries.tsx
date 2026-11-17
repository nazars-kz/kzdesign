import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import type { SitePageContent } from '@/core/content/loader';

import { getListedCases } from '../case-cards';
import { Accordion } from '../components/accordion';
import { SectionHeader } from '../components/section-header';
import { cx } from '../components/ui/cn';
import { Icon } from '../components/ui/icon';
import { Container, Section } from '../components/ui/layout';

/** "Industries": an accordion; each industry lists the case studies tagged with it. */
export async function Industries({
  content,
  locale,
  className,
}: {
  content: SitePageContent<'home'>['industries'];
  locale: string;
  className?: string;
}) {
  const [cases, t] = await Promise.all([getListedCases(locale), getTranslations('home')]);

  const items = content.items.map((industry) => {
    const related = cases
      .filter((card) => card.industries.includes(industry.key))
      .sort((x, y) => (x.industryOrder ?? Infinity) - (y.industryOrder ?? Infinity));
    return {
      key: industry._key,
      head: (
        <>
          <span className="accordion__icon" aria-hidden="true">
            <Icon name={`industries/${industry.key}`} />
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
                    {item.industryThumb ? (
                      <Image
                        src={item.industryThumb.src}
                        alt=""
                        width={58}
                        height={58}
                        sizes="58px"
                      />
                    ) : null}
                    <span>
                      <b>{item.industryLabel || item.title}</b>
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
    <Section
      tone="inverse"
      spacing="none"
      className={cx('industries', className)}
      labelledBy="industries-title"
    >
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
