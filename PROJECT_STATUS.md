# Project Status

## Current goal

Build a customizable Next.js e-commerce storefront with an admin inventory system and visual Home editor.

## Technology

- Next.js 16.3.5 App Router, React 19.2.8, strict TypeScript
- styled-components, Framer Motion, TanStack Query, TanStack Table, Recharts, dnd-kit
- Prisma and SQLite planned for local development; PostgreSQL planned for production
- No Tailwind CSS in the intended application

## Architecture decisions

- Store and admin will use the same central product records.
- Storefront routes will use the `(store)` route group; admin routes will live under `/admin`.
- Server Components are the default; use `"use client"` only for interactive components.
- Store cards will use Framer Motion for visual animation; admin Home sorting will use dnd-kit.
- Home placements will reference products without duplicating product data.
- Stock adjustments will create inventory movements; price changes will create price-history records.
- Prefer archiving products with historical references over permanent deletion.

## Completed

- [x] Next.js project created
- [x] Current UI dependencies installed (styled-components, Framer Motion, TanStack Query/Table, Recharts, dnd-kit)
- [x] styled-components configured
- [x] Product card type defined
- [x] Simple Showcase Product Card created and shown on Home
- [ ] Store Home created
- [ ] Prisma configured
- [ ] Inventory implemented
- [ ] Home editor implemented
- [ ] Authentication implemented
- [ ] Statistics implemented

## In progress

- Current task: Simple styled-components product card and Home preview completed.
- Relevant files: `next.config.ts`, `src/app/StyledComponentsRegistry.tsx`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/components/product/ShowcaseProductCard.tsx`, `src/types/product.ts`.
- Current implementation status: Home displays one sample product card. Product data is typed and passed as props; database-backed Home sections are not implemented.

## Next step

- Review the card in the browser, then add the planned Framer Motion interaction with reduced-motion support.

## Known issues

- Preliminary UI, inventory, Home editor, and chart components still use Tailwind classes despite the no-Tailwind decision.
- The Home page uses sample product data and a remote Wikimedia Commons image; persistent product data is not configured.
- The working tree contains pre-existing uncommitted changes; preserve them.

## Important files

- `src/app/`, `src/components/`, `src/types/product.ts`, `next.config.ts`, `package.json`, `AGENTS.md`
- Planned: `src/features/`, `src/lib/products/`

## Last verification

- ESLint: `pnpm run lint` passed on 2026-09-22.
- TypeScript: `pnpm exec tsc --noEmit --incremental false` passed on 2026-09-22.
- Tests: Not run.
- Production build: `pnpm run build` passed on 2026-09-22.

## Last updated

- Date: 2026-09-22
- Updated by: Codex
