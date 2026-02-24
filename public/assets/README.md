# Assets – Use Your Own Folder & Image Names

You **don’t need to rename** folders or images. The site discovers whatever you put here and uses it.

## How it works

1. **Before each build**, a script scans `public/assets/` and lists every subfolder and its image files (`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`).
2. Folder names are **normalized** to keys (e.g. `channel dashboard` → `channel-dashboard`, `REVENUE ANALYTICS` → `revenue-analytics`).
3. The app uses those keys to show:
   - **Blueprint**: proof galleries (all images from each folder)
   - **Home**: hero and proof strip (first image from each folder)
   - **Checkout**: trust strip (first image from revenue, play buttons, reviews)
   - **Courses / One-to-One**: product card placeholders (images from channel-dashboard or viral-video-engineering)

## Your folder names → where they appear

| Your folder name (as on disk) | Used on site as |
|-------------------------------|------------------|
| `channel dashboard` (or similar) | Channel dashboard proof, home, featured placeholders |
| `CHANNEL ANALYTICS` | Channel analytics proof gallery |
| `REVENUE ANALYTICS` | Revenue proof, checkout trust strip |
| `play buttons` | Play button proof, home, checkout |
| `VIRAL VIDEO ENGINEERING` | Viral proof gallery, one-to-one placeholders |
| `WEEKLY SCALING PATTERN` | Weekly analytics proof gallery |
| `text-messages-reviews` (if you add it) | Checkout trust strip, reviews |

## What you need to do

- **Folder names**: Use any name and casing (e.g. `channel dashboard`, `REVENUE ANALYTICS`). The script normalizes them.
- **Image names**: Use any filenames (e.g. `IMG_0230.PNG`, `WhatsApp Image 2026-02-09 at 8.20.46 PM.jpeg`). All image files in a folder are included.
- **Run or deploy**: Run `npm run build` (or deploy); the prebuild step regenerates the manifest from your current folders and files.

No renaming required.
