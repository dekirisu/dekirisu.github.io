import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const thumbsDir = path.resolve(__dirname, '../public/thumbnails');
const outputDir = path.resolve(__dirname, '../public/thumbnails/blurred');
const profileSrc = path.resolve(__dirname, '../public/profile.jpg');

fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(thumbsDir).filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));

// Also blur profile.jpg
const profileOutput = path.join(outputDir, 'profile.png');
sharp(profileSrc)
  .resize(null, 24)
  .toFile(profileOutput)
  .then(() => {
    execSync(`pngquant --quality=2 --speed=1 --force "${profileOutput}"`);
    const quantized = profileOutput.replace(/\.png$/, '-fs8.png');
    if (quantized !== profileOutput) {
      fs.renameSync(quantized, profileOutput);
    }
    console.log(`✓ profile.jpg → profile.png`);
  })
  .catch(err => console.error(`✗ profile.jpg: ${err.message}`));

for (const file of files) {
  const input = path.join(thumbsDir, file);
  const name = path.basename(file, path.extname(file));
  const output = path.join(outputDir, name + '.png');

  // Resize to 32px, quantize with pngquant
  sharp(input)
    .resize(null, 33)
    .toFile(output)
    .then(() => {
      try {
        execSync(`pngquant --quality=2 --speed=1 --force "${output}"`);
        let quantized = output.replace(/\.png$/, '-fs8.png');
        if (quantized !== output) {
          fs.renameSync(quantized, output);
          quantized = output;
        }
        // execSync(`pngcrush -reduce -brute -ow "${quantized}" 2>/dev/null`);
      } catch {
        // already quantized, keep as-is
      }
      console.log(`✓ ${file} → ${name}.png`);
    })
    .catch(err => console.error(`✗ ${file}: ${err.message}`));
}

console.log(`Generated ${files.length} blurred thumbnails`);
