# Design System — Karl's Unified Stack

Single source of truth for visual design across all projects (mobile + web admin).
Read this before any visual or UI decision. Do not deviate without explicit approval.

---

## Product Context

- **What this is:** Unified design system shared across all personal projects
- **Who it's for:** End users of admin dashboards and consumer mobile apps
- **Space/industry:** Mixed — data products, operator tools, consumer mobile
- **Project types:**
  - Mobile apps (React Native + NativeWind + Material 3 scaffolding, brand-first surface)
  - Web admin dashboards (shadcn/ui + Tailwind + Next.js or React)

## Memorable Anchor

**"Pro tool feel. Serious work, serious software."**

Every design decision must serve this. The product feels like an instrument an
operator uses, not a brochure they browse.

---

## Aesthetic Direction

- **Direction:** Functional dense (Bloomberg / Datadog / instrument-panel vibe)
- **Decoration level:** Minimal — typography and data do the work
- **Mood:** Calm, mechanical, slightly cold but warm-neutral. Operator-facing.
  Quiet confidence — the software equivalent of a precision instrument.
- **First 3 seconds:** "This was built by someone who reads Edward Tufte on weekends."
  Eye lands on data, not chrome.

---

## Typography

### Stack

| Role | Font | Why |
|---|---|---|
| Display / Hero | IBM Plex Sans 600 | Engineered character, slight quirk, anti-default |
| Body / UI | IBM Plex Sans 400 / 500 | Identical metrics to Plex Mono, mixed text never fights |
| Data / Tables / KPIs | IBM Plex Mono 500 (tabular) | Numbers right-align cleanly, scan as a column |
| Code | IBM Plex Mono 400 / 500 | Same family as data, single mental model |
| Metadata / Labels | IBM Plex Mono 500 uppercase | Distinguishes UI chrome from content |

**Why IBM Plex over Inter / Geist / Helvetica:** Plex was designed by IBM specifically
for enterprise data products (IBM Cloud, Watson, Carbon Design System). Slight character
quirks (the `a`, the `g`, the `R`) read as "engineered for product" rather than
"default sans-serif." Less common than Inter = more distinctive without being decorative.

### Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

For mobile (Expo / React Native): use `@expo-google-fonts/ibm-plex-sans` and
`@expo-google-fonts/ibm-plex-mono`.

### OpenType features

Always active on body and UI:

```css
font-feature-settings: 'ss03';   /* slashed zero in numerics */
font-variant-numeric: tabular-nums;  /* on data only, not body */
```

Add `'kern'` is on by default. For data columns, force `tabular-nums` so digits align.

### Scale (4px-base modular)

| Token | px | rem | Use |
|---|---|---|---|
| `text-2xs` | 10 | 0.625 | Uppercase meta labels, badges |
| `text-xs`  | 11 | 0.6875 | Table headers, dense data labels |
| `text-sm`  | 12 | 0.75 | Captions, helper text |
| `text-base`| 14 | 0.875 | **Body default** |
| `text-md`  | 16 | 1.0 | Comfortable body (rare in admin) |
| `text-lg`  | 18 | 1.125 | Card titles |
| `text-xl`  | 20 | 1.25 | h2 / panel titles |
| `text-2xl` | 24 | 1.5 | KPI values, h1 |
| `text-3xl` | 28 | 1.75 | Page title |
| `text-4xl` | 32 | 2.0 | Page hero (rare; **KPI cap = 32px**) |
| `text-5xl` | 40 | 2.5 | Marketing display only |

Line-height: 1.1 (display), 1.25 (headings), 1.5 (body), 1.4 (dense tables).
Letter-spacing: `-0.025em` (display), `-0.02em` (h1), `-0.015em` (h2), `0` (body),
`0.08em` (uppercase meta labels).

### Weight discipline

- 400 (regular) — body
- 500 (medium) — UI labels, active state, KPI values
- 600 (semibold) — headings, primary buttons
- 700 (bold) — reserved; rarely use

Never use 300 (light) or 100 (thin). Never use italics for emphasis; use weight
or color instead.

---

## Color

### Approach

