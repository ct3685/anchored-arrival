import { NextResponse } from 'next/server';

const TIKTOK_USERNAME = 'trevor_bfit';
const CACHE_TTL_SECONDS = 60;

let cachedResult: { isLive: boolean; checkedAt: number } | null = null;

/**
 * Checks TikTok live status by fetching the user's live page and looking
 * for indicators of an active stream. Results are cached in-memory for 60s
 * to avoid hammering TikTok. Falls back to `isLive: false` on any error.
 */
async function checkLiveStatus(): Promise<boolean> {
  const now = Date.now();
  if (cachedResult && now - cachedResult.checkedAt < CACHE_TTL_SECONDS * 1000) {
    return cachedResult.isLive;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(
      `https://www.tiktok.com/@${TIKTOK_USERNAME}/live`,
      {
        signal: controller.signal,
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

    if (!res.ok) {
      cachedResult = { isLive: false, checkedAt: now };
      return false;
    }

    const html = await res.text();

    // When a user is live, the page contains indicators like:
    // - "LiveRoom" or "liveRoom" in the page data
    // - "isLiveStreaming":true in JSON-LD or NEXT_DATA
    // - The page does NOT redirect to the profile (status 200 with live content)
    const liveIndicators = [
      '"isLiveStreaming":true',
      '"liveRoom"',
      '"LiveRoom"',
      'live-room',
      '"status":2', // TikTok live status code for "streaming"
      '"alive":true',
    ];

    const isLive = liveIndicators.some((indicator) =>
      html.includes(indicator)
    );

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
