# Graphite

A design system for my apps, built from the theme of [OpenUI](https://github.com/thesysdev/openui) (MIT, `packages/react-ui`, commit `c9f93b6`). Token values and names are OpenUI's own (`--openui-*`), so anything styled here also matches OpenUI's React components. Everything is local: no CDN, no font service.

## Use it in an app

Copy the `dist/` folder into the app (keep `graphite.css` and `fonts/` together) and add `openui-root` to `<body>`:

```html
<link rel="stylesheet" href="graphite.css">
<body class="openui-root">
  <button class="openui-button-base openui-button-base-primary openui-button-base-medium">Save changes</button>
</body>
```

- Dark mode follows the OS. Set `data-theme="dark"` or `data-theme="light"` on `<html>` to force one.
- Type styles are classes: `openui-text-body-sm`, `openui-text-heading-md`, `openui-text-numbers-default`, etc.
- Component markup and usage rules are in `components/<Name>/README.md`; open `components/<Name>/preview.html` in a browser to see each one.

## Layout

| Path | What |
|---|---|
| `tokens.json` | Source of truth for every token (colors per theme, type, spacing, radius, shadow) |
| `components/bundle.css` | Component styles (plain CSS recreation of OpenUI's SCSS) |
| `components/<Name>/` | Guidelines (`README.md`) and a preview page (`preview.html`) per component |
| `GUIDELINES.md` | Usage rules: color, type, spacing, states, iconography |
| `fonts/` | Inter variable font (`InterVariable.woff2`), copied into `dist/fonts` on build |
| `scripts/build-css.mjs` | Compiles tokens + components into `dist/graphite.css` |
| `dist/` | What apps use (generated) |
| `examples/shop/` | Sample e-commerce site in React + Material UI themed with Graphite (`npm install && npm run dev`) |

## Change something

Edit `tokens.json` or `components/bundle.css`, then rebuild:

```sh
node scripts/build-css.mjs
```
