import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import type { ResolvedImage } from '@/core/content/define';

import { QuoteScroll } from './quote-scroll';
import { caseHref, ContentLink } from './ui/content-link';

export interface TestimonialCardProps {
  readonly name: string;
  readonly photo: ResolvedImage | null;
  readonly flag: ResolvedImage | null;
  readonly role: string;
  readonly project: string;
  /** Paragraphs separated by an empty line. */
  readonly quote: string;
  readonly caseKind: 'none' | 'link' | 'soon';
  readonly caseName?: string;
  readonly caseImage?: ResolvedImage | null;
  readonly caseSlug?: string;
}

/** One testimonial: the partner's photo and details, the text and an optional case study link. */
export async function TestimonialCard(props: TestimonialCardProps) {
  const t = await getTranslations('home');
  const { name, photo, flag, role, project, quote, caseKind, caseName, caseImage, caseSlug } =
    props;
  const paragraphs = quote.split(/\n{2,}/).filter((paragraph) => paragraph.trim() !== '');
  const caseThumb = caseImage ? (
    <Image src={caseImage.src} alt="" width={46} height={46} sizes="46px" />
  ) : (
    <span className="t-card__soon-ico" aria-hidden="true" />
  );

  return (
    <article className="t-card">
      <div className="t-card__photo">
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 768px) 308px, 311px"
            placeholder={photo.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={photo.blurDataURL ?? undefined}
          />
        ) : null}
        <div className="t-card__who">
          <p className="t-card__name">
            {name}
            {flag ? (
              <Image src={flag.src} alt={flag.alt} width={20} height={20} sizes="20px" />
            ) : null}
          </p>
          <p className="t-card__role">{role}</p>
          <p className="t-card__proj">{project}</p>
        </div>
      </div>
      <div className="t-card__quote">
        <QuoteScroll paragraphs={paragraphs} />
        {caseKind === 'link' && caseSlug ? (
          <ContentLink href={caseHref(caseSlug)} className="t-card__case">
            {caseThumb}
            <div>
              {caseName}
              <span>
                {t('viewCaseStudy')} <i aria-hidden="true" />
              </span>
            </div>
          </ContentLink>
        ) : null}
        {caseKind === 'soon' ? (
          <div className="t-card__case is-soon">
            {caseThumb}
            <div>
              <span>{t('caseSoon')}</span>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
