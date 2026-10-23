# Skeleton

Placeholder bars in `openui-elevated` that pulse between 30% and 85% opacity every 1.2s while content loads.

## Use

- Any block whose shape you know before its data arrives: text lines, table rows, chart areas.
- Match the bars to the real layout (a title bar ~45% wide, then body lines at 100%, 92%, 60%).
- For loads under 300ms, show nothing; for unknown-shape waits, use a spinner or progress text.

## Markup

```html
<div class="openui-skeleton-stack" aria-busy="true" aria-label="Loading report">
  <div class="openui-skeleton-bar" style="height:20px;width:45%"></div>
  <div class="openui-skeleton-bar" style="height:14px;width:100%"></div>
</div>
```

The consumer provides: bar sizes, `aria-busy` on the region, and the swap to real content.

Bars use `openui-radius-s`, stack with `openui-space-s` gaps, and stop pulsing under `prefers-reduced-motion`. Chart placeholders use `openui-elevated-strong`.

Hand-written from `packages/react-ui/src/components/Skeleton/skeleton.scss`.
