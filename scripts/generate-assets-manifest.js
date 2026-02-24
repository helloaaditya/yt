const fs = require("fs");
const path = require("path");

const ASSETS_DIR = path.join(process.cwd(), "public", "assets");
const OUT_FILE = path.join(process.cwd(), "src", "data", "assets-manifest.json");
const IMAGE_EXT = /\.(jpg|jpeg|png|webp|gif)$/i;

/** Normalize folder name to key: lowercase, spaces -> hyphens, for consistent use in app */
function toKey(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
}

/** Map normalized key to actual folder name (for image paths). We store by normalized key but need real path. */
function getManifest() {
  const manifest = {};
  const folderNames = {}; // normalizedKey -> actual folder name
  if (!fs.existsSync(ASSETS_DIR)) {
    return { manifest: {}, folderNames: {} };
  }
  const dirs = fs.readdirSync(ASSETS_DIR, { withFileTypes: true });
  for (const d of dirs) {
    if (!d.isDirectory() || d.name.startsWith(".")) continue;
    const dirPath = path.join(ASSETS_DIR, d.name);
    const files = fs.readdirSync(dirPath).filter((f) => IMAGE_EXT.test(f));
    if (files.length) {
      const key = toKey(d.name);
      manifest[key] = files.sort();
      folderNames[key] = d.name; // keep actual folder name for URL path
    }
  }
  return { manifest, folderNames };
}

const { manifest, folderNames } = getManifest();
const dataDir = path.dirname(OUT_FILE);
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
// Save both: manifest (files per key) and folderNames (key -> actual folder name for URL)
const output = { manifest, folderNames };
fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 2), "utf8");
console.log("Assets manifest written:", Object.keys(manifest).length, "folders");
