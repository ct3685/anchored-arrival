'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  IconButton,
  Grid,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Link as MuiLink,
  Slider,
} from '@mui/material';
import { motion, AnimatePresence } from 'motion/react';
import { colors } from '@/theme/theme';
import {
  ArrowUpward,
  ArrowDownward,
  CheckCircle,
  Email,
} from '@mui/icons-material';
import { TikTokIcon, YouTubeIcon, InstagramIcon, AmazonIcon } from '@/components/Icons';
import SparkleEffect from '@/components/SparkleEffect';

type GamePhase =
  | 'entry'
  | 'cipher'
  | 'trivia'
  | 'safe'
  | 'dossier'
  | 'skip-dossier';

interface TriviaQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

const triviaQuestions: TriviaQuestion[] = [
  {
    question: "What platform is Agent Morgie's primary HQ?",
    options: ['TikTok', 'YouTube', 'Snapchat', 'Instagram'],
    correct: 0, // TikTok
  },
  {
    question: "What's Agent Morgie's creator motto?",
    options: [
      'Boss Mode Always',
      'No Cap Zone',
      'Main Character Energy',
      'Living My Best Life',
    ],
    correct: 2, // Main Character Energy
  },
  {
    question: "Agent Morgie's community is built on...",
    options: [
      'Drama & hot takes',
      'Real conversations & connection',
      'Product reviews',
      'Dance challenges',
    ],
    correct: 1, // Real conversations & connection
  },
];

const cipherText = 'DJHQW PRUJLH LV WKH PYS'; // "AGENT MORGIE IS THE MVP" with Caesar cipher shift 3
const cipherSolution = 'AGENT MORGIE IS THE MVP';
// WARNING: The dossier rendering logic in the JSX depends on exact array indices.
// If you reorder or add items, update the index checks in the render section.
const dossierContent = [
  'CLASSIFIED DOSSIER',
  'CODE NAME: Agent Morgie',
  'STATUS: ACTIVE',
  'PRIMARY COMMS: morgie@agentmorgie.com',
  'ALTERNATIVE SECURE CHANNELS:',
  'classified@agentmorgie.com',
  'deepcover@agentmorgie.com',
  'hq@agentmorgie.com',
  'SECURE MAIL DROP:',
  '5651 Coventry Lane #109',
  'Fort Wayne, IN 46804',
  'SOCIAL NETWORK COVERS:',
  '• TikTok • YouTube • Instagram',
];

