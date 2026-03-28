'use client';

import { useEffect, useState, useMemo } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'motion/react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
}

const emojis = ['🤠', '🐎', '🐴', '🏇', '⭐'];

export default function SparkleEffect() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const config = useMemo(() => {
    if (typeof window === 'undefined') {
      return { initialCount: 10, maxCount: 15, interval: 400 };
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      return { initialCount: 0, maxCount: 0, interval: 1000 };
    }

    const isMobile = window.innerWidth < 768;
    return isMobile
      ? { initialCount: 8, maxCount: 12, interval: 500 }
      : { initialCount: 20, maxCount: 25, interval: 300 };
  }, []);

  useEffect(() => {
    if (config.initialCount === 0) return;

    const createSparkle = (): Sparkle => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 18 + 10,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    });

    const initialSparkles: Sparkle[] = [];
    for (let i = 0; i < config.initialCount; i++) {
      initialSparkles.push(createSparkle());
    }
    setSparkles(initialSparkles);

    const interval = setInterval(() => {
      setSparkles((prev) => {
        const newSparkles = [
          ...prev.slice(-(config.maxCount - 1)),
          createSparkle(),
        ];
        return newSparkles;
      });
    }, config.interval);

    return () => clearInterval(interval);
  }, [config]);

  if (sparkles.length === 0) return null;

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
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              y: [0, -50, -100, -150],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 6,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              fontSize: `${sparkle.size}px`,
              lineHeight: 1,
            }}
          >
            {sparkle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
}
