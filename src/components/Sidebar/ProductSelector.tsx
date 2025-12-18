import React from "react";
import { ColorPicker } from "../ColorPicker";
import { useTranslation } from "@/context/TranslationContext";
import { Product, ColorVariant } from "@/types";
import OptionButtonGroup from "../ui/groups/OptionButtonGroup";

interface Props {
  products: Product[];
  selectedProduct: string;
  onProductSelect: (value: string) => void;
  colors: ColorVariant[];
  selectedColor: ColorVariant | null;
  onColorSelect: (color: ColorVariant) => void;
}

export const ProductSelector: React.FC<Props> = ({
  products,
  selectedProduct,
  onProductSelect,
  colors,
  selectedColor,
  onColorSelect,
}) => {
  const { t, lang, setLang } = useTranslation();

  return (
    <div className="flex flex-col gap-2 mb-6">
      <h2 className="text-2xl font-semibold mb-2 flex justify-between items-center">
        {t("product")}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as "sk" | "en")}
          className="text-sm bg-slate-800 text-white border border-neutral-600 rounded p-1"
        >
          <option value="sk">SK</option>
          <option value="en">EN</option>
        </select>
      </h2>

      <OptionButtonGroup
        options={products}
        type="radio"
        selectedValue={selectedProduct}
        onChange={onProductSelect}
        className="mt-4"
      />

      {colors?.length > 0 && (
        <div className="mt-4">
          <ColorPicker
            label={t("productColor")}
            colors={colors}
            selectedColor={selectedColor?.slug || selectedColor?.hex || ""}
            onSelect={onColorSelect}
            variant="product"
          />
        </div>
      )}
    </div>
  );
};
