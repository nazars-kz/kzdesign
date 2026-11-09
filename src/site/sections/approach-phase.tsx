import { Accordion } from '../components/accordion';
import { PhaseVisual } from '../components/phase-visual';
import { cx } from '../components/ui/cn';
import { Eyebrow } from '../components/ui/eyebrow';
import { Container } from '../components/ui/layout';

interface PhaseContent {
  readonly eyebrow: string;
  readonly intro: string;
  readonly animation: string;
  readonly rows: readonly {
    readonly _key: string;
    readonly label: string;
    readonly aka: string;
    readonly text: string;
  }[];
}

/** One phase of the process: label, intro, an accordion of steps, and an animation (side swaps with `reversed`). */
export function ApproachPhase({
  id,
  content,
  reversed,
}: {
  id: string;
  content: PhaseContent;
  reversed: boolean;
}) {
  return (
    <section className={cx('phase', reversed && 'phase--rev')} id={id} aria-label={content.eyebrow}>
      <Container>
        <div className="phase__inner">
          <div className="phase__text">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <p className="phase__intro">{content.intro}</p>
            <Accordion
              variant="phase"
              className="phase-acc"
              initialOpen={null}
              items={content.rows.map((row) => ({
                key: row._key,
                head: (
                  <span className="accordion__label">
                    {row.label}
                    {row.aka ? (
                      <>
                        {' '}
                        <span>{row.aka}</span>
                      </>
                    ) : null}
                  </span>
                ),
                body: <p>{row.text}</p>,
              }))}
            />
          </div>
          <PhaseVisual src={`/animations/approach-${content.animation}.json`} />
        </div>
      </Container>
    </section>
  );
}
