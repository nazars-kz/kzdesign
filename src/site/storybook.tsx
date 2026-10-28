/**
 * PROJECT: the project's part of `/storybook` (staff only; docs/CUSTOMIZING.md
 * § Storybook). Core renders the token sections (colors, fonts, text styles,
 * spacing, radii, shadows); the sections exported here show the real
 * components of this site. Add entries as pages bring new primitives and
 * patterns; keep buttons, form fields and icons complete: it is the project's
 * living style guide.
 */
import type { ReactNode } from 'react';

import type { StorybookSection } from '@/core/storybook/slot';

import { ButtonArrow } from './components/ui/button';
import {
  type ButtonSize,
  buttonClasses,
  type ButtonState,
  type ButtonVariant,
} from './components/ui/button-styles';
import { cx } from './components/ui/cn';
import { Eyebrow } from './components/ui/eyebrow';
import {
  choiceClasses,
  controlClasses,
  LABEL_CLASS,
  textareaClasses,
} from './components/ui/form-styles';
import { Container, Section } from './components/ui/layout';
import { LinkCta } from './components/ui/link-cta';
import { Heading, Text } from './components/ui/typography';

// ── Shared bits ──────────────────────────────────────────────────────────────

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-caption text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

// ── Buttons ──────────────────────────────────────────────────────────────────

const BUTTON_VARIANTS: readonly ButtonVariant[] = ['primary', 'light'];
const BUTTON_STATES = ['default', 'hover', 'focus', 'disabled'] as const;
const BUTTON_SIZES: readonly ButtonSize[] = ['md', 'lg', 'xl'];

function StateButton({
  variant,
  state,
  size,
  children,
}: {
  variant: ButtonVariant;
  state: (typeof BUTTON_STATES)[number];
  size?: ButtonSize;
  children: ReactNode;
}) {
  const forced: ButtonState | undefined =
    state === 'hover' || state === 'focus' ? state : undefined;
  return (
    <button
      type="button"
      className={buttonClasses(variant, undefined, { size, state: forced })}
      disabled={state === 'disabled'}
    >
      {children}
      <ButtonArrow />
    </button>
  );
}

