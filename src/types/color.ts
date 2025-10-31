import type { Product } from "./product";

export interface BaseColor {
  slug: string;
  label?: string;
  hex: string;
}

export interface ColorVariant extends BaseColor {
  /** Product-specific image paths */
  front: string;
  back: string;
}

export type PrintColor = BaseColor & {    // used for vinyl print colors
  image?: string;                         // optional preview swatch
  material?: string;                      // e.g. "easyWeed", "brick", etc.
};

// Derived type for product identification
export type ProductValue = Product["value"];
