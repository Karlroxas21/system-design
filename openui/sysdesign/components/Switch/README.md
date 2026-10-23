# Switch

A compact 24 × 16px on/off toggle for settings that take effect the moment they change.

## Use

- Preferences and feature flags that apply without a Save button. If the change waits for Save, use Checkbox.
- The label names the setting, not the state ("Public status page", not "Enable public status page").

## Markup

```html
<label class="openui-switch-item-container">
  <input type="checkbox" role="switch" class="openui-switch-item-root">
  <span class="openui-item-content"><span class="openui-item-label">Public status page</span></span>
</label>
```

The consumer provides: a native checkbox with `role="switch"` (or Radix Switch), label, optional description, `disabled`.

## Details

- Off: `openui-sunk` track, `openui-border-default` edge (hover: `openui-border-interactive`).
- On: `openui-interactive-accent-default` track, `openui-border-accent` edge.
- Thumb: 10px `openui-foreground` disc with `openui-shadow-s`, sliding 8px over 150ms `cubic-bezier(0.4, 0, 0.2, 1)`; motion is removed under `prefers-reduced-motion`.

Hand-written from `packages/react-ui/src/components/SwitchItem/switchItem.scss`.
