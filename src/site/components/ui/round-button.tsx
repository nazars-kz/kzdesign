import { cx } from './cn';

/**
 * Round arrow button of the sliders (previous / next) on dark bands. Client-safe: it only
 * renders a button, the handlers come from the slider that owns it.
 */
export function RoundButton({
  direction,
  label,
  disabled,
  onClick,
  className,
}: {
  direction: 'prev' | 'next';
  /** Accessible name ("Previous slide"). */
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cx('round-btn', `round-btn--${direction}`, className)}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    />
  );
}
