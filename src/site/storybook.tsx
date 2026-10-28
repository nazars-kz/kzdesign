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

import { BurgerButton } from './components/burger-button';
import { NavLink } from './components/nav-link';
import { SectionHeader } from './components/section-header';
import { ButtonArrow } from './components/ui/button-arrow';
import {
  type ButtonSize,
  buttonClasses,
  type ButtonState,
  type ButtonVariant,
} from './components/ui/button-styles';
import { Eyebrow } from './components/ui/eyebrow';
import { Checkbox, Field, Input, Select, Textarea } from './components/ui/field';
import { ICON_NAMES, Icon } from './components/ui/icon';
import { Container, Section } from './components/ui/layout';
import { LinkCta } from './components/ui/link-cta';
import { RoundButton } from './components/ui/round-button';
import { Tag, TagList } from './components/ui/tag';
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

/** A dark band for components that live on dark backgrounds. */
function OnDark({ children }: { children: ReactNode }) {
  return (
    <Section tone="inverse" spacing="none" className="rounded-lg p-6">
      {children}
    </Section>
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
          <caption className="sr-only">Pill buttons in every state</caption>
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

      <div className="flex flex-wrap items-start gap-8">
        <Cell label="link with arrow (on light) — hover it">
          <LinkCta href="#buttons">See all cases</LinkCta>
        </Cell>
        <Cell label="link with arrow (on dark) — hover it">
          <OnDark>
            <LinkCta href="#buttons">Learn more</LinkCta>
          </OnDark>
        </Cell>
        <Cell label="menu link (default, current page)">
          <div className="flex gap-6">
            <NavLink href="#buttons">Cases</NavLink>
            <NavLink href="/">Home</NavLink>
          </div>
        </Cell>
        <Cell label="slider arrows (on dark): default, disabled">
          <OnDark>
            <div className="flex gap-4">
              <RoundButton direction="prev" label="Previous" />
              <RoundButton direction="next" label="Next" />
              <RoundButton direction="next" label="Disabled" disabled />
            </div>
          </OnDark>
        </Cell>
        <Cell label="menu button: closed, open">
          <div className="flex gap-4">
            <BurgerButton open={false} label="Menu" controls="storybook" />
            <BurgerButton open label="Close menu" controls="storybook" />
          </div>
        </Cell>
      </div>
    </div>
  );
}

// ── Form fields ──────────────────────────────────────────────────────────────

function FormFields() {
  return (
    <OnDark>
      <div className="grid gap-8 md:grid-cols-2">
        <Field label="Name" htmlFor="sb-input" required requiredText="required" floating>
          <Input id="sb-input" placeholder=" " />
        </Field>
        <Field label="Email address (filled)" htmlFor="sb-filled" floating>
          <Input id="sb-filled" placeholder=" " defaultValue="name@example.com" />
        </Field>
        <Field label="Focus" htmlFor="sb-focus" floating>
          <Input id="sb-focus" placeholder=" " defaultValue="Focused" className="is-focus" />
        </Field>
        <Field
          label="Error"
          htmlFor="sb-error"
          floating
          errorId="sb-error-text"
          error="Enter a valid email address."
        >
          <Input
            id="sb-error"
            placeholder=" "
            defaultValue="not-an-email"
            aria-invalid="true"
            aria-describedby="sb-error-text"
          />
        </Field>
        <Field label="Disabled" htmlFor="sb-disabled" floating>
          <Input id="sb-disabled" placeholder=" " defaultValue="Disabled" disabled />
        </Field>
        <Field label="Message" htmlFor="sb-textarea" hideLabel>
          <Textarea id="sb-textarea" placeholder="Message (optional)" />
        </Field>
        <Field label="Topic" htmlFor="sb-select">
          <Select
            id="sb-select"
            placeholder="Choose…"
            options={[
              { value: 'general', label: 'General question' },
              { value: 'project', label: 'New project' },
            ]}
          />
        </Field>
        <div className="flex flex-col gap-3">
          <Checkbox id="sb-check" label="Unchecked" />
          <Checkbox id="sb-check-on" label="Checked" defaultChecked />
          <Checkbox id="sb-check-off" label="Disabled" disabled />
        </div>
      </div>
    </OnDark>
  );
}

// ── Icons ────────────────────────────────────────────────────────────────────

function Icons() {
  return (
    <div className="flex flex-col gap-4">
      <Text>
        Icon library: SVG files in <code>public/icons</code>, used through the <code>Icon</code>{' '}
        component. Decorative icons are hidden from screen readers; an icon that carries meaning
        gets a text label.
      </Text>
      <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {ICON_NAMES.map((name) => (
          <li
            key={name}
            className="flex flex-col items-center gap-2 rounded-lg border-thin border-border bg-inverse p-4"
          >
            <Icon name={name} />
            <span className="text-caption text-inverse-muted">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Other primitives and patterns ────────────────────────────────────────────

function Primitives() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="text-h5">Eyebrow</h3>
        <Eyebrow>Our Services</Eyebrow>
        <OnDark>
          <Eyebrow>Our Services</Eyebrow>
        </OnDark>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-h5">Section header</h3>
        <SectionHeader eyebrow="Case Studies" title="Check how K&Z keeps partners ahead" />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-h5">Tags</h3>
        <OnDark>
          <TagList tags={['Sport', 'SaaS', 'Web', 'B2C']} />
        </OnDark>
        <Tag>Single tag</Tag>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-h5">Headings</h3>
        <Heading level={2} variant="h2">
          Heading 2 (64 px)
        </Heading>
        <Heading level={3} variant="section-title">
          Section title
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
    title: 'Buttons and links',
    description:
      'Pill buttons in every state and size (the arrow slides in on hover), arrow links, menu links, slider arrows and the menu button.',
    render: () => <Buttons />,
  },
  {
    id: 'form-fields',
    title: 'Form fields',
    description:
      'Outlined fields on a dark card: input, textarea, select and checkbox with filled, focus, error and disabled states.',
    render: () => <FormFields />,
  },
  {
    id: 'icons',
    title: 'Icons',
    render: () => <Icons />,
  },
  {
    id: 'primitives',
    title: 'Other primitives and patterns',
    description:
      'Eyebrow, section header, tags, headings and section tones. Cards and sections are added page by page.',
    render: () => <Primitives />,
  },
];
