import type { LinkValue } from '@/core/content/fields';

import { ContentLink } from '../components/ui/content-link';
import { Container } from '../components/ui/layout';
import { Heading } from '../components/ui/typography';
import { paragraphs } from './case-intro';

/** The content of the "SEO text" section (`caseAboutSection()`). */
export interface CaseAboutContent {
  readonly title: string;
  readonly text: string;
  readonly links: readonly LinkValue[];
}

/**
 * The SEO text every case page ends with, before "Related case studies": what the product is and
 * what K&Z did, in plain words, with links to the related services and to all case studies.
 */
export function CaseAbout({ content }: { content: CaseAboutContent }) {
  const text = paragraphs(content.text);
  const links = content.links.filter((link) => link.href && link.label);
  if (!content.title && text.length === 0) return null;
  return (
    <section className="cab" aria-labelledby="case-about-title">
      <Container className="cab__inner">
        <Heading level={2} variant="plain" id="case-about-title" className="cab__title">
          {content.title}
        </Heading>
        <div className="cab__body">
          {text.map((line, index) => (
            <p key={`${index}-${line.slice(0, 16)}`}>{line}</p>
          ))}
          {links.length > 0 ? (
            <ul className="cab__links">
              {links.map((link) => (
                <li key={link.href}>
                  <ContentLink href={link.href} external={link.external} className="cab__link">
                    {link.label}
                    <span aria-hidden="true" className="cab__arrow">
                      →
                    </span>
                  </ContentLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
