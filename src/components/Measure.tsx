import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { startTags } from "@hanzo/event";
import { AnalyticsProvider, useConsent, usePageview } from "@hanzo/event/react";

/**
 * Measurement is @hanzo/event, all of it: the stream to api.hanzo.ai/v1/event,
 * and the tag manager, which loads GA4 and the Meta Pixel from this host's tag
 * set (GET api.hanzo.ai/v1/project/tags?host=hanzo.network) once consent allows.
 * No platform id lives in this repo; connecting one is a change to the tag set.
 */

/**
 * Project 1's publishable key, the one hanzo.ai ships: hanzo.network is not in
 * @hanzo/event's ORG_DOMAIN yet, so the stream would otherwise resolve none.
 * Publishable means write-only and in every visitor's bundle by design.
 */
const KEY = "pk-CmfLA2K6kvsPflrS9DSkt06H_kSoQB_21sjedt6VJdc";

/** The sites one visit crosses; GA4 keeps it one session across them. */
const DOMAINS = ["hanzo.network", "hanzo.ai"];

function Pageviews() {
  usePageview(useLocation().pathname);
  return null;
}

export function Measure({ children }: { children: ReactNode }) {
  const { analytics } = useConsent();
  useEffect(() => startTags({ domains: DOMAINS }), []);
  return (
    <AnalyticsProvider
      config={{ product: "hanzo-network", host: "https://api.hanzo.ai", ingestKey: KEY, enabled: analytics }}
    >
      <Pageviews />
      {children}
    </AnalyticsProvider>
  );
}
