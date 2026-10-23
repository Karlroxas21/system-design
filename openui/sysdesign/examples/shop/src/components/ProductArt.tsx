import { Box } from "@mui/material";
import type { Product } from "../data/products";
import { ui } from "../tokens";

const sizes = {
  sm: { icon: 24, stroke: 1.5, ratio: "1", radius: "radius-m" },
  md: { icon: 56, stroke: 1.25, ratio: "4 / 3", radius: "radius-xl" },
  lg: { icon: 104, stroke: 1, ratio: "1", radius: "radius-3xl" },
} as const;

/** Product artwork drawn locally: the product's icon on a tint of its selected color. */
export function ProductArt({ product, variant, size = "md" }: { product: Product; variant?: string; size?: keyof typeof sizes }) {
  const { hex } = product.variants.find((v) => v.name === variant) ?? product.variants[0];
  const s = sizes[size];
  const Icon = product.icon;
  return (
    <Box
      aria-hidden="true"
      sx={{
        width: "100%",
        maxWidth: "100%",
        aspectRatio: s.ratio,
        display: "grid",
        placeItems: "center",
        borderRadius: ui(s.radius),
        border: `1px solid ${ui("border-default")}`,
        backgroundColor: `color-mix(in oklch, ${hex} 12%, ${ui("foreground")})`,
        color: `color-mix(in oklch, ${hex} 45%, ${ui("text-neutral-primary")})`,
        transition: "background-color 0.16s ease, color 0.16s ease",
      }}
    >
      <Icon size={s.icon} strokeWidth={s.stroke} />
    </Box>
  );
}
