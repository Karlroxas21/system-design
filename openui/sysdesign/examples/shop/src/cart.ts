import { productById, type Product } from "./data/products";

export interface CartLine {
  key: string;
  productId: string;
  variant: string;
  qty: number;
}

export type CartAction =
  | { type: "add"; product: Product; variant: string; qty: number }
  | { type: "setQty"; key: string; qty: number }
  | { type: "remove"; key: string }
  | { type: "clear" };

const MAX_QTY = 10;

export function cartReducer(lines: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "add": {
      const key = `${action.product.id}:${action.variant}`;
      const existing = lines.find((l) => l.key === key);
      if (existing) {
        return lines.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + action.qty) } : l));
      }
      return [...lines, { key, productId: action.product.id, variant: action.variant, qty: action.qty }];
    }
    case "setQty":
      return lines.map((l) => (l.key === action.key ? { ...l, qty: Math.min(MAX_QTY, Math.max(1, action.qty)) } : l));
    case "remove":
      return lines.filter((l) => l.key !== action.key);
    case "clear":
      return [];
  }
}

export const FREE_SHIPPING_FROM = 75;

export const deliveryOptions = {
  standard: { label: "Standard", detail: "3–5 business days", price: 6 },
  express: { label: "Express", detail: "1–2 business days", price: 15 },
} as const;
export type Delivery = keyof typeof deliveryOptions;

export function cartTotals(lines: CartLine[], delivery: Delivery = "standard") {
  const subtotal = lines.reduce((sum, l) => sum + (productById(l.productId)?.price ?? 0) * l.qty, 0);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const option = deliveryOptions[delivery];
  const shipping = count === 0 ? 0 : delivery === "standard" && subtotal >= FREE_SHIPPING_FROM ? 0 : option.price;
  return { count, subtotal, shipping, total: subtotal + shipping };
}

export const MAX_LINE_QTY = MAX_QTY;
