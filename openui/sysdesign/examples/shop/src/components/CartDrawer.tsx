import { Box, Button, Divider, Drawer, IconButton, Typography } from "@mui/material";
import { ShoppingBag, X } from "lucide-react";
import { type CartAction, type CartLine, cartTotals } from "../cart";
import { productById } from "../data/products";
import { money, plural } from "../format";
import { muted, tabularNums } from "../layout";
import { typeStyle, ui } from "../tokens";
import { ProductArt } from "./ProductArt";
import { QuantityStepper } from "./QuantityStepper";
import { Summary } from "./Summary";

interface Props {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  dispatch: (action: CartAction) => void;
  onCheckout: () => void;
}

export function CartDrawer({ open, onClose, lines, dispatch, onCheckout }: Props) {
  const totals = cartTotals(lines);
  return (
    <Drawer anchor="right" open={open} onClose={onClose} sx={{ "& .MuiDrawer-paper": { width: { xs: "100%", sm: 420 }, borderLeft: `1px solid ${ui("border-default")}` } }}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: ui("space-s"), px: ui("space-xl"), py: ui("space-m-l") }}>
          <Typography variant="h4" component="h2" sx={{ flex: 1 }}>
            Your cart{" "}
            {totals.count > 0 && (
              <Box component="span" sx={{ ...muted, ...typeStyle("body-sm") }}>
                · {plural(totals.count, "item")}
              </Box>
            )}
          </Typography>
          <IconButton aria-label="Close cart" onClick={onClose}>
            <X />
          </IconButton>
        </Box>
        <Divider />

        {lines.length === 0 ? (
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: ui("space-s"), p: ui("space-xl"), textAlign: "center" }}>
            <Box sx={{ ...muted, mb: ui("space-xs") }}>
              <ShoppingBag size={32} strokeWidth={1.5} />
            </Box>
            <Typography variant="h5" component="p">
              Your cart is empty
            </Typography>
            <Typography variant="body2" sx={muted}>
              Add a notebook or two and they'll show up here.
            </Typography>
            <Button size="small" onClick={onClose} sx={{ mt: ui("space-s") }}>
              Browse the shop
            </Button>
          </Box>
        ) : (
          <>
            <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, flex: 1, overflowY: "auto" }}>
              {lines.map((line) => {
                const product = productById(line.productId);
                if (!product) return null;
                return (
                  <Box
                    component="li"
                    key={line.key}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "64px 1fr auto",
                      gap: ui("space-m"),
                      px: ui("space-xl"),
                      py: ui("space-m-l"),
                      borderBottom: `1px solid ${ui("border-default")}`,
                    }}
                  >
                    <ProductArt product={product} variant={line.variant} size="sm" />
                    <Box sx={{ display: "flex", flexDirection: "column", gap: ui("space-2xs"), minWidth: 0 }}>
                      <Typography variant="subtitle2" component="h3">
                        {product.name}
                      </Typography>
                      <Typography variant="caption" sx={muted}>
                        {line.variant} · {money(product.price)} each
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: ui("space-xs"), mt: ui("space-xs"), flexWrap: "wrap" }}>
                        <QuantityStepper
                          value={line.qty}
                          onChange={(qty) => dispatch({ type: "setQty", key: line.key, qty })}
                          label={`Quantity of ${product.name}`}
                          max={Math.min(10, product.stock)}
                        />
                        <Button variant="text" color="error" size="small" onClick={() => dispatch({ type: "remove", key: line.key })}>
                          Remove
                        </Button>
                      </Box>
                    </Box>
                    <Typography sx={{ ...typeStyle("numbers-sm-heavy"), ...tabularNums }}>{money(product.price * line.qty)}</Typography>
                  </Box>
                );
              })}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: ui("space-m-l"), p: ui("space-xl"), borderTop: `1px solid ${ui("border-default")}` }}>
              <Summary {...totals} nudge />
              <Box sx={{ display: "flex", flexDirection: "column", gap: ui("space-s") }}>
                <Button variant="contained" size="large" onClick={onCheckout}>
                  Checkout
                </Button>
                <Button variant="text" onClick={onClose}>
                  Continue shopping
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}
