import { forwardRef, useEffect, type AnchorHTMLAttributes } from "react";
import { useAnalytics, useConsent } from "@hanzo/event/react";

/** hanzo.ai's sign-in page. It signs the visitor in, then sends them on to pay. */
export const LOGIN = "https://hanzo.ai/login";

/**
 * LOGIN, carrying the visitor's anonymous id and first touch (@hanzo/event
 * `link`) while Analytics is allowed, so hanzo.ai continues the same journey.
 */
export function useLogin(search = ""): string {
  const stream = useAnalytics();
  const { analytics } = useConsent();
  const url = LOGIN + search;
  return analytics ? stream.link(url) : url;
}

/** The call to action: "Try Hanzo", to hanzo.ai's sign-in. */
export const Try = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  function Try({ children, ...rest }, ref) {
    return (
      <a ref={ref} {...rest} href={useLogin()}>
        Try Hanzo
        {children}
      </a>
    );
  },
);

/** This site's sign-in, sign-up and account addresses: hanzo.ai signs people in. */
export function Away() {
  const to = useLogin(window.location.search);
  useEffect(() => window.location.replace(to), [to]);
  return null;
}
