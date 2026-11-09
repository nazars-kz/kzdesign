/** Legal page (privacy policy, terms, refund policy): breadcrumbs, title, last update and the text. */
import { getTranslations } from 'next-intl/server';

import type { RichTextDoc } from '@/core/content/rich-text';

import { Breadcrumbs } from '../components/breadcrumbs';
import { Container } from '../components/ui/layout';
import { RichText } from '../components/ui/rich-text';
import { Heading } from '../components/ui/typography';

interface LegalContent {
  readonly intro: {
    readonly title: string;
    readonly updated: string;
    readonly body: RichTextDoc;
  };
}

export async function LegalView({ content }: { content: LegalContent }) {
  const t = await getTranslations('legal');
  const { title, updated, body } = content.intro;
  return (
    <>
      <Container className="ab-crumbs">
        <Breadcrumbs
          variant="page"
          label={t('breadcrumb')}
          items={[{ label: t('home'), href: '/' }, { label: title }]}
        />
      </Container>
      <section className="legal" aria-labelledby="legal-title">
        <Container className="legal__inner">
          <Heading level={1} variant="plain" id="legal-title" className="legal__title">
            {title}
          </Heading>
          {updated ? (
            <p className="legal__updated">
              {t('updated')} {updated}
            </p>
          ) : null}
          <RichText doc={body} className="legal__text" />
        </Container>
      </section>
    </>
  );
}