Full semantic palette. Brand + secondary + 4 status colors + 11-step neutral.
Color is signal, not decoration. Every color earns its place.

### Neutrals — warm graphite (slight yellow undertone)

Anti-slop: every AI-generated dashboard ships cold slate. Warm graphite reads
"paper" and "expensive."

| Step | Light hex | Use |
|---|---|---|
| 50  | `#FAFAF7` | App background |
| 100 | `#F1F0EC` | Surface (sidebar, header) |
| 200 | `#E4E2DC` | Border (hairlines) |
| 300 | `#CDCAC2` | Border (strong), disabled fill |
| 400 | `#A6A29A` | Disabled text, dividers (rare) |
| 500 | `#7C7872` | Muted text, secondary labels |
| 600 | `#5B5853` | Tertiary text |
| 700 | `#403E3A` | Subdued text |
| 800 | `#2A2926` | Strong text on light surfaces |
| 900 | `#1A1917` | Default body text |
| 950 | `#0E0D0C` | Ink — headings, strong emphasis |

Dark mode inverts: bg `#0E0D0C`, surface `#171614`, raised `#1F1E1B`,
border `#2A2926`, border-strong `#403E3A`, muted text `#A6A29A`, text `#E4E2DC`,
ink `#FAFAF7`.

### Brand

| Token | Light | Dark | Use |
|---|---|---|---|
| `brand` | `#E8A317` | `#F5B731` | Primary buttons, active state, focus ring, brand mark |
| `brand-hover` | `#D4920F` | `#E8A317` | Hover state |
| `brand-soft` | `#FBE9C1` | `#3A2C0F` | Brand-tinted backgrounds (alerts, badges) |

**Signal Amber.** Not blue. Every dashboard is blue; amber says "instrument panel."

### Secondary

| Token | Light | Dark | Use |
|---|---|---|---|
| `secondary` | `#0F7B8A` | `#3DB5C7` | Selected state, info accents, secondary CTA |
| `secondary-soft` | `#CFE6EA` | `#0F3338` | Tinted backgrounds for secondary |

Cyan-ink. Pairs amber without competing.

### Semantic (WCAG AA on neutral-50 and neutral-900 — tested)

| Status | Light | Dark | Soft (light / dark) |
|---|---|---|---|
| Success | `#2F7D3C` | `#5BB36A` | `#D9EBDC` / `#16331C` |
| Warning | `#C2700A` | `#E89A2E` | `#F7E2C1` / `#3A2710` |
| Error   | `#B5302B` | `#E66B66` | `#F2D2D0` / `#3A1817` |
| Info    | `#2563A8` | `#5B9BD8` | `#D2E0F0` / `#122A44` |

### Dark mode strategy

- Flip backgrounds, do not invert (no harsh white-to-black).
- Reduce saturation 10-20% on brand colors (amber goes slightly lighter, more legible).
- Status soft backgrounds use dark tinted variants (not the light-soft inverted).
- Borders stay hairlines but use `neutral-800` / `border-strong: neutral-700`.
- Elevation uses background-tint only (raised = slightly lighter than surface).
  Never add shadows in dark.

---

## Spacing

### Base unit

**4px.** Every spacing value is a multiple of 4.

### Scale

| Token | px | Use |
|---|---|---|
| `space-1`  | 4  | Tight gap (inline elements) |
| `space-2`  | 8  | Default small gap (button icon, badge padding) |
| `space-3`  | 12 | Compact padding (form inputs, table cells) |
| `space-4`  | 16 | Default container padding |
| `space-5`  | 20 | Generous container padding |
| `space-6`  | 24 | Section padding, card padding |
| `space-8`  | 32 | Section gap |
| `space-10` | 40 | Page section gap |
| `space-12` | 48 | Major section gap |
| `space-16` | 64 | Page-level vertical rhythm |

### Density

**Compact-comfortable.** Admin tables: 12px row padding. Buttons: 32px default height.
Mobile touch targets: 44px minimum (iOS) / 48px (Android MD3).

Whitespace is intentional. Functional dense, not luxurious.

---

## Layout

### Approach

**Grid-disciplined.** Strict columns, predictable alignment, no asymmetry in admin.

