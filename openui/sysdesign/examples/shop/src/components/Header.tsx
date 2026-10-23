import { AppBar, Badge, Box, ButtonBase, IconButton, InputAdornment, OutlinedInput, Toolbar, Tooltip, Typography } from "@mui/material";
import { Moon, Search, ShoppingBag, Sun } from "lucide-react";
import { container } from "../layout";
import { type Mode, ui } from "../tokens";

interface Props {
  query: string;
  onQueryChange: (q: string) => void;
  showSearch: boolean;
  cartCount: number;
  onOpenCart: () => void;
  mode: Mode;
  onToggleMode: () => void;
  onHome: () => void;
}

export function Header({ query, onQueryChange, showSearch, cartCount, onOpenCart, mode, onToggleMode, onHome }: Props) {
  const nextMode = mode === "dark" ? "light" : "dark";
  return (
    <AppBar>
      <Toolbar disableGutters sx={{ ...container, minHeight: { xs: 56, sm: 64 }, gap: ui("space-m") }}>
        <ButtonBase onClick={onHome} sx={{ borderRadius: ui("radius-s"), px: ui("space-2xs"), mx: `calc(-1 * ${ui("space-2xs")})` }}>
          <Typography variant="h4" component="span">
            Inkwell
          </Typography>
        </ButtonBase>

        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 0 }}>
          {showSearch && (
            <OutlinedInput
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search notebooks, pens, lamps"
              type="search"
              slotProps={{ input: { "aria-label": "Search products" } }}
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
              sx={{ width: "100%", maxWidth: 440, display: { xs: "none", sm: "inline-flex" } }}
            />
          )}
        </Box>

        <Tooltip title={`Switch to ${nextMode} theme`}>
          <IconButton aria-label={`Switch to ${nextMode} theme`} onClick={onToggleMode}>
            {mode === "dark" ? <Sun /> : <Moon />}
          </IconButton>
        </Tooltip>
        <IconButton aria-label={cartCount ? `Open cart, ${cartCount} items` : "Open cart"} onClick={onOpenCart}>
          <Badge badgeContent={cartCount}>
            <ShoppingBag />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
