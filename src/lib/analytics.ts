// Google Analytics 4 Event Tracking Utility
// Measurement ID configured via NEXT_PUBLIC_GA_MEASUREMENT_ID env var

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
export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  gtag('event', eventName, params);
};

// ============================================
// PAGE VIEW (SPA client-side navigation)
// ============================================

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

// ============================================
// NAVIGATION EVENTS
// ============================================

export const trackNavClick = (
  linkText: string,
  linkUrl: string,
  navType: 'desktop' | 'mobile'
) => {
  trackEvent('nav_click', {
    link_text: linkText,
    link_url: linkUrl,
    nav_type: navType,
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

export const trackHeroCTA = (
  ctaText: string,
  destination: string,
  isExternal: boolean
) => {
  trackEvent('hero_cta_click', {
    cta_text: ctaText,
    destination: destination,
    is_external: isExternal,
  });
};

// ============================================
// TEASER CTA EVENTS
// ============================================

export const trackTeaserCTA = (
  ctaText: string,
  destination: string
) => {
  trackEvent('teaser_cta_click', {
    cta_text: ctaText,
    destination: destination,
  });
};

// ============================================
// MUSIC PLAYER EVENTS
// ============================================

export const trackMusicPlay = (
  trackId: string,
  trackTitle: string,
  artist: string,
  positionSeconds: number
) => {
  trackEvent('music_play', {
    track_id: trackId,
    track_title: trackTitle,
    artist: artist,
    position_seconds: Math.round(positionSeconds),
  });
};

export const trackMusicPause = (
  trackId: string,
  trackTitle: string,
  positionSeconds: number,
  listenDuration: number
) => {
  trackEvent('music_pause', {
    track_id: trackId,
    track_title: trackTitle,
    position_seconds: Math.round(positionSeconds),
    listen_duration_seconds: Math.round(listenDuration),
  });
};

export const trackMusicSeek = (
  trackId: string,
  fromSeconds: number,
  toSeconds: number
) => {
  trackEvent('music_seek', {
    track_id: trackId,
    from_seconds: Math.round(fromSeconds),
    to_seconds: Math.round(toSeconds),
  });
};

export const trackMusicTrackComplete = (
  trackId: string,
  trackTitle: string,
  totalListenTime: number
) => {
  trackEvent('music_track_complete', {
    track_id: trackId,
    track_title: trackTitle,
    total_listen_time_seconds: Math.round(totalListenTime),
  });
};

export const trackMusicMilestone = (
  trackId: string,
  trackTitle: string,
  milestone: 25 | 50 | 75 | 100
) => {
  trackEvent('music_milestone', {
    track_id: trackId,
    track_title: trackTitle,
    milestone: milestone,
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
    direction: direction,
  });
};

export const trackMusicDownload = (
  trackId: string,
  trackTitle: string,
  artist: string
) => {
  trackEvent('music_download', {
    track_id: trackId,
    track_title: trackTitle,
    artist: artist,
  });
};

export const trackMiniplayerExpand = (trackId: string) => {
  trackEvent('miniplayer_expand', {
    track_id: trackId,
  });
};

export const trackMiniplayerCollapse = (trackId: string) => {
  trackEvent('miniplayer_collapse', {
    track_id: trackId,
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
    image_src: imageSrc,
  });
};

export const trackLightboxOpen = (imageTitle: string, imageIndex: number) => {
  trackEvent('lightbox_open', {
    image_title: imageTitle,
    image_index: imageIndex,
  });
};

export const trackLightboxClose = (
  imageTitle: string,
  viewDurationSeconds: number
) => {
  trackEvent('lightbox_close', {
    image_title: imageTitle,
    view_duration_seconds: Math.round(viewDurationSeconds),
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
    to_index: toIndex,
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
    download_source: source,
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
    is_external: isExternal,
  });
};

// ============================================
// SOCIAL EVENTS
// ============================================

export const trackSocialClick = (
  platform: string,
  location: 'linktree' | 'social_section'
) => {
  trackEvent('social_click', {
    platform: platform,
    location: location,
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
    milestone: milestone,
  });
};

// ============================================
// ERROR EVENTS
// ============================================

export const trackAudioError = (trackId: string, errorType: string) => {
  trackEvent('audio_error', {
    track_id: trackId,
    error_type: errorType,
  });
};

export const trackDownloadError = (fileName: string, errorMessage: string) => {
  trackEvent('download_error', {
    file_name: fileName,
    error_message: errorMessage,
  });
};

export const trackPageNotFound = (pagePath: string, referrer: string) => {
  trackEvent('page_not_found', {
    page_path: pagePath,
    referrer: referrer,
  });
};

// ============================================
// IN-APP BROWSER EVENTS
// ============================================

export const trackInAppBrowserDetected = (platform: string, os: string) => {
  trackEvent('in_app_browser_detected', {
    platform: platform,
    os: os,
  });
};

export const trackInAppBrowserNoticeDismissed = (platform: string) => {
  trackEvent('in_app_browser_notice_dismissed', {
    platform: platform,
  });
};

export const trackInAppBrowserLinkCopied = (
  linkLabel: string,
  linkUrl: string,
  platform: string
) => {
  trackEvent('in_app_browser_link_copied', {
    link_label: linkLabel,
    link_url: linkUrl,
    platform: platform,
  });
};
