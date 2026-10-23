# Select

A trigger that opens a floating list of options, with OpenUI's shared menu surface: a 1px ink ring, layered soft shadows, 32px full-bleed rows and `openui-radius-2xl` corners.

## Use

- Pick one of 4 to 15 known options (region, role, currency). Fewer than 4: use Radio. More than 15: add search.
- The same menu surface (`openui-select-content`, `openui-select-item`, `openui-select-label`) serves dropdown menus.

## Markup

```html
<button class="openui-select-trigger" data-placeholder>Choose a region <svg chevron/></button>
<div class="openui-select-content" role="listbox">
  <div class="openui-select-label">Regions</div>
  <div class="openui-select-item" role="option" aria-selected="true">US East <svg check/></div>
</div>
```

The consumer provides: open/close behaviour and positioning (Radix Select, Floating UI or a native `<select>` styled with the trigger class), `data-state="open"` on the trigger while open (flips the chevron), `data-placeholder` while nothing is chosen, and `data-highlighted` on the keyboard-active row.

## Details

- Trigger rests on `openui-highlight-subtle` with an `openui-border-default` edge; hover and open use `openui-highlight` and `openui-border-interactive`.
- Menu rows inset text by `openui-space-m-l`; the group label is 12px at 60% ink.
- The chevron rotates 180° over 200ms.

Hand-written from `packages/react-ui/src/components/Select/select.scss` and `components/_menu.scss`.
