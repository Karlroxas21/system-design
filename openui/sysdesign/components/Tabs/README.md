# Tabs

Switches between sibling views in one place: a segmented rail with a raised active pill, or a clear row of text tabs where the active one turns heavier and darker.

## Use

- **Rail** (default): 2 to 5 views of the same thing (Overview, Activity, Settings), or a range switch on a chart.
- **Clear** (`openui-tabs-clear` on the wrapper): section navigation inside a page header, where the rail would feel heavy.
- More than 5 views or labels longer than two words: use a Select or side navigation.

## Markup

```html
<div class="openui-tabs">
  <div class="openui-tabs-list" role="tablist" aria-label="Report">
    <button class="openui-tabs-trigger" role="tab" aria-selected="true">Overview</button>
    <button class="openui-tabs-trigger" role="tab" aria-selected="false">Activity</button>
  </div>
  <div role="tabpanel">…</div>
</div>
```

The consumer provides: `aria-selected` (or Radix's `data-state="active"`), the panels, arrow-key handling.

## Details

- Rail: `openui-sunk` track, `openui-space-2xs` inset, `openui-radius-l`. Triggers are at least 7.3rem wide and share the width.
- Active pill: `openui-elevated` fill, `openui-border-default` edge, `openui-shadow-s`, `openui-text-neutral-primary`. Idle triggers use `openui-text-neutral-secondary`.
- Clear tabs sit `openui-space-l` apart with `openui-space-s` vertical padding; active weight is 560.

Hand-written from `packages/react-ui/src/components/Tabs/tabs.scss`.
