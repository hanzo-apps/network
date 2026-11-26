const base = 'inline-flex items-center justify-center rounded-full font-medium transition-colors duration-150'

const variants = {
  primary: `${base} h-11 px-6 text-base bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]`,
  secondary: `${base} h-11 px-6 text-base border border-border-strong text-foreground hover:bg-foreground/5`,
  /** Filter chip; reads aria-pressed. */
  chip: `${base} h-9 px-4 text-sm border border-border-strong text-foreground hover:bg-foreground/10 aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background aria-pressed:hover:bg-foreground`,
  tiny: `${base} h-8 px-3 text-xs border border-border-strong text-foreground hover:bg-foreground/10`,
  small: `${base} h-9 px-4 text-sm border border-border-strong text-foreground hover:bg-foreground/5`,
} as const

/** The one button style. Put it on an <a> or a <button>. */
export const buttonClass = (variant: keyof typeof variants = 'primary') => variants[variant]

/** The one inline text link: underlined, 44px tall to touch. */
export const textLink = 'inline-flex min-h-11 items-center rounded-sm text-base font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground'
