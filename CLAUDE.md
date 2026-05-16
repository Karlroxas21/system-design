# Project — System Design

Shared design system repo. Source of truth for visual design across all Karl's
projects (mobile apps + web admin dashboards).

## Design System

**Always read `DESIGN.md` before making any visual or UI decision.**

All font choices, colors, spacing, radii, motion, chart conventions, and aesthetic
direction are defined there. Do not deviate without explicit user approval.

When reviewing code or generating UI:
- Flag any code that doesn't match `DESIGN.md`
- Flag any AI-slop pattern listed in the "Anti-Slop Guarantees" section
- Default to the tokens defined in `DESIGN.md`, never invent ad-hoc values

## Memorable anchor

**"Pro tool feel. Serious work, serious software."**

Every visual or interaction decision must serve this anchor. If a proposed
addition does not, the answer is less, not more.

## Stack reminder

- **Mobile:** React Native + Expo + NativeWind + Material 3 scaffolding (brand-first surface)
- **Web admin frameworks (pick per-project):**
  - Next.js (React) — default for new projects; SSR/RSC needed
  - React + Vite — SPA admin behind auth; no SSR
  - Angular 17+ — when opinionated framework / strong DI typing wanted
- **Web styling:** Tailwind everywhere; tokens from DESIGN.md
- **Web components:** shadcn/ui (React) / Spartan UI (Angular). Never Angular Material as primary — clashes with aesthetic
- **Charts:** MUI Charts (simple, React-only) / ECharts (interactive, all) / D3 (bespoke) / Chart.js (prototypes). Angular simple-tier uses ECharts or ngx-charts
- **Fonts:** IBM Plex Sans (UI) + IBM Plex Mono (data, code, labels)
- **Icons:** Lucide (lucide-react / lucide-angular) on web / Material Symbols on mobile
