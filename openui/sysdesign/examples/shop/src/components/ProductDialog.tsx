import { Box, Button, ButtonBase, Chip, Dialog, Divider, IconButton, Typography } from "@mui/material";
import { RotateCcw, Truck, X } from "lucide-react";
import { type ReactNode, useState } from "react";
import { FREE_SHIPPING_FROM } from "../cart";
import { stockStatus, type Product } from "../data/products";
import { money, wholeMoney } from "../format";
import { muted, tabularNums } from "../layout";
import { typeStyle, ui } from "../tokens";
import { ProductArt } from "./ProductArt";
import { QuantityStepper } from "./QuantityStepper";
import { RatingLine } from "./RatingLine";

interface Props {
  product: Product | null;
  onClose: () => void;
  onAdd: (product: Product, variant: string, qty: number) => void;
}

export function ProductDialog({ product, onClose, onAdd }: Props) {
  return (
    <Dialog open={product !== null} onClose={onClose} fullWidth maxWidth="md" aria-labelledby="product-title">
      {product && <ProductDetail key={product.id} product={product} onClose={onClose} onAdd={onAdd} />}
    </Dialog>
  );
}

function ProductDetail({ product, onClose, onAdd }: { product: Product; onClose: () => void; onAdd: Props["onAdd"] }) {
  const [variant, setVariant] = useState(product.variants[0].name);
  const [qty, setQty] = useState(1);
  const status = stockStatus(product);
  const soldOut = product.stock === 0;

  return (
    <Box
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))" },
        alignItems: "start",
        gap: { xs: ui("space-l"), sm: ui("space-2xl") },
        p: { xs: ui("space-l"), sm: ui("space-2xl") },
      }}
    >
      <IconButton aria-label="Close" onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
        <X />
      </IconButton>

      <ProductArt product={product} variant={variant} size="lg" />

      <Box sx={{ display: "flex", flexDirection: "column", gap: ui("space-m-l"), minWidth: 0 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: ui("space-xs") }}>
          <Typography variant="caption" sx={muted}>
            {product.category}
          </Typography>
          <Typography variant="h3" component="h2" id="product-title" sx={{ pr: ui("space-2xl"), textWrap: "balance" }}>
            {product.name}
          </Typography>
          <RatingLine rating={product.rating} reviews={product.reviews} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: ui("space-m") }}>
          <Typography sx={{ ...typeStyle("numbers-heading-md"), ...tabularNums }}>{money(product.price)}</Typography>
          {status && <Chip label={status.label} color={status.color} />}
        </Box>

        <Typography>{product.blurb}</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: ui("space-s") }}>
          <Typography id="color-label">
            Color <Box component="span" sx={muted}>· {variant}</Box>
          </Typography>
          <Box role="radiogroup" aria-labelledby="color-label" sx={{ display: "flex", gap: ui("space-s"), flexWrap: "wrap" }}>
            {product.variants.map((v) => {
              const selected = v.name === variant;
              return (
                <ButtonBase
                  key={v.name}
                  role="radio"
                  aria-checked={selected}
                  aria-label={v.name}
                  onClick={() => setVariant(v.name)}
                  sx={{
                    width: 32,
                    height: 32,
                    p: "3px",
                    borderRadius: "50%",
                    border: `2px solid ${selected ? ui("border-interactive-selected") : "transparent"}`,
                    "&:hover": { borderColor: selected ? ui("border-interactive-selected") : ui("border-interactive") },
                  }}
                >
                  <Box sx={{ width: "100%", height: "100%", borderRadius: "50%", backgroundColor: v.hex, boxShadow: `inset 0 0 0 1px ${ui("border-interactive")}` }} />
                </ButtonBase>
              );
            })}
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: ui("space-s"), alignItems: "stretch", flexWrap: "wrap" }}>
          <QuantityStepper value={qty} onChange={setQty} label="Quantity" max={Math.max(1, Math.min(10, product.stock))} />
          <Button variant="contained" size="large" disabled={soldOut} onClick={() => onAdd(product, variant, qty)} sx={{ flex: 1, minWidth: 160 }}>
            {soldOut ? "Sold out" : `Add to cart · ${money(product.price * qty)}`}
          </Button>
        </Box>

        <Divider />

        <Box component="ul" sx={{ m: 0, pl: ui("space-l"), display: "flex", flexDirection: "column", gap: ui("space-2xs"), ...typeStyle("body-sm") }}>
          {product.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: ui("space-xs") }}>
          <Perk icon={<Truck size={16} />} text={`Free standard shipping on orders over ${wholeMoney(FREE_SHIPPING_FROM)}`} />
          <Perk icon={<RotateCcw size={16} />} text="Free returns within 30 days" />
        </Box>
      </Box>
    </Box>
  );
}

function Perk({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: ui("space-s"), ...muted }}>
      {icon}
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
}
