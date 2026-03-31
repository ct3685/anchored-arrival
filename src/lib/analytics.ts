// Google Analytics 4 Event Tracking Utility
// Measurement ID configured via NEXT_PUBLIC_GA_MEASUREMENT_ID env var

// ============================================
// TYPE DEFINITIONS
// ============================================

export type GAEventName =
  | 'page_view'
  | 'nav_click'
  | 'mobile_menu_open'
  | 'mobile_menu_close'
  | 'logo_click'
  | 'hero_cta_click'
  | 'teaser_cta_click'
  | 'music_play'
  | 'music_pause'
  | 'music_seek'
  | 'music_track_complete'
  | 'music_milestone'
  | 'music_track_change'
  | 'music_download'
  | 'miniplayer_expand'
  | 'miniplayer_collapse'
  | 'gallery_image_click'
  | 'lightbox_open'
  | 'lightbox_close'
  | 'lightbox_navigate'
  | 'image_download'
  | 'link_click'
  | 'outbound_click'
  | 'social_click'
  | 'scroll_depth'
  | 'page_engagement'
  | 'play_count_increment'
  | 'audio_error'
  | 'download_error'
  | 'page_not_found'
  | 'not_found_cta_click'
  | 'in_app_browser_detected'
  | 'in_app_browser_notice_dismissed'
  | 'in_app_browser_link_copied'
  | 'web_vitals';

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

// ============================================
// CORE INFRASTRUCTURE
// ============================================

const IS_DEV = process.env.NODE_ENV === 'development';

const gtag = (...args: Parameters<typeof window.gtag>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
  if (IS_DEV && args[0] === 'event') {
    console.log(
      `%c[GA4]%c ${args[1]}`,
      'color: #F5A623; font-weight: bold;',
      'color: inherit;',
      args[2] ?? ''
    );
  }
};

// ============================================
// UTM / SESSION CONTEXT
// ============================================

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;
const SESSION_STORAGE_KEY = '__ga4_session';

interface SessionContext {
  landing_page: string;
  referrer: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export function captureSessionContext(): void {
  if (typeof window === 'undefined') return;
  try {
    if (sessionStorage.getItem(SESSION_STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const ctx: SessionContext = {
      landing_page: window.location.pathname,
      referrer: document.referrer,
    };

    for (const key of UTM_KEYS) {
      const val = params.get(key);
      if (val) ctx[key] = val;
    }

    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(ctx));
  } catch {
    // sessionStorage unavailable (e.g. private browsing in some browsers)
  }
}

function getSessionContext(): Partial<SessionContext> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// ============================================
// GLOBAL EVENT CONTEXT (auto-merged into every event)
// ============================================

function getGlobalContext(): Record<string, unknown> {
  if (typeof window === 'undefined') return {};
  const session = getSessionContext();
  return {
    page_path: window.location.pathname,
    page_title: document.title,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    timestamp_local: new Date().toISOString(),
    ...(session.referrer && { session_referrer: session.referrer }),
    ...(session.utm_source && { session_utm_source: session.utm_source }),
    ...(session.utm_medium && { session_utm_medium: session.utm_medium }),
    ...(session.utm_campaign && {
      session_utm_campaign: session.utm_campaign,
    }),
  };
}

// ============================================
// USER PROPERTIES (set once per page load)
// ============================================

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

function detectInAppBrowser(): boolean {
  const ua = navigator.userAgent || '';
  return /FBAN|FBAV|Instagram|TikTok|Line\/|Snapchat|Twitter|MicroMessenger/i.test(
    ua
  );
}

export function initUserProperties(): void {
  if (typeof window === 'undefined') return;

  const isReturning = localStorage.getItem('__ga4_visited') === '1';
  const session = getSessionContext();
  const colorScheme = window.matchMedia?.('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light';

  let trafficSource = 'direct';
  if (session.utm_source) {
    trafficSource = session.utm_source;
  } else if (document.referrer) {
    try {
      const host = new URL(document.referrer).hostname;
      trafficSource = host !== window.location.hostname ? host : 'direct';
    } catch {
      trafficSource = 'unknown';
    }
  }

  gtag('set', 'user_properties', {
    device_type: getDeviceType(),
    is_returning_visitor: isReturning,
    preferred_color_scheme: colorScheme,
    is_in_app_browser: detectInAppBrowser(),
    landing_page: session.landing_page ?? window.location.pathname,
    traffic_source: trafficSource,
  });

  if (!isReturning) {
    try {
      localStorage.setItem('__ga4_visited', '1');
    } catch {
      // localStorage unavailable
    }
  }
}

// ============================================
// GENERIC EVENT TRACKER (with global context enrichment)
// ============================================

export const trackEvent = (
  eventName: GAEventName,
  params?: Record<string, unknown>
) => {
  gtag('event', eventName, { ...getGlobalContext(), ...params });
};

// ============================================
// PAGE VIEW (SPA client-side navigation)
// ============================================

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  trackEvent('page_view', {
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

export const trackTeaserCTA = (ctaText: string, destination: string) => {
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

export const trackPlayCountIncrement = (
  trackId: string,
  trackTitle: string
) => {
  trackEvent('play_count_increment', {
    track_id: trackId,
    track_title: trackTitle,
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
// OUTBOUND CLICK EVENTS (GA4-standard for external link attribution)
// ============================================

export const trackOutboundClick = (
  url: string,
  linkText: string,
  linkLocation: string
) => {
  trackEvent('outbound_click', {
    link_url: url,
    link_text: linkText,
    link_location: linkLocation,
    outbound: true,
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
