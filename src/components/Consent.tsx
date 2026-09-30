import { useState } from "react";
import { acceptAll, asks, rejectAll } from "@hanzo/event";

/**
 * The one question, for a visitor who must be asked first: an opt-in region
 * with no stored choice. @hanzo/event stores the answer and starts what it
 * allows, with no reload.
 */
export function Consent() {
  const [open, setOpen] = useState(asks);
  if (!open) return null;
  const answer = (choose: () => void) => () => {
    choose();
    setOpen(false);
  };
  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className="fixed bottom-4 left-4 right-4 z-[200] mx-auto max-w-xl rounded-2xl border border-white/10 bg-neutral-950/95 p-4 text-sm text-white/80 shadow-2xl backdrop-blur sm:flex sm:items-center sm:gap-4"
    >
      <p className="flex-1">
        We use cookies to count visits and the ads that bring them.{" "}
        <a href="https://hanzo.ai/privacy" className="underline hover:text-white">
          Privacy
        </a>
      </p>
      <div className="mt-3 flex gap-2 sm:mt-0">
        <button onClick={answer(rejectAll)} className="rounded-full border border-white/15 px-4 py-1.5 hover:bg-white/5">
          Reject
        </button>
        <button onClick={answer(acceptAll)} className="rounded-full bg-white px-4 py-1.5 font-medium text-black hover:bg-white/90">
          Accept
        </button>
      </div>
    </div>
  );
}
