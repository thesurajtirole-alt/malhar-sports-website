"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a GA4 event if analytics is loaded (NEXT_PUBLIC_GA_MEASUREMENT_ID
 * set). Safe to call unconditionally anywhere — silently does nothing if
 * GA isn't configured, so this never breaks anything for sites that
 * haven't added analytics yet.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}
