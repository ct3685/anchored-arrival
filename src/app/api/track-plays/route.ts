import { NextResponse } from 'next/server';
import { getStore } from '@netlify/blobs';
import { tracks } from '@/lib/tracks';

const STORE_NAME = 'play-counts';
const VALID_TRACK_IDS = new Set(tracks.map((t) => t.id));
const PROD_API = 'https://ranchsquad.com/api/track-plays';

function isBlobsAvailable(): boolean {
  return (
    typeof process.env.NETLIFY === 'string' ||
    typeof process.env.NETLIFY_BLOBS_CONTEXT === 'string'
  );
}

export async function GET() {
  if (!isBlobsAvailable()) {
    try {
      const res = await fetch(PROD_API, { next: { revalidate: 30 } });
      const data = await res.json();
      return NextResponse.json(data);
    } catch {
      return NextResponse.json({ counts: {} });
    }
  }

  try {
    const store = getStore(STORE_NAME);
    const counts: Record<string, number> = {};

    await Promise.all(
      tracks.map(async (track) => {
        const raw = await store.get(track.id, { type: 'text' });
        counts[track.id] = raw ? parseInt(raw, 10) || 0 : 0;
      })
    );

    return NextResponse.json(
      { counts },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      }
    );
  } catch (error) {
    console.error('Failed to read play counts:', error);
    return NextResponse.json({ counts: {} }, { status: 200 });
  }
}

export async function POST(request: Request) {
  if (!isBlobsAvailable()) {
    try {
      const body = await request.json();
      const res = await fetch(PROD_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return NextResponse.json(data);
    } catch {
      return new Response(null, { status: 204 });
    }
  }

  try {
    const body = await request.json();
    const { trackId } = body;

    if (!trackId || !VALID_TRACK_IDS.has(trackId)) {
      return NextResponse.json(
        { error: 'Invalid track ID' },
        { status: 400 }
      );
    }

    const store = getStore(STORE_NAME);
    const raw = await store.get(trackId, { type: 'text' });
    const current = raw ? parseInt(raw, 10) || 0 : 0;
    const next = current + 1;
    await store.set(trackId, String(next));

    return NextResponse.json({ count: next });
  } catch (error) {
    console.error('Failed to increment play count:', error);
    return new Response(null, { status: 204 });
  }
}
