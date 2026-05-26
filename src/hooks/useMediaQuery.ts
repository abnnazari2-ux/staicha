"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe media-query hook. On the server returns `serverValue` (default
 * false) so the SSR'd markup matches the desktop variant; on the client it
 * reads window.matchMedia synchronously inside useSyncExternalStore, so the
 * first client render already has the correct value — no hydration flash.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => serverValue
  );
}
