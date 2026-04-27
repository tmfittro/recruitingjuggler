# Recruiting Juggler

A clean, minimal job application tracker for college students managing multiple recruiting pipelines. Built with React + Vite + TypeScript.

## Product Purpose

Helps college juniors and seniors maintain clarity and confidence during the job/internship search by tracking application status, deadlines, and next steps — all in one place.

## Architecture

- **Frontend**: React 19 + Vite + TypeScript, located in `recruiting-juggler/`
- **Styling**: Tailwind CSS v3 with custom design tokens (Option A: clean/minimal/productivity)
- **Routing**: React Router v7 (react-router-dom)
- **UI Components**: Custom component library in `src/components/ui/`
- **Dev Server**: Port 5000

## Design System (Option A)

- **Background**: White (`#ffffff`) with light gray content sections (`gray-50`)
- **Primary accent**: Blue-600 (`#2563eb`) for buttons, active states, links
- **Typography**: Inter font, clear hierarchy with semibold headings
- **Borders/Shadows**: Thin `gray-200` borders, subtle `shadow-sm` shadows
- **Status badges**: Color-coded (blue=applied, amber=interview, green=offer, red=rejected, gray=withdrawn, purple=pending)

## Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Dashboard | Overview of all applications |
| `/applications/:id` | ApplicationDetail | View a single application |
| `/applications/new` | AddEditApplication | Add a new application |
| `/applications/:id/edit` | AddEditApplication | Edit an existing application |

## Key Files

- `recruiting-juggler/src/App.tsx` — Router setup
- `recruiting-juggler/src/components/Layout.tsx` — Global top nav + content shell
- `recruiting-juggler/src/components/ApplicationCard.tsx` — Card component with urgency styling
- `recruiting-juggler/src/components/ui/Button.tsx` — Button component (primary/secondary/ghost/danger)
- `recruiting-juggler/src/components/ui/Badge.tsx` — StatusBadge + Badge components
- `recruiting-juggler/src/components/ui/Card.tsx` — Card, CardHeader, CardTitle, CardContent, CardFooter
- `recruiting-juggler/src/types/application.ts` — Application + FollowUp TypeScript types
- `recruiting-juggler/src/data/sampleApplications.ts` — 7 seed applications covering all status groups and urgency levels
- `recruiting-juggler/src/pages/Dashboard.tsx` — Main dashboard with grouped list, counts, urgency, empty state
- `recruiting-juggler/src/lib/utils.ts` — cn() utility for class merging
- `recruiting-juggler/src/index.css` — Tailwind directives + global styles + component classes
- `recruiting-juggler/tailwind.config.js` — Design tokens

## Data Model

Applications have: `id`, `company`, `role`, `stage` (ApplicationStatus badge), `status` (active/completed/inactive group), `nextStep`, `deadline`, `followUps[]`, `completedTasks[]`, `notes`.
Urgency is computed from deadline: overdue (past), soon (≤48h), normal.

## Workflow

- **Start application**: `cd recruiting-juggler && pnpm run dev` on port 5000
- Package manager: pnpm (pnpm-lock.yaml)

## Future Work

- Backend API (Node/Express) + Replit PostgreSQL for data persistence
- Application CRUD forms (Add & Edit)
- Application detail view with timeline/notes
