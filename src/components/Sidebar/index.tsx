import React from "react";
import { useTranslation } from "@/context/TranslationContext";
import { Product, DesignImage, ImageItem, TextItem, ColorVariant } from "@/types";
import { ProductSelector } from "./ProductSelector";
import { ImageSection } from "./ImageSection";
import { TextSection } from "./TextSection";
import { AiSection } from "./AiSection";

interface SidebarProps {
  enableProductSelection: boolean;
  products: Product[];
  selectedProduct: string;
  onProductSelect: (value: string) => void;
  onAddImage: (view: "front" | "back", files: DesignImage[]) => void;
  selectedView: "front" | "back";
  images: { front: ImageItem[]; back: ImageItem[] };
  texts: { front: TextItem[]; back: TextItem[] };
  newText: string;
  setNewText: (value: string) => void;
  showTextInput: boolean;
  setShowTextInput: (value: boolean) => void;
  onAddText: (view: "front" | "back", content: string) => void;
  onUpdateText: (view: "front" | "back", id: string, updates: any) => void;
  aiResults: string[];
  aiLoading: boolean;
  aiEnabled: boolean;
  aiGraphicsPrompt: string;
  setAiGraphicsPrompt: (value: string) => void;
  aiGraphicsResults: string[];
  aiGraphicsLoading: boolean;
  onGenerateAI: (topic: string) => Promise<void>;
  onGenerateAIGraphics: (prompt: string, refs: string[]) => Promise<void>;
  colors: ColorVariant[];
  selectedColor: ColorVariant | null;
  onColorSelect: (color: ColorVariant) => void;
  referenceImages: { name: string; src: string; file: File }[];
  setReferenceImages: (files: { name: string; src: string; file: File }[]) => void;
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-950 text-white p-4 h-full overflow-x-scroll">
      {props.enableProductSelection && (
        <>
          <ProductSelector {...props} />
          <hr className="my-4 border-neutral-700" />
        </>
      )}

      <ImageSection {...props} />

      <TextSection {...props} />

      {props.aiEnabled && <AiSection {...props} />}
    </div>
  );
};

export default Sidebar;
