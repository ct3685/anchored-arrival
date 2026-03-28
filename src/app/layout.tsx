import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
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

const GA_MEASUREMENT_ID = 'G-2DE84Q17JH';

export const metadata: Metadata = {
  icons: {
    icon: '/images/mvp.png',
    apple: '/images/mvp.png',
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
  themeColor: '#D4A017',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <body style={{ margin: 0 }}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AudioProvider>
              <InAppBrowserNoticeLazy />
              <SparkleEffectLazy />
              <Navbar />
              <main style={{ minHeight: '100vh' }}>{children}</main>
              <Footer />
              <MiniPlayerLazy />
            </AudioProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
