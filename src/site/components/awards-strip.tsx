'use client';

import Image from 'next/image';
import { type CSSProperties, useRef, useState } from 'react';

import type { ResolvedImage } from '@/core/content/define';

import { cx } from './ui/cn';

/** Gap between the badges (px) when the strip is expanded; equals the CSS value. */
const OPEN_GAP = 12;

/**
 * The Clutch awards: three badges are visible, the arrow expands the strip to show
 * all of them (the width animates), the arrow again collapses it. On phones all
 * badges are shown in a row and the arrow is hidden.
 */
export function AwardsStrip({
  label,
  awards,
  labels,
}: {
  label: string;
  awards: readonly ResolvedImage[];
  labels: { open: string; close: string };
}) {
  const [open, setOpen] = useState(false);
  const [openWidth, setOpenWidth] = useState<number | null>(null);
  const track = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (!open && track.current) {
      const badges = Array.from(track.current.querySelectorAll('img'));
      const width = badges.reduce((sum, badge) => sum + badge.getBoundingClientRect().width, 0);
      setOpenWidth(Math.ceil(width + OPEN_GAP * (badges.length - 1)));
    }
    setOpen(!open);
  };

  return (
    <div
      className={cx('awards', open && 'is-open')}
      style={openWidth ? ({ '--awards-open-width': `${openWidth}px` } as CSSProperties) : undefined}
    >
      <p className="awards__label text-body-sm">{label}</p>
      <div className="awards__row">
        <Image
          className="awards__clutch"
          src="/brand/clutch-logo.svg"
          alt="Clutch"
          width={72}
          height={21}
          unoptimized
        />
        <div className="awards__viewport">
          <div className="awards__track" ref={track}>
            {awards.map((badge, index) => (
              <Image
                key={`${badge.src}-${index}`}
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                sizes="150px"
                className={index === awards.length - 1 ? 'awards__badge-small' : undefined}
              />
            ))}
          </div>
          <div className="awards__fade" />
        </div>
        <button
          type="button"
          className="awards__next"
          aria-expanded={open}
          aria-label={open ? labels.close : labels.open}
          onClick={toggle}
        >
          <Image src="/icons/arrow-circle.svg" alt="" width={50} height={50} unoptimized />
        </button>
      </div>
    </div>
  );
}
