import {
  Box,
  Button,
  Drawer,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, type Category, products, type Product } from "../data/products";
import { FREE_SHIPPING_FROM } from "../cart";
import { plural, wholeMoney } from "../format";
import { container, muted } from "../layout";
import { ui } from "../tokens";
import { defaultFilters, Filters, type FilterState } from "./Filters";
import { ProductCard } from "./ProductCard";

export const sorts = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  rating: "Top rated",
} as const;
export type Sort = keyof typeof sorts;

export interface CatalogState {
  category: "All" | Category;
  filters: FilterState;
  sort: Sort;
}

export const defaultCatalog: CatalogState = { category: "All", filters: defaultFilters, sort: "featured" };

interface Props {
  state: CatalogState;
  onStateChange: (next: CatalogState) => void;
  query: string;
  onQueryChange: (q: string) => void;
  onOpen: (product: Product) => void;
  onAdd: (product: Product, variant: string, qty: number) => void;
}

export function Catalog({ state, onStateChange, query, onQueryChange, onOpen, onAdd }: Props) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { category, filters, sort } = state;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.price <= filters.maxPrice &&
        (!filters.inStockOnly || p.stock > 0) &&
        (!filters.newOnly || p.isNew) &&
        (q === "" || `${p.name} ${p.category} ${p.blurb}`.toLowerCase().includes(q)),
    );
    if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") return [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    return list;
  }, [category, filters, sort, query]);

  const setFilters = (next: FilterState) => onStateChange({ ...state, filters: next });

  return (
    <Box sx={{ ...container, py: ui("space-xl"), display: "flex", flexDirection: "column", gap: ui("space-xl") }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: ui("space-xs"), maxWidth: 640 }}>
        <Typography variant="h2" component="h1" sx={{ textWrap: "balance" }}>
          Desk goods that last
        </Typography>
        <Typography sx={muted}>
          Notebooks, pens and desk tools chosen for daily use. Free standard shipping on orders over {wholeMoney(FREE_SHIPPING_FROM)}.
        </Typography>
      </Box>

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
        sx={{ display: { xs: "inline-flex", sm: "none" } }}
      />

      <Tabs
        value={category}
        onChange={(_, v) => onStateChange({ ...state, category: v })}
        aria-label="Product categories"
        sx={{ alignSelf: "flex-start", maxWidth: "100%" }}
      >
        <Tab value="All" label="All" />
        {categories.map((c) => (
          <Tab key={c} value={c} label={c} />
        ))}
      </Tabs>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "220px 1fr" }, gap: ui("space-2xl"), alignItems: "start" }}>
        <Box component="aside" aria-label="Filters" sx={{ display: { xs: "none", md: "block" }, position: "sticky", top: 88 }}>
          <Filters value={filters} onChange={setFilters} />
        </Box>

        <Box sx={{ minWidth: 0, display: "flex", flexDirection: "column", gap: ui("space-m-l") }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: ui("space-s"), flexWrap: "wrap" }}>
            <Typography variant="body2" sx={{ ...muted, flex: 1 }} aria-live="polite">
              {plural(visible.length, "product")}
            </Typography>
            <Button size="small" startIcon={<SlidersHorizontal />} onClick={() => setFiltersOpen(true)} sx={{ display: { md: "none" } }}>
              Filters
            </Button>
            <Box sx={{ display: "flex", alignItems: "center", gap: ui("space-s") }}>
              <Typography variant="body2" component="span" id="sort-label" sx={muted}>
                Sort by
              </Typography>
              <Select
                labelId="sort-label"
                value={sort}
                onChange={(e) => onStateChange({ ...state, sort: e.target.value as Sort })}
                sx={{ minWidth: 196 }}
              >
                {Object.entries(sorts).map(([key, label]) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>

          {visible.length > 0 ? (
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: ui("space-m-l") }}>
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={onOpen} onAdd={onAdd} />
              ))}
            </Box>
          ) : (
            <Box sx={{ py: ui("space-3xl"), display: "flex", flexDirection: "column", alignItems: "center", gap: ui("space-s"), textAlign: "center" }}>
              <Typography variant="h4" component="p">
                No products match
              </Typography>
              <Typography variant="body2" sx={muted}>
                Try a higher price limit, another category or a shorter search.
              </Typography>
              <Button
                size="small"
                onClick={() => {
                  onQueryChange("");
                  onStateChange(defaultCatalog);
                }}
              >
                Clear search and filters
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Drawer anchor="left" open={filtersOpen} onClose={() => setFiltersOpen(false)} sx={{ "& .MuiDrawer-paper": { width: 300, maxWidth: "100%", p: ui("space-xl"), gap: ui("space-l") } }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h4" component="h2">
            Filters
          </Typography>
          <IconButton aria-label="Close filters" onClick={() => setFiltersOpen(false)}>
            <X />
          </IconButton>
        </Box>
        <Filters value={filters} onChange={setFilters} />
        <Button variant="contained" onClick={() => setFiltersOpen(false)}>
          Show {plural(visible.length, "product")}
        </Button>
      </Drawer>
    </Box>
  );
}
