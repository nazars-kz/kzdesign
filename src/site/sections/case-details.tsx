import { getTranslations } from 'next-intl/server';

import type { SiteCollectionItem } from '@/core/collections/loader';

import { Author } from '../components/author';
import { Breadcrumbs } from '../components/breadcrumbs';
import { Container } from '../components/ui/layout';
import { Heading } from '../components/ui/typography';

/** Top of a case page: breadcrumbs, the h1, the details (industry, platform, year) and the client's quote. */
export async function CaseDetails({ item }: { item: SiteCollectionItem<'cases'> }) {
  const t = await getTranslations('cases');
  const { title, pageTitle, details, quote, author, authorRole, authorPhoto, authorFlag } =
    item.content;
  const rows = details.filter((row) => row.label);
  return (
    <section className="cd" aria-labelledby="case-title">
      <Container>
        <div className="cd__box">
          <Breadcrumbs
            variant="case"
            label={t('breadcrumb')}
            items={[{ label: t('caseStudies'), href: '/cases' }, { label: title }]}
          />
          <Heading level={1} variant="plain" id="case-title" className="cd__title">
            {pageTitle || title}
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
          {quote ? (
            <div className="cd__group">
              <p className="cd__label">{t('clientFeedback')}</p>
              <figure className="cd__quote">
                <blockquote>{quote}</blockquote>
                <figcaption>
                  <Author photo={authorPhoto} name={author} role={authorRole} flag={authorFlag} />
                </figcaption>
              </figure>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
