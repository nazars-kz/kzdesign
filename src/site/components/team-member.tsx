'use client';

import Image from 'next/image';
import { type ReactNode, useId, useState } from 'react';

import type { ResolvedImage } from '@/core/content/define';

import { cx } from './ui/cn';

/**
 * A person to talk to: photo, name, role and a short bio. On desktop the bio sits next
 * to the person; on phones the row is an accordion that the visitor opens.
 */
export function TeamMember({
  photo,
  name,
  role,
  bio,
}: {
  photo: ResolvedImage | null;
  name: string;
  role: string;
  /** The bio, rendered on the server. */
  bio: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const bioId = useId();

  return (
    <div className={cx('team__row', open && 'is-open')}>
      <button
        type="button"
        className="team__who"
        aria-expanded={open}
        aria-controls={bioId}
        onClick={() => setOpen((value) => !value)}
      >
        {photo ? (
          <Image src={photo.src} alt={photo.alt} width={128} height={128} sizes="64px" />
        ) : null}
        <span className="team__id">
          <span className="team__name">{name}</span>
          <span className="team__role">{role}</span>
        </span>
        <i className="team__chev" aria-hidden="true" />
      </button>
      <div id={bioId} className="team__bio">
        {bio}
      </div>
    </div>
  );
}
