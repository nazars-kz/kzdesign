'use client';

/**
 * PROJECT: visual layer of a site form. The core engine (`useSiteForm`) does
 * validation, accessibility wiring, submission and spam protection; this
 * component only renders it with the site's primitives and design tokens
 * (outlined fields on a dark card, as in the "Let's take your product" block).
 */
import { type ReactNode, useRef, useState } from 'react';

import type { SiteFormConfig } from '@/core/forms/config';
import { FormFieldType } from '@/core/forms/define';
import {
  type FormMessages,
  type SiteFormFieldProps,
  useSiteForm,
} from '@/core/forms/use-site-form';

import { ButtonArrow } from './ui/button-arrow';
import { buttonClasses } from './ui/button-styles';
import { Checkbox, Field, Input, Select, Textarea } from './ui/field';

export interface ContactFormStrings {
  readonly summaryTitle: string;
  readonly required: string;
  readonly sending: string;
  readonly choose: string;
}

export function ContactForm({
  config,
  messages,
  strings,
  security,
  consentTexts,
}: {
  config: SiteFormConfig;
  messages: FormMessages;
  strings: ContactFormStrings;
  /** `<FormSecurityFields>` rendered on the server. */
  security: ReactNode;
  /** Consent texts (rich text) rendered on the server, by field name. */
  consentTexts: Readonly<Record<string, ReactNode>>;
}) {
  const summaryRef = useRef<HTMLDivElement>(null);
  const form = useSiteForm({ config, messages, summaryRef });
  // The button enables once the required fields are valid (checked natively on every input).
  const [ready, setReady] = useState(false);

  if (form.succeeded) {
    return (
      <div role="status" className="form-card form-success">
        <p className="text-h5">{config.successTitle}</p>
        <p className="text-body-lg">{config.successMessage}</p>
      </div>
    );
  }

  return (
    <form
      {...form.formProps}
      className="form"
      aria-busy={form.pending || undefined}
      onInput={(event) => setReady(event.currentTarget.checkValidity())}
    >
      {form.hiddenFields}
      {security}

      {form.summary.length > 0 ? (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="form__summary">
          <p className="text-label">{strings.summaryTitle}</p>
          <ul>
            {form.summary.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  {item.label}: {item.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {form.notice ? (
        <p role="alert" className="form__notice text-body-sm">
          {form.notice.text}
        </p>
      ) : null}

      {config.fields.map((item) => (
        <FormField
          key={item.name}
          props={form.field(item.name)}
          strings={strings}
          consentText={consentTexts[item.name]}
        />
      ))}

      <button
        type="submit"
        className={buttonClasses('light', 'form__submit', { size: 'xl' })}
        disabled={form.pending || !ready}
      >
        {form.pending ? strings.sending : config.submitLabel}
        <ButtonArrow />
      </button>
    </form>
  );
}

function FormField({
  props,
  strings,
  consentText,
}: {
  props: SiteFormFieldProps;
  strings: ContactFormStrings;
  consentText: ReactNode;
}) {
  const { field, ids, inputProps, error } = props;
  const { type, required } = field.definition;
  const common = {
    label: field.label,
    htmlFor: ids.input,
    required,
    requiredText: strings.required,
    errorId: ids.error,
    error,
  };

  if (type === FormFieldType.Checkbox || type === FormFieldType.Consent) {
    return (
      <Checkbox
        {...inputProps}
        id={ids.input}
        label={consentText ?? field.label}
        errorId={ids.error}
        error={error}
      />
    );
  }
  if (type === FormFieldType.Textarea) {
    return (
      <Field {...common} hideLabel>
        <Textarea {...inputProps} placeholder={field.placeholder ?? field.label} />
      </Field>
    );
  }
  if (type === FormFieldType.Select) {
    return (
      <Field {...common}>
        <Select {...inputProps} placeholder={strings.choose} options={field.options} />
      </Field>
    );
  }
  // The label sits over the empty input like a placeholder and disappears while typing.
  return (
    <Field {...common} floating>
      <Input {...inputProps} placeholder=" " />
    </Field>
  );
}
