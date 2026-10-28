import { cx } from './cn';

/** `primary` is the dark pill, `light` the white one (header, forms on dark). */
export type ButtonVariant = 'primary' | 'light';
export type ButtonSize = 'md' | 'lg' | 'xl';
/** Forces a state's look (storybook): hover and focus are otherwise pointer / keyboard driven. */
export type ButtonState = 'hover' | 'focus';

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'btn--dark',
  light: 'btn--light',
};
const SIZE: Record<ButtonSize, string | undefined> = {
  md: undefined,
  lg: 'btn--lg',
  xl: 'btn--xl',
};
const FOCUS = 'outline-thick outline-offset-2 outline-focus-ring';

/** Classes of buttons and button-styled links (client-safe). The arrow slides in on hover. */
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  className?: string,
  options: { size?: ButtonSize; state?: ButtonState } = {},
): string {
  return cx(
    'btn text-button',
    VARIANT[variant],
    SIZE[options.size ?? 'md'],
    options.state === 'hover' && 'is-hover',
    options.state === 'focus' && FOCUS,
    className,
  );
}
