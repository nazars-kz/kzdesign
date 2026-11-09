/** Contact us page (/contact-us): the contact block as the whole page. */
import type { PageViewProps } from '@/core/content/page-route';

import { Contact } from '../sections/contact';

export function ContactUsView({ content, locale }: PageViewProps<'contact-us'>) {
  return <Contact content={content.contact} locale={locale} asPage />;
}
