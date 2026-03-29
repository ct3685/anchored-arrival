# Ranch Squad

> Country Vibes • Big Energy • No Power Ups

The official site for TikTok LIVE creator Trevor ([@trevor_bfit](https://www.tiktok.com/@trevor_bfit)) and the Ranch Squad community.

**Live site:** [trevor-ranchsquad.netlify.app](https://trevor-ranchsquad.netlify.app)

## Features

- 🤠 Hero section with real-time TikTok LIVE status detection
- 📸 Photo gallery with lightbox, zoom, and download
- 🎵 Music player with custom tracks
- 🔗 Link tree page (socials, merch, affiliates)
- 📬 Contact page
- 📱 Mobile-first responsive design
- ✨ Animated sparkle effects
- 🔒 Security headers (CSP, HSTS, X-Frame-Options)
- 🗺️ SEO optimized with sitemap, OpenGraph, and Twitter cards

## Tech Stack

- **Next.js** with App Router & Turbopack
- **React 19**
- **MUI v7** (Material UI) with custom theme
- **Motion** for animations
- **yet-another-react-lightbox** for gallery
- **TypeScript**

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, structured data
│   ├── page.tsx            # Home / Hero
│   ├── gallery/            # Photo gallery
│   ├── music/              # Music player
│   ├── links/              # Link tree
│   ├── contact/            # Contact page
│   └── api/live-status/    # TikTok LIVE status endpoint
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── PhotoGallery.tsx
│   ├── MusicPlayer.tsx
│   ├── LinkTree.tsx
│   ├── SocialLinks.tsx
│   ├── RallyStrip.tsx
│   ├── CreatorNetworkCTA.tsx
│   ├── GalleryTeaser.tsx
│   ├── SparkleEffect.tsx
│   └── Footer.tsx
├── theme/
│   └── theme.ts
└── lib/
    ├── images.ts
    ├── tracks.ts
    └── useLiveStatus.ts
```

## Deployment

Deployed on Netlify. Push to `main` to trigger automatic deploys.

## License

All rights reserved. Ranch Squad © 2025
