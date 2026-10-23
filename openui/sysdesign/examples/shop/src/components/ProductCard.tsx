import { Box, Button, ButtonBase, Card, Chip, Typography } from "@mui/material";
import { Plus } from "lucide-react";
import { stockStatus, type Product } from "../data/products";
import { money } from "../format";
import { muted, tabularNums } from "../layout";
import { typeStyle, ui } from "../tokens";
import { ProductArt } from "./ProductArt";
import { RatingLine } from "./RatingLine";

interface Props {
  product: Product;
  onOpen: (product: Product) => void;
  onAdd: (product: Product, variant: string, qty: number) => void;
}

export function ProductCard({ product, onOpen, onAdd }: Props) {
  const status = stockStatus(product);
  const soldOut = product.stock === 0;
  return (
    <Card component="article" sx={{ display: "flex", flexDirection: "column", gap: ui("space-m"), p: ui("space-m"), height: "100%" }}>
      <ButtonBase onClick={() => onOpen(product)} aria-label={`View ${product.name}`} sx={{ display: "block", borderRadius: ui("radius-xl") }}>
        <ProductArt product={product} />
      </ButtonBase>

      <Box sx={{ display: "flex", flexDirection: "column", gap: ui("space-2xs"), flex: 1, px: ui("space-2xs") }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: ui("space-s"), minHeight: 24 }}>
          <Typography variant="caption" sx={muted}>
            {product.category}
          </Typography>
          {status && <Chip label={status.label} color={status.color} />}
        </Box>
        <Typography variant="h5" component="h3">
          {product.name}
        </Typography>
        <RatingLine rating={product.rating} reviews={product.reviews} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: ui("space-s"), px: ui("space-2xs") }}>
        <Typography sx={{ ...typeStyle("numbers-default-heavy"), ...tabularNums }}>{money(product.price)}</Typography>
        <Button size="small" startIcon={soldOut ? undefined : <Plus />} disabled={soldOut} onClick={() => onAdd(product, product.variants[0].name, 1)}>
          {soldOut ? "Sold out" : "Add to cart"}
        </Button>
      </Box>
    </Card>
  );
}
