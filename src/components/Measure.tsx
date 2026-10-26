import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { startTags } from "@hanzo/event";
import { AnalyticsProvider, useConsent, usePageview } from "@hanzo/event/react";

/**
 * Measurement is @hanzo/event, all of it: the stream to api.hanzo.ai/v1/event,
 * and the tag manager, which loads GA4 and the Meta Pixel from this host's tag
 * set (GET api.hanzo.ai/v1/project/tags?key=…) once consent allows.
 * No platform id lives in this repo; connecting one is a change to the tag set.
 */

/**
 * This site's project key, cloud project `network`: the project its events are
 * filed under and whose tag set the tag manager loads. Stated for both, so the
 * stream and the tags name one project on every host this export is served
 * from. Publishable means write-only and in every visitor's bundle by design.
 */
const KEY = "pk-YJ2eiA_7ckLStMPte8Ar8FsmRp_ycmeIeRbpGprZYmM";

/** The sites one visit crosses; GA4 keeps it one session across them. */
const DOMAINS = ["hanzo.network", "hanzo.ai"];

function Pageviews() {
  usePageview(useLocation().pathname);
  return null;
}

export function Measure({ children }: { children: ReactNode }) {
  const { analytics } = useConsent();
  useEffect(() => startTags({ key: KEY, domains: DOMAINS }), []);
  return (
    <AnalyticsProvider
      config={{ product: "hanzo-network", host: "https://api.hanzo.ai", ingestKey: KEY, enabled: analytics }}
    >
      <Pageviews />
      {children}
    </AnalyticsProvider>
  );
}
