import { type ClassValue, clsx } from 'clsx'

/**
 * Join class names. Plain `clsx` — there is no utility framework left to
 * de-conflict, so the class-merging pass this used to run is gone with it.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
