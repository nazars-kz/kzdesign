import type { ReactNode } from 'react';

/**
 * A decorative illustration drawn in pure CSS (src/site/theme/graphics.ts). The HTML is static
 * and trusted (it comes from the theme, never from content), so it is rendered as it is; the
 * wrapper has no box of its own.
 */
export function Graphic({ html }: { html: string }): ReactNode {
  return <div className="graphic" dangerouslySetInnerHTML={{ __html: html }} />;
}
