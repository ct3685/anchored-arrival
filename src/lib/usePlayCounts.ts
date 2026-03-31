'use client';

import { useState, useEffect } from 'react';

const compactNumber = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

export function formatPlayCount(count: number): string {
  if (count === 0) return '0';
  return compactNumber.format(count);
}

let _counts: Record<string, number> = {};
let _fetched = false;
const _listeners = new Set<() => void>();

function notify() {
  _listeners.forEach((fn) => fn());
}

function fetchCounts() {
  if (_fetched) return;
  _fetched = true;

  fetch('/api/track-plays')
    .then((res) => (res.ok ? res.json() : { counts: {} }))
    .then((data) => {
      const fetched = data.counts ?? {};
      _counts = { ..._counts };
      for (const [id, count] of Object.entries(fetched)) {
        _counts[id] = Math.max(_counts[id] ?? 0, count as number);
      }
      notify();
    })
    .catch(() => {});
}

const _lastIncrement: Record<string, number> = {};
const DEBOUNCE_MS = 5000;

/** Fire-and-forget increment — callable from anywhere (not a hook). */
export function incrementPlayCount(trackId: string) {
  const now = Date.now();
  if (now - (_lastIncrement[trackId] ?? 0) < DEBOUNCE_MS) return;
  _lastIncrement[trackId] = now;

  _counts = { ..._counts, [trackId]: (_counts[trackId] ?? 0) + 1 };
  notify();

  fetch('/api/track-plays', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ trackId }),
  }).catch(() => {});
}

/** React hook — subscribes to the shared play-count store. */
export function usePlayCounts(): Record<string, number> {
  const [counts, setCounts] = useState(_counts);

  useEffect(() => {
    fetchCounts();

    const listener = () => setCounts({ ..._counts });
    _listeners.add(listener);
    return () => {
      _listeners.delete(listener);
    };
  }, []);

  return counts;
}
