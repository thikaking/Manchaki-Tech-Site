import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE = path.join(__dirname, 'favicon-source.png');
const OUTPUT_DIR = path.join(__dirname, 'artifacts/manchaki/public');

const SIZES = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'favicon-96x96.png', size: 96 },
  { name: 'favicon-192x192.png', size: 192 },
  { name: 'favicon-512x512.png', size: 512 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

async function generateFavicons() {
  console.log(`Reading source: ${SOURCE}`);
  const sourceBuffer = await fs.readFile(SOURCE);

  // Get metadata
  const metadata = await sharp(sourceBuffer).metadata();
  console.log(`Source image: ${metadata.width}x${metadata.height}, format: ${metadata.format}`);

  // Generate all PNG favicons
  for (const { name, size } of SIZES) {
    const outputPath = path.join(OUTPUT_DIR, name);
    console.log(`Generating ${name} (${size}x${size})...`);
    await sharp(sourceBuffer)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(outputPath);
  }

  // Generate favicon.ico (multi-size ICO from the source)
  // ICO requires a .ico file - we'll create a 32x32 ICO from the source
  console.log('Generating favicon.ico (32x32)...');
  
  // Create a 32x32 PNG buffer first, then we'll create the ICO
  const png32Buffer = await sharp(sourceBuffer)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Create ICO file: ICO header + directory entry + PNG data
  // ICO format: 6-byte header, 16-byte directory entry, then image data
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0);     // Reserved (0)
  icoHeader.writeUInt16LE(1, 2);     // Type: 1 = ICO
  icoHeader.writeUInt16LE(1, 4);     // Count: 1 image
  
  // Directory entry: 16 bytes
  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(32, 0);        // Width (32)
  dirEntry.writeUInt8(32, 1);        // Height (32)
  dirEntry.writeUInt8(0, 2);         // Colors (0 = no color palette)
  dirEntry.writeUInt8(0, 3);         // Reserved
  dirEntry.writeUInt16LE(1, 4);      // Planes
  dirEntry.writeUInt16LE(32, 6);     // Bits per pixel
  dirEntry.writeUInt32LE(png32Buffer.length, 8);  // Image size
  dirEntry.writeUInt32LE(22, 12);    // Offset (6 + 16 = 22 bytes from start)

  const icoBuffer = Buffer.concat([icoHeader, dirEntry, png32Buffer]);
  await fs.writeFile(path.join(OUTPUT_DIR, 'favicon.ico'), icoBuffer);

  console.log('All favicons generated successfully!');
}

generateFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});