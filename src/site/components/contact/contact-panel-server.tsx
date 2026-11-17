import { getTranslations } from 'next-intl/server';

import { getGlobalContent, getPageContent } from '@/core/content/loader';
import { FormSecurityFields } from '@/core/forms/security-fields';
import { getSiteFormConfig } from '@/core/forms/site';
import { FormErrorCode } from '@/core/forms/validation';

import { RichText } from '../ui/rich-text';
import { ContactDrawer } from './contact-drawer';
import { ContactInline } from './contact-inline';
import type { PanelForm } from './contact-panel';
import { PANEL_STRING_KEYS, type PanelStrings } from './panel-strings';

/** Everything the panel needs, read once on the server (texts are edited in the admin). */
async function panelData(locale: string) {
  const [messageConfig, bookingConfig, t, tForms, home, site] = await Promise.all([
    getSiteFormConfig('contact', locale),
    getSiteFormConfig('booking', locale),
    getTranslations('contact'),
    getTranslations('forms'),
    getPageContent('home', locale),
    getGlobalContent('site', locale),
  ]);
  const messages = {
    ...Object.fromEntries(
      Object.values(FormErrorCode).map((code) => [code, tForms(`errors.${code}`)]),
    ),
    rateLimited: tForms('rateLimited'),
    confirm: tForms('confirm'),
    error: tForms('error'),
    notConnected: tForms('notConnected'),
  };
  const form = (config: typeof messageConfig, id: string): PanelForm => ({
    config,
    messages,
    security: <FormSecurityFields formId={id} />,
  });
  // `t.raw` keeps `{name}`-style placeholders as they are: the panel fills them in
  const strings = Object.fromEntries(
    PANEL_STRING_KEYS.map((key) => [key, t.raw(key) as string]),
  ) as PanelStrings;
  const consentField = messageConfig.fields.find((field) => field.consentText);
  const person = home.contact.team[0];
  return {
    messageForm: form(messageConfig, 'contact'),
    bookingForm: form(bookingConfig, 'booking'),
    strings,
    formStrings: {
      summaryTitle: tForms('summaryTitle'),
      required: tForms('required'),
      sending: tForms('sending'),
    },
    person: {
      name: person?.name ?? '',
      role: person?.role ?? '',
      photo: person?.photo ?? null,
    },
    lead: home.contact.lead,
    email: site.company.email,
    consent: consentField?.consentText ? <RichText doc={consentField.consentText} /> : null,
  };
}

/** The slide-in panel mounted once in the site layout. */
export async function ContactDrawerMount({ locale }: { locale: string }) {
  return <ContactDrawer {...await panelData(locale)} />;
}

/** The embedded form of the Home contact block. */
export async function ContactInlineBlock({ locale }: { locale: string }) {
  return <ContactInline {...await panelData(locale)} />;
}
