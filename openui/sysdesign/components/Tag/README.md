# Tag

A short tinted label for status or category: a translucent tone ground with matching tone text.

## Use

- Status of a record (Paid, Overdue, In review) or a category (Design, Beta). One or two words.
- Tone means status, never decoration: neutral = no state, info = in progress, success = done, warning = needs attention soon, danger = failed or overdue. Purple and pink are for categories only.
- Use the same word and tone for the same state across every app.

## Markup

```html
<span class="openui-tag openui-tag-sm openui-tag-success"><svg …/>Paid</span>
```

The consumer provides: the text, one tone class (`-neutral`, `-info`, `-success`, `-warning`, `-danger`, `-purple`, `-pink`), one size class, and optionally a 14px Lucide icon first.

| Size | Height | Padding | Radius |
|---|---|---|---|
| `-sm` | 24px | `openui-space-2xs` × `openui-space-xs` | `openui-radius-s` |
| `-md` | 32px | `openui-space-xs` × `openui-space-s` | `openui-radius-s` |
| `-lg` | 36px | `openui-space-s` × `openui-space-m` | `openui-radius-m` |

Text is `label-sm`; long text truncates with an ellipsis.

## Don't

- Don't tell success and danger apart by color alone in tables; the word carries it.
- Don't make tags clickable; use a Button or a filter chip.

Hand-written from `packages/react-ui/src/components/Tag/tag.scss` (purple and pink tones added from the system's purple/pink tokens).
