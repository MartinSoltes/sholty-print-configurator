import React, { useState } from "react";
import OptionButton from "./OptionButton";
import FileButton from "./FileButton";
import { Button } from "./Button";
import { Product, DesignImage, ImageItem, TextItem } from "@/types";
import { useTranslation } from "@/context/TranslationContext";

interface SidebarProps {
  products: Product[];
  selectedProduct: string;
  onProductSelect: (value: string) => void;
  onAddImage: (view: "front" | "back", files: DesignImage[]) => void;
  selectedView: "front" | "back";
  images: {
    front: ImageItem[];
    back: ImageItem[];
  };
  texts: {
    front: TextItem[];
    back: TextItem[];
  };
  newText: string;
  setNewText: (value: string) => void;
  showTextInput: boolean;
  setShowTextInput: (value: boolean) => void;
  onAddText: (view: "front" | "back", content: string) => void;
  onGenerateAI: (topic: string) => Promise<void>;
  aiResults: string[];
  aiLoading: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  products,
  selectedProduct,
  onProductSelect,
  onAddImage,
  selectedView,
  images,
  texts,
  newText,
  setNewText,
  showTextInput,
  setShowTextInput,
  onAddText,
  onGenerateAI,
  aiResults,
  aiLoading,
}) => {
  const { t, lang, setLang } = useTranslation();
  const [aiTopic, setAiTopic] = useState("");

  const handleFileChange = (files: { name: string; src: string; file: File }[]) => {
    const preparedImages = files.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      src: file.src,
      file: file.file,
      x: 0,
      y: 0,
      width: 150,
      height: 150,
    }));

    onAddImage(selectedView, preparedImages);
  };

  return (
    <div className="bg-slate-950 h-full text-white p-4">
      {products && (
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

          {products.map((product, index) => (
            <OptionButton
              key={index}
              name="product"
              option={product}
              type="radio"
              checked={selectedProduct === product.value}
              onChange={(value: string) => onProductSelect(value)}
            />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-2xl font-semibold mb-2">
          {selectedView === "front" ? t("frontPrint") : t("backPrint")}
        </h2>

        <h3 className="text-lg font-semibold mb-1">{t("logoOrImage")}</h3>

        {images[selectedView].length > 0 && (
          <div className="flex flex-col gap-2 overflow-y-auto mb-2">
            {images[selectedView].map((img) => (
              <div
                key={img.id}
                className="bg-slate-800 p-2 rounded flex items-center gap-2"
              >
                <img
                  src={img.src}
                  alt={img.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <span className="text-sm">{img.name}</span>
              </div>
            ))}
          </div>
        )}

        <FileButton
          multiple={true}
          useDataUrl={false}
          files={images[selectedView]}
          accept=".png, .jpg, .jpeg, .svg"
          callback={handleFileChange}
        />

        {!images[selectedView].length && (
          <p className="text-sm text-center italic">{t("selectImagesHint")}</p>
        )}

        <h3 className="text-lg font-semibold mt-4">{t("textSection")}</h3>

        {texts[selectedView].length > 0 && (
          <div className="flex flex-col gap-2 mt-2 overflow-y-auto">
            {texts[selectedView].map((text) => (
              <div
                key={text.id}
                className="bg-slate-800 p-2 rounded flex items-center gap-2"
              >
                <span className="text-sm">{text.content}</span>
              </div>
            ))}
          </div>
        )}

        {!showTextInput && (
          <Button onClick={() => setShowTextInput(true)}>
            {t("addText")}
          </Button>
        )}

        {showTextInput && (
          <div className="mt-2 flex flex-col gap-2">
            <input
              type="text"
              value={newText || ""}
              onChange={(e) => setNewText(e.target.value)}
              className="w-full p-2 rounded border border-neutral-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder={t("enterText")}
            />
            <Button
              onClick={() => {
                if (newText && newText.trim()) {
                  onAddText(selectedView, newText.trim());
                }
              }}
            >
              {t("save")}
            </Button>
          </div>
        )}

        <hr className="my-4 border-neutral-700" />

        <h3 className="text-lg font-semibold mb-2">{t("aiIdeas")}</h3>
        <input
          type="text"
          value={aiTopic}
          onChange={(e) => setAiTopic(e.target.value)}
          placeholder={t("enterTopic")}
          className="w-full p-2 mb-2 rounded border border-neutral-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <Button onClick={() => onGenerateAI(aiTopic)}>
          {aiLoading ? t("generating") : t("generate")}
        </Button>

        {aiResults.length > 0 && (
          <div className="mt-3 flex flex-col gap-2">
            {aiResults.map((slogan, i) => (
              <button
                key={i}
                onClick={() => onAddText(selectedView, slogan)}
                className="text-left p-2 rounded bg-slate-800 hover:bg-indigo-600 transition"
              >
                {slogan}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
