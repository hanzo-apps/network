import { useState } from "react";
import { X } from "lucide-react";
import { acceptAll, asks, declined, readConsent, rejectAll, saveConsent, type Choice } from "@hanzo/event";

/**
 * The cookie banner, in this site's own markup, saying what @hanzo/ui/consent
 * says on every other Hanzo surface: one bar, a preferences sheet, and the same
 * four categories. Our own first-party analytics is strictly necessary and runs
 * for every visitor (src/components/Measure.tsx); the three optional categories
 * are the third parties @hanzo/event's tag manager loads, and nothing of theirs
 * loads until the visitor allows it. @hanzo/event stores the answer and starts
 * what it allows, with no reload.
 */

const BRAND = "Hanzo Network";

type Optional = keyof Choice;

const CATEGORIES: { id: Optional; title: string; body: string }[] = [
  {
    id: "analytics",
    title: "Performance Cookies",
    body: `Google Analytics: lets Google measure visits to ${BRAND} with its own cookies.`,
  },
  {
    id: "marketing",
    title: "Marketing Cookies",
    body: `The Meta pixel: lets Meta measure the sign-ups and orders ${BRAND}'s ads led to.`,
  },
  {
    id: "ads",
    title: "Sell, Share, or Use Your Data for Targeted Advertising",
    body: "Lets Google and Meta use your visit to choose the ads they show you on other sites and apps. Some US state privacy laws call this a “sale” or “sharing” of your personal information, or “targeted advertising”, and give you the right to opt out: it stays off unless you turn it on.",
  },
];

const link = "underline underline-offset-2 hover:text-white";
const quiet = "rounded-full border border-white/15 px-4 py-1.5 hover:bg-white/5";
const solid = "rounded-full bg-white px-4 py-1.5 font-medium text-black hover:bg-white/90";

/** A switch drawn for the sheet's dark ground, where the shared one's theme tokens do not show. */
function Toggle({ id, on, disabled, flip }: { id: string; on: boolean; disabled: boolean; flip: () => void }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={flip}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-50 ${on ? "bg-white" : "bg-white/20"}`}
    >
      <span
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full transition-transform ${on ? "translate-x-5 bg-black" : "bg-white"}`}
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
          className="fixed bottom-4 left-4 right-4 z-[200] mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-white/10 bg-neutral-950/95 p-4 text-sm text-white/80 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:gap-4"
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
            <button
              onClick={done(rejectAll)}
              aria-label="Close and use essential cookies only"
              className="rounded-full p-1.5 text-white/60 hover:bg-white/5 hover:text-white"
            >
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
            className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950 p-6 text-sm text-white/80 shadow-2xl"
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <h2 id="consent-title" className="text-lg font-semibold text-white">
                Cookie Preferences
              </h2>
              <button
                onClick={() => setSheet(false)}
                aria-label="Close"
                className="rounded-full p-1 text-white/60 hover:bg-white/5 hover:text-white"
              >
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
            {locked && <p className="mt-3 text-white">Your browser asks sites not to track you, so all of these stay off.</p>}
            <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
              <li className="py-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-white">Strictly Necessary Cookies</span>
                  <span className="text-xs text-white/60">Always Active</span>
                </div>
                <p className="mt-1 text-white/60">
                  These are needed for the site to work, so they are always on. They keep you signed in and your session
                  secure, protect forms against cross-site request forgery, spread traffic across servers, remember the
                  choice you make here, and keep what you have typed into a form. They include {BRAND}'s own first-party
                  analytics, which counts visits and finds what is broken for {BRAND} alone and is never sold or shared.
                </p>
              </li>
              {CATEGORIES.map(({ id, title, body }) => (
                <li key={id} className="py-3">
                  <div className="flex items-center justify-between gap-4">
                    <label htmlFor={`consent-${id}`} className="font-medium text-white">
                      {title}
                    </label>
                    <Toggle
                      id={`consent-${id}`}
                      on={!locked && choice[id]}
                      disabled={locked}
                      flip={() => setChoice({ ...choice, [id]: !choice[id] })}
                    />
                  </div>
                  <p className="mt-1 text-white/60">{body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={done(() => saveConsent(choice))} className={quiet}>
                Save preferences
              </button>
              <button onClick={done(acceptAll)} className={solid}>
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
