/**
 * The ONLY place where the site's fonts are declared (docs/DESIGN_TOKENS.md).
 * Each font exposes a CSS variable that tokens.css maps to --font-heading /
 * --font-body. Self-hosted by next/font from ./fonts, display: swap.
 *
 * Outfit is the heading font, Satoshi (free, Fontshare) the body font. The
 * headline font is preloaded because it sets the hero title (LCP text).
 */
import localFont from 'next/font/local';

const heading = localFont({
  src: [
    { path: './fonts/outfit-300.woff2', weight: '300', style: 'normal' },
    { path: './fonts/outfit-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/outfit-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/outfit-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-family-heading',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const body = localFont({
  src: [
    { path: './fonts/satoshi-300.woff2', weight: '300', style: 'normal' },
    { path: './fonts/satoshi-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/satoshi-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/satoshi-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-family-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

/** Class names that define the font variables; applied to <html>. */
export const fontVariables = [heading.variable, body.variable].join(' ');