// Custom hook for typewriter effect
function useTypewriter(
  text: string,
  speed: number,
  phase: GamePhase,
  setText: (value: string) => void,
) {
  useEffect(() => {
    if (phase === 'entry') {
      let i = 0;
      setText('');
      const timer = setInterval(() => {
        if (i < text.length) {
          setText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
      return () => clearInterval(timer);
    }
  }, [text, speed, phase, setText]);
}

// SVG-based realistic animated lighter component
const AnimatedLighter = () => (
  <svg width="60" height="140" viewBox="0 0 60 140" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Metallic body gradient */}
      <linearGradient id="lighterBody" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7a7a7a" />
        <stop offset="20%" stopColor="#b8b8b8" />
        <stop offset="40%" stopColor="#e0e0e0" />
        <stop offset="50%" stopColor="#f5f5f5" />
        <stop offset="60%" stopColor="#d0d0d0" />
        <stop offset="80%" stopColor="#a0a0a0" />
        <stop offset="100%" stopColor="#686868" />
      </linearGradient>
      {/* Lid gradient */}
      <linearGradient id="lighterLid" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#666" />
        <stop offset="30%" stopColor="#999" />
        <stop offset="50%" stopColor="#bbb" />
        <stop offset="70%" stopColor="#999" />
        <stop offset="100%" stopColor="#555" />
      </linearGradient>
      {/* Flame filter for realistic flicker */}
      <filter id="flameDistort" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence type="turbulence" baseFrequency="0.05 0.08" numOctaves="3" seed="2" result="turb">
          <animate attributeName="seed" from="1" to="100" dur="2s" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="turb" scale="6" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      {/* Glow filter */}
      <filter id="flameGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      {/* Smoke filter */}
      <filter id="smokeFilter" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise">
          <animate attributeName="seed" from="0" to="50" dur="4s" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
        <feGaussianBlur stdDeviation="2" />
      </filter>
      {/* Warm glow radial */}
      <radialGradient id="warmGlow" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#ff8800" stopOpacity="0.3" />
        <stop offset="50%" stopColor="#ff6600" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#ff4400" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Warm ambient glow */}
    <ellipse cx="30" cy="25" rx="40" ry="50" fill="url(#warmGlow)">
      <animate attributeName="rx" values="38;42;38" dur="1.5s" repeatCount="indefinite" />
      <animate attributeName="ry" values="48;52;48" dur="1.8s" repeatCount="indefinite" />
    </ellipse>

    {/* Smoke wisps */}
    <g filter="url(#smokeFilter)" opacity="0.25">
      <ellipse cx="30" cy="10" rx="5" ry="12" fill="#aaa">
        <animate attributeName="cy" values="15;-20" dur="3s" repeatCount="indefinite" />
        <animate attributeName="rx" values="4;10" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0" dur="3s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="34" cy="12" rx="3" ry="8" fill="#999">
        <animate attributeName="cy" values="12;-25" dur="3.5s" repeatCount="indefinite" />
        <animate attributeName="rx" values="3;8" dur="3.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0" dur="3.5s" repeatCount="indefinite" />
      </ellipse>
    </g>

    {/* Flame group with distortion */}
    <g filter="url(#flameDistort)">
      {/* Outer flame - yellow/orange */}
      <ellipse cx="30" cy="30" rx="10" ry="22" fill="#ff8c00" opacity="0.8" filter="url(#flameGlow)">
        <animate attributeName="ry" values="20;24;20" dur="0.4s" repeatCount="indefinite" />
        <animate attributeName="rx" values="9;11;9" dur="0.3s" repeatCount="indefinite" />
      </ellipse>
      {/* Mid flame - orange */}
      <ellipse cx="30" cy="32" rx="7" ry="17" fill="#ff6600" opacity="0.9">
        <animate attributeName="ry" values="15;19;15" dur="0.35s" repeatCount="indefinite" />
        <animate attributeName="rx" values="6;8;6" dur="0.25s" repeatCount="indefinite" />
      </ellipse>
      {/* Inner flame - blue/white core */}
      <ellipse cx="30" cy="38" rx="4" ry="10" fill="#4488ff" opacity="0.9">
        <animate attributeName="ry" values="9;12;9" dur="0.3s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="30" cy="40" rx="2.5" ry="7" fill="#aaccff" opacity="0.8">
        <animate attributeName="ry" values="6;8;6" dur="0.25s" repeatCount="indefinite" />
      </ellipse>
    </g>

    {/* Lighter lid (open) */}
    <rect x="14" y="48" width="32" height="8" rx="2" fill="url(#lighterLid)" stroke="#555" strokeWidth="0.5" />
    <rect x="18" y="44" width="24" height="6" rx="1" fill="#888" stroke="#666" strokeWidth="0.5" />

    {/* Lighter body */}
    <rect x="12" y="56" width="36" height="72" rx="4" fill="url(#lighterBody)" stroke="#666" strokeWidth="1" />
    {/* Body highlight line */}
    <rect x="26" y="58" width="2" height="68" rx="1" fill="rgba(255,255,255,0.3)" />
    {/* Body shadow line */}
    <rect x="16" y="58" width="1" height="68" rx="0.5" fill="rgba(0,0,0,0.15)" />
    {/* Hinge detail */}
    <circle cx="30" cy="56" r="3" fill="#999" stroke="#777" strokeWidth="0.5" />
    <circle cx="30" cy="56" r="1.5" fill="#bbb" />
    {/* Bottom seam */}
    <line x1="14" y1="118" x2="46" y2="118" stroke="#888" strokeWidth="0.5" />
    {/* Bottom cap */}
    <rect x="12" y="120" width="36" height="8" rx="3" fill="#777" stroke="#666" strokeWidth="0.5" />
  </svg>
);

// Caesar cipher decoder — pure function, no state dependency
const decodeCaesar = (text: string, shift: number) => {
  return text
    .split('')
    .map((char) => {
      if (char.match(/[A-Z]/)) {
        return String.fromCharCode(
          ((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65
        );
      } else if (char.match(/[a-z]/)) {
        return String.fromCharCode(
          ((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97
        );
      }
      return char;
    })
    .join('');
};

// Get alphabet mapping for cipher display — pure function
const getAlphabetMapping = (shift: number) => {
  const original = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const shifted = original
    .split('')
    .map((_, i) => String.fromCharCode(((i - shift + 26) % 26) + 65))
    .join('');
  return { original, shifted };
};

// Progress indicator component
const PhaseProgress = ({
  phase,
  isCipherSolved,
  isTriviaSolved,
  isSafeSolved,
}: {
  phase: GamePhase;
  isCipherSolved: boolean;
  isTriviaSolved: boolean;
  isSafeSolved: boolean;
}) => {
  const phases = ['cipher', 'trivia', 'safe'];
  const currentPhaseIndex = phases.indexOf(phase as string);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
      {phases.map((phaseName, index) => {
        let status: 'completed' | 'current' | 'pending' = 'pending';
        if (
          (index === 0 && isCipherSolved) ||
          (index === 1 && isTriviaSolved) ||
          (index === 2 && isSafeSolved)
        ) {
          status = 'completed';
        } else if (index === currentPhaseIndex) {
          status = 'current';
        }

        return (
          <Box key={phaseName} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                border: `2px solid ${
                  status === 'completed'
                    ? colors.neon
                    : status === 'current'
                      ? colors.primary
                      : colors.textSecondary
                }`,
                backgroundColor:
                  status === 'completed'
                    ? `${colors.neon}22`
                    : status === 'current'
                      ? `${colors.primary}22`
                      : 'transparent',
                color:
                  status === 'completed'
                    ? colors.neon
                    : status === 'current'
                      ? colors.primary
                      : colors.textSecondary,
              }}
            >
              {status === 'completed' ? (
                <CheckCircle sx={{ fontSize: 20 }} />
              ) : (
                index + 1
              )}
            </Box>
            {index < phases.length - 1 && (
              <Box
                sx={{
                  width: 60,
                  height: 2,
                  mx: 1,
                  backgroundColor:
                    (index === 0 && isCipherSolved) ||
                    (index === 1 && isTriviaSolved)
                      ? colors.neon
                      : colors.textSecondary,
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

const ScanlineOverlay = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 1,
      background: `
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          ${colors.secondary}08 2px,
          ${colors.secondary}08 4px
        )
      `,
      animation: 'scanlines 20s linear infinite',
      '@keyframes scanlines': {
        '0%': { transform: 'translateY(-100%)' },
        '100%': { transform: 'translateY(100vh)' },
      },
    }}
  />
);

const ClassifiedStamp = ({
  text,
  rotation,
  isMobile,
}: {
  text: string;
  rotation: number;
  isMobile: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.15, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    style={{
      transform: `rotate(${rotation}deg)`,
      fontFamily: 'monospace',
      fontSize: isMobile ? '1.5rem' : '3rem',
      fontWeight: 'bold',
      color: '#ff0000',
      border: '4px solid #ff0000',
      padding: isMobile ? '12px 16px' : '20px 30px',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 0, 0, 0.05)',
      pointerEvents: 'none' as const,
      userSelect: 'none' as const,
      whiteSpace: 'nowrap' as const,
    }}
  >
    {text}
  </motion.div>
);

export default function ContactPageContent() {
  const [phase, setPhase] = useState<GamePhase>('entry');
  const [cipherShift, setCipherShift] = useState(0);
  const [triviaAnswers, setTriviaAnswers] = useState<number[]>([]);
  const [triviaProgress, setTriviaProgress] = useState(0);
  const [safeCombo, setSafeCombo] = useState([0, 0, 0, 0]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [showAcceptButton, setShowAcceptButton] = useState(false);
  const [wrongTriviAnswers, setWrongTriviAnswers] = useState<{
    [key: string]: boolean;
  }>({});
  const [safeAttempts, setSafeAttempts] = useState(0);
  const [typewriterLines, setTypewriterLines] = useState<string[]>([]);
  const [currentTypingLine, setCurrentTypingLine] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const [burnProgress, setBurnProgress] = useState(0);
  const [isBurned, setIsBurned] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [showLighter, setShowLighter] = useState(true);
  const [disarmed, setDisarmed] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Entry screen timing effects
  useEffect(() => {
    if (phase === 'entry') {
      const acceptTimer = setTimeout(() => setShowAcceptButton(true), 2000); // Reduced from 3s to 2s
      const skipTimer = setTimeout(() => setShowSkipButton(true), 2500); // Reduced from 4s to 2.5s
      return () => {
        clearTimeout(acceptTimer);
        clearTimeout(skipTimer);
      };
    }
  }, [phase]);

  useTypewriter('OPERATION: CONTACT MORGIE', 80, phase, setTypewriterText);

  // Typewriter effect for dossier
  useEffect(() => {
    if (phase === 'dossier') {
      setTypewriterLines([]);
      setCurrentTypingLine(0);
      setShowSparkles(true);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'dossier' && currentTypingLine < dossierContent.length) {
      const timer = setTimeout(
        () => {
          setTypewriterLines((prev) => [
            ...prev,
            dossierContent[currentTypingLine],
          ]);
          setCurrentTypingLine((prev) => prev + 1);
        },
        currentTypingLine === 0 ? 500 : 300
      );
      return () => clearTimeout(timer);
    }
  }, [phase, currentTypingLine]);

  // Self-destruct countdown effect for earned dossier (30 seconds)
  // First 15s: lighter creeps closer, no burn yet
  // Last 15s: actual burning
  useEffect(() => {
    if (phase === 'dossier' && !disarmed) {
      setShowLighter(true);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsBurned(true);
            return 0;
          }
          // At 15s remaining, lighter touches paper and burning begins
          if (prev <= 16) {
            setShowLighter(false);
            setBurnProgress((p) => Math.min(p + 100 / 15, 100));
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase, disarmed]);

  const currentDecodedText = decodeCaesar(cipherText, cipherShift);
  const alphabetMapping = getAlphabetMapping(cipherShift);

  // Handle trivia answers with shake animation
  const handleTriviaAnswer = useCallback((questionIndex: number, answerIndex: number) => {
    const isCorrect = answerIndex === triviaQuestions[questionIndex].correct;

    if (!isCorrect) {
      // Flash wrong answer red and shake
      setWrongTriviAnswers((prev) => ({
        ...prev,
        [`${questionIndex}_${answerIndex}`]: true,
      }));
      setTimeout(() => {
        setWrongTriviAnswers((prev) => ({
          ...prev,
          [`${questionIndex}_${answerIndex}`]: false,
        }));
      }, 1000);
      return;
    }

    const newAnswers = [...triviaAnswers];
    newAnswers[questionIndex] = answerIndex;
    setTriviaAnswers(newAnswers);

    const correctAnswers = newAnswers.filter(
      (answer, index) => answer === triviaQuestions[index].correct
    ).length;
    setTriviaProgress(correctAnswers);
  }, [triviaAnswers]);

  // Handle safe combination
  const handleSafeDial = useCallback((dialIndex: number, direction: 'up' | 'down') => {
    const newCombo = [...safeCombo];
    if (direction === 'up') {
      newCombo[dialIndex] = (newCombo[dialIndex] + 1) % 10;
    } else {
      newCombo[dialIndex] = (newCombo[dialIndex] - 1 + 10) % 10;
    }
    setSafeCombo(newCombo);

    // Check if solved
    if (newCombo.join('') === '1000') {
      setSafeAttempts(0);
    } else {
      setSafeAttempts((prev) => prev + 1);
    }
  }, [safeCombo]);

  // Reset all state
  const resetState = useCallback(() => {
    setCipherShift(0);
    setTriviaAnswers([]);
    setTriviaProgress(0);
    setSafeCombo([0, 0, 0, 0]);
    setShowConfetti(false);
    setTypewriterText('');
    setShowSkipButton(false);
    setShowAcceptButton(false);
    setWrongTriviAnswers({});
    setSafeAttempts(0);
    setTypewriterLines([]);
    setCurrentTypingLine(0);
    setShowSparkles(false);
    setBurnProgress(0);
    setIsBurned(false);
    setCountdown(30);
    setShowLighter(true);
    setDisarmed(false);
  }, []);

  // Clear confetti after animation completes
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const isCipherSolved = currentDecodedText === cipherSolution;
  const isTriviaSolved = triviaProgress === 3;
  const isSafeSolved = safeCombo.join('') === '1000';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: colors.background,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <ScanlineOverlay />

      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 2 }}>
        <AnimatePresence mode="wait">
          {/* Entry Screen */}
          {phase === 'entry' && (
            <motion.div
              key="entry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '80vh',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                {/* Background Classified Stamps */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: '5%', md: '10%' },
                    left: { xs: '5%', md: '8%' },
                  }}
                >
                  <ClassifiedStamp text="TOP SECRET" rotation={-15} isMobile={isMobile} />
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: { xs: '10%', md: '15%' },
                    right: { xs: '5%', md: '8%' },
                  }}
                >
                  <ClassifiedStamp text="CLASSIFIED" rotation={12} isMobile={isMobile} />
                </Box>

                {/* Main Title */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '4rem' },
                      fontWeight: 900,
                      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontFamily: 'monospace',
                      letterSpacing: '2px',
                      mb: 3,
                      textShadow: '0 0 30px rgba(255, 105, 180, 0.5)',
                    }}
                  >
                    {typewriterText}
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2, duration: 0.8 }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: colors.textSecondary,
                      mb: 6,
                      maxWidth: '600px',
                      fontFamily: 'monospace',
                    }}
                  >
                    This dossier is classified. Complete the mission to access
                    Agent Morgie's secure channels.
                  </Typography>
                </motion.div>

                <AnimatePresence>
                  {showAcceptButton && (
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -30, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => {
                          resetState();
                          setPhase('cipher');
                        }}
                        sx={{
                          fontSize: '1.2rem',
                          px: 6,
                          py: 3,
                          mb: 4,
                          background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                          boxShadow: `0 0 30px ${colors.primary}66`,
                          animation: 'pulse 2s infinite',
                          '@keyframes pulse': {
                            '0%': { boxShadow: `0 0 30px ${colors.primary}66` },
                            '50%': {
                              boxShadow: `0 0 50px ${colors.primary}99`,
                            },
                            '100%': {
                              boxShadow: `0 0 30px ${colors.primary}66`,
                            },
                          },
                        }}
                      >
                        ACCEPT MISSION
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {showSkipButton && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Button
                        variant="text"
                        onClick={() => {
                          resetState();
                          setPhase('skip-dossier');
                        }}
                        sx={{
                          color: colors.textSecondary,
                          textDecoration: 'underline',
                          '&:hover': {
                            color: colors.secondary,
                          },
                        }}
                      >
                        Skip the Mission →
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </motion.div>
          )}

          {/* Cipher Puzzle */}
          {phase === 'cipher' && (
            <motion.div
              key="cipher"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <PhaseProgress phase={phase} isCipherSolved={isCipherSolved} isTriviaSolved={isTriviaSolved} isSafeSolved={isSafeSolved} />
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{ color: colors.primary, mb: 2, fontFamily: 'monospace' }}
                >
                  PHASE 1: DECODE THE CIPHER
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: colors.textSecondary, mb: 4 }}
                >
                  A classic Caesar cipher with an unknown shift. Try rotating
                  the alphabet...
                </Typography>

                <Card sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
                  <CardContent>
                    {/* Alphabet Mapping Display */}
                    <Box
                      sx={{
                        mb: 4,
                        p: 2,
                        backgroundColor: `${colors.surface}66`,
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.textSecondary,
                          mb: 1,
                          fontFamily: 'monospace',
                        }}
                      >
                        Original: {alphabetMapping.original}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: colors.primary, fontFamily: 'monospace' }}
                      >
                        Rotated: {alphabetMapping.shifted}
                      </Typography>
                    </Box>

                    {/* Rotation Slider */}
                    <Box sx={{ mb: 4 }}>
                      <Typography
                        sx={{
                          mb: 2,
                          fontFamily: 'monospace',
                          color: colors.primary,
                        }}
                      >
                        ROTATION: {cipherShift}
                      </Typography>
                      <Slider
                        value={cipherShift}
                        onChange={(_, value) => setCipherShift(value as number)}
                        min={0}
                        max={25}
                        marks
                        step={1}
                        sx={{
                          maxWidth: 400,
                          mx: 'auto',
                          '& .MuiSlider-thumb': {
                            backgroundColor: colors.primary,
                            width: 24,
                            height: 24,
                            '&:hover, &.Mui-focusVisible': {
                              boxShadow: `0 0 0 8px ${colors.primary}32`,
                            },
                          },
                          '& .MuiSlider-track': {
                            backgroundColor: colors.primary,
                          },
                          '& .MuiSlider-rail': {
                            backgroundColor: colors.textSecondary,
                          },
                          '& .MuiSlider-mark': {
                            backgroundColor: colors.textSecondary,
                          },
                          '& .MuiSlider-markActive': {
                            backgroundColor: colors.primary,
                          },
                        }}
                      />
                    </Box>

                    {/* Encoded Text */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: 'monospace',
                        mb: 2,
                        color: colors.textSecondary,
                      }}
                    >
                      Encrypted: {cipherText}
                    </Typography>

                    {/* Decoded Text */}
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: 'monospace',
                        color: isCipherSolved ? colors.neon : colors.text,
                        fontWeight: isCipherSolved ? 'bold' : 'normal',
                        transition: 'all 0.3s',
                      }}
                    >
                      Decoded: {currentDecodedText}
                    </Typography>

                    {isCipherSolved && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Box
                          sx={{
                            mt: 4,
                            p: 3,
                            backgroundColor: `${colors.neon}22`,
                            borderRadius: 2,
                          }}
                        >
                          <CheckCircle
                            sx={{
                              color: colors.neon,
                              mr: 1,
                              verticalAlign: 'middle',
                            }}
                          />
                          <Typography
                            variant="h6"
                            sx={{ color: colors.neon, fontFamily: 'monospace' }}
                          >
                            PHASE 1 COMPLETE
                          </Typography>
                          <Typography sx={{ mt: 2, color: colors.text }}>
                            <strong>Contact Unlocked:</strong>{' '}
                            morgie@agentmorgie.com
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={() => setPhase('trivia')}
                            sx={{
                              mt: 3,
                              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                            }}
                          >
                            PROCEED TO PHASE 2
                          </Button>
                        </Box>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </Box>
            </motion.div>
          )}

          {/* Trivia Puzzle */}
          {phase === 'trivia' && (
            <motion.div
              key="trivia"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <PhaseProgress phase={phase} isCipherSolved={isCipherSolved} isTriviaSolved={isTriviaSolved} isSafeSolved={isSafeSolved} />
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{ color: colors.primary, mb: 2, fontFamily: 'monospace' }}
                >
                  PHASE 2: AGENT TRIVIA
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: colors.textSecondary, mb: 4 }}
                >
                  Prove your knowledge of Agent Morgie
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={(triviaProgress / 3) * 100}
                  sx={{
                    maxWidth: 400,
                    mx: 'auto',
                    mb: 4,
                    height: 10,
                    borderRadius: 5,
                    '& .MuiLinearProgress-bar': {
                      background: `linear-gradient(90deg, ${colors.primary}, ${colors.neon})`,
                    },
                  }}
                />

                <Grid container spacing={3}>
                  {triviaQuestions.map((q, qIndex) => (
                    <Grid size={{ xs: 12, md: 4 }} key={qIndex}>
                      <Card sx={{ height: '100%' }}>
                        <CardContent>
                          <Typography
                            variant="h6"
                            sx={{ mb: 3, color: colors.primary }}
                          >
                            {q.question}
                          </Typography>
                          {q.options.map((option, oIndex) => {
                            const isSelected = triviaAnswers[qIndex] === oIndex;
                            const isCorrect = oIndex === q.correct;
                            const isWrong =
                              wrongTriviAnswers[`${qIndex}_${oIndex}`];
                            const hasAnswered =
                              triviaAnswers[qIndex] !== undefined;

                            return (
                              <motion.div
                                key={oIndex}
                                animate={
                                  isWrong
                                    ? {
                                        x: [-10, 10, -10, 10, 0],
                                        transition: { duration: 0.5 },
                                      }
                                    : {}
                                }
                              >
                                <Button
                                  variant={
                                    isSelected ? 'contained' : 'outlined'
                                  }
                                  fullWidth
                                  disabled={hasAnswered && !isSelected}
                                  sx={{
                                    mb: 1,
                                    justifyContent: 'flex-start',
                                    backgroundColor: isWrong
                                      ? '#ff444466'
                                      : isSelected
                                        ? isCorrect
                                          ? `${colors.neon}33`
                                          : `${colors.primary}33`
                                        : 'transparent',
                                    borderColor: isWrong
                                      ? '#ff4444'
                                      : isSelected
                                        ? isCorrect
                                          ? colors.neon
                                          : colors.primary
                                        : colors.textSecondary,
                                    color: isWrong ? '#ff4444' : colors.text,
                                    '&:hover': {
                                      backgroundColor:
                                        !hasAnswered || isSelected
                                          ? undefined
                                          : 'rgba(255, 255, 255, 0.08)',
                                    },
                                  }}
                                  onClick={() =>
                                    handleTriviaAnswer(qIndex, oIndex)
                                  }
                                >
                                  {option}
                                  {isSelected && isCorrect && (
                                    <CheckCircle
                                      sx={{ ml: 'auto', color: colors.neon }}
                                    />
                                  )}
                                </Button>
                              </motion.div>
                            );
                          })}

                          {triviaAnswers[qIndex] !== undefined &&
                            triviaAnswers[qIndex] !== q.correct && (
                              <Typography
                                sx={{
                                  mt: 2,
                                  color: colors.accent,
                                  fontFamily: 'monospace',
                                }}
                              >
                                NICE TRY, RECRUIT
                              </Typography>
                            )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {isTriviaSolved && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card sx={{ mt: 4, maxWidth: 600, mx: 'auto' }}>
                      <CardContent>
                        <CheckCircle
                          sx={{
                            color: colors.neon,
                            mr: 1,
                            verticalAlign: 'middle',
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{ color: colors.neon, fontFamily: 'monospace' }}
                        >
                          PHASE 2 COMPLETE
                        </Typography>
                        <Typography sx={{ mt: 2, color: colors.text }}>
                          <strong>Secure Mail Drop:</strong> 5651 Coventry Lane
                          #109, Fort Wayne, IN 46804
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => setPhase('safe')}
                          sx={{
                            mt: 3,
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                          }}
                        >
                          PROCEED TO PHASE 3
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </Box>
            </motion.div>
          )}

          {/* Safe Puzzle */}
          {phase === 'safe' && (
            <motion.div
              key="safe"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <PhaseProgress phase={phase} isCipherSolved={isCipherSolved} isTriviaSolved={isTriviaSolved} isSafeSolved={isSafeSolved} />
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{ color: colors.primary, mb: 2, fontFamily: 'monospace' }}
                >
                  PHASE 3: CRACK THE SAFE
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: colors.textSecondary, mb: 2 }}
                >
                  Think @AgentMorgan1000... what are those last digits?
                </Typography>

                {safeAttempts >= 3 && !isSafeSolved && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: colors.secondary, mb: 2 }}
                    >
                      Need another hint? Check out{' '}
                      <MuiLink
                        href="https://www.youtube.com/@AgentMorgan1000"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: colors.neon }}
                      >
                        Agent Morgan's YouTube channel
                      </MuiLink>
                    </Typography>
                  </motion.div>
                )}

                <Card sx={{ maxWidth: 500, mx: 'auto', mb: 4 }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ mb: 4, fontFamily: 'monospace' }}
                    >
                      Combination Lock
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 3,
                        mb: 4,
                      }}
                    >
                      {safeCombo.map((digit, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <IconButton
                            onClick={() => handleSafeDial(index, 'up')}
                            aria-label={`Increase digit ${index + 1}`}
                            sx={{ color: colors.secondary, mb: 1 }}
                          >
                            <ArrowUpward />
                          </IconButton>

                          <Box
                            role="spinbutton"
                            aria-valuenow={digit}
                            aria-valuemin={0}
                            aria-valuemax={9}
                            sx={{
                              width: { xs: 60, md: 80 }, // Reduced size on mobile
                              height: { xs: 60, md: 80 },
                              borderRadius: '50%',
                              border: `4px solid ${colors.primary}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontFamily: 'monospace',
                              fontSize: '2rem',
                              fontWeight: 'bold',
                              color: colors.primary,
                              background: `radial-gradient(circle, ${colors.surface}, ${colors.background})`,
                            }}
                          >
                            {digit}
                          </Box>

                          <IconButton
                            onClick={() => handleSafeDial(index, 'down')}
                            aria-label={`Decrease digit ${index + 1}`}
                            sx={{ color: colors.secondary, mt: 1 }}
                          >
                            <ArrowDownward />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>

                    {isSafeSolved && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        onAnimationComplete={() => {
                          setShowConfetti(true);
                          setTimeout(() => setPhase('dossier'), 1000);
                        }}
                      >
                        <Box
                          sx={{
                            p: 3,
                            backgroundColor: `${colors.neon}22`,
                            borderRadius: 2,
                          }}
                        >
                          <CheckCircle
                            sx={{
                              color: colors.neon,
                              mr: 1,
                              verticalAlign: 'middle',
                            }}
                          />
                          <Typography
                            variant="h6"
                            sx={{ color: colors.neon, fontFamily: 'monospace' }}
                          >
                            SAFE CRACKED! DOSSIER UNLOCKED!
                          </Typography>
                        </Box>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </Box>
            </motion.div>
          )}

          {/* Final Dossier or Skip Dossier */}
          {(phase === 'dossier' || phase === 'skip-dossier') && (
            <motion.div
              key="dossier"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ position: 'relative', textAlign: 'center' }}>
                {phase === 'dossier' && !isBurned && (
                  <motion.div
                    initial={{ opacity: 0, rotate: -45, scale: 0 }}
                    animate={{ opacity: 0.8, rotate: -12, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      zIndex: 1,
                      fontFamily: 'monospace',
                      fontSize: isMobile ? '1.5rem' : '2rem',
                      fontWeight: 'bold',
                      color: '#ff0000',
                      border: '4px solid #ff0000',
                      padding: isMobile ? '10px' : '20px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    }}
                  >
                    DECLASSIFIED
                  </motion.div>
                )}

                {!isBurned ? (
                  <Card
                    sx={{
                      maxWidth: 700,
                      mx: 'auto',
                      backgroundColor:
                        phase === 'dossier'
                          ? `rgb(${245 - burnProgress * 1.5}, ${240 - burnProgress * 1.8}, ${225 - burnProgress * 2})`
                          : '#F5F0E1',
                      color:
                        phase === 'dossier'
                          ? `rgba(51, 51, 51, ${1 - burnProgress * 0.007})`
                          : '#333',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: phase === 'dossier' ? 'all 1s ease' : 'none',
                      boxShadow:
                        phase === 'dossier'
                          ? `inset 0 0 ${burnProgress * 2}px ${burnProgress * 0.5}px rgba(139, 69, 19, ${burnProgress / 100}), 
                         inset ${burnProgress * 0.5}px ${burnProgress * 0.5}px ${burnProgress * 1.5}px rgba(0, 0, 0, ${burnProgress / 200}),
                         inset -${burnProgress * 0.5}px -${burnProgress * 0.5}px ${burnProgress * 1.5}px rgba(0, 0, 0, ${burnProgress / 200})`
                          : 'none',
                      animation:
                        phase === 'dossier' && burnProgress > 60
                          ? 'flicker 0.3s infinite alternate'
                          : 'none',
                      '@keyframes flicker': {
                        '0%': { opacity: 0.8 },
                        '100%': { opacity: 1 },
                      },
                      '@keyframes shimmer': {
                        '0%': { transform: 'translateY(0px) scaleY(1)' },
                        '50%': { transform: 'translateY(-2px) scaleY(1.02)' },
                        '100%': { transform: 'translateY(0px) scaleY(1)' },
                      },
                      ...(phase === 'dossier' &&
                        burnProgress > 45 && {
                          animation:
                            'flicker 0.3s infinite alternate, shimmer 1s infinite ease-in-out',
                        }),
                    }}
                  >
                    {/* Countdown Timer */}
                    {phase === 'dossier' && !isBurned && !disarmed && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          zIndex: 10,
                          fontFamily: 'monospace',
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          color: countdown <= 15 ? '#ff0000' : '#d32f2f',
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          border: `2px solid ${countdown <= 15 ? '#ff0000' : '#d32f2f'}`,
                          animation:
                            countdown <= 15
                              ? 'urgentPulse 0.5s infinite alternate'
                              : countdown <= 30
                                ? 'countdownPulse 1s infinite'
                                : 'none',
                          '@keyframes urgentPulse': {
                            '0%': { boxShadow: '0 0 5px #ff0000' },
                            '100%': { boxShadow: '0 0 20px #ff0000' },
                          },
                          '@keyframes countdownPulse': {
                            '0%': { opacity: 1 },
                            '100%': { opacity: 0.7 },
                          },
                        }}
                      >
                        SELF-DESTRUCT: {countdown}s
                        <Button
                          size="small"
                          onClick={() => {
                            setDisarmed(true);
                            setBurnProgress(0);
                            setShowLighter(false);
                          }}
                          sx={{
                            ml: 1,
                            minWidth: 'auto',
                            px: 1,
                            py: 0,
                            fontSize: '0.7rem',
                            color: '#4caf50',
                            border: '1px solid #4caf50',
                            '&:hover': {
                              backgroundColor: '#4caf5022',
                              border: '1px solid #4caf50',
                            },
                          }}
                        >
                          DISARM
                        </Button>
                      </Box>
                    )}

                    {/* Lighter creeping toward document (first 15 seconds) */}
                    {phase === 'dossier' && showLighter && countdown > 15 && !isBurned && !disarmed && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: -20,
                          zIndex: 20,
                          pointerEvents: 'none',
                          animation: 'lighterCreep 15s ease-in forwards',
                          '@keyframes lighterCreep': {
                            '0%': { left: '-80px', transform: 'rotate(-12deg)' },
                            '60%': { left: '15%', transform: 'rotate(-5deg)' },
                            '100%': { left: '35%', transform: 'rotate(0deg)' },
                          },
                        }}
                      >
                        <AnimatedLighter />
                      </Box>
                    )}
                    {/* Paper texture overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `
                        radial-gradient(circle at 25px 25px, #ccc 1px, transparent 1px),
                        radial-gradient(circle at 75px 75px, #ccc 1px, transparent 1px)
                      `,
                        backgroundSize: '100px 100px',
                        opacity: 0.3,
                      }}
                    />

                    {/* Sparkle effect for successful completion */}
                    {phase === 'dossier' && showSparkles && !isBurned && (
                      <Box sx={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                        <SparkleEffect />
                      </Box>
                    )}

                    <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
                      <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Box sx={{ textAlign: 'left' }}>
                            {(phase === 'skip-dossier'
                              ? dossierContent
                              : typewriterLines
                            )
                              .slice(0, 8)
                              .map((line, index) => (
                                <motion.div
                                  key={index}
                                  initial={
                                    phase === 'dossier'
                                      ? { opacity: 0, y: 20 }
                                      : false
                                  }
                                  animate={
                                    phase === 'dossier'
                                      ? { opacity: 1, y: 0 }
                                      : false
                                  }
                                  transition={
                                    phase === 'dossier'
                                      ? { delay: index * 0.1 }
                                      : undefined
                                  }
                                >
                                  {index === 0 && (
                                    <Typography
                                      variant="h4"
                                      sx={{
                                        fontFamily: 'monospace',
                                        textAlign: 'center',
                                        mb: 4,
                                        color: '#d32f2f',
                                        fontWeight: 'bold',
                                        textDecoration: 'underline',
                                      }}
                                    >
                                      {line}
                                    </Typography>
                                  )}
                                  {index === 1 && (
                                    <>
                                      <Typography
                                        variant="h6"
                                        sx={{
                                          fontFamily: 'monospace',
                                          mb: 1,
                                          color: '#d32f2f',
                                        }}
                                      >
                                        CODE NAME:
                                      </Typography>
                                      <Typography
                                        sx={{ mb: 3, fontSize: '1.1rem' }}
                                      >
                                        Agent Morgie
                                      </Typography>
                                    </>
                                  )}
                                  {index === 2 && (
                                    <>
                                      <Typography
                                        variant="h6"
                                        sx={{
                                          fontFamily: 'monospace',
                                          mb: 1,
                                          color: '#d32f2f',
                                        }}
                                      >
                                        STATUS:
                                      </Typography>
                                      <Typography
                                        sx={{
                                          mb: 3,
                                          fontSize: '1.1rem',
                                          color: '#2e7d32',
                                        }}
                                      >
                                        ACTIVE
                                      </Typography>
                                    </>
                                  )}
                                  {index === 3 && (
                                    <>
                                      <Typography
                                        variant="h6"
                                        sx={{
                                          fontFamily: 'monospace',
                                          mb: 1,
                                          color: '#d32f2f',
                                        }}
                                      >
                                        PRIMARY COMMS:
                                      </Typography>
                                      <MuiLink
                                        href="mailto:morgie@agentmorgie.com"
                                        sx={{
                                          mb: 3,
                                          fontSize: '1.1rem',
                                          color: '#1976d2',
                                          display: 'flex',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <Email sx={{ mr: 1 }} />{' '}
                                        morgie@agentmorgie.com
                                      </MuiLink>
                                    </>
                                  )}
                                  {index === 4 && (
                                    <Typography
                                      variant="h6"
                                      sx={{
                                        fontFamily: 'monospace',
                                        mb: 1,
                                        color: '#d32f2f',
                                      }}
                                    >
                                      ALTERNATIVE SECURE CHANNELS:
                                    </Typography>
                                  )}
                                  {index >= 5 && index <= 7 && (
                                    <MuiLink
                                      href={`mailto:${line}`}
                                      sx={{
                                        mb: 1,
                                        fontSize: '0.95rem',
                                        color: '#1976d2',
                                        display: 'block',
                                      }}
                                    >
                                      {line}
                                    </MuiLink>
                                  )}
                                </motion.div>
                              ))}
                          </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                          <Box sx={{ textAlign: 'left' }}>
                            {(phase === 'skip-dossier'
                              ? dossierContent
                              : typewriterLines
                            )
                              .slice(8)
                              .map((line, index) => (
                                <motion.div
                                  key={index + 8}
                                  initial={
                                    phase === 'dossier'
                                      ? { opacity: 0, y: 20 }
                                      : false
                                  }
                                  animate={
                                    phase === 'dossier'
                                      ? { opacity: 1, y: 0 }
                                      : false
                                  }
                                  transition={
                                    phase === 'dossier'
                                      ? { delay: (index + 8) * 0.1 }
                                      : undefined
                                  }
                                >
                                  {index === 0 && (
                                    <Typography
                                      variant="h6"
                                      sx={{
                                        fontFamily: 'monospace',
                                        mb: 1,
                                        color: '#d32f2f',
                                      }}
                                    >
                                      SECURE MAIL DROP:
                                    </Typography>
                                  )}
                                  {index >= 1 && index <= 2 && (
                                    <Typography
                                      sx={{
                                        mb: index === 2 ? 3 : 1,
                                        fontSize: '1.1rem',
                                      }}
                                    >
                                      {line}
                                    </Typography>
                                  )}
                                  {index === 3 && (
                                    <Typography
                                      variant="h6"
                                      sx={{
                                        fontFamily: 'monospace',
                                        mb: 2,
                                        color: '#d32f2f',
                                      }}
                                    >
                                      SOCIAL NETWORK COVERS:
                                    </Typography>
                                  )}
                                  {index === 4 && (
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                      }}
                                    >
                                      <MuiLink
                                        href="https://www.tiktok.com/@realfeelpurpose"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          color: '#1976d2',
                                        }}
                                      >
                                        <TikTokIcon size={20} />{' '}
                                        <Box sx={{ ml: 1 }}>TikTok</Box>
                                      </MuiLink>
                                      <MuiLink
                                        href="https://www.youtube.com/@AgentMorgan1000"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          color: '#1976d2',
                                        }}
                                      >
                                        <YouTubeIcon size={20} />{' '}
                                        <Box sx={{ ml: 1 }}>YouTube</Box>
                                      </MuiLink>
                                      <MuiLink
                                        href="https://www.instagram.com/AgentMorgie"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          color: '#1976d2',
                                        }}
                                      >
                                        <InstagramIcon size={20} />{' '}
                                        <Box sx={{ ml: 1 }}>Instagram</Box>
                                      </MuiLink>
                                      <MuiLink
                                        href="https://www.amazon.com/hz/wishlist/ls/98CRSAC721IV?ref_=wl_share"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          color: '#1976d2',
                                        }}
                                      >
                                        <AmazonIcon size={20} />{' '}
                                        <Box sx={{ ml: 1 }}>Amazon Wishlist</Box>
                                      </MuiLink>
                                    </Box>
                                  )}
                                </motion.div>
                              ))}
                          </Box>
                        </Grid>
                      </Grid>

                      {/* Burn After Reading Watermark */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: { xs: '10px', md: '20px' },
                          right: { xs: '10px', md: '20px' },
                          opacity:
                            phase === 'dossier'
                              ? Math.max(0.3, 0.3 + burnProgress / 300)
                              : 0.3,
                          fontFamily: 'monospace',
                          fontSize: { xs: '0.9rem', md: '1.2rem' },
                          fontWeight: 'bold',
                          color:
                            phase === 'dossier' && burnProgress > 0
                              ? '#ff0000'
                              : '#d32f2f',
                          border:
                            phase === 'dossier' && burnProgress > 0
                              ? '2px solid #ff0000'
                              : '2px solid #d32f2f',
                          padding: { xs: '5px 10px', md: '10px 20px' },
                          borderRadius: '4px',
                          transform: 'rotate(-5deg)',
                          boxShadow:
                            phase === 'dossier' && burnProgress > 0
                              ? `0 0 ${burnProgress / 5}px #ff0000`
                              : 'none',
                          animation:
                            phase === 'dossier' && burnProgress > 0
                              ? 'burnPulse 1s infinite alternate'
                              : 'none',
                          '@keyframes burnPulse': {
                            '0%': {
                              textShadow: '0 0 5px #ff0000',
                            },
                            '100%': {
                              textShadow: '0 0 15px #ff0000, 0 0 25px #ff0000',
                            },
                          },
                        }}
                      >
                        BURN AFTER READING
                      </Box>
                    </CardContent>
                  </Card>
                ) : (
                  /* Burned Aftermath Screen */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  >
                    <Card
                      sx={{
                        maxWidth: 700,
                        mx: 'auto',
                        backgroundColor: '#1a1a1a',
                        color: '#fff',
                        position: 'relative',
                        overflow: 'hidden',
                        minHeight: 400,
                        background:
                          'radial-gradient(ellipse at center, #2a2a2a 0%, #1a1a1a 70%, #0d0d0d 100%)',
                      }}
                    >
                      <CardContent
                        sx={{
                          p: 4,
                          position: 'relative',
                          zIndex: 2,
                          textAlign: 'center',
                        }}
                      >
                        {/* Floating Embers */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            pointerEvents: 'none',
                            '&::before, &::after': {
                              content: '""',
                              position: 'absolute',
                              width: '4px',
                              height: '4px',
                              backgroundColor: '#ff6600',
                              borderRadius: '50%',
                              animation: 'ember1 3s infinite ease-in-out',
                            },
                            '&::before': {
                              left: '20%',
                              animationDelay: '0s',
                            },
                            '&::after': {
                              right: '30%',
                              animationDelay: '1.5s',
                            },
                            '@keyframes ember1': {
                              '0%': {
                                bottom: '0px',
                                opacity: 1,
                                boxShadow: '0 0 10px #ff6600',
                              },
                              '50%': {
                                opacity: 0.7,
                                boxShadow: '0 0 5px #ff6600',
                              },
                              '100%': {
                                bottom: '400px',
                                opacity: 0,
                                boxShadow: '0 0 0px #ff6600',
                              },
                            },
                          }}
                        />

                        {/* Additional floating embers */}
                        {[...Array(6)].map((_, i) => (
                          <Box
                            key={i}
                            sx={{
                              position: 'absolute',
                              width: '3px',
                              height: '3px',
                              backgroundColor:
                                i % 2 === 0 ? '#ff4400' : '#ff6600',
                              borderRadius: '50%',
                              left: `${15 + i * 12}%`,
                              animation: `ember${i + 2} ${3 + i * 0.5}s infinite ease-in-out`,
                              animationDelay: `${i * 0.3}s`,
                              [`@keyframes ember${i + 2}`]: {
                                '0%': {
                                  bottom: '0px',
                                  opacity: 1,
                                  boxShadow: `0 0 8px ${i % 2 === 0 ? '#ff4400' : '#ff6600'}`,
                                },
                                '100%': {
                                  bottom: '350px',
                                  opacity: 0,
                                  transform: `translateX(${(i - 3) * 20}px)`,
                                },
                              },
                            }}
                          />
                        ))}

                        {/* Smoke wisps */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background:
                              'linear-gradient(to top, transparent 60%, rgba(100, 100, 100, 0.1) 80%, rgba(150, 150, 150, 0.05) 100%)',
                            animation: 'smoke 4s infinite ease-in-out',
                            '@keyframes smoke': {
                              '0%': {
                                transform: 'translateY(0px) scale(1)',
                                opacity: 0.1,
                              },
                              '50%': {
                                transform: 'translateY(-20px) scale(1.1)',
                                opacity: 0.05,
                              },
                              '100%': {
                                transform: 'translateY(-40px) scale(1.2)',
                                opacity: 0.02,
                              },
                            },
                          }}
                        />

                        {/* Ash pile silhouette */}
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 40,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 120,
                            height: 20,
                            background:
                              'linear-gradient(ellipse at center, #333 0%, #666 50%, transparent 100%)',
                            borderRadius: '50%',
                            opacity: 0.6,
                          }}
                        />

                        {/* Main destruction message */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1, duration: 2 }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              fontFamily: 'monospace',
                              color: '#ff0000',
                              mb: 3,
                              mt: 8,
                              textShadow: '0 0 10px #ff0000, 0 0 20px #ff0000',
                              animation: 'typewriter 2s steps(30, end) 1s both',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              borderRight: '3px solid #ff0000',
                              width: 'fit-content',
                              mx: 'auto',
                              '@keyframes typewriter': {
                                '0%': { width: 0 },
                                '99%': { borderRight: '3px solid #ff0000' },
                                '100%': {
                                  width: '100%',
                                  borderRight: 'none',
                                },
                              },
                            }}
                          >
                            This message has self-destructed.
                          </Typography>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 4, duration: 1 }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color: colors.secondary,
                              mb: 4,
                              fontFamily: 'monospace',
                            }}
                          >
                            Rookie mistake, Agent. 🕵️
                          </Typography>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 5, duration: 0.5 }}
                        >
                          <Button
                            variant="contained"
                            onClick={() => {
                              resetState();
                              setPhase('entry');
                            }}
                            sx={{
                              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                              fontSize: '1.1rem',
                              px: 4,
                              py: 2,
                              mb: 2,
                              boxShadow: `0 0 20px ${colors.primary}66`,
                            }}
                          >
                            REQUEST NEW DOSSIER
                          </Button>
                          <Typography
                            variant="body2"
                            sx={{
                              color: colors.textSecondary,
                              fontStyle: 'italic',
                              mt: 2,
                            }}
                          >
                            Pro tip: screenshot first next time
                          </Typography>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                <Button
                  variant="contained"
                  onClick={() => {
                    resetState();
                    setPhase('entry');
                  }}
                  sx={{
                    mt: 4,
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                    fontSize: '1.1rem',
                    px: 4,
                    py: 2,
                    display: isBurned ? 'none' : 'inline-flex',
                  }}
                >
                  {phase === 'dossier'
                    ? 'START NEW MISSION'
                    : 'TRY THE FULL MISSION'}
                </Button>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confetti Effect */}
        {showConfetti && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              zIndex: 9999,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                  radial-gradient(circle at 20% 80%, ${colors.primary} 2px, transparent 2px),
                  radial-gradient(circle at 80% 20%, ${colors.secondary} 2px, transparent 2px),
                  radial-gradient(circle at 40% 40%, ${colors.neon} 2px, transparent 2px),
                  radial-gradient(circle at 60% 80%, ${colors.accent} 2px, transparent 2px),
                  radial-gradient(circle at 80% 80%, ${colors.gold} 2px, transparent 2px)
                `,
                backgroundSize: '100px 100px',
                animation: 'confetti 3s ease-out forwards',
              },
              '@keyframes confetti': {
                '0%': { transform: 'translateY(-100%)', opacity: 1 },
                '100%': { transform: 'translateY(100vh)', opacity: 0 },
              },
            }}
          />
        )}
      </Container>
    </Box>
  );
}
