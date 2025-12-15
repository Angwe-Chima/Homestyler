import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// PATHS
const JSON_FILE = path.join(__dirname, 'src', 'data', 'db.json');
const PUBLIC_FOLDER = path.join(__dirname, 'public');
const OUTPUT_FILE = path.join(__dirname, 'src', 'data', 'db-cloudinary.json');

// List of possible image field names
const IMAGE_FIELD_NAMES = ['image', 'images', 'url']; // add more if needed (e.g. 'photo', 'src')

async function uploadImage(localPath) {
  const cleanPath = localPath.replace(/^\/+/, '');
  const fullLocalPath = path.join(PUBLIC_FOLDER, cleanPath);

  if (!fs.existsSync(fullLocalPath)) {
    console.warn(`Warning: Not found → ${cleanPath}`);
    return localPath;
  }

  let folder = 'shop';
  if (cleanPath.includes('/products/')) folder = 'shop/products';
  if (cleanPath.includes('/design-styles/')) folder = 'shop/design-styles';

  try {
    const result = await cloudinary.uploader.upload(fullLocalPath, {
      folder,
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });
    console.log(`Uploaded: ${cleanPath}`);
    return result.secure_url;
  } catch (err) {
    console.error(`Failed: ${cleanPath} →`, err.message);
    return localPath;
  }
}

async function main() {
  if (!fs.existsSync(JSON_FILE)) {
    console.error('db.json not found!');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
  const categories = ['products', 'designers', 'designs'];

  let totalUpdated = 0;

  for (const cat of categories) {
    if (!Array.isArray(data[cat])) continue;

    console.log(`\nProcessing ${cat}...`);

    for (const item of data[cat]) {
      // Check each possible image field name
      for (const field of IMAGE_FIELD_NAMES) {
        if (!(field in item)) continue;

        const value = item[field];

        // Case: array of images (e.g. "images": ["path1.jpg", "path2.jpg"])
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            if (typeof value[i] === 'string') {
              const newUrl = await uploadImage(value[i]);
              if (newUrl !== value[i]) {
                value[i] = newUrl;
                totalUpdated++;
              }
            }
          }
        }

        // Case: single string (e.g. "image": "path.jpg" or "url": "path.jpg")
        else if (typeof value === 'string') {
          const newUrl = await uploadImage(value);
          if (newUrl !== value) {
            item[field] = newUrl;
            totalUpdated++;
          }
        }
      }
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf8');

  console.log('\nFinished!');
  console.log(`Updated ${totalUpdated} image URLs`);
  console.log(`New file saved → ${OUTPUT_FILE}`);
  console.log(`\nNext step: Check a few URLs in the new file, then:`);
  console.log(` mv src/data/db-cloudinary.json src/data/db.json`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});