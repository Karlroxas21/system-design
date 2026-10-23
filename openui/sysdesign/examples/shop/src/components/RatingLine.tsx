import { Box, Rating, Typography } from "@mui/material";
import { number } from "../format";
import { muted } from "../layout";
import { ui } from "../tokens";

export function RatingLine({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: ui("space-xs"), flexWrap: "wrap" }}>
      <Rating value={rating} precision={0.1} readOnly size="small" />
      <Typography variant="caption" sx={muted}>
        {rating.toFixed(1)} · {number(reviews)} reviews
      </Typography>
    </Box>
  );
}