### Web admin

- Sidebar nav: 200-240px fixed width on desktop, collapses to icons at < 1024px
- Max content width: 1440px (no centered narrow content; admin uses full width)
- Page padding: 24px desktop, 16px tablet
- Grid: 12-column at desktop, 8 at tablet, stack at mobile
- KPI grids: 4-up at desktop, 2-up at tablet, 1-up at mobile (border between cells, no gap)

### Mobile

- Safe-area aware (notch, home indicator)
- Bottom tab bar for primary nav (MD3 NavigationBar shape, custom tokens)
- Cards: edge-to-edge with internal padding, or 16px side margin
- Lists: full-width rows with 12px vertical padding

### Border radius

| Token | px | Use |
|---|---|---|
| `radius-xs`  | 2  | Inline tags, status dots |
| `radius-sm`  | 4  | **Default** — buttons, inputs, badges, table cells, KPI tiles |
| `radius-md`  | 6  | Cards, panels |
| `radius-lg`  | 8  | Dialogs, modals |
| `radius-pill`| 9999 | **Mobile CTAs only** — never in admin |

### Borders

**1px hairlines.** Color: `neutral-200` light / `neutral-800` dark.
For emphasis: `border-strong` (neutral-300 / neutral-700).

**No drop shadows on data UI.** Elevation via background tint:
- surface (sidebar, header): `neutral-100`
- raised (cards, panels): `neutral-50` or `white`
- modal overlay: 50% black scrim, no blur

Shadows allowed only on: floating action buttons (mobile), dropdown menus,
toast notifications. Use a single subtle shadow, never layered.

---

## Motion

### Approach

**Minimal-functional.** Motion serves comprehension, not delight.

### Tokens

```css
--ease-enter: cubic-bezier(0, 0, 0.2, 1);   /* ease-out */
--ease-exit:  cubic-bezier(0.4, 0, 1, 1);   /* ease-in */
--ease-move:  cubic-bezier(0.4, 0, 0.2, 1); /* ease-in-out */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* mobile only */

--dur-micro:  80ms;   /* button states, hover */
--dur-short:  160ms;  /* dropdowns, tooltips */
--dur-medium: 240ms;  /* modals, sheets */
--dur-long:   400ms;  /* page transitions, mobile screen routes */
```

### Rules

- No autoplay or scroll-driven animation in admin
- No "AI shimmer" loading states. Use a 1px progress bar at top of viewport,
  or a skeleton in neutral-100 with no animation
- Mobile: spring easing on gestures and sheet presents (MD3-style); ease curves elsewhere
- Reduced-motion: respect `prefers-reduced-motion`, snap transitions to 0ms
- Hover transitions: opacity / background only, never transform on admin

---

## Charts

### Routing by complexity

| Library | Use for |
|---|---|
| **MUI Charts** | Simple dashboards — bar, line, pie, area. When shadcn-like ergonomics are wanted and complexity is low |
| **Apache ECharts** | Complex / interactive — heatmaps, sankey, geo maps, treemaps, large datasets, real-time updates |
| **D3** | Bespoke / custom visualizations that no library covers. Last resort |
| **Chart.js** | Quick prototypes, throwaway visualizations, simple cases where speed matters more than polish |

### Visual rules (apply to all chart libraries)

- **Color ramp:** 8-color categorical derived from amber↔cyan ↔neutrals.
  Never use library default rainbow / pastel ramps.
  Categorical sequence: amber-600, cyan-700, neutral-700, amber-400, cyan-500,
  neutral-500, amber-800, cyan-400.
- **Sequential ramp** (heatmaps, gradients): amber-50 → amber-900 OR neutral-50 → neutral-950
- **Diverging ramp** (positive/negative): error-500 ↔ neutral-300 ↔ success-500
- **Gridlines:** 1px dashed `neutral-200`, never solid
- **Axes:** `neutral-500` labels, `neutral-200` ticks
- **No 3D**, no drop shadows on bars/lines, no gradients on fills (a single
  brand-soft tint under a line is OK)
