'use client';

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'motion/react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  type: 'star' | 'heart' | 'note';
}

const colors = ['#FF69B4', '#00D4FF', '#9B59B6', '#FFD700', '#ADFF2F'];

const StarSVG = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const HeartSVG = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" />
  </svg>
);

const NoteSVG = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z" />
  </svg>
);

export default function SparkleEffect() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const createSparkle = (): Sparkle => {
      // Weighted selection: more hearts! (50% hearts, 30% stars, 20% notes)
      const rand = Math.random();
      let type: 'star' | 'heart' | 'note';
      if (rand < 0.5) {
        type = 'heart';
      } else if (rand < 0.8) {
        type = 'star';
      } else {
        type = 'note';
      }
      
      return {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 18 + 10, // Slightly bigger
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
      };
    };

    // Initial sparkles - more of them!
    setSparkles(Array.from({ length: 25 }, createSparkle));

    // Add new sparkles more frequently
    const interval = setInterval(() => {
      setSparkles((prev) => {
        const newSparkles = [...prev.slice(-30), createSparkle()];
        return newSparkles;
      });
    }, 500); // Faster spawn rate

    return () => clearInterval(interval);
  }, []);

  const renderSparkle = (sparkle: Sparkle) => {
    switch (sparkle.type) {
      case 'heart':
        return <HeartSVG size={sparkle.size} color={sparkle.color} />;
      case 'note':
        return <NoteSVG size={sparkle.size} color={sparkle.color} />;
      default:
        return <StarSVG size={sparkle.size} color={sparkle.color} />;
    }
  };

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
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              y: [0, -50, -100, -150],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 4,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              willChange: 'transform, opacity',
              transform: 'translateZ(0)', // Force GPU layer on iOS Safari
            }}
          >
            {renderSparkle(sparkle)}
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
}
