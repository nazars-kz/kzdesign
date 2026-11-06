import type { ResolvedImage } from '@/core/content/define';

import { SiteImage } from '../components/ui/site-image';

const SCREEN_SIZES = '100vw';

/**
 * The exported layouts, one under another, edge to edge. Phones get their own set when the
 * case has one (the desktop images are hidden by CSS there); otherwise the desktop set shows everywhere.
 */
export function CaseScreens({
  desktop,
  mobile,
  label,
}: {
  desktop: readonly (ResolvedImage | null)[];
  mobile: readonly (ResolvedImage | null)[];
  label: string;
}) {
  const wide = desktop.filter((image) => image !== null);
  const narrow = mobile.filter((image) => image !== null);
  if (wide.length === 0 && narrow.length === 0) return null;
  const separate = wide.length > 0 && narrow.length > 0;
  return (
    <div role="group" aria-label={label}>
      {wide.length > 0 ? (
        <div className={separate ? 'cshots cshots--desk' : 'cshots'}>
          {wide.map((image) => (
            <SiteImage key={image.src} image={image} sizes={SCREEN_SIZES} />
          ))}
        </div>
      ) : null}
      {narrow.length > 0 ? (
        <div className={separate ? 'cshots cshots--mob' : 'cshots'}>
          {narrow.map((image) => (
            <SiteImage key={image.src} image={image} sizes={SCREEN_SIZES} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
