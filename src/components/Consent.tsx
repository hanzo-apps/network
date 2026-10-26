import { useState } from "react";
import { X } from "lucide-react";
import { acceptAll, asks, declined, readConsent, rejectAll, saveConsent, type Choice } from "@hanzo/event";

/**
 * The cookie banner, in this site's own markup, saying what @hanzo/ui/consent
 * says on every other Hanzo surface: one bar, a preferences sheet, and the same
 * four categories. Our own first-party analytics and the page-view count Google
 * Analytics and the Meta pixel keep are strictly necessary and run for every
 * visitor (src/components/Measure.tsx); the three optional categories are the
 * rest of what those two do, and none of it runs until the visitor allows it.
 * @hanzo/event stores the answer and starts what it allows, with no reload.
 * Colours, corners and states come from the theme's tokens, so it follows the
 * site's light and dark.
 */

const BRAND = "Hanzo Network";

type Optional = keyof Choice;

const CATEGORIES: { id: Optional; title: string; body: string }[] = [
  {
    id: "analytics",
    title: "Performance Cookies",
    body: `Google Analytics events beyond page views: the clicks, scrolls and other actions it measures on ${BRAND}'s pages.`,
  },
  {
    id: "marketing",
    title: "Marketing Cookies",
    body: `Meta's conversion and event measurement: lets Meta measure the sign-ups and orders ${BRAND}'s ads led to.`,
  },
  {
    id: "ads",
    title: "Sell, Share, or Use Your Data for Targeted Advertising",
    body: "Lets Google and Meta use your visits to personalize the ads they show you and to match you with their audiences on other sites and apps. Some US state privacy laws call this a “sale” or “sharing” of your personal information, or “targeted advertising”, and give you the right to opt out: it stays off unless you turn it on.",
  },
];

/*
 * Every colour is the theme's own variable (src/styles/themes.css), read with
 * Tailwind's `(--name)` form: this build maps no `primary` or `secondary` colour
 * name, so `bg-primary` would draw nothing. A hover or press is a step of the
 * fill toward its own ink, as @hanzo/design's `-hover` tokens are.
 */
const link = "underline underline-offset-2 hover:text-(--foreground)";
/** The keyboard's mark: the theme's ring, outside the control. */
const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--background)";
/** A button as @hanzo/ui/consent draws one: 13px type on a 36px floor, a 12px corner inside the 16px card. */
const button = `inline-flex min-h-9 items-center justify-center rounded-xl px-4 text-[13px] font-medium transition-colors ${ring}`;
/** The one filled control, the theme's primary. */
const solid = `${button} bg-(--primary) text-(--primary-foreground) hover:bg-[color-mix(in_oklab,var(--primary),var(--primary-foreground)_10%)] active:bg-[color-mix(in_oklab,var(--primary),var(--primary-foreground)_18%)]`;
/** Beside it, the theme's secondary surface. */
const quiet = `${button} bg-(--secondary) text-(--secondary-foreground) hover:bg-[color-mix(in_oklab,var(--secondary),var(--secondary-foreground)_8%)] active:bg-[color-mix(in_oklab,var(--secondary),var(--secondary-foreground)_14%)]`;
/** A ×: no fill at rest, the secondary surface under the pointer. */
const close = `rounded-xl p-2 text-(--muted-foreground) transition-colors hover:bg-(--secondary) hover:text-(--foreground) ${ring}`;

/** A switch on the theme's tokens: the primary when on, the input track when off. */
function Toggle({ id, on, disabled, flip }: { id: string; on: boolean; disabled: boolean; flip: () => void }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={flip}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-50 ${ring} ${on ? "bg-(--primary)" : "bg-(--input)"}`}
    >
      <span
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full transition-transform ${on ? "translate-x-5 bg-(--primary-foreground)" : "bg-(--foreground)"}`}
      />
    </button>
  );
}

