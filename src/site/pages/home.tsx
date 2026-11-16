/** Home page: hero, services, cases, what's included, uniqueness, approach, testimonials, partners, industries, FAQ, contact. */
import type { PageViewProps } from '@/core/content/page-route';

import { Approach } from '../sections/approach';
import { Contact } from '../sections/contact';
import { Faq } from '../sections/faq';
import { Hero } from '../sections/hero';
import { HomeCases } from '../sections/home-cases';
import { Included } from '../sections/included';
import { Industries } from '../sections/industries';
import { Partners } from '../sections/partners';
import { Services } from '../sections/services';
import { Testimonials } from '../sections/testimonials';
import { Uniqueness } from '../sections/uniqueness';

export function HomeView({ content, locale }: PageViewProps<'home'>) {
  return (
    <>
      <Hero content={content.hero} />
      <Services content={content.services} locale={locale} />
      <HomeCases content={content.cases} locale={locale} />
      <Included content={content.included} />
      <Uniqueness content={content.uniqueness} />
      <Approach content={content.approach} />
      <Testimonials content={content.testimonials} />
      <Partners content={content.partners} />
      <Industries content={content.industries} locale={locale} />
      <Faq content={content.faq} />
      <Contact content={content.contact} locale={locale} />
    </>
  );
}
