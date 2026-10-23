# Checkbox

A 16px square toggle for independent yes/no choices, filled with `openui-interactive-accent-default` when checked.

## Use

- Settings and multi-select lists where each option stands alone. For a setting that takes effect immediately, use Switch.
- Stack several in a column with `openui-space-s` between rows (a checkbox group).

## Markup

```html
<label class="openui-checkbox-item-container">
  <input type="checkbox" class="openui-checkbox-item-root">
  <span class="openui-item-content">
    <span class="openui-item-label">Email me a weekly summary</span>
    <span class="openui-item-description">Optional second line.</span>
  </span>
</label>
```

The consumer provides: a native checkbox (or Radix Checkbox with the same class), the label, an optional description, and `disabled`.

## Details

- Box: `openui-radius-xs`, 1px `openui-border-interactive`; hover fills with `openui-sunk`.
- The tick is drawn in `openui-text-accent-primary`.
- Label uses `body-default`; description uses `openui-text-neutral-secondary`.
- The box sits 4px down (`openui-space-2xs`) so it lines up with the label's first line.

Hand-written from `packages/react-ui/src/components/CheckBoxItem/checkBoxItem.scss`, adapted to a native input.
