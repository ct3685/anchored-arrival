'use client';

import { useState, useEffect, useCallback } from 'react';

export type InAppBrowserPlatform =
  | 'tiktok'
  | 'instagram'
  | 'facebook'
  | 'snapchat'
  | 'twitter'
  | 'linkedin'
  | 'unknown';

export type DeviceOS = 'ios' | 'android' | 'unknown';

export interface InAppBrowserInfo {
  isInAppBrowser: boolean;
  platform: InAppBrowserPlatform;
  os: DeviceOS;
  instructions: string;
  dismissed: boolean;
}

const DISMISS_KEY = 'inAppBrowserNoticeDismissed';

/**
 * Detects if the current browser is an in-app browser (WebView) from social media apps
 * and provides platform-specific instructions for opening in a native browser.
 */
export function useInAppBrowser(): InAppBrowserInfo & {
  dismiss: () => void;
  copyToClipboard: (text: string) => Promise<boolean>;
} {
  const [dismissed, setDismissed] = useState(false);
  const [browserInfo, setBrowserInfo] = useState<
    Omit<InAppBrowserInfo, 'dismissed'>
  >({
    isInAppBrowser: false,
    platform: 'unknown',
    os: 'unknown',
    instructions: '',
  });

  useEffect(() => {
    // Check if user already dismissed the notice this session
    const wasDismissed = sessionStorage.getItem(DISMISS_KEY) === 'true';
    setDismissed(wasDismissed);

    // Detect in-app browser
    const ua = navigator.userAgent || navigator.vendor || '';
    const info = detectInAppBrowser(ua);
    setBrowserInfo(info);
  }, []);

  const dismiss = useCallback(() => {
    setDismissed(true);
    sessionStorage.setItem(DISMISS_KEY, 'true');
  }, []);

  const copyToClipboard = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
          return true;
        }
        // Fallback for older browsers or restricted contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);
        return success;
      } catch {
        return false;
      }
    },
    []
  );

  return {
    ...browserInfo,
    dismissed,
    dismiss,
    copyToClipboard,
  };
}

function detectInAppBrowser(
  userAgent: string
): Omit<InAppBrowserInfo, 'dismissed'> {
  const ua = userAgent.toLowerCase();

  // Detect OS
  const os: DeviceOS = /iphone|ipad|ipod/.test(ua)
    ? 'ios'
    : /android/.test(ua)
      ? 'android'
      : 'unknown';

  // Detect platform - order matters (more specific patterns first)
  let platform: InAppBrowserPlatform = 'unknown';
  let isInAppBrowser = false;

  if (/musical_ly|bytedancewebview|tiktok/i.test(userAgent)) {
    platform = 'tiktok';
    isInAppBrowser = true;
  } else if (/instagram/i.test(userAgent)) {
    platform = 'instagram';
    isInAppBrowser = true;
  } else if (/fban|fbav|fb_iab|facebook/i.test(userAgent)) {
    platform = 'facebook';
    isInAppBrowser = true;
  } else if (/snapchat/i.test(userAgent)) {
    platform = 'snapchat';
    isInAppBrowser = true;
  } else if (/twitter/i.test(userAgent)) {
    platform = 'twitter';
    isInAppBrowser = true;
  } else if (/linkedinapp/i.test(userAgent)) {
    platform = 'linkedin';
    isInAppBrowser = true;
  } else if (/\bwv\b|webview/i.test(userAgent) && os !== 'unknown') {
    // Generic WebView detection (only on mobile)
    platform = 'unknown';
    isInAppBrowser = true;
  }

  const instructions = getInstructions(platform, os);

  return {
    isInAppBrowser,
    platform,
    os,
    instructions,
  };
}

function getInstructions(platform: InAppBrowserPlatform, os: DeviceOS): string {
  const platformNames: Record<InAppBrowserPlatform, string> = {
    tiktok: 'TikTok',
    instagram: 'Instagram',
    facebook: 'Facebook',
    snapchat: 'Snapchat',
    twitter: 'X (Twitter)',
    linkedin: 'LinkedIn',
    unknown: 'this app',
  };

  const platformName = platformNames[platform];
  const browserName = os === 'ios' ? 'Safari' : 'Chrome';

  // Platform-specific instructions
  if (platform === 'tiktok') {
    return `Tap the three dots (⋯) in the upper right and select "Open in ${browserName}".`;
  }

  if (platform === 'instagram' || platform === 'facebook') {
    return `Tap the three dots (⋯) in the upper right and select "Open in ${browserName}".`;
  }

  if (platform === 'snapchat') {
    return `Tap the share or menu icon in the upper right and select "Open in ${browserName}".`;
  }

  if (platform === 'twitter') {
    return `Tap the share icon and select "Open in ${browserName}".`;
  }

  if (platform === 'linkedin') {
    return `Tap the three dots (⋯) in the upper right and select "Open in browser".`;
  }

  // Generic fallback
  return `Look for three dots (⋯) or a share icon in the upper right to find "Open in browser".`;
}

/**
 * Utility to check if a URL might have issues in an in-app browser
 */
export function isProblematicUrl(url: string): boolean {
  const problematicDomains = [
    'amazon.com',
    'amazon.co',
    'tiktok.com',
    'instagram.com',
    'facebook.com',
    'youtube.com',
    'youtu.be',
    'twitter.com',
    'x.com',
    'linkedin.com',
    'snapchat.com',
    'spotify.com',
    'apple.com',
  ];

  try {
    const urlObj = new URL(url);
    return problematicDomains.some(
      (domain) =>
        urlObj.hostname.includes(domain) ||
        urlObj.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}
