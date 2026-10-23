import {
  Backpack,
  BookOpen,
  Clock,
  Coffee,
  LampDesk,
  Laptop,
  type LucideIcon,
  NotebookPen,
  Pen,
  PenLine,
  PenTool,
  RectangleHorizontal,
  ShoppingBag,
} from "lucide-react";

export const categories = ["Notebooks", "Pens", "Desk", "Carry"] as const;
export type Category = (typeof categories)[number];

export interface Variant {
  name: string;
  /** Product color, used only for the product's own artwork and swatch. */
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  rating: number;
  reviews: number;
  stock: number;
  isNew?: boolean;
  icon: LucideIcon;
  blurb: string;
  details: string[];
  variants: Variant[];
}

export const products: Product[] = [
  {
    id: "dot-grid-a5",
    name: "Dot Grid Notebook A5",
    category: "Notebooks",
    price: 18,
    rating: 4.8,
    reviews: 412,
    stock: 64,
    icon: NotebookPen,
    blurb: "192 numbered pages of 100 gsm paper that takes fountain pen ink without bleeding through.",
    details: ["148 × 210 mm, lay-flat binding", "5 mm dot grid, numbered pages", "Two ribbon markers and a back pocket"],
    variants: [
      { name: "Charcoal", hex: "#3a3d42" },
      { name: "Sand", hex: "#cdb991" },
      { name: "Navy", hex: "#2b3d63" },
    ],
  },
  {
    id: "lined-journal-a4",
    name: "Lined Journal A4",
    category: "Notebooks",
    price: 24,
    rating: 4.6,
    reviews: 158,
    stock: 4,
    icon: BookOpen,
    blurb: "A larger page for meeting notes and long-form writing, bound in a soft-touch cover.",
    details: ["210 × 297 mm, 160 pages", "7 mm ruling with a narrow margin", "Elastic closure"],
    variants: [
      { name: "Graphite", hex: "#55585e" },
      { name: "Moss", hex: "#6b7a52" },
    ],
  },
  {
    id: "fineliner-set",
    name: "Fineliner Set of 6",
    category: "Pens",
    price: 14,
    rating: 4.7,
    reviews: 903,
    stock: 120,
    icon: PenLine,
    blurb: "Six archival fineliners from 0.05 to 0.8 mm for sketching, lettering and diagrams.",
    details: ["Pigment ink, waterproof once dry", "Tips: 0.05, 0.1, 0.3, 0.5, 0.6, 0.8 mm", "Recyclable aluminum case"],
    variants: [{ name: "Black", hex: "#1f2124" }],
  },
  {
    id: "brass-fountain-pen",
    name: "Brass Fountain Pen",
    category: "Pens",
    price: 86,
    rating: 4.9,
    reviews: 74,
    stock: 12,
    isNew: true,
    icon: PenTool,
    blurb: "Machined from solid brass with a steel medium nib. It darkens to a warm patina with use.",
    details: ["Steel nib, medium", "Takes standard international cartridges", "Converter included"],
    variants: [
      { name: "Raw brass", hex: "#b08d4a" },
      { name: "Black", hex: "#2a2a2c" },
    ],
  },
  {
    id: "gel-pens-12",
    name: "Gel Pens, Pack of 12",
    category: "Pens",
    price: 9,
    rating: 4.3,
    reviews: 1240,
    stock: 300,
    icon: Pen,
    blurb: "Smooth 0.5 mm gel ink that dries fast enough for left-handed writers.",
    details: ["0.5 mm tip, quick-dry ink", "Retractable with a metal clip", "12 refillable pens"],
    variants: [
      { name: "Black", hex: "#1f2124" },
      { name: "Blue", hex: "#2a4f9e" },
    ],
  },
  {
    id: "aluminum-desk-lamp",
    name: "Aluminum Desk Lamp",
    category: "Desk",
    price: 129,
    rating: 4.7,
    reviews: 211,
    stock: 0,
    icon: LampDesk,
    blurb: "A dimmable LED arm lamp with a warm 2700 K light and a weighted base that never tips.",
    details: ["Dimmable, 2700 K, CRI 95", "USB-C power, 1.5 m cable", "Arm reaches 52 cm"],
    variants: [
      { name: "Silver", hex: "#a7abb1" },
      { name: "Black", hex: "#2a2a2c" },
    ],
  },
  {
    id: "ceramic-mug",
    name: "Ceramic Mug, 350 ml",
    category: "Desk",
    price: 22,
    rating: 4.5,
    reviews: 389,
    stock: 48,
    icon: Coffee,
    blurb: "A thick-walled stoneware mug that keeps coffee hot through a long first meeting.",
    details: ["350 ml stoneware", "Dishwasher and microwave safe", "Matte glaze outside, gloss inside"],
    variants: [
      { name: "Chalk", hex: "#e3dfd6" },
      { name: "Slate", hex: "#5d6670" },
      { name: "Clay", hex: "#b4725a" },
    ],
  },
  {
    id: "felt-desk-mat",
    name: "Felt Desk Mat, 80 × 40 cm",
    category: "Desk",
    price: 39,
    rating: 4.6,
    reviews: 167,
    stock: 3,
    icon: RectangleHorizontal,
    blurb: "Merino wool felt that quiets the keyboard and gives the mouse a steady glide.",
    details: ["80 × 40 cm, 4 mm thick", "100% merino wool felt", "Non-slip cork base"],
    variants: [
      { name: "Heather grey", hex: "#8e9196" },
      { name: "Charcoal", hex: "#3a3d42" },
    ],
  },
  {
    id: "analog-desk-clock",
    name: "Analog Desk Clock",
    category: "Desk",
    price: 48,
    rating: 4.4,
    reviews: 92,
    stock: 22,
    isNew: true,
    icon: Clock,
    blurb: "A silent sweep movement in a round aluminum case. No ticking during calls.",
    details: ["Silent sweep quartz movement", "Ø 10 cm aluminum case", "Runs a year on one AA battery"],
    variants: [
      { name: "White", hex: "#f1f0ec" },
      { name: "Black", hex: "#2a2a2c" },
    ],
  },
  {
    id: "canvas-tote",
    name: "Canvas Tote",
    category: "Carry",
    price: 32,
    rating: 4.5,
    reviews: 276,
    stock: 80,
    icon: ShoppingBag,
    blurb: "Heavy 16 oz cotton canvas with an inner pocket sized for an A5 notebook.",
    details: ["16 oz organic cotton canvas", "Inner A5 pocket and key clip", "Holds up to 15 kg"],
    variants: [
      { name: "Natural", hex: "#d9cfb8" },
      { name: "Black", hex: "#2a2a2c" },
    ],
  },
  {
    id: "laptop-sleeve-14",
    name: "Laptop Sleeve 14″",
    category: "Carry",
    price: 45,
    rating: 4.6,
    reviews: 188,
    stock: 35,
    icon: Laptop,
    blurb: "A slim felt sleeve with a leather pull tab, cut for 13 and 14 inch laptops.",
    details: ["Fits laptops up to 32 × 23 cm", "Wool felt, leather pull tab", "Front pocket for a charger"],
    variants: [
      { name: "Grey", hex: "#7d8086" },
      { name: "Navy", hex: "#2b3d63" },
    ],
  },
  {
    id: "rolltop-backpack",
    name: "Rolltop Backpack, 20 L",
    category: "Carry",
    price: 118,
    rating: 4.8,
    reviews: 341,
    stock: 9,
    icon: Backpack,
    blurb: "A water-resistant rolltop that expands from 20 to 26 liters, with a padded laptop sleeve.",
    details: ["20–26 L rolltop", "Padded 16″ laptop sleeve", "Recycled water-resistant nylon"],
    variants: [
      { name: "Black", hex: "#2a2a2c" },
      { name: "Olive", hex: "#5b6447" },
    ],
  },
];

export const productById = (id: string) => products.find((p) => p.id === id);

export type StockStatus = { label: string; color: "default" | "warning" | "info" };

export function stockStatus(p: Product): StockStatus | null {
  if (p.stock === 0) return { label: "Sold out", color: "default" };
  if (p.stock <= 5) return { label: `Only ${p.stock} left`, color: "warning" };
  if (p.isNew) return { label: "New", color: "info" };
  return null;
}
