'use client';

import { useEffect, useState, useMemo } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'motion/react';
import { colors } from '@/theme/theme';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'horseshoe' | 'dust' | 'star';
  opacity: number;
  drift: number;
}

function HorseshoeParticle({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={colors.brass}
      strokeWidth="1.5"
      opacity="0.4"
    >
      <path d="M5 2v8a7 7 0 0 0 14 0V2M5 2H3v8a9 9 0 0 0 18 0V2h-2" />
    </svg>
  );
}

function StarParticle({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={colors.amber}
      opacity="0.25"
    >
      <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
    </svg>
  );
}

function DustParticle({ size }: { size: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: colors.dust,
        opacity: 0.2,
      }}
    />
  );
}

export default function SparkleEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const config = useMemo(() => {
    if (typeof window === 'undefined') {
      return { initialCount: 6, maxCount: 10, interval: 600 };
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      return { initialCount: 0, maxCount: 0, interval: 1000 };
    }

    const isMobile = window.innerWidth < 768;
    return isMobile
      ? { initialCount: 4, maxCount: 6, interval: 800 }
      : { initialCount: 8, maxCount: 12, interval: 500 };
  }, []);

  useEffect(() => {
    if (config.initialCount === 0) return;

    const types: Particle['type'][] = [
      'horseshoe',
      'dust',
      'dust',
      'dust',
      'star',
    ];

    const createParticle = (): Particle => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 12 + 8,
      type: types[Math.floor(Math.random() * types.length)],
      opacity: Math.random() * 0.3 + 0.1,
      drift: (Math.random() - 0.5) * 30,
    });

    const initial: Particle[] = [];
    for (let i = 0; i < config.initialCount; i++) {
      initial.push(createParticle());
    }
    setParticles(initial);

    const interval = setInterval(() => {
      setParticles((prev) => {
        const newParticles = [
          ...prev.slice(-(config.maxCount - 1)),
          createParticle(),
        ];
        return newParticles;
      });
    }, config.interval);

    return () => clearInterval(interval);
  }, [config]);

  if (particles.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <AnimatePresence mode="popLayout">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, particle.opacity, particle.opacity, 0],
              scale: [0, 1, 1, 0],
              y: [0, -40, -80, -120],
              x: [0, particle.drift * 0.5, particle.drift],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 8,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              lineHeight: 1,
            }}
          >
            {particle.type === 'horseshoe' && (
              <HorseshoeParticle size={particle.size} />
            )}
            {particle.type === 'star' && <StarParticle size={particle.size} />}
            {particle.type === 'dust' && (
              <DustParticle size={particle.size * 0.4} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
}
