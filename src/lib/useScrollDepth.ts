'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackScrollDepth } from './analytics';

export function useScrollDepth() {
  const pathname = usePathname();
  const milestonesReached = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Reset on route change
    milestonesReached.current = new Set();

    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight <= 0) return;

        const scrollPercent = (window.scrollY / scrollHeight) * 100;
        const milestones = [25, 50, 75, 100] as const;

        for (const milestone of milestones) {
          if (
            scrollPercent >= milestone &&
            !milestonesReached.current.has(milestone)
          ) {
            milestonesReached.current.add(milestone);
            trackScrollDepth(pathname, milestone);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [pathname]);
}
