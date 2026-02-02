import type { NextConfig } from 'next';

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    // Optimized device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200],
    // Small fixed-size images (avatars, thumbnails)
    imageSizes: [40, 48, 64, 80, 100, 128, 256, 350],
  },

  // Optimize MUI and other large packages
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material', 'motion'],
  },
};

export default nextConfig;
