import type { Ref } from 'react';

/** The menu button of the header (three lines that turn into a cross while the menu is open). */
export function BurgerButton({
  open,
  label,
  controls,
  buttonRef,
  onClick,
}: {
  open: boolean;
  /** Accessible name; changes with the state ("Menu" / "Close menu"). */
  label: string;
  /** id of the menu it opens. */
  controls: string;
  buttonRef?: Ref<HTMLButtonElement>;
  onClick: () => void;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className="burger"
      aria-label={label}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onClick}
    >
      <span />
      <span />
      <span />
    </button>
  );
}
