import { useEffect } from "react";
import { useAnalytics } from "@hanzo/event/react";

/** hanzo.ai's sign-in page. It signs the visitor in, then sends them on to pay. */
const LOGIN = "https://hanzo.ai/login";

/**
 * This site's sign-in, sign-up and account addresses: hanzo.ai signs people in.
 * Replaces the location with LOGIN carrying the visitor's anonymous id and first
 * touch (@hanzo/event `link`), so hanzo.ai continues the same journey. That is
 * the first-party stream, which runs for every visitor.
 */
export function Away() {
  const to = useAnalytics().link(LOGIN + window.location.search);
  useEffect(() => window.location.replace(to), [to]);
  return null;
}
