import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

import { cx } from './cn';

/**
 * Form primitives (outlined fields on a dark card). Every form of the site is built from
 * these, so changing the input style changes all forms. They are client-safe and only
 * forward the props the form engine (`useSiteForm`) gives them.
 */

/** A field: the control, its label and the error line, wired by ids. */
export function Field({
  label,
  htmlFor,
  required,
  requiredText,
  hideLabel = false,
  floating = false,
  errorId,
  error,
  className,
  children,
}: {
  label: ReactNode;
  /** id of the control. */
  htmlFor: string;
  required?: boolean;
  /** Screen-reader text for a required field ("required"). */
  requiredText?: string;
  /** Visually hide the label (the control shows a placeholder instead). */
  hideLabel?: boolean;
  /** The label sits over the empty control and disappears while typing (inputs only). */
  floating?: boolean;
  errorId?: string;
  error?: string | null;
  className?: string;
  children: ReactNode;
}) {
  const text = (
    <>
      {label}
      {required ? (
        <>
          <b aria-hidden="true">*</b>
          {requiredText ? <span className="sr-only"> ({requiredText})</span> : null}
        </>
      ) : null}
    </>
  );
  return (
    <div className={cx('field', className)}>
      {children}
      <label
        htmlFor={htmlFor}
        className={cx(hideLabel ? 'sr-only' : floating ? 'field__label' : 'field__caption')}
      >
        {text}
      </label>
      <p id={errorId} className="field__error text-caption">
        {error ?? ''}
      </p>
    </div>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cx('field__control', props.className)} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={2} {...props} className={cx('field__control', props.className)} />;
}

export function Select({
  placeholder,
  options,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  /** First, empty option ("Choose…"). */
  placeholder: string;
  options: readonly { readonly value: string; readonly label: string }[];
}) {
  return (
    <select {...props} className={cx('field__control', props.className)}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

/** A checkbox with its label (consent, options). */
export function Checkbox({
  id,
  label,
  errorId,
  error,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'> & {
  id: string;
  label: ReactNode;
  errorId?: string;
  error?: string | null;
}) {
  return (
    <div className="field field--choice">
      <input {...props} id={id} type="checkbox" className="field__check" />
      <label htmlFor={id} className="text-body-sm">
        {label}
      </label>
      <p id={errorId} className="field__error text-caption">
        {error ?? ''}
      </p>
    </div>
  );
}
