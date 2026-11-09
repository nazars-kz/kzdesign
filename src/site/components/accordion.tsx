'use client';

import { type ReactNode, useId, useRef, useState } from 'react';

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
  collapsedCount,
  moreLabels,
  className,
}: {
  items: readonly AccordionItem[];
  variant: 'industries' | 'faq';
  headingLevel?: HeadingLevel;
  /** Index of the item that is open at the start; `null` for none. */
  initialOpen?: number | null;
  /**
   * Show only the first N items until the visitor presses the "more" button. The others stay
   * in the HTML (for search engines) and are hidden with CSS.
   */
  collapsedCount?: number;
  moreLabels?: { showAll: string; showFewer: string };
  className?: string;
}) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(initialOpen);
  const [showAll, setShowAll] = useState(false);
  const more = useRef<HTMLButtonElement>(null);
  const collapsible =
    collapsedCount !== undefined && collapsedCount > 0 && collapsedCount < items.length;

  const toggleMore = () => {
    const next = !showAll;
    setShowAll(next);
    if (next) {
      // the first revealed question takes focus (the page does not jump)
      document.getElementById(`${base}-head-${collapsedCount}`)?.focus({ preventScroll: true });
      return;
    }
    // collapsing closes a hidden open answer and keeps the button in view
    if (open !== null && collapsedCount !== undefined && open >= collapsedCount) setOpen(null);
    requestAnimationFrame(() => {
      if ((more.current?.getBoundingClientRect().top ?? 0) < 0) {
        more.current?.scrollIntoView({ block: 'center' });
      }
    });
  };

  return (
    <>
      <div
        className={cx(
          'accordion',
          `accordion--${variant}`,
          collapsible && !showAll && 'is-collapsed',
          className,
        )}
      >
        {items.map((item, index) => {
          const isOpen = open === index;
          const headId = `${base}-head-${index}`;
          const bodyId = `${base}-body-${index}`;
          return (
            <div
              key={item.key}
              className={cx(
                'accordion__item',
                isOpen && 'is-open',
                collapsible && index >= (collapsedCount ?? 0) && 'is-extra',
              )}
            >
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
      {collapsible && moreLabels ? (
        <button
          ref={more}
          type="button"
          className="faq__more"
          aria-expanded={showAll}
          onClick={toggleMore}
        >
          {showAll
            ? moreLabels.showFewer
            : moreLabels.showAll.replace('{count}', String(items.length))}
          <i className="plus" aria-hidden="true" />
        </button>
      ) : null}
    </>
  );
}
