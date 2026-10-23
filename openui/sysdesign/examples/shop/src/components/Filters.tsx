import { Box, Button, Checkbox, Divider, FormControlLabel, Slider, Switch, Typography } from "@mui/material";
import { money } from "../format";
import { muted } from "../layout";
import { ui } from "../tokens";

export const PRICE_CEILING = 150;

export interface FilterState {
  maxPrice: number;
  inStockOnly: boolean;
  newOnly: boolean;
}

export const defaultFilters: FilterState = { maxPrice: PRICE_CEILING, inStockOnly: false, newOnly: false };

export function Filters({ value, onChange }: { value: FilterState; onChange: (next: FilterState) => void }) {
  const isDefault =
    value.maxPrice === defaultFilters.maxPrice &&
    value.inStockOnly === defaultFilters.inStockOnly &&
    value.newOnly === defaultFilters.newOnly;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: ui("space-l") }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: ui("space-2xs") }}>
        <Typography variant="subtitle2" component="h2" id="price-label">
          Price
        </Typography>
        <Slider
          value={value.maxPrice}
          onChange={(_, v) => onChange({ ...value, maxPrice: v as number })}
          min={10}
          max={PRICE_CEILING}
          step={5}
          valueLabelDisplay="auto"
          valueLabelFormat={money}
          aria-labelledby="price-label"
        />
        <Typography variant="body2" sx={muted}>
          {value.maxPrice >= PRICE_CEILING ? "Any price" : `Up to ${money(value.maxPrice)}`}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ display: "flex", flexDirection: "column", gap: ui("space-s") }}>
        <Typography variant="subtitle2" component="h2">
          Availability
        </Typography>
        <FormControlLabel
          control={<Switch checked={value.inStockOnly} onChange={(e) => onChange({ ...value, inStockOnly: e.target.checked })} />}
          label="In stock only"
        />
        <FormControlLabel
          control={<Checkbox checked={value.newOnly} onChange={(e) => onChange({ ...value, newOnly: e.target.checked })} />}
          label="New arrivals"
        />
      </Box>

      <Box>
        <Button variant="text" size="small" disabled={isDefault} onClick={() => onChange(defaultFilters)}>
          Reset filters
        </Button>
      </Box>
    </Box>
  );
}
