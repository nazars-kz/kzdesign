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

/**
 * Case study fonts (Google Fonts, self-hosted). Not part of the site-wide set: a case page
 * that needs them applies `tachFontVariables` to its own root element, so other pages load
 * nothing extra (preload is off).
 */
const tachHanken = localFont({
  src: [{ path: './fonts/hanken-grotesk.woff2', weight: '100 900', style: 'normal' }],
  variable: '--font-family-tach-hanken',
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const tachPlex = localFont({
  src: [{ path: './fonts/ibm-plex-sans.woff2', weight: '100 700', style: 'normal' }],
  variable: '--font-family-tach-plex',
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

/** Tach case study: Hanken Grotesk (headings, UI) and IBM Plex Sans (brand type specimen). */
export const tachFontVariables = [tachHanken.variable, tachPlex.variable].join(' ');
