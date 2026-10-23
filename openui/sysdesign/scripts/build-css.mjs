// Compile tokens.json + components/bundle.css into dist/graphite.css, copying font files into dist/fonts.
// usage: node scripts/build-css.mjs
import fs from "node:fs";

const root = new URL("..", import.meta.url);
const read = (p) => fs.readFileSync(new URL(p, root), "utf8");
const tokens = JSON.parse(read("tokens.json"));
const components = read("components/bundle.css");

const [first, ...rest] = tokens.color.themes.map((t) => t.id);
const valueIn = (value, theme) => (typeof value === "string" ? value : (value[theme] ?? value[first]));
const cssValue = (v) => v.replace(/^\{(.+)\}$/, "var(--$1)");
const decl = (name, v) => `  --${name}: ${cssValue(v)};`;

const themed = [...tokens.color.tokens, ...(tokens.shadow?.tokens ?? [])];
const plain = [...tokens.spacing.tokens, ...tokens.radius.tokens];

const lightBlock = [
  ...themed.map((t) => decl(t.name, valueIn(t.value, first))),
  ...plain.map((t) => decl(t.name, String(t.value))),
  ...Object.entries(tokens.type.families).map(([key, stack]) => `  --font-${key}: ${stack};`),
  `  color-scheme: ${first};`,
].join("\n");

const themeBlock = (theme) =>
  [
    ...themed
      .filter((t) => typeof t.value !== "string" && t.value[theme] && t.value[theme] !== t.value[first])
      .map((t) => decl(t.name, t.value[theme])),
    `  color-scheme: ${theme};`,
  ].join("\n");

const typeClasses = tokens.type.groups
  .flatMap((group) =>
    group.styles.map((s) => {
      const family = `var(--font-${s.family ?? group.family})`;
      const lines = [
        `  font: ${s.fontWeight} ${s.fontSize}/${s.lineHeight} ${family};`,
        s.letterSpacing ? `  letter-spacing: ${s.letterSpacing};` : null,
        group.name === "Numbers" ? "  font-variant-numeric: tabular-nums;" : null,
      ].filter(Boolean);
      return `.openui-text-${s.name} {\n${lines.join("\n")}\n}`;
    }),
  )
  .join("\n");

// Fonts are served from dist/fonts; an installed copy of the face wins, and a missing file falls back to the stack.
fs.mkdirSync(new URL("dist/fonts/", root), { recursive: true });
for (const file of fs.readdirSync(new URL("fonts/", root)).filter((f) => f.endsWith(".txt"))) {
  fs.copyFileSync(new URL(`fonts/${file}`, root), new URL(`dist/fonts/${file}`, root));
}
const missingFonts = [];
const fontFaces = tokens.type.fonts.map((f) => {
  const file = f.file.split("/").pop();
  const src = new URL(f.file, root);
  if (fs.existsSync(src)) fs.copyFileSync(src, new URL(`dist/fonts/${file}`, root));
  else missingFonts.push(f.file);
  return `@font-face {\n  font-family: "${f.family}";\n  src: local("${f.family} Variable"), local("${f.family}"), url("fonts/${file}") format("woff2");\n  font-weight: ${f.weight};\n  font-style: ${f.style ?? "normal"};\n  font-display: swap;\n}`;
});

const darkOverrides = rest.map((theme) => {
  const body = themeBlock(theme);
  const media = theme === "dark" ? `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="${first}"]) {\n${body.replace(/^/gm, "  ")}\n  }\n}\n` : "";
  return `${media}:root[data-theme="${theme}"] {\n${body}\n}`;
});

const out = [
  `/* ${tokens.name} — generated from tokens.json and components/bundle.css by scripts/build-css.mjs. Do not edit. */`,
  ...fontFaces,
  "",
  `:root {\n${lightBlock}\n}`,
  ...darkOverrides,
  "",
  "/* ---------- type styles ---------- */",
  typeClasses,
  "",
  components.trim(),
  "",
].join("\n");

fs.writeFileSync(new URL("dist/graphite.css", root), out);
console.log(`dist/graphite.css: ${themed.length + plain.length} tokens, ${tokens.type.groups.flatMap((g) => g.styles).length} type styles, ${(out.length / 1024).toFixed(1)} KB`);
if (missingFonts.length) console.warn(`missing font files (text falls back to system-ui): ${missingFonts.join(", ")}`);