- **Tooltips:** raised surface, 1px border, IBM Plex Mono for values
- **Tabular numbers everywhere** including axis labels
- **Legends:** outside chart area, IBM Plex Mono uppercase 11px
- **Line weight:** 1.5px default, 2px for primary series

---

## Components

### Buttons

- Heights: 24 (sm), 32 (default), 40 (lg), 44 (mobile primary)
- Radius: `radius-sm` (admin), `radius-pill` (mobile primary CTA)
- Padding: horizontal 12px (sm), 16px (default), 20px (lg)
- Icon size: 16px, stroke 1.5px (Lucide)
- Focus ring: 2px solid `brand`, `outline-offset: -1px` (inset, not glow)
- Variants: `primary` (brand fill, ink text), `secondary` (raised + border-strong),
  `ghost` (transparent), `danger` (error fill)
- No gradients. No drop shadows on buttons.

### Inputs

- Height: 32px (default), 40px (large), 44px (mobile)
- Radius: `radius-sm`
- Border: 1px `border-strong`
- Focus: 2px brand outline, `outline-offset: -1px`, border becomes brand
- Padding: 12px horizontal
- Font: IBM Plex Sans body. Use IBM Plex Mono when input value is an ID, code, or number

### Cards / panels

- Background: `raised`
- Border: 1px `border`
- Radius: `radius-md`
- Header: 12-16px padding, 1px bottom border, 13px semibold title
- Body: 16-24px padding
- No shadow

### Tables

- Header: `neutral-50` (light) / `neutral-100` background, uppercase
  `text-2xs` (10px) IBM Plex Mono labels, `neutral-500` color
- Row padding: 12px vertical, 16px horizontal
- Row hover: `surface` background
- Borders: 1px hairlines between rows, none on sides
- Numeric columns: right-aligned, IBM Plex Mono tabular
- Empty cell: em-dash `—` in `neutral-500`

### Badges

- Height: ~16px (inline)
- Radius: `radius-xs`
- Font: IBM Plex Mono 10px uppercase 600, letter-spacing 0.06em
- Border + soft background + saturated text in the same hue
- Variants: success / warning / error / info / neutral

### Icons

- **Lucide only** in admin (web). Stroke 1.5px, 16px default.
- Mobile: Material Symbols (rounded, 24dp) for system iconography.
- No emoji in UI chrome. No emoji in alerts.

---

## Cross-platform consistency

### Shared tokens (single source)

All platforms consume the same JSON tokens (see `tokens/` if generated).
Tokens compile to:
- Tailwind config (web)
- NativeWind theme (mobile)
- CSS custom properties (web runtime)

### Platform divergences (intentional)

| Decision | Web admin | Mobile |
|---|---|---|
| Primary radius | 4-6px | 8-12px, pill CTAs |
| Touch targets | 32px buttons | 44/48px minimum |
| Navigation | Sidebar | Bottom tab bar (MD3 NavigationBar) |
| Density | Compact (12px rows) | Comfortable (16-20px rows) |
| Motion | Ease curves | Spring on gestures, ease elsewhere |
| Shadows | None on data | MD3 elevation 1-3 on FAB, sheets |

The tokens are shared; the application is platform-aware.

---

## Anti-Slop Guarantees

This system **refuses** to produce:

- Purple / violet gradients
- Glassmorphism / backdrop-blur cards
- Gradient buttons or CTAs
- "Built for X" / "Designed for Y" marketing-copy patterns
- 3-column feature grids with icons in colored circles
- Centered-everything layouts in admin
- Uniform bubbly border-radius (radius is hierarchical, not blanket-applied)
- Emoji in UI chrome
- Drop shadows on data panels
- AI-shimmer loading states
- Oversized hero numbers (KPI hard cap 32px)
- `system-ui` / `-apple-system` as primary display font
- Rainbow / pastel categorical chart ramps (library defaults)
- Inter, Roboto, Helvetica, Open Sans, Lato, Montserrat, Poppins, Space Grotesk
  as primary type
- Pill buttons in admin (mobile primary CTA only)

When a design choice doesn't fit, the answer is **less** — less color, less motion,
less decoration — not more.

---

## Tech mapping

### Web admin

