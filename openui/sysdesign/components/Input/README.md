# Input

A single-line text field on a faint `openui-highlight-subtle` fill with an `openui-border-interactive` outline.

## Use

- Any one-line value: names, emails, URLs, search. Wrap it in a FormControl so it has a visible label and a hint.
- Sizes: `openui-input-small` (dense filters), default (forms), `openui-input-large` (hero search, sign-in).

## Markup

```html
<input class="openui-input" placeholder="Search projects">
<input class="openui-input openui-input-error" aria-invalid="true">
```

The consumer provides: `id` and a `<label for>`, `placeholder` only as an example value (never as the label), and `aria-invalid` plus `openui-input-error` when validation fails.

## States

- Focus: border goes to `openui-border-interactive-emphasis` and a 2.5px `openui-border-default` halo appears.
- Error: `openui-border-danger-emphasis` border with a 2.5px `openui-border-danger` halo; put the reason in a Hint below.
- Disabled: `openui-sunk` fill, `openui-text-neutral-tertiary` text.
- Placeholder text uses `openui-text-neutral-secondary`.

## Don't

- Don't rely on the halo alone to show focus on low-contrast screens; the border change carries it.
- Don't put helper text inside the field.

Hand-written from `packages/react-ui/src/components/Input/input.scss`.
