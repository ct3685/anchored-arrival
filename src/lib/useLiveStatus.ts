'use client';

import { useState, useEffect, useCallback } from 'react';

const POLL_INTERVAL_MS = 60_000;
const TIKTOK_LIVE_URL = 'https://www.tiktok.com/@trevor_bfit/live';
const TIKTOK_PROFILE_URL = 'https://www.tiktok.com/@trevor_bfit';

interface LiveStatus {
  isLive: boolean;
  loading: boolean;
  /** Profile URL normally; live URL when streaming */
  tiktokHref: string;
}

export function useLiveStatus(): LiveStatus {
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  const check = useCallback(async () => {
    try {
      const res = await fetch('/api/live-status', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setIsLive(data.isLive === true);
      }
    } catch {
      // Silently fall back to not-live on network errors
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    check();
    const interval = setInterval(check, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [check]);

  return {
    isLive,
    loading,
    tiktokHref: isLive ? TIKTOK_LIVE_URL : TIKTOK_PROFILE_URL,
  };
}
