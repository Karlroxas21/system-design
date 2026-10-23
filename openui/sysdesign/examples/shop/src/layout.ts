import { ui } from "./tokens";

/** Page column: 1200px max, Graphite side gutters (space-m-l on phones, space-xl above). */
export const container = {
  width: "100%",
  maxWidth: 1200,
  mx: "auto",
  px: { xs: ui("space-m-l"), sm: ui("space-xl") },
  boxSizing: "border-box",
} as const;

export const muted = { color: ui("text-neutral-secondary") } as const;

export const tabularNums = { fontVariantNumeric: "tabular-nums" } as const;
