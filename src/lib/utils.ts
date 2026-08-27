/**
 * `cn` comes from @hanzo/ui, which is the one class-name composer in this
 * estate. It used to be reimplemented here over clsx — a second answer to a
 * question the component library already answers, and one more dependency to
 * keep in step.
 *
 * Re-exported rather than removed so the 37 files importing `@/lib/utils` do
 * not each grow an import of their own.
 */
export { cn, type ClassValue } from '@hanzo/ui'
