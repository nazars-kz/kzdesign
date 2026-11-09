/** About us page (/about-us): hero with the 3D logo, leadership, uniqueness, what makes us different, testimonials, contact. */
import type { PageViewProps } from '@/core/content/page-route';

import { AboutDifferent } from '../sections/about-different';
import { AboutHero } from '../sections/about-hero';
import { AboutLeadership } from '../sections/about-leadership';
import { Contact } from '../sections/contact';
import { Testimonials } from '../sections/testimonials';
import { Uniqueness } from '../sections/uniqueness';

export function AboutView({ content, locale }: PageViewProps<'about'>) {
  return (
    <>
      <AboutHero content={content.hero} />
      <AboutLeadership content={content.leadership} />
      <Uniqueness content={content.uniqueness} />
      <AboutDifferent content={content.different} />
      <Testimonials content={content.testimonials} />
      <Contact content={content.contact} locale={locale} />
    </>
  );
}
