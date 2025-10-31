import type { Product } from "./product";

export interface ColorVariant {
  name: string;      // e.g. "Biela"
  slug: string;      // e.g. "white"
  hex: string;       // "#FFFFFF"
  front: string;     // path to front image
  back: string;      // path to back image
}

export interface PrintColor {
  slug: string;
  label: string;
  hex: string;
  image?: string;
}

// Derived type for product identification
export type ProductValue = Product["value"];
