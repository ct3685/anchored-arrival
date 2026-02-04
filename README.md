# Agent Morgie

> Main Character Energy • LIVE Creator • Community Driven

A vibrant, mobile-first portfolio site for TikTok creator [@realfeelpurpose](https://www.tiktok.com/@realfeelpurpose).

## Tech Stack

- **Next.js 16** with App Router & Turbopack
- **React 19** with automatic memoization
- **MUI v7** (Material UI) with custom theme
- **Motion** (formerly Framer Motion) for animations
- **yet-another-react-lightbox** for gallery
- **TypeScript** for type safety

## Features

- 🎨 Custom pink/cyan/purple color theme
- ✨ Animated sparkle effects (hearts, stars, music notes)
- 📸 Photo gallery with lightbox, zoom, and download
- 🎵 Custom music player with the original track
- 📱 Mobile-first responsive design
- 🔒 Security headers (CSP, HSTS, X-Frame-Options)
- ⚡ Turbopack for blazing fast builds

## Getting Started

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with MUI theme
│   ├── page.tsx        # Home/Hero page
│   ├── gallery/        # Photo gallery
│   └── links/          # Link tree page
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── PhotoGallery.tsx
│   ├── MusicPlayer.tsx
│   ├── LinkTree.tsx
│   ├── SparkleEffect.tsx
│   └── Footer.tsx
├── theme/
│   └── theme.ts        # MUI custom theme
└── lib/
    ├── images.ts       # Gallery image data
    └── tracks.ts       # Music track data
```

## Deployment

Deploy to Netlify with zero configuration:

```bash
# Link to Netlify
netlify link

# Deploy
netlify deploy --prod
```

Or connect your GitHub repo to Netlify for automatic deployments.

## License

All rights reserved. Agent Morgie © 2026
