// Bridge between the Graphite token file and MUI.
// Components style themselves with `ui("…")` CSS variables (served by dist/graphite.css, which
// switches them per theme). MUI's palette math cannot parse oklch(), so `rgba()` converts a token
// to an sRGB equivalent for the few places MUI needs a real color.
import tokens from "../../../tokens.json";

export type Mode = "light" | "dark";

type ThemedValue = string | { light: string; dark?: string };

const values = new Map<string, ThemedValue>(
  [...tokens.color.tokens, ...tokens.shadow.tokens].map((t) => [t.name, t.value as ThemedValue]),
);

const typeStyles = new Map(tokens.type.groups.flatMap((g) => g.styles.map((s) => [s.name, s] as const)));

/** CSS variable for a Graphite token, without the `openui-` prefix: ui("space-m"). */
export const ui = (name: string) => `var(--openui-${name})`;

export const fontSans = tokens.type.families.sans;
export const fontMono = tokens.type.families.mono;

export function tokenValue(name: string, mode: Mode): string {
  const value = values.get(name);
  if (value === undefined) throw new Error(`Unknown Graphite token: ${name}`);
  return typeof value === "string" ? value : (value[mode] ?? value.light);
}

const encode = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);

/** sRGB rgba() equivalent of an oklch() token, for MUI's palette. */
export function rgba(name: string, mode: Mode): string {
  const value = tokenValue(`openui-${name}`, mode);
  const m = value.match(/^oklch\(([\d.]+) ([\d.]+) ([\d.]+) \/ ([\d.]+)\)$/);
  if (!m) return value;
  const [l, c, h, alpha] = m.slice(1).map(Number);
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const [r, g, bl] = [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ].map((v) => Math.round(encode(Math.min(1, Math.max(0, v))) * 255));
  return `rgba(${r}, ${g}, ${bl}, ${alpha})`;
}

/** A Graphite type style as MUI/sx typography props: typeStyle("body-sm"). */
export function typeStyle(name: string) {
  const s = typeStyles.get(name);
  if (!s) throw new Error(`Unknown Graphite type style: ${name}`);
  return { fontSize: s.fontSize, lineHeight: s.lineHeight, fontWeight: s.fontWeight, letterSpacing: s.letterSpacing };
}
