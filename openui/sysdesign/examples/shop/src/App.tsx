import { Box, Button, CssBaseline, Snackbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo, useReducer, useState } from "react";
import { cartReducer, cartTotals } from "./cart";
import { CartDrawer } from "./components/CartDrawer";
import { Catalog, type CatalogState, defaultCatalog } from "./components/Catalog";
import { Checkout, type PlacedOrder } from "./components/Checkout";
import { Header } from "./components/Header";
import { OrderPlaced } from "./components/OrderPlaced";
import { ProductDialog } from "./components/ProductDialog";
import type { Product } from "./data/products";
import { container, muted } from "./layout";
import { createGraphiteTheme } from "./theme";
import { type Mode, ui } from "./tokens";

type View = { name: "shop" } | { name: "checkout" } | { name: "placed"; order: PlacedOrder };

const MODE_KEY = "inkwell-theme";

function initialMode(): Mode {
  try {
    const saved = localStorage.getItem(MODE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // storage blocked: fall through to the OS setting
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [mode, setMode] = useState<Mode>(initialMode);
  const theme = useMemo(() => createGraphiteTheme(mode), [mode]);

  // graphite.css switches every --openui-* variable on this attribute.
  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    try {
      localStorage.setItem(MODE_KEY, mode);
    } catch {
      // not persisted; the toggle still works for this visit
    }
  }, [mode]);

  const [view, setView] = useState<View>({ name: "shop" });
  const [catalog, setCatalog] = useState<CatalogState>(defaultCatalog);
  const [query, setQuery] = useState("");
  const [lines, dispatch] = useReducer(cartReducer, []);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const { count } = cartTotals(lines);

  const add = (product: Product, variant: string, qty: number) => {
    dispatch({ type: "add", product, variant, qty });
    setSelected(null);
    setToast(`Added ${product.name}${qty > 1 ? ` × ${qty}` : ""} to your cart`);
  };

  const goShop = () => {
    setView({ name: "shop" });
    window.scrollTo({ top: 0 });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header
          query={query}
          onQueryChange={(q) => {
            setQuery(q);
            if (view.name !== "shop") setView({ name: "shop" });
          }}
          showSearch={view.name === "shop"}
          cartCount={count}
          onOpenCart={() => setCartOpen(true)}
          mode={mode}
          onToggleMode={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
          onHome={goShop}
        />

        <Box component="main" sx={{ flex: 1 }}>
          {view.name === "shop" && (
            <Catalog state={catalog} onStateChange={setCatalog} query={query} onQueryChange={setQuery} onOpen={setSelected} onAdd={add} />
          )}
          {view.name === "checkout" && (
            <Checkout
              lines={lines}
              onBack={goShop}
              onPlaced={(order) => {
                dispatch({ type: "clear" });
                setView({ name: "placed", order });
                window.scrollTo({ top: 0 });
              }}
            />
          )}
          {view.name === "placed" && <OrderPlaced order={view.order} onContinue={goShop} />}
        </Box>

        <Box component="footer" sx={{ borderTop: `1px solid ${ui("border-default")}` }}>
          <Typography variant="caption" component="p" sx={{ ...container, ...muted, py: ui("space-xl") }}>
            Inkwell is a sample store for the Graphite design system, built with Material UI. Products and prices are made up.
          </Typography>
        </Box>
      </Box>

      <ProductDialog product={selected} onClose={() => setSelected(null)} onAdd={add} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={lines}
        dispatch={dispatch}
        onCheckout={() => {
          setCartOpen(false);
          setView({ name: "checkout" });
          window.scrollTo({ top: 0 });
        }}
      />

      <Snackbar
        open={toast !== null}
        onClose={(_, reason) => reason !== "clickaway" && setToast(null)}
        autoHideDuration={3000}
        message={toast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        action={
          <Button
            variant="text"
            size="small"
            onClick={() => {
              setToast(null);
              setCartOpen(true);
            }}
          >
            View cart
          </Button>
        }
      />
    </ThemeProvider>
  );
}
