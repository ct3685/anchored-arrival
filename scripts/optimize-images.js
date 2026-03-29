#!/usr/bin/env node

/**
 * Image Optimization Script
 * - Compresses all PNG/JPG/JPEG images aggressively for mobile-first performance
 * - Generates WebP versions alongside originals for manual <picture> use if needed
 * - Runs automatically before build via package.json prebuild
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  directories: ['./public/images'],
  // Optimize everything — no size threshold
  sizeThreshold: 0,
  // Gallery images don't need to be huge — 800px wide is plenty for mobile,
  // Next.js <Image> will serve responsive sizes anyway
  maxWidth: 1200,
  maxHeight: 1200,
  // Aggressive quality for JPEG (mobile-first)
  jpegQuality: 75,
  // PNG quality
  pngQuality: 75,
  compressionLevel: 9,
  // Also generate WebP versions
  generateWebP: true,
  webpQuality: 72,
};

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
    // Optimize original format
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

    // Generate WebP version
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
  let webpCount = 0;
  let totalSaved = 0;

  for (const imagePath of allImages) {
    const relativePath = path.relative('.', imagePath);
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
  }

  console.log('\n📊 Summary:');
  console.log(`   Optimized: ${optimizedCount} images`);
  console.log(`   WebP generated: ${webpCount} images`);
  if (totalSaved > 0) {
    console.log(`   Total saved: ${formatSize(totalSaved)}`);
  }
}

main().catch(console.error);
