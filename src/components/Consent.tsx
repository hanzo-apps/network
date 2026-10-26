import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  acceptAll,
  asks,
  consentPolicy,
  declined,
  notice,
  noticed,
  POLICY_EVENT,
  readConsent,
  rejectAll,
  saveConsent,
  type Choice,
} from "@hanzo/event";

/**
 * The cookie banner, in this site's own markup, saying and doing what
 * @hanzo/ui/consent says and does on every other Hanzo surface. Our own
 * first-party analytics is strictly necessary and runs for every visitor
 * (src/components/Measure.tsx). What Google Analytics and the Meta pixel may do is
 * regional: cloud places the visitor and serves a `mode` with the tag config.
 *
 *   eu          opt-in: the bar (Manage preferences, Accept all, × for essential
 *               only) and the sheet, where Save preferences stores the switches.
 *   us_privacy  opt-out: no bar; Google Analytics and Meta run by default, and
 *               Your Privacy Choices opens the sheet, where a switch saves as it
 *               moves. The advertising switch is the sale and sharing opt-out.
 *   global      a notice and a × that records it as seen; the same opt-out sheet.
 *
 * Global Privacy Control or Do Not Track holds every switch off under eu, and the
 * sale and sharing off elsewhere. Until cloud answers nothing is drawn; the tab's
 * last answer is used at once, and with none by 1.5s eu applies. Every colour and
 * state comes from the theme's tokens, so it follows the site's light and dark.
 */

const BRAND = "Hanzo Network";

type Mode = "eu" | "us_privacy" | "global";
type Optional = keyof Choice;

const MODES: readonly string[] = ["eu", "us_privacy", "global"];
const MODE_KEY = "hz_consent_mode";
const WAIT = 1500;
const HASH = "#choices";

const asMode = (m: unknown): Mode | undefined => (MODES.includes(String(m)) ? (String(m) as Mode) : undefined);
const served = (): Mode | undefined => asMode(consentPolicy()?.mode);

function cached(): Mode | undefined {
  try {
    return asMode(sessionStorage.getItem(MODE_KEY));
  } catch {
    return undefined;
  }
}

