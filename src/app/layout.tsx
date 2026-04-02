import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/theme/theme';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/*
 * Business Name Ideas:
 * 1. Tender Beginnings Wellness
 * 2. Rooted in Birth
 * 3. The Bloom Collective — Maternal Wellness
 * 4. Nestled Support Doula Services
 * 5. Gentle Passage Birth & Wellness
 * 6. Willow & Bloom Maternal Care
 * 7. Cradle & Sage Doula Services
 */

const displayFont = Playfair_Display({
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

export const metadata: Metadata = {
  title: {
    default: 'Tender Beginnings Wellness — Doula & Maternal Support',
    template: '%s | Tender Beginnings Wellness',
  },
  description:
    'Compassionate doula services, birth education, lactation counseling, and postpartum support. Empowering families through every stage of their journey.',
  keywords: [
    'doula',
    'birth support',
    'maternal wellness',
    'lactation counseling',
    'birth education',
    'postpartum support',
    '3D ultrasound',
  ],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#7A9E7E',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body style={{ margin: 0, background: '#FDF8F0' }}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <main style={{ minHeight: '100vh' }}>{children}</main>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
