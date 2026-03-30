'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from './analytics';

/**
 * Tracks visibility-aware engagement time per page.
 * Fires `page_engagement` on route change and on tab close (via beacon).
 */
export function useEngagementTime() {
  const pathname = usePathname();
  const visibleSinceRef = useRef(Date.now());
  const accumulatedMsRef = useRef(0);
  const isVisibleRef = useRef(true);
  const currentPathRef = useRef(pathname);

  const flush = useCallback((pagePath: string, useBeacon = false) => {
    if (isVisibleRef.current) {
      accumulatedMsRef.current += Date.now() - visibleSinceRef.current;
    }
    const ms = accumulatedMsRef.current;
    if (ms > 500) {
      trackEvent('page_engagement', {
        engagement_time_ms: ms,
        engaged_page_path: pagePath,
        ...(useBeacon && { transport_type: 'beacon' }),
      });
    }
    accumulatedMsRef.current = 0;
    visibleSinceRef.current = Date.now();
    isVisibleRef.current = !document.hidden;
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        accumulatedMsRef.current += Date.now() - visibleSinceRef.current;
        isVisibleRef.current = false;
      } else {
        visibleSinceRef.current = Date.now();
        isVisibleRef.current = true;
      }
    };

    const onPageHide = () => flush(currentPathRef.current, true);

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', onPageHide);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pagehide', onPageHide);
    };
  }, [flush]);

  useEffect(() => {
    if (currentPathRef.current !== pathname) {
      flush(currentPathRef.current);
      currentPathRef.current = pathname;
    }
  }, [pathname, flush]);
}
