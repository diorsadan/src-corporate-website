# SRC corporate website — static assets

Files in this directory are served from the site root (Vite `public/`).  
URLs always begin with `/assets/...` and match `src/constants/images.ts`.

## Folder layout

| Path | Purpose |
|------|---------|
| `home/` | Home hero still, optional hero video |
| `about/` | About page photography |
| `properties/calumpang/` | Calumpang zone images |
| `properties/cannery/` | Cannery / SEDZ images |
| `properties/allah-valley/` | Allah Valley images |
| `properties/upper-klinan/` | Upper Klinan images |
| `leasing/` | Commercial leasing listing photos |
| `resources/` | Investor resources imagery |
| `contact/` | Static map graphics for office cards |
| `logos/` | SRC, PEZA, and master brand marks |
| `partners/` | Locator / partner logos |
| `team/` | Leadership portraits |
| `maps/` | Region or multi-zone map artwork |
| `gallery/` | Cross-property gallery grid |
| `videos/` | Hosted video files (e.g. corporate reel) |
| `placeholders/` | Design-time fallbacks (`placeholder.svg`) |

Every folder includes a `.gitkeep` so empty directories stay in Git until you add media.

## Naming convention

- Use **lowercase**, words separated by **hyphens**.
- Prefer **role-first** names: `home-hero.jpg`, `calumpang-thumbnail.jpg`, `leasing-listing-calumpang-retail.jpg`.
- **Do not rename** files in `images.ts` when replacing art — instead **match the filename** on disk to the path already exported (so the site updates with no code edits).

## Formats

| Use | When |
|-----|------|
| **WebP** or **JPG** | Photos, aerials, large heroes (WebP preferred for size) |
| **PNG** | Logos with transparency |
| **SVG** | Simple logos/icons (keep file size small) |
| **MP4** / **WebM** | Background or inline video |

## Recommended sizes (starting points)

- **Full-width hero:** 1920×1080 (16:9), export at reasonable quality (often &lt; 400 KB WebP if optimized).
- **Property / listing cards:** 800×600 or 1200×900.
- **Team portraits:** 800×1000 (4:5) or square 800×800.
- **Partner logos:** width 400–800 px transparent PNG; avoid upscaling small bitmaps.
- **Map stills for contact cards:** 1200×675 (16:9).

Tune for your art direction; keep aspect ratios consistent within each UI block.

## Replacing placeholders safely

1. Open `src/constants/images.ts` and find the path you need (e.g. `/assets/home/home-hero.jpg`).
2. **Export or rename** your final file to **exactly** that filename (including extension).
3. Copy the file into the matching folder under `public/assets/...`.
4. Hard-refresh the browser (or clear CDN cache in production) to bypass caching.

If a file is **missing** or **fails to load**, the UI shows a neutral gradient and the shared `placeholders/placeholder.svg` — not a broken-image icon.

## Do not commit

Large binaries are ignored via `.gitignore` patterns elsewhere; still avoid committing raw camera dumps — add optimized exports only.

## Single source of truth

All routes import image URLs from **`src/constants/images.ts`** only.  
If you add a **new** slot (new section or new listing), that file must be updated once; routine swaps use the workflow above.
