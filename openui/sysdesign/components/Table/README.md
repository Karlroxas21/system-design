# Table

A data table inside a hairline frame with `openui-radius-2xl` corners, secondary-ink headers, hairline row dividers and faint zebra striping.

## Use

- Records people scan and compare: invoices, members, events. For fewer than four fields per record, a list may read better.
- Put status in a small Tag, figures right-aligned with tabular numerals (`openui-table-align-right`).

## Markup

```html
<div class="openui-table-container">
  <table class="openui-table">
    <thead><tr><th>Invoice</th><th class="openui-table-align-right">Amount</th></tr></thead>
    <tbody><tr><td>INV-2048</td><td class="openui-table-align-right">$1,250.00</td></tr></tbody>
  </table>
</div>
```

The consumer provides: semantic `<table>` markup, column alignment classes, and sorting or pagination if needed.

## Details

- Cells pad `openui-space-m` on all sides, text `body-sm`, no wrapping (the container scrolls sideways).
- Headers use `openui-text-neutral-secondary` at regular weight, divided from the body by `openui-border-default`.
- Even rows fill with `openui-highlight-subtle`.

Hand-written from `packages/react-ui/src/components/Table/table.scss`, simplified to element selectors.
