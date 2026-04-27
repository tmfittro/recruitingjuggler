# Recruiting Juggler

A clean, minimal job application tracker for college students managing multiple recruiting pipelines.

## Local Development

```bash
pnpm install
pnpm run dev   # starts at http://localhost:5000
pnpm run build # production build
```

## Routes

| Route | Page |
|-------|------|
| `/` | Dashboard — overview of all applications |
| `/applications/new` | Add a new application |
| `/applications/:id` | View application detail |
| `/applications/:id/edit` | Edit an application |

## Component Conventions

UI primitives live in `src/components/ui/`:
- `Button` — supports `variant` (primary/secondary/ghost/danger), `size` (sm/md/lg), and `asChild` for rendering as a link
- `Badge` / `StatusBadge` — status chips for application stages
- `Card` + sub-components — consistent surface container
- `Typography` — H1, H2, H3, H4, Body, Muted, Caption

Use `cn()` from `src/lib/utils.ts` to merge Tailwind classes.

## Tech Stack

- React 19, Vite 8, TypeScript 6
- React Router v7 (react-router-dom)
- Tailwind CSS v3
- Radix UI Slot (for asChild button composition)
- class-variance-authority, clsx, tailwind-merge, lucide-react
