import { getTranslations } from 'next-intl/server';

import type { ResolvedImage } from '@/core/content/define';

import { Author } from '../components/author';
import { Breadcrumbs } from '../components/breadcrumbs';
import { Container } from '../components/ui/layout';
import { Heading } from '../components/ui/typography';

/** The content of the "Header and client feedback" section (`caseIntroSection()`). */
export interface CaseIntroContent {
  readonly title: string;
  readonly details: readonly {
    readonly _key: string;
    readonly label: string;
    readonly value: string;
  }[];
  readonly quote: string;
  readonly author: string;
  readonly authorRole: string;
  readonly authorPhoto: ResolvedImage | null;
  readonly authorFlag: ResolvedImage | null;
}

/** Paragraphs of a textarea: one per line, empty lines dropped. */
export const paragraphs = (text: string) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

/**
 * The top of every case page, before its own layout: breadcrumbs, the H1, the project details
 * (industry, platform, year) and the client's feedback. The feedback is left out while empty.
 */
export async function CaseIntro({
  content,
  name,
}: {
  content: CaseIntroContent;
  /** The case name (from its card) for the last breadcrumb. */
  name: string;
}) {
  const t = await getTranslations('cases');
  const rows = content.details.filter((row) => row.label);
  const quote = paragraphs(content.quote);
  return (
    <section className="cd" aria-labelledby="case-title">
      <Container>
        <Breadcrumbs
          variant="case"
          label={t('breadcrumb')}
          items={[{ label: t('caseStudies'), href: '/cases' }, { label: name }]}
        />
        <Heading level={1} variant="plain" id="case-title" className="cd__title">
          {content.title}
        </Heading>
        {rows.length > 0 ? (
          <div className="cd__group">
            <p className="cd__label">{t('details')}</p>
            <dl className="cd__rows">
              {rows.map((row) => (
                <div key={row._key} className="cd__row">
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
        {quote.length > 0 ? (
          <div className="cd__group">
            <p className="cd__label">{t('clientFeedback')}</p>
            <figure className="cd__quote">
              <blockquote>
                {quote.map((line, index) => (
                  <p key={`${index}-${line.slice(0, 16)}`}>{line}</p>
                ))}
              </blockquote>
              {content.author ? (
                <figcaption>
                  <Author
                    photo={content.authorPhoto}
                    name={content.author}
                    role={content.authorRole}
                    flag={content.authorFlag}
                  />
                </figcaption>
              ) : null}
            </figure>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
