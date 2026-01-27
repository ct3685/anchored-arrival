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

    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);
}
