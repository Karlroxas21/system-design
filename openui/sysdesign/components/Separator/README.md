# Separator

A 1px `openui-border-default` hairline that divides groups, horizontally between sections or vertically between inline items.

## Use

- Between groups in a menu, between a header and its content, between stats in a meta row.
- Prefer spacing first; reach for a separator only when spacing alone leaves groups ambiguous.

## Markup

```html
<hr class="openui-separator" data-orientation="horizontal">
<span class="openui-separator" data-orientation="vertical" role="separator" aria-orientation="vertical"></span>
```

The vertical form stretches to its flex row's height.

Hand-written from `packages/react-ui/src/components/Separator/separator.scss`.
