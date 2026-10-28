import { Fragment } from 'react';

/** Renders a text whose line breaks (`\n`) are meaningful (e.g. a two-line title). */
export function Lines({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={index}>
          {index > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </>
  );
}
