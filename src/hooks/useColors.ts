import { useMemo } from "react";
import tshirtColors from "@/data/colors/tshirtColors.json";
// later add: import poloColors from "@/data/colors/poloColors.json"
// import hoodieColors from "@/data/colors/hoodieColors.json"

export interface ColorVariant {
  label: string;
  slug: string;
  hex: string;
  front: string;
  back: string;
}

export function useColors(product: string): ColorVariant[] {
  return useMemo(() => {
    switch (product) {
      case "tshirt":
        return tshirtColors as ColorVariant[];
      case "polo":
        return []; // placeholder
      case "hoodie":
        return []; // placeholder
      default:
        return [];
    }
  }, [product]);
}
