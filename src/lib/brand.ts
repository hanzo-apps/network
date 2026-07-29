/**
 * The brand's colour values, for the few places that need a colour as a STRING
 * rather than a class — an SVG `fill`, a computed `radial-gradient`, a
 * `boxShadow` offset. Everything else takes its colour from a design-system
 * class and never names one.
 *
 * Each value is a @hanzo/design token, so this file adds no colour of its own;
 * it only gives the token a JavaScript name. It replaced 27 copies of
 * `const BRAND.fg = "#ffffff"`, one per component, which is how a
 * "monochrome" site ends up with a hard-coded hex in fifty files.
 */
export const BRAND = {
  /** The foreground — text, marks, a full-strength wash. */
  fg: 'var(--foreground)',
  /** Translucent rungs, for glows and hairlines over a dark page. */
  wash: 'var(--white-10)',
  washStrong: 'var(--white-20)',
  washFaint: 'var(--white-05)',
  hairline: 'var(--border)',
  /** Corner accents on an architectural box, at two strengths. */
  cornerStrong: 'var(--white-20)',
  cornerSoft: 'var(--white-10)',
} as const
