import Image from 'next/image';
import type { ReactNode } from 'react';

import type { ResolvedImage } from '@/core/content/define';

import { cx } from './ui/cn';

const PHOTO_SIZE = 64;
const FLAG_WIDTH = 20;
const FLAG_HEIGHT = 27;

/** A person with a round photo (or logo), name, optional country flag and role: client feedback, CEO card. */
export function Author({
  photo,
  name,
  role,
  flag,
  photoSize = PHOTO_SIZE,
  className,
}: {
  photo: ResolvedImage | null;
  name: ReactNode;
  role?: ReactNode;
  flag?: ResolvedImage | null;
  photoSize?: number;
  className?: string;
}) {
  return (
    <div className={cx('author', className)}>
      {photo ? (
        <Image src={photo.src} alt={photo.alt} width={photoSize} height={photoSize} />
      ) : null}
      <div>
        <p className="author__name">
          {name}
          {flag ? <Image src={flag.src} alt="" width={FLAG_WIDTH} height={FLAG_HEIGHT} /> : null}
        </p>
        {role ? <p className="author__role">{role}</p> : null}
      </div>
    </div>
  );
}
