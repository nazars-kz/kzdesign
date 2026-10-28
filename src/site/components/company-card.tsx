import { getTranslations } from 'next-intl/server';

import { mailtoHref } from '@/core/content/contact-links';

/** Company details under the contact form (name, registry code and address, email). */
export async function CompanyCard({
  name,
  details,
  email,
}: {
  name: string;
  details: string;
  email: string;
}) {
  const t = await getTranslations('home');
  return (
    <div className="company text-body">
      <b>{name}</b>
      {details}
      {email ? (
        <>
          <br />
          {t('companyEmail')} <a href={mailtoHref(email)}>{email}</a>
        </>
      ) : null}
    </div>
  );
}
