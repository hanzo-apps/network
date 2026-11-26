const base = 'inline-flex items-center justify-center rounded-full font-medium transition-colors duration-150'

const variants = {
  primary: `${base} h-11 px-6 text-base bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]`,
  secondary: `${base} h-11 px-6 text-base border border-border-strong text-foreground hover:bg-white/5`,
  small: `${base} h-9 px-4 text-sm bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]`,
} as const

/** The one button style. Put it on an <a> or a <button>. */
export const buttonClass = (variant: keyof typeof variants = 'primary') => variants[variant]
