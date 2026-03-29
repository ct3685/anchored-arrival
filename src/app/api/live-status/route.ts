import { NextResponse } from 'next/server';

const TIKTOK_USERNAME = 'cam.tok'; // TEMP: testing against live user
const CACHE_TTL_SECONDS = 60;

let cachedResult: { isLive: boolean; checkedAt: number } | null = null;

/**
 * Detects TikTok live status using two signals:
 *
 * 1. Redirect behavior: when NOT live, TikTok's /@user/live page returns a
 *    3xx redirect to the profile. When live, it returns 200 with stream content.
 *
 * 2. Stream URL presence: the 200 page only contains CDN streaming URLs
 *    (pull-hls, pull-flv on tiktokcdn) when an actual stream is active.
 *    This avoids false positives from structural JS property names like
 *    "liveRoom" which appear in the page code regardless of status.
 *
 * Cached in-memory for 60s. Falls back to isLive=false on any error.
 */
async function checkLiveStatus(): Promise<boolean> {
  const now = Date.now();
  if (
    cachedResult &&
    now - cachedResult.checkedAt < CACHE_TTL_SECONDS * 1000
  ) {
    return cachedResult.isLive;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    // Use redirect: 'manual' so we can detect 3xx → user is offline
    const res = await fetch(
      `https://www.tiktok.com/@${TIKTOK_USERNAME}/live`,
      {
        signal: controller.signal,
        redirect: 'manual',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      }
    );

    clearTimeout(timeout);

    // 3xx redirect = user is NOT live (TikTok sends to profile)
    if (res.status >= 300 && res.status < 400) {
      cachedResult = { isLive: false, checkedAt: now };
      return false;
    }

    // Non-200 = error, assume not live
    if (res.status !== 200) {
      cachedResult = { isLive: false, checkedAt: now };
      return false;
    }

    const html = await res.text();

    // Look for TikTok CDN streaming URLs which ONLY appear during an
    // active livestream. These are the actual video stream endpoints.
    const streamIndicators = [
      'pull-hls',
      'pull-flv',
      'pull-rtmp',
      'webcast.tiktok.com/webcast/im',
    ];

    const hasActiveStream = streamIndicators.some((indicator) =>
      html.includes(indicator)
    );

    // Secondary: check for a room_id near a status of 2 (streaming).
    // Find room_id, then check if "status":2 appears nearby.
    const roomIdIdx = html.indexOf('"room_id"');
    let hasLiveRoomStatus = false;
    if (roomIdIdx !== -1) {
      const nearby = html.slice(roomIdIdx, roomIdIdx + 600);
      hasLiveRoomStatus = /"status"\s*:\s*2\b/.test(nearby);
    }

    const isLive = hasActiveStream || hasLiveRoomStatus;

    cachedResult = { isLive, checkedAt: now };
    return isLive;
  } catch {
    cachedResult = { isLive: false, checkedAt: now };
    return false;
  }
}

export async function GET() {
  const isLive = await checkLiveStatus();

  return NextResponse.json(
    { isLive },
    {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_TTL_SECONDS}, stale-while-revalidate=${CACHE_TTL_SECONDS * 2}`,
      },
    }
  );
}
