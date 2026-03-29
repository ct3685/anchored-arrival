import { NextResponse } from 'next/server';

export const revalidate = 3600;

interface SocialPost {
  id: string;
  platform: 'tiktok' | 'instagram';
  title: string;
  url: string;
  thumbnail: string;
  author: string;
}

/**
 * Fetches video IDs from TikTok's embed page (no auth required).
 * The embed page contains video IDs in its hydration data.
 */
async function getVideoIds(username: string): Promise<string[]> {
  try {
    const res = await fetch(`https://www.tiktok.com/embed/@${username}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return [];
    const html = await res.text();

    // Extract numeric IDs (18-20 digits = TikTok video/user IDs)
    const rawIds = html.match(/"id":"(\d{18,20})"/g) || [];
    const ids = rawIds.map((m) => m.replace(/"id":"|"/g, ''));

    // The user's own ID appears too — filter it by getting the secUid-associated ID
    // Heuristic: the user ID appears most frequently, video IDs less so
    const freq: Record<string, number> = {};
    for (const id of ids) {
      freq[id] = (freq[id] || 0) + 1;
    }
    // Most frequent ID is likely the user ID
    const sortedByFreq = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    const probableUserId = sortedByFreq[0]?.[0];

    return [...new Set(ids)].filter((id) => id !== probableUserId);
  } catch {
    return [];
  }
}

/**
 * Fetches oEmbed data for a single TikTok video.
 * Returns title, thumbnail URL, and author name.
 */
async function getOembed(
  username: string,
  videoId: string
): Promise<{
  title: string;
  thumbnail: string;
  author: string;
} | null> {
  try {
    const videoUrl = `https://www.tiktok.com/@${username}/video/${videoId}`;
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      title: data.title || '',
      thumbnail: data.thumbnail_url || '',
      author: data.author_name || username,
    };
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('user') || 'trevor_bfit';
  const limit = Math.min(
    parseInt(searchParams.get('limit') || '10', 10),
    20
  );

  try {
    const videoIds = await getVideoIds(username);

    if (videoIds.length === 0) {
      return NextResponse.json(
        {
          posts: [],
          meta: {
            total: 0,
            fetchedAt: new Date().toISOString(),
            source: `@${username}`,
            error: 'Could not fetch videos',
          },
        },
        {
          headers: {
            'Cache-Control':
              'public, s-maxage=600, stale-while-revalidate=1200',
          },
        }
      );
    }

    // Fetch oEmbed for each video in parallel
    const results = await Promise.allSettled(
      videoIds.slice(0, limit).map((id) => getOembed(username, id))
    );

    const posts: SocialPost[] = [];
    results.forEach((result, i) => {
      if (result.status === 'fulfilled' && result.value) {
        const { title, thumbnail, author } = result.value;
        posts.push({
          id: videoIds[i],
          platform: 'tiktok',
          title: title || 'TikTok Video',
          url: `https://www.tiktok.com/@${username}/video/${videoIds[i]}`,
          thumbnail,
          author,
        });
      }
    });

    return NextResponse.json(
      {
        posts,
        meta: {
          total: posts.length,
          fetchedAt: new Date().toISOString(),
          source: `@${username}`,
        },
      },
      {
        headers: {
          'Cache-Control':
            'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      }
    );
  } catch (error) {
    console.error('Social feed error:', error);
    return NextResponse.json(
      {
        posts: [],
        meta: { error: 'Failed to fetch social feed' },
      },
      { status: 500 }
    );
  }
}
