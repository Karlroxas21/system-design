import { Alert, AlertTitle, Box, Button, Card, Typography } from "@mui/material";
import { deliveryOptions } from "../cart";
import { money } from "../format";
import { container, muted, tabularNums } from "../layout";
import { typeStyle, ui } from "../tokens";
import type { PlacedOrder } from "./Checkout";

export function OrderPlaced({ order, onContinue }: { order: PlacedOrder; onContinue: () => void }) {
  const delivery = deliveryOptions[order.delivery];
  return (
    <Box sx={{ ...container, py: ui("space-3xl"), display: "grid", placeItems: "center" }}>
      <Card sx={{ width: "100%", maxWidth: 520, p: ui("space-xl"), display: "flex", flexDirection: "column", gap: ui("space-xl") }}>
        <Alert severity="success" role="status">
          <AlertTitle>Order placed</AlertTitle>
          We sent a confirmation to {order.email}.
        </Alert>

        <Box component="dl" sx={{ m: 0, display: "grid", gridTemplateColumns: "auto 1fr", columnGap: ui("space-xl"), rowGap: ui("space-s"), ...typeStyle("body-sm") }}>
          <Box component="dt" sx={muted}>
            Order number
          </Box>
          <Box component="dd" sx={{ m: 0, ...typeStyle("numbers-sm-heavy"), ...tabularNums }}>
            {order.id}
          </Box>
          <Box component="dt" sx={muted}>
            Delivery
          </Box>
          <Box component="dd" sx={{ m: 0 }}>
            {delivery.label}, {delivery.detail}
          </Box>
          <Box component="dt" sx={muted}>
            Total
          </Box>
          <Box component="dd" sx={{ m: 0, ...tabularNums }}>
            {money(order.total)}
          </Box>
        </Box>

        <Typography variant="body2" sx={muted}>
          Inkwell is a demo store, so no payment was taken and nothing will ship.
        </Typography>

        <Button variant="contained" size="large" onClick={onContinue} sx={{ alignSelf: "flex-start" }}>
          Continue shopping
        </Button>
      </Card>
    </Box>
  );
}
