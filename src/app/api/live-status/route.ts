import { NextResponse } from 'next/server';

const TIKTOK_USERNAME = 'cam.tok';
const CACHE_TTL_SECONDS = 60;

let cachedResult: { isLive: boolean; checkedAt: number } | null = null;

/**
 * Detects TikTok live status by fetching the user's /live page and checking
 * the room status code embedded in the page JSON:
 *   - "status":2 → user is actively streaming
 *   - "status":4 → user is offline
 *
 * TikTok embeds this in SIGI_STATE data adjacent to the "liveRoom" key.
 * When offline the page still returns 200 and contains CDN template URLs,
 * so we cannot rely on HTTP status or URL presence alone.
 *
 * Cached 60s. Falls back to isLive=false on any error.
 */
async function checkLiveStatus(): Promise<boolean> {
  const now = Date.now();
  if (cachedResult && now - cachedResult.checkedAt < CACHE_TTL_SECONDS * 1000) {
    return cachedResult.isLive;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`https://www.tiktok.com/@${TIKTOK_USERNAME}/live`, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    clearTimeout(timeout);

    if (!res.ok) {
      cachedResult = { isLive: false, checkedAt: now };
      return false;
    }

    const html = await res.text();

    // TikTok's live page JSON uses "status":2 for actively streaming
    // and "status":4 for offline. We check that "status":2 appears AND
    // "status":4 does NOT, to avoid any edge-case ambiguity.
    const hasLiveStatus = html.includes('"status":2');
    const hasOfflineStatus = html.includes('"status":4');

    const isLive = hasLiveStatus && !hasOfflineStatus;

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
