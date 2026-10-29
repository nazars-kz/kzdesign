/**
 * The ONLY place where the site's fonts are declared (docs/DESIGN_TOKENS.md).
 * Each font exposes a CSS variable that tokens.css maps to --font-heading /
 * --font-body. Self-hosted by next/font from ./fonts, display: swap.
 *
 * Google Sans Flex (variable, weights 100–1000, OFL) is the heading font, Satoshi
 * (free, Fontshare) the body font. The headline font is preloaded because it sets
 * the hero title (LCP text). Latin subset: the site is English only.
 */
import localFont from 'next/font/local';

const heading = localFont({
  src: [{ path: './fonts/google-sans-flex.woff2', weight: '100 1000', style: 'normal' }],
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
    { path: './fonts/satoshi-300-italic.woff2', weight: '300', style: 'italic' },
    { path: './fonts/satoshi-700-italic.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-family-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

/** Class names that define the font variables; applied to <html>. */
export const fontVariables = [heading.variable, body.variable].join(' ');
