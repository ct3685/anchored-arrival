'use client';

import { useState, useEffect, useCallback } from 'react';

const POLL_INTERVAL_MS = 60_000;
const TIKTOK_LIVE_URL = 'https://www.tiktok.com/@trevor_bfit/live';
const TIKTOK_PROFILE_URL = 'https://www.tiktok.com/@trevor_bfit';

interface LiveStatus {
  isLive: boolean;
  /** Profile URL normally; live URL when streaming */
  tiktokHref: string;
}

export function useLiveStatus(): LiveStatus {
  const [isLive, setIsLive] = useState(false);

  const check = useCallback(async () => {
    try {
      const res = await fetch('/api/live-status', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setIsLive(data.isLive === true);
      }
    } catch {
      // Silently fall back to not-live on network errors
    }
  }, []);

  useEffect(() => {
    check();
    const interval = setInterval(check, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [check]);

  return {
    isLive,
    tiktokHref: isLive ? TIKTOK_LIVE_URL : TIKTOK_PROFILE_URL,
  };
}
