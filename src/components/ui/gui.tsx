import { GuiProvider } from '@hanzo/gui'
import { config } from '@hanzo/ui/gui-config'

/**
 * The gui backend, configured once.
 *
 * `config` is @hanzo/ui's own gui configuration — the Hanzo type ramp, radius
 * ladder, spacing steps and dark-first themes that console, chat and app render
 * against. Taking it from the package rather than re-declaring it here is what
 * stops this site from drifting: when the design changes upstream, this site
 * changes with it on a version bump.
 *
 * Every interactive component in this directory is built on @hanzo/gui and
 * renders inside this provider. Presentational ones (button, card, badge,
 * input …) need no runtime at all and take their look from the same tokens
 * through styles/system.css.
 */
export const Gui = ({ children }: { children: React.ReactNode }) => (
  <GuiProvider config={config} defaultTheme="dark" disableInjectCSS={false}>
    {children}
  </GuiProvider>
)

export { config as guiConfig }
