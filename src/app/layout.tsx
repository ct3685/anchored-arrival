import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/theme/theme';
import { AudioProvider } from '@/lib/AudioContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MiniPlayer from '@/components/MiniPlayer';
import SparkleEffect from '@/components/SparkleEffect';

const GA_MEASUREMENT_ID = 'G-2DE84Q17JH';

export const metadata: Metadata = {
  metadataBase: new URL('https://agentmorgie.com'),
  icons: {
    icon: '/images/mvp.png',
    apple: '/images/mvp.png'
  },
  title: 'Agent Morgie 00BA | Double O Badass',
  description:
    'Welcome to the world of Agent Morgie - TikTok Live Creator, Main Character Energy, Live... And Lethal!',
  keywords: ['Agent Morgie', 'TikTok', 'Live Creator', 'realfeelpurpose'],
  authors: [{ name: 'Agent Morgie' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Agent Morgie 00BA | Double O Badass',
    description: 'Welcome to the world of Agent Morgie - Main Character Energy!',
    url: '/',
    siteName: 'Agent Morgie 00BA',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Morgie 00BA',
    description: 'Double O Badass - Main Character Energy'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FF69B4'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': 'https://agentmorgie.com/#website',
                  'url': 'https://agentmorgie.com',
                  'name': 'Agent Morgie 00BA',
                  'description':
                    'Welcome to the world of Agent Morgie - TikTok Live Creator, Main Character Energy, Live... And Lethal!',
                  'inLanguage': 'en-US'
                },
                {
                  '@type': 'Person',
                  '@id': 'https://agentmorgie.com/#person',
                  'name': 'Agent Morgie',
                  'alternateName': 'Agent Morgie 00BA',
                  'description': 'TikTok Live Creator, Main Character Energy, Double O Badass',
                  'url': 'https://agentmorgie.com',
                  'image': 'https://agentmorgie.com/images/main-character.png',
                  'sameAs': ['https://www.tiktok.com/@realfeelpurpose']
                }
              ]
            })
          }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body style={{ margin: 0 }}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AudioProvider>
              {/* Global sparkle effects - z-index 10 to appear above page content but below navbar/player */}
              <div style={{ position: 'fixed', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
                <SparkleEffect />
              </div>
              <Navbar />
              <main style={{ minHeight: '100vh' }}>{children}</main>
              <Footer />
              <MiniPlayer />
            </AudioProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
