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
        <Field
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

function Field({
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
  const errorText = (
    <p id={ids.error} className="field__error text-caption">
      {error ?? ''}
    </p>
  );

  if (type === FormFieldType.Checkbox || type === FormFieldType.Consent) {
    return (
      <div className="field field--choice">
        <input {...inputProps} />
        <label htmlFor={ids.input} className="text-body-sm">
          {consentText ?? field.label}
          {required ? <span className="sr-only"> ({strings.required})</span> : null}
        </label>
        {errorText}
      </div>
    );
  }

  const label = (
    <>
      {field.label}
      {required ? (
        <>
          <b aria-hidden="true">*</b>
          <span className="sr-only"> ({strings.required})</span>
        </>
      ) : null}
    </>
  );

  if (type === FormFieldType.Textarea) {
    return (
      <div className="field">
        <label htmlFor={ids.input} className="sr-only">
          {label}
        </label>
        <textarea {...inputProps} placeholder={field.placeholder ?? field.label} rows={2} />
        {errorText}
      </div>
    );
  }

  return (
    <div className="field">
      {type === FormFieldType.Select ? (
        <select {...inputProps}>
          <option value="">{strings.choose}</option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        // The label sits over the empty input like a placeholder and disappears while typing.
        <input {...inputProps} placeholder=" " />
      )}
      <label htmlFor={ids.input} className="field__label">
        {label}
      </label>
      {errorText}
    </div>
  );
}
