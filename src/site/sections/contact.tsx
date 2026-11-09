import Image from 'next/image';

import { getGlobalContent } from '@/core/content/loader';
import type { SitePageContent } from '@/core/content/loader';

import { CompanyCard } from '../components/company-card';
import { ContactInlineBlock } from '../components/contact/contact-panel-server';
import { TeamMember } from '../components/team-member';
import { cx } from '../components/ui/cn';
import { Container, Section } from '../components/ui/layout';
import { PlainRichText } from '../components/ui/rich-text';
import { Heading } from '../components/ui/typography';

/** "Let's take your product to the next level": the people to talk to, the form and the company details. */
export async function Contact({
  content,
  locale,
  asPage = false,
}: {
  content: SitePageContent<'home'>['contact'];
  locale: string;
  /** The block is the whole page (Contact us): its title is the page's h1. */
  asPage?: boolean;
}) {
  const { company } = await getGlobalContent('site', locale);
  return (
    <Section
      tone="inverse"
      spacing="none"
      id="contact"
      className={cx('contact', asPage && 'contact--page')}
      labelledBy="contact-title"
    >
      <div className="contact__bg" aria-hidden="true" />
      <Container className="contact__inner">
        <div>
          <Heading
            level={asPage ? 1 : 2}
            variant="plain"
            id="contact-title"
            className="contact__title"
          >
            {content.titleBefore}
            <Image
              className="zap"
              src="/icons/next-arrow.svg"
              alt=""
              width={60}
              height={19}
              unoptimized
            />
            {content.titleAfter}
          </Heading>
          <p className="contact__lead text-body-lg">{content.lead}</p>
          <div className="team">
            {content.team.map((person) => (
              <TeamMember
                key={person._key}
                photo={person.photo}
                name={person.name}
                role={person.role}
                bio={<PlainRichText doc={person.bio} />}
              />
            ))}
          </div>
        </div>
        <div>
          <ContactInlineBlock locale={locale} />
          <CompanyCard name={company.name} details={company.details} email={company.email} />
        </div>
      </Container>
    </Section>
  );
}
