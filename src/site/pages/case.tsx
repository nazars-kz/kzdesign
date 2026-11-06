/** Case study page (/cases/<slug>): details, screens, client feedback, call to action, other cases, contact. */
import { getTranslations } from 'next-intl/server';

import type { CollectionItemViewProps } from '@/core/collections/item-route';
import { getCollectionList } from '@/core/collections/loader';
import { getPageContent } from '@/core/content/loader';

import { isListedCase } from '../cases';
import { PreviewNotice } from '../components/preview-notice';
import { CaseCta } from '../sections/case-cta';
import { CaseDetails } from '../sections/case-details';
import { CaseFeedback } from '../sections/case-feedback';
import { CaseScreens } from '../sections/case-screens';
import { Contact } from '../sections/contact';
import { OtherCases } from '../sections/other-cases';

export async function CaseView({ item, locale, preview }: CollectionItemViewProps<'cases'>) {
  const [page, { items }, t] = await Promise.all([
    getPageContent('cases', locale),
    getCollectionList('cases', locale),
    getTranslations('cases'),
  ]);
  // The other cases that are listed on the Cases page.
  const others = items.filter((other) => other.slug !== item.slug && isListedCase(other.content));
  return (
    <>
      {preview ? <PreviewNotice returnTo={item.href} /> : null}
      <CaseDetails item={item} />
      <CaseScreens
        desktop={item.content.screensDesktop}
        mobile={item.content.screensMobile}
        label={t('screens')}
      />
      <CaseFeedback item={item} />
      <CaseCta content={page.caseCta} />
      <OtherCases content={page.otherCases} cases={others} />
      <Contact content={page.contact} locale={locale} />
    </>
  );
}
