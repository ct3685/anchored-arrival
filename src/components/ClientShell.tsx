'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  trackPageView,
  captureSessionContext,
  initUserProperties,
} from '@/lib/analytics';
import { reportWebVitals } from '@/lib/webVitals';
import { useEngagementTime } from '@/lib/useEngagementTime';

// Lazy load non-critical UI components - don't block initial paint
const SparkleEffect = dynamic(() => import('@/components/SparkleEffect'), {
  ssr: false,
  loading: () => null,
});

const MiniPlayer = dynamic(() => import('@/components/MiniPlayer'), {
  ssr: false,
  loading: () => null,
});

const InAppBrowserNotice = dynamic(
  () => import('@/components/InAppBrowserNotice'),
  {
    ssr: false,
    loading: () => null,
  }
);

// Helper to schedule work when browser is idle
function scheduleWhenIdle(callback: () => void, fallbackDelay = 500) {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout: 1000 });
  } else {
    setTimeout(callback, fallbackDelay);
  }
}

export function RouteAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    captureSessionContext();
    initUserProperties();
    const timer = setTimeout(reportWebVitals, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEngagementTime();

  useEffect(() => {
    trackPageView(pathname, document.title);
  }, [pathname]);

  return null;
}

export function SparkleEffectLazy() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Load when browser is idle, then fade in
    scheduleWhenIdle(() => setIsVisible(true), 300);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
      }}
    >
      <SparkleEffect />
    </div>
  );
}

export function MiniPlayerLazy() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    scheduleWhenIdle(() => setIsVisible(true), 500);
  }, []);

  if (!isVisible || pathname === '/music') return null;

  return <MiniPlayer />;
}

export function InAppBrowserNoticeLazy() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Load immediately - this is important UX for in-app browser users
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return <InAppBrowserNotice />;
}
