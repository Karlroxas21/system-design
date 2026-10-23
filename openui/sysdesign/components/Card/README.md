# Card

A grouping surface with `openui-space-xl` between its blocks and `openui-radius-3xl` corners, in three treatments: raised, sunk and clear.

## Use

- **Raised** (`openui-card-raised`): the default panel in app layouts: a white `openui-foreground` surface with an `openui-border-default` hairline, set on the `openui-background` canvas. No shadow; the tone step and hairline do the lifting.
- **Sunk** (`openui-card-sunk`): a recessed `openui-sunk` well with `openui-shadow-m`, for secondary info beside a raised card or inside one.
- **Clear** (`openui-card-clear`): no surface, only the gap and side padding, for grouping inside an existing surface.
- `openui-card-card` is OpenUI's bare card (no surface of its own) used inside chat responses.

## Markup

```html
<section class="openui-card openui-card-raised">
  <header>…title, meta…</header>
  …content…
  <div>…actions…</div>
</section>
```

The consumer provides: the content blocks (title in `heading-sm`, meta in `body-sm` secondary, actions as small Buttons), and the width (cards fill their grid track; OpenUI's `openui-card-standard` sets 80%, `openui-card-full` 100%).

## Don't

- Don't nest raised cards; nest a sunk or clear card instead.
- Don't add colored left borders or gradient headers.
- Don't give every block on a page a card. Use cards where content is a separate object.

Hand-written from `packages/react-ui/src/components/Card/card.scss`; `openui-card-raised` is a Graphite addition (see README).
