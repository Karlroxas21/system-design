import { Box, IconButton } from "@mui/material";
import { Minus, Plus } from "lucide-react";
import { MAX_LINE_QTY } from "../cart";
import { tabularNums } from "../layout";
import { typeStyle, ui } from "../tokens";

interface Props {
  value: number;
  onChange: (qty: number) => void;
  label: string;
  max?: number;
}

export function QuantityStepper({ value, onChange, label, max = MAX_LINE_QTY }: Props) {
  return (
    <Box
      role="group"
      aria-label={label}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        border: `1px solid ${ui("border-interactive")}`,
        borderRadius: ui("radius-m"),
        backgroundColor: ui("highlight-subtle"),
      }}
    >
      <IconButton size="small" aria-label="Decrease quantity" disabled={value <= 1} onClick={() => onChange(value - 1)}>
        <Minus />
      </IconButton>
      <Box component="output" aria-live="polite" sx={{ ...typeStyle("numbers-sm-heavy"), ...tabularNums, minWidth: 24, textAlign: "center" }}>
        {value}
      </Box>
      <IconButton size="small" aria-label="Increase quantity" disabled={value >= max} onClick={() => onChange(value + 1)}>
        <Plus />
      </IconButton>
    </Box>
  );
}
