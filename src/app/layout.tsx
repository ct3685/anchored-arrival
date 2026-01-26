import type { Metadata, Viewport } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/theme/theme';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MiniPlayer from '@/components/MiniPlayer';
import SparkleEffect from '@/components/SparkleEffect';

export const metadata: Metadata = {
  metadataBase: new URL('https://agentmorgie.netlify.app'),
  icons: {
    icon: '/images/mvp.png',
    apple: '/images/mvp.png',
  },
  title: 'Agent Morgie 00BA | Double O Badass',
  description: 'Welcome to the world of Agent Morgie - TikTok Live Creator, Main Character Energy, Live... And Lethal!',
  keywords: ['Agent Morgie', 'TikTok', 'Live Creator', 'realfeelpurpose'],
  authors: [{ name: 'Agent Morgie' }],
  openGraph: {
    title: 'Agent Morgie 00BA | Double O Badass',
    description: 'Welcome to the world of Agent Morgie - Main Character Energy!',
    type: 'website',
    images: ['/images/live-and-lethal.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Morgie 00BA',
    description: 'Double O Badass - Main Character Energy',
    images: ['/images/live-and-lethal.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FF69B4',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Global sparkle effects */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
              <SparkleEffect />
            </div>
            <Navbar />
            <main style={{ minHeight: '100vh' }}>
              {children}
            </main>
            <Footer />
            <MiniPlayer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
