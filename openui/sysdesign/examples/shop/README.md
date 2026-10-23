# Inkwell — Graphite sample store

A sample e-commerce site (desk goods and stationery) built with React, Material UI and the Graphite design system. Everything runs locally; product images are drawn from Lucide icons, not fetched.

## Run

```sh
node ../../scripts/build-css.mjs   # only if dist/graphite.css is missing or tokens changed
npm install
npm run dev                        # http://localhost:5173
npm run build                      # type-check + production build into dist/
```

## How Graphite reaches MUI

| File | Role |
|---|---|
| `src/main.tsx` | Imports `../../../dist/graphite.css`: every `--openui-*` token for light and dark, plus the self-hosted Inter |
| `src/tokens.ts` | Reads `../../../tokens.json`. `ui("space-m")` gives a token's CSS variable; `rgba("…", mode)` converts an oklch token for MUI's palette math; `typeStyle("body-sm")` returns a type style |
| `src/theme.tsx` | `createGraphiteTheme(mode)`: palette, typography and shadows from tokens, plus overrides that give MUI's Button, OutlinedInput, Select/Menu, Checkbox, Radio, Switch, Chip, Card, Tabs, Alert, Snackbar, Tooltip, Badge, Slider, Dialog and Drawer the Graphite look |
| `src/App.tsx` | Sets `data-theme` on `<html>`, which switches graphite.css between light and dark in step with the MUI theme |

Component styles use CSS variables, so a token change in `tokens.json` (after `node scripts/build-css.mjs`) restyles the shop without touching its code.

## What's in the store

- Catalog with category tabs, search, price slider, availability filters and sorting
- Product dialog with color swatches, quantity and add to cart
- Cart drawer with quantity steppers, remove, free-shipping nudge and totals
- Checkout form with validation, delivery options and an order summary
- Order confirmation, and a light/dark toggle that remembers the choice

It is a demo: no payment is taken and products and prices are made up.
