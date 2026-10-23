# Radio

A 16px round control for choosing exactly one option from two to five that should all be visible at once.

## Use

- Billing cycle, export format, visibility. Past five options, use Select.
- Wrap the set in an element with `role="radiogroup"` and an `aria-label`, or a `<fieldset>` with a `<legend>`.

## Markup

```html
<label class="openui-radio-item-container">
  <input type="radio" name="cycle" class="openui-radio-item-root" checked>
  <span class="openui-item-content">
    <span class="openui-item-label">Monthly</span>
    <span class="openui-item-description">$24 per seat, cancel anytime.</span>
  </span>
</label>
```

The consumer provides: native radios sharing a `name`, labels, optional descriptions.

## Details

- Unchecked: `openui-foreground` fill, `openui-border-interactive` ring.
- Checked: an `openui-interactive-accent-default` ring around a 6px `openui-foreground` center, edged by `openui-border-accent`.
- Disabled renders at 50% opacity.

Hand-written from `packages/react-ui/src/components/RadioItem/radioItem.scss`; OpenUI draws the dot with an SVG, recreated here with a radial fill on a native input.
