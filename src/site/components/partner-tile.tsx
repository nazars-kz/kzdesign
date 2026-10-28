import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import type { ResolvedImage } from '@/core/content/define';

import { caseHref, ContentLink } from './ui/content-link';

/** A partner logo; with a case study address the tile links to it and shows "View case study" on hover. */
export async function PartnerTile({
  logo,
  caseSlug,
}: {
  logo: ResolvedImage | null;
  caseSlug?: string;
}) {
  if (!logo) return null;
  const image = (
    <Image
      src={logo.src}
      alt={logo.alt}
      fill
      sizes="(min-width: 1100px) 16vw, (min-width: 768px) 25vw, 50vw"
    />
  );
  if (!caseSlug) return <div className="partner-tile">{image}</div>;
  const t = await getTranslations('home');
  return (
    <ContentLink href={caseHref(caseSlug)} className="partner-tile is-case">
      {image}
      <span className="partner-tile__hover">
        {t('viewCaseStudy')} <i aria-hidden="true" />
      </span>
    </ContentLink>
  );
}
