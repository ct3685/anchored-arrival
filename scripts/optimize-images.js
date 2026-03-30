#!/usr/bin/env node

/**
 * Image Optimization Script
 * - Compresses all PNG/JPG/JPEG images aggressively for mobile-first performance
 * - Generates WebP versions alongside originals for manual <picture> use if needed
 * - Uses a manifest file (.image-manifest.json) to skip already-optimized images
 * - Runs automatically before build via package.json prebuild
 *
 * Usage:
 *   node scripts/optimize-images.js           # normal run (skips cached)
 *   node scripts/optimize-images.js --force   # re-optimize everything
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const MANIFEST_PATH = path.resolve(__dirname, '..', '.image-manifest.json');
const FORCE = process.argv.includes('--force');

const CONFIG = {
  directories: ['./public/images'],
  sizeThreshold: 0,
  maxWidth: 1200,
  maxHeight: 1200,
  jpegQuality: 75,
  pngQuality: 75,
  compressionLevel: 9,
  generateWebP: true,
  webpQuality: 72,
};

function hashFile(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function loadManifest() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  } catch {
    return {};
  }
}

function saveManifest(manifest) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
}

function configFingerprint() {
  const relevant = {
    maxWidth: CONFIG.maxWidth,
    maxHeight: CONFIG.maxHeight,
    jpegQuality: CONFIG.jpegQuality,
    pngQuality: CONFIG.pngQuality,
    compressionLevel: CONFIG.compressionLevel,
    webpQuality: CONFIG.webpQuality,
  };
  return crypto.createHash('sha256').update(JSON.stringify(relevant)).digest('hex').slice(0, 12);
}

async function findImages(dir, images = []) {
  if (!fs.existsSync(dir)) return images;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await findImages(fullPath, images);
    } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
      images.push(fullPath);
    }
  }
  return images;
}

async function optimizeImage(filePath) {
  const stats = fs.statSync(filePath);
  const sizeBefore = stats.size;
  const ext = path.extname(filePath).toLowerCase();
  const tempPath = filePath + '.tmp';
  const results = [];

  try {
    let pipeline = sharp(filePath).resize(CONFIG.maxWidth, CONFIG.maxHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    });

    if (ext === '.png') {
      pipeline = pipeline.png({
        quality: CONFIG.pngQuality,
        compressionLevel: CONFIG.compressionLevel,
      });
    } else {
      pipeline = pipeline.jpeg({
        quality: CONFIG.jpegQuality,
        mozjpeg: true,
      });
    }

    await pipeline.toFile(tempPath);

    const newStats = fs.statSync(tempPath);
    if (newStats.size < sizeBefore) {
      fs.renameSync(tempPath, filePath);
      results.push({
        type: 'optimize',
        optimized: true,
        sizeBefore,
        sizeAfter: newStats.size,
        reduction: Math.round((1 - newStats.size / sizeBefore) * 100),
      });
    } else {
      fs.unlinkSync(tempPath);
      results.push({ type: 'optimize', skipped: true, reason: 'already optimal' });
    }

    if (CONFIG.generateWebP) {
      const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      if (!fs.existsSync(webpPath)) {
        await sharp(filePath)
          .resize(CONFIG.maxWidth, CONFIG.maxHeight, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .webp({ quality: CONFIG.webpQuality })
          .toFile(webpPath);

        const webpStats = fs.statSync(webpPath);
        results.push({
          type: 'webp',
          generated: true,
          size: webpStats.size,
        });
      }
    }
  } catch (error) {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    results.push({ type: 'error', error: error.message });
  }

  return results;
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB';
  return (bytes / 1024 / 1024).toFixed(2) + 'MB';
}

async function main() {
  const cfgHash = configFingerprint();
  const manifest = loadManifest();

  if (FORCE) {
    console.log('🔄 Force mode — re-optimizing all images\n');
  }

  console.log('🖼️  Optimizing images for mobile-first performance...\n');

  let allImages = [];
  for (const dir of CONFIG.directories) {
    allImages = await findImages(dir, allImages);
  }

  if (allImages.length === 0) {
    console.log('No images found.');
    return;
  }

  let optimizedCount = 0;
  let skippedCount = 0;
  let webpCount = 0;
  let totalSaved = 0;

  for (const imagePath of allImages) {
    const relativePath = path.relative('.', imagePath);
    const currentHash = hashFile(imagePath);
    const manifestEntry = manifest[relativePath];

    if (
      !FORCE &&
      manifestEntry &&
      manifestEntry.hash === currentHash &&
      manifestEntry.config === cfgHash
    ) {
      skippedCount++;
      continue;
    }

    const results = await optimizeImage(imagePath);

    for (const result of results) {
      if (result.type === 'optimize' && result.optimized) {
        console.log(
          `✅ ${relativePath}: ${formatSize(result.sizeBefore)} → ${formatSize(result.sizeAfter)} (-${result.reduction}%)`
        );
        optimizedCount++;
        totalSaved += result.sizeBefore - result.sizeAfter;
      } else if (result.type === 'webp' && result.generated) {
        console.log(`🌐 ${relativePath} → WebP (${formatSize(result.size)})`);
        webpCount++;
      } else if (result.type === 'error') {
        console.log(`❌ ${relativePath}: ${result.error}`);
      }
    }

    manifest[relativePath] = {
      hash: hashFile(imagePath),
      config: cfgHash,
    };
  }

  saveManifest(manifest);

  console.log('\n📊 Summary:');
  console.log(`   Optimized: ${optimizedCount} images`);
  console.log(`   Skipped (cached): ${skippedCount} images`);
  console.log(`   WebP generated: ${webpCount} images`);
  if (totalSaved > 0) {
    console.log(`   Total saved: ${formatSize(totalSaved)}`);
  }
}

main().catch(console.error);
