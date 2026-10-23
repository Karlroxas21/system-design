# FormControl

The wrapper that stacks a Label, one field and a Hint with `openui-space-s` between them; every form field goes inside one.

## Use

- Every Input, TextArea and Select in a form. Checkbox, Radio and Switch carry their own labels and skip it.
- Lay forms out in one column; put two FormControls side by side only for short paired values (first/last name, city/postcode).

## Markup

```html
<div class="openui-form-control">
  <label class="openui-label" for="name">Workspace name<span class="openui-label-required-asterisk">*</span></label>
  <input class="openui-input" id="name" aria-describedby="name-hint">
  <p class="openui-hint" id="name-hint">Shown on invoices and invite emails.</p>
</div>
```

The consumer provides: matching `for`/`id`, `aria-describedby` pointing at the hint, and the error swap (`openui-hint-error` + `openui-input-error` + `aria-invalid`).

## Copy

- Labels are nouns in sentence case, no colon.
- Hints say what the value is used for. Error hints say what to change ("Use letters, numbers and dashes only."), never just "Invalid".

## Parts

- **Label** (`openui-label`): `body-default`, `openui-text-neutral-primary`; `openui-label-disabled` for disabled fields.
- **Hint** (`openui-hint`): `body-sm`, `openui-text-neutral-secondary`; `openui-hint-error` switches to `openui-text-danger-primary`.

Hand-written from `packages/react-ui/src/components/FormControl`, `Label` and `FormControl/Hint`.
