# Callout

An inline message marked by a 2px left rule in a tone color, a tone-colored title and neutral body text, with no box or fill.

## Use

- Page- or section-level feedback that stays in the flow: a sync running, a payment problem, a failed export, a tip.
- Tones: info (something is happening), success (it worked), warning (act soon), danger (it failed), neutral (a tip).
- For a field-level error, use the FormControl hint instead.

## Markup

```html
<div class="openui-callout openui-callout-danger" role="alert">
  <span class="openui-callout-title">Export failed</span>
  <span class="openui-callout-description">The file was over 50 MB. Narrow the date range and try again.</span>
</div>
```

The consumer provides: one tone class, a short title (what happened), a description (what to do next), and the right role: `alert` for danger, `status` for success, `note` otherwise.

## Details

- Rule: `openui-border-<tone>-emphasis` (neutral uses `openui-border-interactive-selected`).
- Title: `body-default-heavy` in `openui-text-<tone>-primary`. Description: `body-default` in `openui-text-neutral-primary`.
- Horizontal padding is `openui-space-m` + 2px. OpenUI also offers auto-dismiss: fade over 400ms after a delay set by `--callout-duration` (default 3000ms).

Hand-written from `packages/react-ui/src/components/Callout/callout.scss`.
