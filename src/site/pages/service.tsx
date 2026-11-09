/** Service page template (/services/<slug>): picture, title, about, promises, cases, banner, process, partners, testimonials, contact, next service. */
import type { CollectionItemViewProps } from '@/core/collections/item-route';
import { getCollectionList } from '@/core/collections/loader';
import { getPageContent } from '@/core/content/loader';

import { PreviewNotice } from '../components/preview-notice';
import { Contact } from '../sections/contact';
import { ServiceAbout } from '../sections/service-about';
import { ServiceCases } from '../sections/service-cases';
import { ServiceFeatures } from '../sections/service-features';
import { ServiceHero } from '../sections/service-hero';
import { ServiceIdea } from '../sections/service-idea';
import { ServiceNext } from '../sections/service-next';
import { ServicePartners } from '../sections/service-partners';
import { ServiceProcess } from '../sections/service-process';
import { Testimonials } from '../sections/testimonials';

export async function ServiceView({ item, locale, preview }: CollectionItemViewProps<'services'>) {
  const [page, { items }] = await Promise.all([
    getPageContent('services', locale),
    getCollectionList('services', locale),
  ]);
  const others = items.filter((other) => other.slug !== item.slug);
  return (
    <>
      {preview ? <PreviewNotice returnTo={item.href} /> : null}
      <ServiceHero item={item} />
      <ServiceAbout item={item} content={page.about} />
      <ServiceFeatures content={page.features} />
      <ServiceCases item={item} content={page.cases} locale={locale} />
      <ServiceIdea item={item} content={page.idea} />
      <ServiceProcess content={page.process} />
      <ServicePartners content={page.partners} />
      <Testimonials content={page.testimonials} />
      <Contact content={page.contact} locale={locale} />
      <ServiceNext services={others} content={page.nextService} />
    </>
  );
}
