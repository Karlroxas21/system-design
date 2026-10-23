import { Box, Typography } from "@mui/material";
import { FREE_SHIPPING_FROM } from "../cart";
import { money } from "../format";
import { muted, tabularNums } from "../layout";
import { typeStyle, ui } from "../tokens";

interface Props {
  subtotal: number;
  shipping: number;
  total: number;
  /** Show the "spend more for free shipping" nudge (standard delivery only). */
  nudge?: boolean;
}

export function Summary({ subtotal, shipping, total, nudge = false }: Props) {
  const short = FREE_SHIPPING_FROM - subtotal;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: ui("space-s") }}>
      <Row label="Subtotal" value={money(subtotal)} />
      <Row label="Shipping" value={shipping === 0 ? "Free" : money(shipping)} />
      {nudge && short > 0 && (
        <Typography variant="body2" sx={muted}>
          Add {money(short)} more for free standard shipping.
        </Typography>
      )}
      <Row label="Total" value={money(total)} strong />
    </Box>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: ui("space-m"), ...typeStyle(strong ? "body-default-heavy" : "body-sm") }}>
      <Box component="span" sx={strong ? undefined : muted}>
        {label}
      </Box>
      <Box component="span" sx={{ ...tabularNums, ...(strong ? typeStyle("numbers-default-heavy") : {}) }}>
        {value}
      </Box>
    </Box>
  );
}
