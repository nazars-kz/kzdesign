import type { SitePageContent } from '@/core/content/loader';

import { Eyebrow } from '../components/ui/eyebrow';
import { Container } from '../components/ui/layout';
import { PlainRichText } from '../components/ui/rich-text';
import { Heading } from '../components/ui/typography';

/** The step-by-step process: numbered cards, two per row. */
export function ServiceProcess({ content }: { content: SitePageContent<'services'>['process'] }) {
  const rows: (typeof content.steps)[] = [];
  for (let index = 0; index < content.steps.length; index += 2)
    rows.push(content.steps.slice(index, index + 2));
  return (
    <section className="svc-process" aria-labelledby="svc-process-title">
      <Container>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading level={2} variant="plain" id="svc-process-title" className="svc-process__title">
          {content.title}
        </Heading>
        <div className="svc-process__rows">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="svc-process__row">
              {row.map((step, stepIndex) => (
                <article key={step._key} className="step">
                  <h3 className="step__head">
                    <span>{String(rowIndex * 2 + stepIndex + 1).padStart(2, '0')}</span>{' '}
                    {step.title}
                  </h3>
                  <PlainRichText doc={step.text} className="step__text" />
                </article>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
