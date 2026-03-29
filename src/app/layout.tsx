import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Teko, Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/theme/theme';
import { AudioProvider } from '@/lib/AudioContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  SparkleEffectLazy,
  MiniPlayerLazy,
  InAppBrowserNoticeLazy,
} from '@/components/ClientShell';

const displayFont = Teko({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const GA_MEASUREMENT_ID = 'G-NPDJT8S6PC';

export const metadata: Metadata = {
  metadataBase: new URL('https://trevor-ranchsquad.netlify.app'),
  icons: {
    icon: '/images/trevor-profile.png',
    apple: '/images/trevor-profile.png',
  },
  title: 'Trevor | Ranch Squad',
  description:
    "Welcome to the Ranch Squad — Trevor's TikTok LIVE community. Country vibes, big energy, no power ups. Com'On in!",
  keywords: ['Trevor', 'Ranch Squad', 'TikTok', 'TikTok LIVE', 'LIVE Creator'],
  authors: [{ name: 'Trevor' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Trevor | Ranch Squad',
    description:
      "Welcome to the Ranch Squad — Trevor's TikTok LIVE community. Country vibes, big energy, no power ups.",
    url: '/',
    siteName: 'Ranch Squad',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trevor | Ranch Squad',
    description: 'TikTok LIVE Pro • Ranch Squad Commander • Gooder Than Shit',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F5A623',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  name: 'Ranch Squad',
                  description:
                    "Welcome to the Ranch Squad — Trevor's TikTok LIVE community. Country vibes, big energy, no power ups.",
                  inLanguage: 'en-US',
                },
                {
                  '@type': 'Person',
                  name: 'Trevor',
                  alternateName: 'Ranch Squad',
                  description:
                    'TikTok LIVE creator and commander of the Ranch Squad. Country vibes, big energy, gooder than shit.',
                },
              ],
            }),
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
      <body style={{ margin: 0, background: '#0D0A09' }}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AudioProvider>
              <InAppBrowserNoticeLazy />
              <SparkleEffectLazy />
              <Navbar />
              <main
                style={{
                  minHeight: '100vh',
                  position: 'relative',
                }}
              >
                {/* Dust grain overlay */}
                <div
                  style={{
                    position: 'fixed',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 9999,
                    opacity: 0.03,
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'repeat',
                    backgroundSize: '256px 256px',
                  }}
                />
                {/* Vignette overlay */}
                <div
                  style={{
                    position: 'fixed',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 9998,
                    background:
                      'radial-gradient(ellipse at center, transparent 50%, rgba(13,10,9,0.4) 100%)',
                  }}
                />
                {children}
              </main>
              <Footer />
              <MiniPlayerLazy />
            </AudioProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
