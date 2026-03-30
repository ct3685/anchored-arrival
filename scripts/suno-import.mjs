#!/usr/bin/env node
/**
 * suno-import.mjs — Import a Suno song into the Ranch Squad site.
 *
 * Usage:
 *   node scripts/suno-import.mjs <suno-url>
 *
 * Accepts both URL formats:
 *   https://suno.com/song/{uuid}
 *   https://suno.com/s/{shortcode}   (follows 307 redirect)
 *
 * What it does:
 *   1. Resolves the song UUID from the URL
 *   2. Scrapes title + creator from og:meta tags
 *   3. Downloads MP3  → public/audio/{slug}.mp3
 *   4. Downloads cover → public/images/covers/{slug}.jpg
 *   5. Prompts for creator (reaper / aaron)
 *   6. Prepends a new entry in src/lib/tracks.ts
 *
 * ──────────────────────────────────────────────
 * Future enhancements (v2):
 *   - Lyrics extraction via Playwright (render page, scrape DOM)
 *   - WAV conversion via ffmpeg post-download
 *   - Batch import (multiple URLs or playlist URL)
 *   - Store original Suno URL on the Track for provenance
 *   - Admin page in Next.js app for drag-and-drop import
 * ──────────────────────────────────────────────
 */

import { createWriteStream } from 'node:fs';
import { readFile, writeFile, access } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TRACKS_FILE = resolve(ROOT, 'src/lib/tracks.ts');
const AUDIO_DIR = resolve(ROOT, 'public/audio');
const COVERS_DIR = resolve(ROOT, 'public/images/covers');

const CDN_BASE = 'https://cdn1.suno.ai';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function decodeHtmlEntities(str) {
  const entities = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'" , '&#39;': "'" };
  return str.replace(/&(?:amp|lt|gt|quot|#x27|#39);/g, (m) => entities[m] || m);
}

async function prompt(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((res) => {
    rl.question(question, (answer) => {
      rl.close();
      res(answer.trim());
    });
  });
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

// ─── URL Resolution ───────────────────────────────────────────────────────────

const LONG_RE = /suno\.com\/song\/([a-f0-9-]{36})/;
const SHORT_RE = /suno\.com\/s\/([A-Za-z0-9_-]+)/;

async function resolveUuid(url) {
  const longMatch = url.match(LONG_RE);
  if (longMatch) return longMatch[1];

  const shortMatch = url.match(SHORT_RE);
  if (!shortMatch) throw new Error(`Unrecognized Suno URL format: ${url}`);

  const res = await fetch(url, { method: 'HEAD', redirect: 'manual' });
  const location = res.headers.get('location');
  if (!location) throw new Error('Short URL did not redirect — got status ' + res.status);

  const resolved = location.match(/song\/([a-f0-9-]{36})/);
  if (!resolved) throw new Error(`Could not extract UUID from redirect: ${location}`);
  return resolved[1];
}

// ─── Metadata Scraping ────────────────────────────────────────────────────────

async function fetchMeta(uuid) {
  const pageUrl = `https://suno.com/song/${uuid}`;
  const res = await fetch(pageUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; RanchSquadBot/1.0)' },
  });
  const html = await res.text();

  const titleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);

  const rawTitle = titleMatch ? decodeHtmlEntities(titleMatch[1]) : null;
  const description = descMatch ? decodeHtmlEntities(descMatch[1]) : null;

  const imgMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/);
  const coverUrl = imgMatch ? imgMatch[1] : null;

  let sunoHandle = null;
  if (description) {
    const handleMatch = description.match(/by\s+(\S+)/);
    if (handleMatch) sunoHandle = handleMatch[1];
  }

  return { title: rawTitle, sunoHandle, coverUrl };
}

// ─── Downloads ────────────────────────────────────────────────────────────────

