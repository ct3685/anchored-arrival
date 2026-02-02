'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Lazy load non-critical UI components - don't block initial paint
const SparkleEffect = dynamic(() => import('@/components/SparkleEffect'), {
  ssr: false,
  loading: () => null,
});

const MiniPlayer = dynamic(() => import('@/components/MiniPlayer'), {
  ssr: false,
  loading: () => null,
});

export function SparkleEffectLazy() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay then fade in smoothly
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease-in-out',
      }}
    >
      <SparkleEffect />
    </div>
  );
}

export function MiniPlayerLazy() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay mini player appearance slightly
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return <MiniPlayer />;
}
