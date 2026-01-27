// Google Analytics 4 Event Tracking Utility
// Measurement ID: G-2DE84Q17JH

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

// Helper to safely call gtag
const gtag = (...args: Parameters<typeof window.gtag>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

// Generic event tracker
export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  gtag('event', eventName, params);
};

// ============================================
// NAVIGATION EVENTS
// ============================================

export const trackNavClick = (linkText: string, linkUrl: string, navType: 'desktop' | 'mobile') => {
  trackEvent('nav_click', {
    link_text: linkText,
    link_url: linkUrl,
    nav_type: navType
  });
};

export const trackMobileMenuOpen = () => {
  trackEvent('mobile_menu_open');
};

export const trackMobileMenuClose = () => {
  trackEvent('mobile_menu_close');
};

export const trackLogoClick = () => {
  trackEvent('logo_click');
};

// ============================================
// HERO EVENTS
// ============================================

export const trackHeroCTA = (ctaText: string, destination: string, isExternal: boolean) => {
  trackEvent('hero_cta_click', {
    cta_text: ctaText,
    destination: destination,
    is_external: isExternal
  });
};

// ============================================
// MUSIC PLAYER EVENTS
// ============================================

export const trackMusicPlay = (
  trackId: string,
  trackTitle: string,
  artist: string,
  playerType: 'mini' | 'full' | 'global',
  positionSeconds: number
) => {
  trackEvent('music_play', {
    track_id: trackId,
    track_title: trackTitle,
    artist: artist,
    player_type: playerType,
    position_seconds: Math.round(positionSeconds)
  });
};

export const trackMusicPause = (
  trackId: string,
  trackTitle: string,
  positionSeconds: number,
  listenDuration: number,
  playerType: 'mini' | 'full' | 'global'
) => {
  trackEvent('music_pause', {
    track_id: trackId,
    track_title: trackTitle,
    position_seconds: Math.round(positionSeconds),
    listen_duration_seconds: Math.round(listenDuration),
    player_type: playerType
  });
};

export const trackMusicSeek = (
  trackId: string,
  fromSeconds: number,
  toSeconds: number,
  playerType: 'mini' | 'full' | 'global'
) => {
  trackEvent('music_seek', {
    track_id: trackId,
    from_seconds: Math.round(fromSeconds),
    to_seconds: Math.round(toSeconds),
    player_type: playerType
  });
};

export const trackMusicTrackComplete = (
  trackId: string,
  trackTitle: string,
  totalListenTime: number,
  playerType: 'mini' | 'full' | 'global'
) => {
  trackEvent('music_track_complete', {
    track_id: trackId,
    track_title: trackTitle,
    total_listen_time_seconds: Math.round(totalListenTime),
    player_type: playerType
  });
};

export const trackMusicMilestone = (
  trackId: string,
  trackTitle: string,
  milestone: 25 | 50 | 75 | 100,
  playerType: 'mini' | 'full' | 'global'
) => {
  trackEvent('music_milestone', {
    track_id: trackId,
    track_title: trackTitle,
    milestone: milestone,
    player_type: playerType
  });
};

export const trackMusicTrackChange = (
  fromTrackId: string,
  toTrackId: string,
  toTrackTitle: string,
  direction: 'next' | 'prev' | 'select'
) => {
  trackEvent('music_track_change', {
    from_track_id: fromTrackId,
    to_track_id: toTrackId,
    to_track_title: toTrackTitle,
    direction: direction
  });
};

export const trackMiniplayerExpand = (trackId: string) => {
  trackEvent('miniplayer_expand', {
    track_id: trackId
  });
};

export const trackMiniplayerCollapse = (trackId: string) => {
  trackEvent('miniplayer_collapse', {
    track_id: trackId
  });
};

// ============================================
// GALLERY EVENTS
// ============================================

export const trackGalleryImageClick = (
  imageTitle: string,
  imageIndex: number,
  imageSrc: string
) => {
  trackEvent('gallery_image_click', {
    image_title: imageTitle,
    image_index: imageIndex,
    image_src: imageSrc
  });
};

export const trackLightboxOpen = (imageTitle: string, imageIndex: number) => {
  trackEvent('lightbox_open', {
    image_title: imageTitle,
    image_index: imageIndex
  });
};

export const trackLightboxClose = (imageTitle: string, viewDurationSeconds: number) => {
  trackEvent('lightbox_close', {
    image_title: imageTitle,
    view_duration_seconds: Math.round(viewDurationSeconds)
  });
};

export const trackLightboxNavigate = (
  direction: 'next' | 'prev',
  fromImageTitle: string,
  toImageTitle: string,
  toIndex: number
) => {
  trackEvent('lightbox_navigate', {
    direction: direction,
    from_image: fromImageTitle,
    to_image: toImageTitle,
    to_index: toIndex
  });
};

export const trackImageDownload = (
  imageTitle: string,
  imageSrc: string,
  source: 'card' | 'lightbox'
) => {
  trackEvent('image_download', {
    image_title: imageTitle,
    image_src: imageSrc,
    download_source: source
  });
};

export const trackGalleryDownloadAll = (imageCount: number) => {
  trackEvent('gallery_download_all', {
    image_count: imageCount
  });
};

// ============================================
// LINKS PAGE EVENTS
// ============================================

export const trackLinkClick = (
  linkLabel: string,
  linkUrl: string,
  linkIndex: number,
  isExternal: boolean
) => {
  trackEvent('link_click', {
    link_label: linkLabel,
    link_url: linkUrl,
    link_index: linkIndex,
    is_external: isExternal
  });
};

// ============================================
// SOCIAL EVENTS
// ============================================

export const trackSocialClick = (
  platform: string,
  location: 'hero' | 'footer' | 'linktree' | 'navbar'
) => {
  trackEvent('social_click', {
    platform: platform,
    location: location
  });
};

// ============================================
// SCROLL DEPTH EVENTS
// ============================================

export const trackScrollDepth = (
  pagePath: string,
  milestone: 25 | 50 | 75 | 100
) => {
  trackEvent('scroll_depth', {
    page_path: pagePath,
    milestone: milestone
  });
};

// ============================================
// ERROR EVENTS
// ============================================

export const trackAudioError = (trackId: string, errorType: string) => {
  trackEvent('audio_error', {
    track_id: trackId,
    error_type: errorType
  });
};

export const trackDownloadError = (fileName: string, errorMessage: string) => {
  trackEvent('download_error', {
    file_name: fileName,
    error_message: errorMessage
  });
};
