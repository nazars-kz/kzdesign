import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import type { SitePageContent } from '@/core/content/loader';

import { SectionHeader } from '../components/section-header';
import { TestimonialCard } from '../components/testimonial-card';
import { TestimonialSlider } from '../components/testimonial-slider';
import { Section } from '../components/ui/layout';
import { LinkCta } from '../components/ui/link-cta';

/** "Testimonials from Our Partners": the slider of testimonial cards and the Clutch rating. */
export async function Testimonials({
  content,
}: {
  content: SitePageContent<'home'>['testimonials'];
}) {
  const t = await getTranslations('home');
  return (
    <Section tone="inverse" spacing="none" id="reviews" className="testi" labelledBy="testi-title">
      <TestimonialSlider
        labels={{
          previous: t('previousSlide'),
          next: t('nextSlide'),
          region: t('testimonialsLabel'),
        }}
        heading={<SectionHeader eyebrow={content.eyebrow} title={content.title} id="testi-title" />}
        footer={
          <div className="testi__foot">
            <LinkCta href={content.readReviews.href} external={content.readReviews.external}>
              {content.readReviews.label}
            </LinkCta>
            <a
              className="clutch-rev"
              href={content.clutchLink.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={content.clutchLink.label}
            >
              <span className="clutch-rev__label">{content.clutchLabel}</span>
              <Image
                className="clutch-rev__logo"
                src="/brand/clutch-white.svg"
                alt="Clutch"
                width={81}
                height={23}
                unoptimized
              />
              <span className="clutch-rev__stars" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className="clutch-rev__count">{content.clutchCount}</span>
            </a>
          </div>
        }
      >
        {content.items.map((item) => (
          <TestimonialCard
            key={item._key}
            name={item.name}
            photo={item.photo}
            flag={item.flag}
            role={item.role}
            project={item.project}
            quote={item.quote}
            caseKind={item.caseKind}
            caseName={item.caseName}
            caseImage={item.caseImage}
            caseSlug={item.caseSlug}
          />
        ))}
      </TestimonialSlider>
    </Section>
  );
}
