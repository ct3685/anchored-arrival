#!/usr/bin/env node

/**
 * Image Optimization Script
 * Automatically compresses PNG/JPG images that are over the size threshold.
 * Run manually: node scripts/optimize-images.js
 * Runs automatically before build via package.json
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  // Directories to scan for images
  directories: ['./public/images', './public/music'],
  // Only optimize images larger than this (in bytes)
  sizeThreshold: 500 * 1024, // 500KB
  // Maximum dimensions (maintains aspect ratio)
  maxWidth: 1200,
  maxHeight: 1200,
  // Quality settings
  pngQuality: 80,
  jpegQuality: 85,
  // Compression level for PNG (0-9)
  compressionLevel: 9,
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

  // Skip if under threshold
  if (sizeBefore <= CONFIG.sizeThreshold) {
    return { skipped: true, reason: 'under threshold' };
  }

  const ext = path.extname(filePath).toLowerCase();
  const tempPath = filePath + '.tmp';

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

    // Only replace if we actually made it smaller
    const newStats = fs.statSync(tempPath);
    if (newStats.size < sizeBefore) {
      fs.renameSync(tempPath, filePath);
      return {
        optimized: true,
        sizeBefore,
        sizeAfter: newStats.size,
        reduction: Math.round((1 - newStats.size / sizeBefore) * 100),
      };
    } else {
      fs.unlinkSync(tempPath);
      return { skipped: true, reason: 'no size improvement' };
    }
  } catch (error) {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    return { error: error.message };
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB';
  return (bytes / 1024 / 1024).toFixed(2) + 'MB';
}

async function main() {
  console.log('🖼️  Scanning for images to optimize...\n');

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
  let totalSaved = 0;

  for (const imagePath of allImages) {
    const relativePath = path.relative('.', imagePath);
    const result = await optimizeImage(imagePath);

    if (result.optimized) {
      console.log(
        `✅ ${relativePath}: ${formatSize(result.sizeBefore)} → ${formatSize(result.sizeAfter)} (-${result.reduction}%)`
      );
      optimizedCount++;
      totalSaved += result.sizeBefore - result.sizeAfter;
    } else if (result.skipped) {
      skippedCount++;
    } else if (result.error) {
      console.log(`❌ ${relativePath}: ${result.error}`);
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   Optimized: ${optimizedCount} images`);
  console.log(`   Skipped: ${skippedCount} images (already optimized)`);
  if (totalSaved > 0) {
    console.log(`   Total saved: ${formatSize(totalSaved)}`);
  }
}

main().catch(console.error);
