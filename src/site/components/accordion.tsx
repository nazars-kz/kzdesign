'use client';

import { type ReactNode, useId, useState } from 'react';

import { cx } from './ui/cn';
import { Heading, type HeadingLevel } from './ui/typography';

export interface AccordionItem {
  readonly key: string;
  /** The content of the question button (text, or icon + text). */
  readonly head: ReactNode;
  /** The answer, rendered on the server. */
  readonly body: ReactNode;
}

/**
 * Accordion where one item is open at a time (the open one closes when another opens).
 * `industries` is the dark list with icons, `faq` the light striped list.
 */
export function Accordion({
  items,
  variant,
  headingLevel = 3,
  initialOpen = 0,
  className,
}: {
  items: readonly AccordionItem[];
  variant: 'industries' | 'faq';
  headingLevel?: HeadingLevel;
  /** Index of the item that is open at the start; `null` for none. */
  initialOpen?: number | null;
  className?: string;
}) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(initialOpen);

  return (
    <div className={cx('accordion', `accordion--${variant}`, className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const headId = `${base}-head-${index}`;
        const bodyId = `${base}-body-${index}`;
        return (
          <div key={item.key} className={cx('accordion__item', isOpen && 'is-open')}>
            <Heading level={headingLevel} variant="plain" className="accordion__heading">
              <button
                id={headId}
                type="button"
                className="accordion__head"
                aria-expanded={isOpen}
                aria-controls={bodyId}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                {item.head}
                <i className="plus" aria-hidden="true" />
              </button>
            </Heading>
            <div
              id={bodyId}
              role="region"
              aria-labelledby={headId}
              className="accordion__body"
              inert={!isOpen}
            >
              <div>{item.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
