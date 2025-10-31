import React from "react";
import { useTranslation } from "@/context/TranslationContext";
import type { ColorVariant, PrintColor } from "@/types/color";

type AnyColor = ColorVariant | PrintColor;

interface Props<T extends AnyColor> {
  label?: string;
  colors: T[];
  selectedColor: string | null;
  onSelect: (color: T) => void;
  variant?: "product" | "text" | "overlay";
  size?: "small" | "medium" | "large";
}

export const ColorPicker = <T extends AnyColor>({
  label,
  colors,
  selectedColor,
  onSelect,
  variant = "product",
  size = "medium",
}: Props<T>) => {
  const { t } = useTranslation();

  const labelText =
    label ||
    (variant === "text"
      ? t("textColor")
      : variant === "overlay"
      ? t("overlayColor")
      : t("productColor"));

  const sizeClasses =
    size === "small"
      ? "w-6 h-6"
      : size === "large"
      ? "w-10 h-10"
      : "w-8 h-8";

  return (
    <div className="flex flex-col gap-2 mb-4">
      <h3 className="text-lg font-semibold mb-1">{labelText}</h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => {
          const isSelected =
            selectedColor === color.slug || selectedColor === color.hex;

          return (
            <button
              key={color.slug}
              title={color.label}
              onClick={() => onSelect(color)}
              className={`${sizeClasses} rounded-full border-2 transition-all ${
                isSelected
                  ? "border-indigo-400 ring-2 ring-indigo-400 scale-110"
                  : "border-gray-400 hover:scale-105"
              }`}
              style={{ backgroundColor: color.hex }}
            />
          );
        })}
      </div>
    </div>
  );
};
