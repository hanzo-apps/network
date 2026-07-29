/**
 * A feature's "colour" is a role, not a hue.
 *
 * This replaced a 46-line map from seven hue names onto Tailwind gradient,
 * border and text classes. @hanzo/design ships no accent colour — every Hanzo
 * surface is monochrome — so all seven rows already resolved to the same
 * greyscale. What actually varies is emphasis: a hovered card lifts, a resting
 * one recedes. That is the whole function now.
 */
export type SurfaceRole = 'gradient' | 'border' | 'text'

export const getColorClasses = (_color: string, type: SurfaceRole, isHovered: boolean) => {
  switch (type) {
    case 'gradient':
      return isHovered ? 'hz-bg-raised' : 'hz-bg-surface'
    case 'border':
      return isHovered ? 'hz-border-strong' : ''
    case 'text':
      return isHovered ? 'hz-fg' : 'hz-fg-muted'
  }
}
