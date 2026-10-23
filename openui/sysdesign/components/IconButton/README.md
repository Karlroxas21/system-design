# IconButton

A square or round button holding one 16px icon, for toolbar actions and the send button of a composer.

## Use

- Toolbars, table row actions, card corners, and the chat composer's send button (primary, round).
- Always give it an `aria-label` that names the action ("Download report"), since there is no visible text.
- Use a labelled Button instead when the icon alone would make people guess.

## Markup

```html
<button class="openui-icon-button openui-icon-button-secondary openui-icon-button-medium" aria-label="Download report">
  <svg …/>
</button>
```

Variants match Button: `-primary`, `-secondary`, `-tertiary`. Add `openui-icon-button-circle` for the round form.

| Size | Box | Icon | Radius |
|---|---|---|---|
| `-extra-small` | 28px | 14px | `openui-radius-s` |
| `-small` | 32px | 16px | `openui-radius-s` + 1px |
| `-medium` | 36px | 16px | `openui-radius-m` |
| `-large` | 40px | 16px | `openui-radius-l` |

## Don't

- Don't mix sizes inside one toolbar.
- Don't use primary for more than one icon button in a view.

Hand-written from `packages/react-ui/src/components/IconButton/iconButton.scss`.
