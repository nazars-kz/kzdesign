import { getTranslations } from 'next-intl/server';

import { FormSecurityFields } from '@/core/forms/security-fields';
import { getSiteFormConfig } from '@/core/forms/site';
import { FormErrorCode } from '@/core/forms/validation';

import { ContactForm } from './contact-form';
import { RichText } from './ui/rich-text';

/** The contact form with its localized texts (edited in Pages → Forms) and spam protection. */
export async function ContactFormBlock({ locale }: { locale: string }) {
  const [config, t] = await Promise.all([
    getSiteFormConfig('contact', locale),
    getTranslations('forms'),
  ]);
  const consentTexts = Object.fromEntries(
    config.fields
      .filter((field) => field.consentText)
      .map((field) => [
        field.name,
        field.consentText ? <RichText doc={field.consentText} /> : null,
      ]),
  );
  return (
    <ContactForm
      config={config}
      messages={{
        ...Object.fromEntries(
          Object.values(FormErrorCode).map((code) => [code, t(`errors.${code}`)]),
        ),
        rateLimited: t('rateLimited'),
        confirm: t('confirm'),
        error: t('error'),
        notConnected: t('notConnected'),
      }}
      strings={{
        summaryTitle: t('summaryTitle'),
        required: t('required'),
        sending: t('sending'),
        choose: t('choose'),
      }}
      security={<FormSecurityFields formId="contact" />}
      consentTexts={consentTexts}
    />
  );
}
