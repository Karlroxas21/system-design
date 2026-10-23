# TextArea

A multi-line text field that shares Input's fill, border and focus halo, with rounder `openui-radius-xl` corners.

## Use

- Notes, descriptions, messages, prompts: anything that may run past one line.
- Set `rows` to the expected length (3 for a summary, 6+ for a long note). Resizing is off by default; grow it with script if needed.

## Markup

```html
<textarea class="openui-textarea" rows="3" placeholder="Describe what changed"></textarea>
```

The consumer provides: `id` with a FormControl label, `rows`, and `openui-input-error` for validation errors.

Padding is `openui-space-s` × `openui-space-m`; focus, error and disabled states match Input.

Hand-written from `packages/react-ui/src/components/TextArea/textArea.scss`.
