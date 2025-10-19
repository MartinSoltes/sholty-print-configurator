import React from "react";
import type { ColorVariant } from "@/hooks/useColors";

interface Props {
  colors: ColorVariant[];
  selectedColor: ColorVariant | null;
  onSelect: (color: ColorVariant) => void;
}

export const ColorPicker: React.FC<Props> = ({ colors, selectedColor, onSelect }) => {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold mb-2">Farba produktu</h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.slug}
            title={color.label}
            onClick={() => onSelect(color)}
            className={`w-8 h-8 rounded-full border transition-all ${
              selectedColor?.slug === color.slug
                ? "ring-2 ring-offset-2 ring-indigo-500 scale-110"
                : "hover:scale-105"
            }`}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </div>
  );
};
