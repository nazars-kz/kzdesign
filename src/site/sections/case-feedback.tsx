import { getTranslations } from 'next-intl/server';

import type { SiteCollectionItem } from '@/core/collections/loader';

import { Author } from '../components/author';
import { Eyebrow } from '../components/ui/eyebrow';
import { Container } from '../components/ui/layout';
import { SiteImage } from '../components/ui/site-image';

/** "Client feedback" band under the screens: the lead sentence, the text, the author and a picture. */
export async function CaseFeedback({ item }: { item: SiteCollectionItem<'cases'> }) {
  const {
    feedbackLead,
    feedbackBody,
    feedbackVisual,
    author,
    authorRole,
    authorPhoto,
    authorFlag,
  } = item.content;
  if (!feedbackLead && !feedbackBody) return null;
  const t = await getTranslations('cases');
  return (
    <section className="cfb" aria-label={t('clientFeedback')}>
      <Container className="cfb__inner">
        <div className="cfb__text">
          <Eyebrow>{t('clientFeedback')}</Eyebrow>
          {feedbackLead ? <p className="cfb__lead">{feedbackLead}</p> : null}
          {feedbackBody ? <p className="cfb__body">{feedbackBody}</p> : null}
          <Author photo={authorPhoto} name={author} role={authorRole} flag={authorFlag} />
        </div>
        {feedbackVisual ? (
          <SiteImage
            image={feedbackVisual}
            sizes="(min-width: 1100px) 700px, 100vw"
            className="cfb__visual"
          />
        ) : null}
      </Container>
    </section>
  );
}
