Graphite is a quiet, ink-on-paper interface system: near-white and near-black surfaces built from translucent layers of one neutral ink, Inter at in-between weights, small radii, almost-flat shadows, and a single blue reserved for the primary action. It is OpenUI's react-ui theme (thesysdev/openui) taken whole, so every value here is OpenUI's own and every token keeps OpenUI's `--openui-` name. Apps styled with Graphite and OpenUI's React components share one theme.

## Principles

- **Ink, not color.** Almost everything is the neutral ink at some opacity. Text, borders, fills and hovers are `oklch(0.097 0 0)` at 100%, 60%, 20%, 8%, 6%, 4% or 2% in light, and the same off-white in dark. Hue appears only as `openui-interactive-accent-default` (blue) and the status tones.
- **Layers, not boxes.** Depth comes from a two-step surface (`openui-background` canvas, `openui-foreground` panels) and translucent fills (`openui-sunk-*`, `openui-elevated-*`, `openui-highlight-*`) that tint whatever sits beneath them. Hairlines are 6% ink. Shadows are barely there.
- **One loud thing.** A view gets one primary button. Everything else is secondary, tertiary or text.

## Content fundamentals

- Sentence case everywhere: buttons, tabs, labels, titles ("New project", "Invite teammates").
- Buttons start with a verb and say exactly what happens ("Delete project", not "OK"). A success message repeats the verb in past tense ("Invoice sent").
- Address the reader as "you"; the product speaks as "we" only for work it is doing ("We're importing 1,240 contacts").
- Errors say what went wrong and what to do: "The file was over 50 MB. Narrow the date range and try again." No apologies, no "Oops".
- Numbers are exact and formatted: `$48,210`, `38.2 GB of 50 GB`, `1,240 contacts`. Dates as "30 November" or "2 hours ago".
- No emoji in UI copy.

## Color

- Page canvas: `openui-background`. Panels, cards, composer: `openui-foreground`. Menus and popovers: `openui-popover-background`. Modal scrim: `openui-overlay`.
- `openui-foreground` is a surface, not a text color. Text always comes from the `openui-text-*` family.
- Body text `openui-text-neutral-primary`; supporting text `openui-text-neutral-secondary` (4.5:1 or better on both surfaces in both themes); `openui-text-neutral-tertiary` for disabled only.
- Recessed areas (tab rails, neutral tags, disabled fields): `openui-sunk`. Stacked fills (active tab, skeletons): `openui-elevated`. Hover and pressed washes: `openui-highlight`. Field fills: `openui-highlight-subtle`.
- Primary action: `openui-interactive-accent-default` with `openui-text-accent-primary` on it (5.1:1). Hover drops to 80% (`-hover`), disabled to 40% (`-disabled`).
- Destructive: solid `openui-interactive-destructive-accent-default` with `openui-text-danger-inverted-primary` (4.6:1) for the confirm button only; the faint `openui-interactive-destructive-*` washes for entry points.
- Status pairs: `openui-<tone>-background` ground with `openui-text-<tone>-primary` text, and `openui-border-<tone>-emphasis` for rules. Tones: info (blue), success (green), alert (amber, called "warning" in components), danger (red), plus purple and pink for categories. Always pair a status color with a word or icon.
- `openui-text-brand` is blue text for light surfaces. In dark it falls to about 3.5:1, so use it only at 24px+ there or swap to `openui-text-info-primary`.
- Charts use the `chart-ocean-*` blue ramp: pick evenly spaced steps from the middle out; steps 9 to 11 are fills only.
- Dark mode: set `data-theme="dark"` on `<html>`, or leave it unset to follow the OS. Every token is redefined; nothing needs a second class.

## Typography

- One family, Inter (`--font-sans`), served locally as a variable font from `fonts/InterVariable.woff2` (an installed Inter wins; without either, text falls back to the system UI face). Code uses `--font-mono` (SF Mono, Menlo, Consolas).
- Regular text renders at weight 440 and emphasis at 560, between the usual 400/500/600 steps. Headings use 600 (700 for `heading-xl`).
- Letter-spacing is a slight `-0.01em` throughout; `heading-lg` and `heading-xl` use `-0.1px`.
- Body styles (`body-xs` 12, `body-sm` 14, `body-default` 16, `body-lg` 18) run at 1.5 line height. Labels (`label-*`) are the same sizes at 1.25 for single-line UI text. Headings: `heading-xs` 16, `heading-sm` 18, `heading-md` 24, `heading-lg` 28, `heading-xl` 32.
- Use `numbers-*` styles for figures and turn on `font-variant-numeric: tabular-nums` in columns.
- Default UI text is `body-default` (16px). Dense surfaces (tables, hints, small buttons) step down to 14px.