export function Consent() {
  const [open, setOpen] = useState(asks);
  const [sheet, setSheet] = useState(false);
  const [choice, setChoice] = useState<Choice>(readConsent);
  if (!open && !sheet) return null;
  const done = (answer: () => void) => () => {
    answer();
    setSheet(false);
    setOpen(false);
  };
  // Global Privacy Control or Do Not Track is a refusal the visitor already made.
  const locked = declined();

  return (
    <>
      {open && !sheet && (
        <div
          role="region"
          aria-label="Cookie preferences"
          className="fixed bottom-4 left-4 right-4 z-[200] mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-(--border) bg-(--background)/95 p-4 text-sm text-(--foreground) shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:gap-4"
        >
          <p className="flex-1">
            Essential cookies keep {BRAND} running. With your OK, optional cookies help us measure performance and ads.
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => setSheet(true)} className={quiet}>
              Manage preferences
            </button>
            <button onClick={done(acceptAll)} className={solid}>
              Accept all
            </button>
            <button onClick={done(rejectAll)} aria-label="Close and use essential cookies only" className={close}>
              <X size={16} />
            </button>
          </div>
        </div>
      )}
      {sheet && (
        <div className="fixed inset-0 z-[210] flex items-end justify-center bg-black/60 p-4 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="consent-title"
            className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-(--border) bg-(--background) p-6 text-sm text-(--muted-foreground) shadow-2xl"
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <h2 id="consent-title" className="text-lg font-semibold text-(--foreground)">
                Cookie Preferences
              </h2>
              <button onClick={() => setSheet(false)} aria-label="Close" className={close}>
                <X size={16} />
              </button>
            </div>
            <p>
              We use cookies and similar technologies to provide our services, measure performance, and support
              advertising. Essential cookies are required for the site to work and cannot be turned off. You can allow or
              reject optional cookies below. Learn more in our{" "}
              <a href="https://hanzo.ai/cookies" className={link}>Cookie Policy</a>,{" "}
              <a href="https://hanzo.ai/privacy" className={link}>Privacy Policy</a> and{" "}
              <a href="https://hanzo.ai/terms" className={link}>Terms of Service</a>.
            </p>
            {locked && <p className="mt-3 text-(--foreground)">Your browser asks sites not to track you, so all of these stay off.</p>}
            <ul className="mt-4 divide-y divide-(--border) border-y border-(--border)">
              <li className="py-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-(--foreground)">Strictly Necessary Cookies</span>
                  <span className="text-xs font-medium text-(--foreground)">Always Active</span>
                </div>
                <p className="mt-1">
                  These are needed for the site to work, so they are always on. They keep you signed in and your session
                  secure, protect forms against cross-site request forgery, spread traffic across servers, remember the
                  choice you make here, and keep what you have typed into a form. They include {BRAND}'s own first-party
                  analytics, which is never sold or shared, and basic page-view counting by Google Analytics and Meta:
                  page loads only, with no ad personalization.
                </p>
              </li>
              {CATEGORIES.map(({ id, title, body }) => (
                <li key={id} className="py-3">
                  <div className="flex items-center justify-between gap-4">
                    <label htmlFor={`consent-${id}`} className="font-medium text-(--foreground)">
                      {title}
                    </label>
                    <Toggle
                      id={`consent-${id}`}
                      on={!locked && choice[id]}
                      disabled={locked}
                      flip={() => setChoice({ ...choice, [id]: !choice[id] })}
                    />
                  </div>
                  <p className="mt-1">{body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              {/* A browser that refused cannot accept here: there is nothing to accept. */}
              {!locked && (
                <button onClick={done(acceptAll)} className={`${quiet} grow sm:grow-0`}>
                  Accept all
                </button>
              )}
              {/* The sheet's answer: what the switches say, essential only when none is on. */}
              <button onClick={done(() => saveConsent(choice))} className={`${solid} grow sm:grow-0`}>
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
