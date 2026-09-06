# Lumina AI — Application UI/UX redesign

This pass applies one consistent product system to every authenticated route.

## Routes covered
- `/dashboard` — overview, stats, tool launcher, recent library
- `/transformations/add/[type]` — all five transformation creation flows
- `/transformations/[id]` — transformation detail / before & after
- `/transformations/[id]/update` — edit transformation
- `/credits` — credit balance, packages and checkout
- `/profile` — workspace identity, usage stats and library

## Design system
- Warm canvas: `#F6F5F1`
- Ink: `#0B0B0C`
- White surfaces: `#FFFFFF`
- Accent: `#C7F36B`
- Neutral border: `#DEDDD7`
- Small uppercase labels + editorial Sohne headings
- Compact cards, consistent 8px rhythm, 12–18px radii
- Dark product surfaces echo the marketing landing page

## UX changes
- Sidebar has clearer active state and create action.
- Mobile uses a fixed compact navigation bar.
- Dashboard has a hero, usage summary, tool launcher and library hierarchy.
- Transformation routes use a stable two-panel studio: canvas + settings.
- Detail routes use metadata cards and balanced before/after media panels.
- Credits makes current balance visible before packages.
- Profile provides a clear account/usage hierarchy.
- Responsive breakpoints collapse grids before content becomes cramped.

Backend, authentication, Cloudinary preset and existing server actions were not intentionally changed.