const categories = (strict: boolean): { id: Optional; title: string; body: string }[] => [
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
    body: `Lets Google and Meta use your visits to choose the ads they show you on other sites and apps. Some US state privacy laws call this a “sale” or “sharing” of your personal information, or “targeted advertising”, and give you the right to opt out: ${
      strict ? "it stays off unless you turn it on." : "turn this off to opt out."
    }`,
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
/** "Your Privacy Choices": the icon, then the words, quiet until pointed at. */
const choices = `inline-flex items-center gap-1.5 rounded-md text-[13px] text-(--muted-foreground) transition-colors hover:text-(--foreground) ${ring}`;

/**
 * The privacy options icon California publishes for the "Your Privacy Choices"
 * link (Cal. Code Regs. tit. 11, § 7015(b)), on its 30×14 box. Decorative beside
 * the words, which are the link's name.
 */
export function PrivacyChoicesIcon({ height = 14 }: { height?: number }) {
  return (
    <svg width={(height * 30) / 14} height={height} viewBox="0 0 30 14" aria-hidden="true" focusable="false" className="shrink-0">
      <path d="M7.4 12.8h6.8l3.1-11.6H7.4C4.2 1.2 1.6 3.8 1.6 7s2.6 5.8 5.8 5.8z" fill="#fff" fillRule="evenodd" clipRule="evenodd" />
      <path
        d="M22.6 0H7.4c-3.9 0-7 3.1-7 7s3.1 7 7 7h15.2c3.9 0 7-3.1 7-7s-3.2-7-7-7zm-21 7c0-3.2 2.6-5.8 5.8-5.8h9.9l-3.1 11.6H7.4c-3.2 0-5.8-2.6-5.8-5.8z"
        fill="#06f"
        fillRule="evenodd"
        clipRule="evenodd"
      />
      <path
        d="M24.6 4c.2.2.2.6 0 .8L22.5 7l2.2 2.2c.2.2.2.6 0 .8-.2.2-.6.2-.8 0l-2.2-2.2-2.2 2.2c-.2.2-.6.2-.8 0-.2-.2-.2-.6 0-.8L20.8 7l-2.2-2.2c-.2-.2-.2-.6 0-.8.2-.2.6-.2.8 0l2.2 2.2L23.8 4c.2-.2.6-.2.8 0z"
        fill="#fff"
      />
      <path d="M12.7 4.1c.2.2.3.6.1.8L8.6 9.8c-.1.1-.2.2-.3.2-.2.1-.5.1-.7-.1L5.4 7.7c-.2-.2-.2-.6 0-.8.2-.2.6-.2.8 0L8 8.6l3.8-4.5c.2-.2.6-.2.9 0z" fill="#06f" />
    </svg>
  );
}

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
  const [mode, setMode] = useState<Mode | undefined>();
  const [front, setFront] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [choice, setChoice] = useState<Choice>(readConsent);
  // Whether the page draws its own link to #choices (the footer's); if not, this draws one.
  const [hosted, setHosted] = useState(true);
  const rule = useRef<Mode | undefined>(undefined);

  /** What stands at the foot of the window: the eu bar until a choice, the global notice until seen. */
  const shows = (m = rule.current) => (m === "eu" ? asks() : m === "global" ? !noticed() : false);

  const choose = () => {
    setChoice(readConsent());
    setSheet(true);
  };

  useEffect(() => {
    const decide = (m: Mode) => {
      rule.current = m;
      setMode(m);
      setFront(shows(m));
    };
    const policy = () => {
      const m = served();
      if (m) {
        try {
          sessionStorage.setItem(MODE_KEY, m);
        } catch {
          /* storage refused: the next page waits for cloud */
        }
        decide(m);
      } else setFront(shows());
    };
    const known = served() ?? cached();
    if (known) decide(known);
    const wait = known ? undefined : window.setTimeout(() => rule.current ?? decide("eu"), WAIT);

    let frame = 0;
    const look = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setHosted(document.querySelector(`a[href$="${HASH}"]`) !== null);
      });
    };
    look();
    const watch = new MutationObserver(look);
    watch.observe(document.body, { childList: true, subtree: true });

    // A plain press on a link to #choices opens the sheet, and so does arriving at it.
    const press = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a || a.getAttribute("href")?.endsWith(HASH) !== true) return;
      e.preventDefault();
      choose();
    };
    const hash = () => {
      if (window.location.hash !== HASH) return;
      history.replaceState(history.state, "", window.location.pathname + window.location.search);
      choose();
    };
    hash();
    window.addEventListener(POLICY_EVENT, policy);
    window.addEventListener("hashchange", hash);
    document.addEventListener("click", press, { capture: true });
    return () => {
      window.clearTimeout(wait);
      cancelAnimationFrame(frame);
      watch.disconnect();
      window.removeEventListener(POLICY_EVENT, policy);
      window.removeEventListener("hashchange", hash);
      document.removeEventListener("click", press, { capture: true });
    };
  }, []);

  const done = (answer: () => void) => () => {
    answer();
    setSheet(false);
    setFront(shows());
  };
  const shut = () => {
    setSheet(false);
    setFront(shows());
  };

  // Global Privacy Control or Do Not Track is a refusal the visitor already made.
  const locked = declined();
  const strict = (mode ?? "eu") === "eu";
  const held = (id: Optional) => locked && (strict || id === "ads");
  const flip = (id: Optional) => {
    const next = { ...choice, [id]: !choice[id] };
    setChoice(next);
    if (!strict) saveConsent(next);
  };

  if (sheet)
    return (
      <div className="fixed inset-0 z-[210] flex items-end justify-center bg-black/60 p-4 sm:items-center" onClick={shut}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-title"
          onClick={(e) => e.stopPropagation()}
          className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-(--border) bg-(--background) p-6 text-sm text-(--muted-foreground) shadow-2xl"
        >
          <div className="mb-3 flex items-start justify-between gap-4">
            <h2 id="consent-title" className="text-lg font-semibold text-(--foreground)">
              Cookie Preferences
            </h2>
            <button onClick={shut} aria-label="Close" className={close}>
              <X size={16} />
            </button>
          </div>
          <p>
            We use cookies and similar technologies to provide our services, measure performance, and support advertising.{" "}
            {strict
              ? "Essential cookies are required for the site to work and cannot be turned off. You can allow or reject optional cookies below."
              : "Google Analytics and the Meta pixel run on this site by default. Turn either off below, or turn off the last switch to opt out of the sale or sharing of your personal information for targeted advertising; each switch is saved as soon as you change it. Essential cookies are required for the site to work and cannot be turned off."}{" "}
            Learn more in our{" "}
            <a href="https://hanzo.ai/cookies" className={link}>
              Cookie Policy
            </a>
            ,{" "}
            <a href="https://hanzo.ai/privacy" className={link}>
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="https://hanzo.ai/terms" className={link}>
              Terms of Service
            </a>
            .
          </p>
          {locked && (
            <p className="mt-3 text-(--foreground)">
              {strict
                ? "Your browser asks sites not to track you, so all of these stay off."
                : "Your browser asks sites not to track you, so your data is not sold or shared for targeted advertising."}
            </p>
          )}
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
                analytics, which counts visits and finds what is broken for {BRAND} alone and is never sold or shared.
              </p>
            </li>
            {categories(strict).map(({ id, title, body }) => (
              <li key={id} className="py-3">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor={`consent-${id}`} className="font-medium text-(--foreground)">
                    {title}
                  </label>
                  <Toggle id={`consent-${id}`} on={!held(id) && choice[id]} disabled={held(id)} flip={() => flip(id)} />
                </div>
                <p className="mt-1">{body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap justify-end gap-2">
            {strict ? (
              <>
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
              </>
            ) : (
              // Each switch saved as it moved: nothing is left to save.
              <button onClick={shut} className={`${solid} grow sm:grow-0`}>
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    );

  if (!mode) return null;

  const card =
    "fixed bottom-4 left-4 right-4 z-[200] mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-(--border) bg-(--background)/95 p-4 text-sm text-(--foreground) shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:gap-4";

  if (front && mode === "eu")
    return (
      <div role="dialog" aria-label="Cookie preferences" className={card}>
        <p className="flex-1">
          Essential cookies keep {BRAND} running. With your OK, optional cookies help us measure performance and ads.
        </p>
        <div className="flex items-center gap-2">
          <button onClick={choose} className={quiet}>
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
    );

  if (front && mode === "global")
    return (
      <div role="region" aria-label="Cookie notice" className={card}>
        <p className="flex-1">We use cookies to improve your experience. By continuing to browse, you agree.</p>
        <div className="flex items-center gap-3">
          <button onClick={choose} className={choices}>
            <PrivacyChoicesIcon />
            Your Privacy Choices
          </button>
          <button onClick={done(notice)} aria-label="Close" className={close}>
            <X size={16} />
          </button>
        </div>
      </div>
    );

  // The way to the sheet on a page whose footer draws none: small, quiet, at the foot of the window.
  if (hosted) return null;
  return (
    <div className="fixed bottom-4 left-4 z-[200] rounded-xl border border-(--border) bg-(--background) px-2.5 py-1 shadow-lg">
      <button onClick={choose} className={choices}>
        <PrivacyChoicesIcon />
        Your Privacy Choices
      </button>
    </div>
  );
}