## Spacing and layout

- The spacing scale is irregular on purpose: `openui-space-3xs` 2, `2xs` 4, `xs` 6, `s` 8, `s-m` 10, `m` 12, `m-l` 16, `l` 18, `xl` 24, `2xl` 36, `3xl` 48px.
- Inside controls: `openui-space-xs` icon-to-label, `openui-space-s`/`s-m` horizontal padding. Between a label and its field: `openui-space-s`. Card padding: `openui-space-l`. Between blocks in a card: `openui-space-xl`. Between page sections: `openui-space-2xl` to `3xl`.
- Lay groups out with flex/grid `gap`, not margins.

## Radii, borders, shadows

- Radii grow with the object: checkbox `openui-radius-xs` 4, tag `-s` 6, input and medium button `-m` 8, default button and tab rail `-l` 10, textarea `-xl` 12, table and menu `-2xl` 14, card `-3xl` 16, pills `-full`.
- Borders are 1px. Hairlines `openui-border-default`; control outlines `openui-border-interactive`; focused field `openui-border-interactive-emphasis`; selected `openui-border-interactive-selected`.
- Shadows stay subtle: `openui-shadow-s` for the active tab and switch thumb, `-m` for resting buttons and sunk cards (buttons lose it on hover), `-xl` for menus, `-2xl` for modals.

## Motion and states

- Buttons transition every property over 120ms ease; fields transition border, shadow and fill over 160ms; switches slide over 150ms `cubic-bezier(0.4, 0, 0.2, 1)`; the select chevron turns over 200ms.
- Hover lightens a fill or adds a wash and removes the resting shadow. Pressed returns to full accent. Disabled drops to tertiary text or a 40% accent, with `cursor: not-allowed`.
- Field focus: border to `openui-border-interactive-emphasis` plus a 2.5px `openui-border-default` halo. Field error: `openui-border-danger-emphasis` border plus a 2.5px `openui-border-danger` halo.
- Keyboard focus on buttons, tabs, links and toggles: a solid 2px `openui-border-interactive-selected` outline at 2px offset (full ink, well above 3:1 on every surface).
- Respect `prefers-reduced-motion`: skeletons stop pulsing and switches stop sliding.

## Iconography

- Lucide (`lucide-react` in React, or inline Lucide SVG): 24px grid, 2px stroke, round caps and joins, `currentColor`.
- 16px inside buttons, inputs and menus; 14px in tags (stroke 2.5); 1em in text buttons.
- Icons lead their label. A trailing chevron marks a menu. Icon-only buttons need an `aria-label`.
- No logo ships with Graphite; set each app's name in `heading-sm` or `label-default-heavy`.

## Intentional additions

These are not in OpenUI and are marked in `components/bundle.css`:

- `:focus-visible` outline on buttons, tabs, links and toggles. OpenUI ships no visible keyboard focus on buttons; accessibility needs one.
- `openui-card-raised`: a `openui-foreground` panel with a hairline, because OpenUI's own card has no surface outside its chat layout and app layouts need one.
- Purple and pink Tag tones, built from the system's existing purple and pink tokens.
- Checkbox, Radio and Switch styled on native inputs instead of Radix primitives, so they work without React.

## Not synced

- Components are plain-CSS recreations of OpenUI's SCSS (static previews), not OpenUI's React bundle. Recreated: Button, IconButton, Input, TextArea, Select, Checkbox, Radio, Switch, FormControl (with Label and Hint), Tag, Callout, Card, Table, Tabs, Separator, Skeleton.
- Not recreated: Accordion, Calendar, DatePicker, Carousel, Charts (13 types), Chips, Modal, Slider, Steps, ToggleGroup, Tooltip, CodeBlock, Image and gallery blocks, Markdown renderers, ListBlock, and the chat surfaces (OpenUIChat, AgentInterface, ToolCall, FollowUpBlock, Sources and the card blocks).
- The heatmap's diverging chart ramps (`DIVERGING_DEFAULT_LIGHT`/`DARK`) are not tokens here.
- OpenUI's dark theme renders regular text at weight 420 instead of 440; the type styles record the light value.
- Control outlines (`openui-border-interactive`, about 1.3:1) fall below the 3:1 non-text contrast floor. They are OpenUI's values, kept exact; controls stay findable through fill and label.