Three approved frameworks. Pick per-project. Tokens, fonts, colors, motion, anti-slop
rules apply identically. Component primitives are framework-specific.

#### Framework choice

| Framework | When to pick |
|---|---|
| **Next.js (React)** | Default for new projects. SSR/RSC, App Router, full-stack co-located with API routes. Use when SEO, ISR, or server components matter |
| **React + Vite** | SPA admin tools. No SSR needed. Lighter, faster dev cycle. Use when the admin lives behind auth and isn't crawled |
| **Angular** | When team prefers opinionated framework, strong typing across DI graph, or when integrating with Angular-heavy backends. Use Angular 17+ with standalone components and signals |

#### Shared

- **Styling:** Tailwind CSS, configured with these tokens
- **Charts:** MUI Charts / ECharts / D3 / Chart.js per routing table above
  - Note: MUI Charts is React-only. For Angular, swap to ECharts or ngx-charts at the simple-tier
- **Icons:** Lucide (lucide-react / lucide-angular)
- **Fonts:** IBM Plex Sans + IBM Plex Mono via Google Fonts CDN or self-hosted

#### Framework-specific primitives

| Concern | Next.js / React+Vite | Angular |
|---|---|---|
| Component library | **shadcn/ui** (override tokens, no default palette) | **Spartan UI** (`@spartan-ng/ui-*`) — shadcn port for Angular |
| Forms | React Hook Form + Zod | Angular Reactive Forms + Zod (via `ngx-zod`) or built-in validators |
| Tables | TanStack Table | TanStack Table (Angular adapter) or Angular CDK Table |
| Routing | Next.js App Router / TanStack Router | Angular Router (standalone routes) |
| State | Zustand / React Query / RSC | Signals + RxJS / TanStack Query Angular |
| Animation | Framer Motion / CSS | Angular Animations API / CSS |

**Do not use Angular Material as primary component library.** It enforces MD3
visual language which clashes with our Bloomberg aesthetic. Use Spartan UI so the
visual system stays consistent with the React projects.

### Mobile

- **Framework:** React Native + Expo
- **Styling:** NativeWind (Tailwind tokens shared with web)
- **Components:** React Native Paper or react-native-material-you for MD3 scaffolding,
  styled with NativeWind to apply brand tokens
- **Charts:** Victory Native or react-native-svg-charts with these tokens applied
- **Icons:** Material Symbols + Lucide React Native
- **Fonts:** `@expo-google-fonts/ibm-plex-sans` and `@expo-google-fonts/ibm-plex-mono`

---

## Decisions Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-16 | Initial system created via `/design-consultation` | Solo dev unified design across mobile + web admin projects |
| 2026-05-16 | Functional-dense aesthetic | Memorable anchor: "pro tool feel, serious work, serious software" |
| 2026-05-16 | IBM Plex Sans + IBM Plex Mono | Engineered for IBM enterprise products; identical metrics across sans + mono; distinctive without decoration |
| 2026-05-16 | Warm graphite neutrals | Anti-slop — cold slate signals AI dashboard |
| 2026-05-16 | Signal amber primary `#E8A317` | Instrument-panel feel; every dashboard is blue |
| 2026-05-16 | Restrained 4-8px radius | Bloomberg-feel without harsh corners |
| 2026-05-16 | 1px hairlines, no shadows on data | Density and screenshot clarity |
| 2026-05-16 | Charts routed by complexity (MUI / ECharts / D3 / Chart.js) | Right tool per job; shared visual ruleset |
| 2026-05-16 | Web admin frameworks: Next.js / React+Vite / Angular | Pick per-project; tokens shared; Spartan UI for Angular to preserve visual system |

## References

- **Preview page:** `preview.html` in this repo (open in browser to inspect tokens live)
- **IBM Plex Sans:** https://fonts.google.com/specimen/IBM+Plex+Sans
- **IBM Plex Mono:** https://fonts.google.com/specimen/IBM+Plex+Mono
- **Lucide:** https://lucide.dev
- **shadcn/ui:** https://ui.shadcn.com
- **Apache ECharts:** https://echarts.apache.org
- **MUI X Charts:** https://mui.com/x/react-charts/
