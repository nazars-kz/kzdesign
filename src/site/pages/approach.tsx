/** Approach page (/approach): hero, the four phases of the process, industries, testimonials, contact. */
import type { PageViewProps } from '@/core/content/page-route';

import { ApproachHero } from '../sections/approach-hero';
import { ApproachPhase } from '../sections/approach-phase';
import { Contact } from '../sections/contact';
import { Industries } from '../sections/industries';
import { Testimonials } from '../sections/testimonials';

export function ApproachView({ content, locale }: PageViewProps<'approach'>) {
  const phases = [
    { id: 'discovery', content: content.discovery },
    { id: 'strategy', content: content.strategy },
    { id: 'design', content: content.design },
    { id: 'prototyping', content: content.prototyping },
  ] as const;
  return (
    <>
      <ApproachHero
        content={content.hero}
        phases={phases.map((phase) => ({ id: phase.id, label: phase.content.eyebrow }))}
      />
      {phases.map((phase, index) => (
        <ApproachPhase
          key={phase.id}
          id={phase.id}
          content={phase.content}
          reversed={index % 2 === 1}
        />
      ))}
      <Industries content={content.industries} locale={locale} className="ap-industries" />
      <Testimonials content={content.testimonials} />
      <Contact content={content.contact} locale={locale} />
    </>
  );
}