async function downloadFile(url, destPath, label) {
  if (await fileExists(destPath)) {
    console.log(`  ⏭  ${label} already exists at ${destPath}, skipping.`);
    return;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${label}: HTTP ${res.status} from ${url}`);

  await pipeline(Readable.fromWeb(res.body), createWriteStream(destPath));
  const sizeMB = ((Number(res.headers.get('content-length')) || 0) / 1_048_576).toFixed(1);
  console.log(`  ✅ ${label} → ${destPath} (${sizeMB} MB)`);
}

// ─── tracks.ts Writer ─────────────────────────────────────────────────────────

async function readExistingIds() {
  const content = await readFile(TRACKS_FILE, 'utf-8');
  const ids = [];
  for (const match of content.matchAll(/^\s+id:\s*'([^']+)'/gm)) {
    ids.push(match[1]);
  }
  return { content, ids };
}

function buildTrackEntry(slug, title, creatorVar) {
  const needsDoubleQuotes = title.includes("'");
  const titleLiteral = needsDoubleQuotes ? `"${title}"` : `'${title}'`;

  return [
    '  {',
    `    id: '${slug}',`,
    `    title: ${titleLiteral},`,
    `    artist: 'Trevor & Ranch Squad',`,
    `    src: '/audio/${slug}.mp3',`,
    `    cover: '/images/covers/${slug}.jpg',`,
    `    createdBy: ${creatorVar},`,
    '  },',
  ].join('\n');
}

async function prependTrack(entry) {
  const content = await readFile(TRACKS_FILE, 'utf-8');
  const marker = 'export const tracks: Track[] = [\n';
  const idx = content.indexOf(marker);
  if (idx === -1) throw new Error('Could not find tracks array in tracks.ts');

  const insertAt = idx + marker.length;
  const updated = content.slice(0, insertAt) + entry + '\n' + content.slice(insertAt);
  await writeFile(TRACKS_FILE, updated, 'utf-8');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  let url = process.argv[2];
  if (!url) {
    console.log('\n🎵 Suno Import — Ranch Squad\n');
    url = await prompt('Paste the Suno link: ');
    if (!url) {
      console.error('No URL provided — exiting.');
      process.exit(1);
    }
  } else {
    console.log('\n🎵 Suno Import — Ranch Squad\n');
  }

  // 1. Resolve UUID
  console.log('→ Resolving UUID...');
  const uuid = await resolveUuid(url);
  console.log(`  UUID: ${uuid}`);

  // 2. Fetch metadata
  console.log('→ Fetching metadata...');
  const meta = await fetchMeta(uuid);
  if (!meta.title) {
    console.error('  ❌ Could not extract song title from Suno page.');
    process.exit(1);
  }
  console.log(`  Title: ${meta.title}`);
  if (meta.sunoHandle) console.log(`  Suno creator: ${meta.sunoHandle}`);

  // 3. Generate slug and check for duplicates
  const slug = slugify(meta.title);
  console.log(`  Slug: ${slug}`);

  const { ids: existingIds } = await readExistingIds();
  if (existingIds.includes(slug)) {
    console.log(`\n⚠️  Track "${slug}" already exists in tracks.ts — nothing to do.`);
    process.exit(0);
  }

  // 4. Prompt for creator
  console.log('\nWho created this track?');
  console.log('  1) reaper (Cam)');
  console.log('  2) aaron');
  const choice = await prompt('Enter 1 or 2: ');
  const creatorVar = choice === '2' ? 'aaron' : 'reaper';
  console.log(`  → Using creator: ${creatorVar}`);

  // 5. Allow title override
  const titleOverride = await prompt(`\nTitle [${meta.title}]: `);
  const finalTitle = titleOverride || meta.title;
  const finalSlug = titleOverride ? slugify(titleOverride) : slug;

  if (finalSlug !== slug && existingIds.includes(finalSlug)) {
    console.log(`\n⚠️  Track "${finalSlug}" already exists in tracks.ts — nothing to do.`);
    process.exit(0);
  }

  // 6. Download assets
  console.log('\n→ Downloading assets...');
  const mp3Url = `${CDN_BASE}/${uuid}.mp3`;
  const imgUrl = meta.coverUrl || `${CDN_BASE}/image_${uuid}.jpeg`;
  const mp3Dest = resolve(AUDIO_DIR, `${finalSlug}.mp3`);
  const imgDest = resolve(COVERS_DIR, `${finalSlug}.jpg`);

  await downloadFile(mp3Url, mp3Dest, 'MP3');
  await downloadFile(imgUrl, imgDest, 'Cover image');

  // 7. Update tracks.ts
  console.log('\n→ Updating tracks.ts...');
  const entry = buildTrackEntry(finalSlug, finalTitle, creatorVar);
  await prependTrack(entry);
  console.log('  ✅ Track prepended to tracks array.');

  // 8. Summary
  console.log('\n────────────────────────────────────');
  console.log('✅ Import complete!');
  console.log(`   Title:  ${finalTitle}`);
  console.log(`   Slug:   ${finalSlug}`);
  console.log(`   MP3:    public/audio/${finalSlug}.mp3`);
  console.log(`   Cover:  public/images/covers/${finalSlug}.jpg`);
  console.log(`   Credit: ${creatorVar}`);
  console.log(`   Suno:   https://suno.com/song/${uuid}`);
  console.log('────────────────────────────────────\n');
}

main().catch((err) => {
  console.error('\n❌ Import failed:', err.message);
  process.exit(1);
});
