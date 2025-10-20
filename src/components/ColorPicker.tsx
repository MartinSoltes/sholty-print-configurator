import React from "react";
import type { ColorVariant } from "@/hooks/useColors";
import { useTranslation } from "@/context/TranslationContext";

interface Props {
  colors: ColorVariant[];
  selectedColor: ColorVariant | null;
  onSelect: (color: ColorVariant) => void;
}

export const ColorPicker: React.FC<Props> = ({ colors, selectedColor, onSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2 mb-4">
      <h3 className="text-lg font-semibold mb-1">{t("productColor")}</h3>
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