function Buttons() {
  return (
    <div className="flex flex-col gap-8">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-body-sm">
          <caption className="sr-only">Button variants in every state</caption>
          <thead>
            <tr className="text-start text-caption text-muted-foreground">
              <th scope="col" className="py-2 pe-4 text-start">
                Variant
              </th>
              {BUTTON_STATES.map((state) => (
                <th key={state} scope="col" className="px-2 py-2 text-start">
                  {state}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BUTTON_VARIANTS.map((variant) => (
              <tr key={variant} className="border-thin border-t border-border">
                <th scope="row" className="py-3 pe-4 text-start">
                  {variant}
                </th>
                {BUTTON_STATES.map((state) => (
                  <td key={state} className="px-2 py-3">
                    {/* The arrow slides in on hover, so the "hover" column has no forced look: hover it. */}
                    <StateButton variant={variant} state={state}>
                      Get in touch
                    </StateButton>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-end gap-6">
        {BUTTON_SIZES.map((size) => (
          <Cell key={size} label={`size ${size}`}>
            <StateButton variant="primary" state="default" size={size}>
              Get in touch
            </StateButton>
          </Cell>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-8">
        <Cell label="link with arrow (on light)">
          <LinkCta href="#buttons">See all cases</LinkCta>
        </Cell>
        <Section tone="inverse" spacing="tight" className="rounded-lg px-6">
          <Cell label="link with arrow (on dark)">
            <LinkCta href="#buttons">Learn more</LinkCta>
          </Cell>
        </Section>
        <Cell label="round arrow buttons (on dark)">
          <div className="on-dark flex gap-4 rounded-lg p-4">
            <button type="button" className="round-btn round-btn--prev" aria-label="Previous" />
            <button type="button" className="round-btn round-btn--next" aria-label="Next" />
            <button
              type="button"
              className="round-btn round-btn--next"
              aria-label="Disabled"
              disabled
            />
          </div>
        </Cell>
      </div>
    </div>
  );
}

// ── Form fields ──────────────────────────────────────────────────────────────

function FieldFrame({
  id,
  label,
  help,
  error,
  children,
}: {
  id: string;
  label: string;
  help?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      {children}
      {help ? (
        <Text id={`${id}-help`} variant="caption" tone="muted">
          {help}
        </Text>
      ) : null}
      {error ? (
        <Text id={`${id}-error`} variant="caption" tone="danger">
          {error}
        </Text>
      ) : null}
    </div>
  );
}

function FormFields() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <FieldFrame id="sb-input" label="Input" help="Help text under the field.">
        <input
          id="sb-input"
          className={controlClasses()}
          placeholder="Placeholder"
          aria-describedby="sb-input-help"
        />
      </FieldFrame>
      <FieldFrame id="sb-input-focus" label="Input (focus)">
        <input
          id="sb-input-focus"
          className={controlClasses({ focused: true })}
          defaultValue="Focused"
        />
      </FieldFrame>
      <FieldFrame id="sb-input-error" label="Input (error)" error="Enter a valid email address.">
        <input
          id="sb-input-error"
          className={controlClasses({ invalid: true })}
          defaultValue="not-an-email"
          aria-invalid="true"
          aria-describedby="sb-input-error-error"
        />
      </FieldFrame>
      <FieldFrame id="sb-input-disabled" label="Input (disabled)">
        <input
          id="sb-input-disabled"
          className={controlClasses()}
          defaultValue="Disabled"
          disabled
        />
      </FieldFrame>
      <FieldFrame id="sb-textarea" label="Textarea">
        <textarea
          id="sb-textarea"
          className={textareaClasses()}
          rows={4}
          placeholder="Tell us more"
        />
      </FieldFrame>
      <FieldFrame id="sb-textarea-error" label="Textarea (error)" error="This is required.">
        <textarea
          id="sb-textarea-error"
          className={textareaClasses({ invalid: true })}
          rows={4}
          aria-invalid="true"
          aria-describedby="sb-textarea-error-error"
        />
      </FieldFrame>
      <fieldset className="flex flex-col gap-3">
        <legend className={cx(LABEL_CLASS, 'mb-2')}>Checkbox</legend>
        {[
          { id: 'sb-check', label: 'Unchecked', checked: false, disabled: false },
          { id: 'sb-check-on', label: 'Checked', checked: true, disabled: false },
          { id: 'sb-check-off', label: 'Disabled', checked: false, disabled: true },
        ].map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <input
              id={item.id}
              type="checkbox"
              className={choiceClasses()}
              defaultChecked={item.checked}
              disabled={item.disabled}
            />
            <label htmlFor={item.id} className="text-body-sm">
              {item.label}
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}

// ── Icons ────────────────────────────────────────────────────────────────────

/** The site's icons are SVG files in /public/icons (and /public/icons/industries). */
const ICONS = [
  'arrow-right',
  'arrow-right-white',
  'arrow-case',
  'arrow-circle',
  'chevron',
  'chev-left',
  'chev-right',
  'linkedin',
  'dribbble',
  'behance',
  'briefcase',
  'star-red',
] as const;

function Icons() {
  return (
    <div className="flex flex-col gap-4">
      <Text>
        Icon library: SVG files in <code>public/icons</code>. Decorative icons are hidden from
        screen readers; an icon that carries meaning gets a text label.
      </Text>
      <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {ICONS.map((name) => (
          <li
            key={name}
            className="flex flex-col items-center gap-2 rounded-lg border-thin border-border bg-inverse p-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- storybook sample of static SVG icons */}
            <img src={`/icons/${name}.svg`} alt="" className="size-6" />
            <span className="text-caption text-inverse-muted">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Other primitives ─────────────────────────────────────────────────────────

function Primitives() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-h5">Eyebrow</h3>
        <Eyebrow>Our Services</Eyebrow>
        <Section tone="inverse" spacing="tight" className="rounded-lg px-6">
          <Eyebrow>Our Services</Eyebrow>
        </Section>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-h5">Headings</h3>
        <Heading level={2} variant="section-title">
          Section title: Check how K&amp;Z keeps partners ahead
        </Heading>
        <Heading level={3} variant="h5">
          Level 3 styled as h5
        </Heading>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-h5">Section tones</h3>
        <div className="overflow-hidden rounded-lg border-thin border-border">
          {(['default', 'surface', 'inverse'] as const).map((tone) => (
            <Section key={tone} tone={tone} spacing="tight">
              <Container>
                <Text variant="label">Section tone: {tone}</Text>
              </Container>
            </Section>
          ))}
        </div>
      </div>
    </div>
  );
}

/** The project's sections, in order. */
export const storybookSections: readonly StorybookSection[] = [
  {
    id: 'buttons',
    title: 'Buttons',
    description:
      'Pill buttons (the arrow slides in on hover), arrow links and slider arrows. Hover and focus are forced where possible.',
    render: () => <Buttons />,
  },
  {
    id: 'form-fields',
    title: 'Form fields',
    description: 'Input, textarea and checkbox with error and disabled states.',
    render: () => <FormFields />,
  },
  {
    id: 'icons',
    title: 'Icons',
    render: () => <Icons />,
  },
  {
    id: 'primitives',
    title: 'Other primitives',
    description: 'Eyebrow, headings and section tones; patterns are added page by page.',
    render: () => <Primitives />,
  },
];
