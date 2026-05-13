# SRC corporate website

Vite + React 18 + React Router + Tailwind CSS 4.

## Project layout

| Path | Role |
|------|------|
| `src/app/pages/` | Route-level screens (composition only; copy and lists live in `src/data/`). |
| `src/app/App.tsx`, `src/app/routes.tsx` | App shell and router definitions. |
| `src/data/` | **Structured content** — navigation, properties, leasing, team, locations, partners, statistics, about copy. |
| `src/constants/images.ts` | **All public image/video URLs** — single source of truth for `/assets/...` paths. |
| `src/components/layout/` | Site chrome: `Root`, `Header`, `Footer`, `Logo`. |
| `src/components/common/` | Shared non-layout widgets (e.g. `ImageWithFallback`). |
| `src/components/ui/` | Shadcn-style primitives (unchanged API). |
| `src/components/sections/`, `src/components/cards/` | Reserved for future extractions (see `.gitkeep`). |
| `public/assets/` | Static files served as `/assets/...` (see `public/assets/README.md`). |

## Updating content (no component surgery)

1. **Copy / metrics / nav:** edit the relevant file under `src/data/` (e.g. `leasing.ts`, `navigation.ts`).
2. **Images:** add or replace files under `public/assets/...` using the **exact filenames** already declared in `src/constants/images.ts`.
3. Rebuild or refresh the dev server.

## Scripts

- `npm run build` — production bundle to `dist/`.
- `npx vite` — local dev server (add a `"dev": "vite"` script in `package.json` if you want `npm run dev`).

## Conventions

- Data files may import `images` from `@/constants/images` to bind media paths to content records.
- Pages should import public URLs **only** via `images` or data that itself uses `images`.
- Use `@/` imports for anything under `src/` (see `tsconfig.json` + `vite.config.ts`).
