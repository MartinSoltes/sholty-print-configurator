import React, { useState } from "react";
import OptionButton from "./OptionButton";
import FileButton from "./FileButton";
import { Button } from "./Button";
import { Product, DesignImage, ImageItem, TextItem, PrintColor } from "@/types";
import { useTranslation } from "@/context/TranslationContext";
import { ColorVariant } from "@/hooks/useColors";
import { ColorPicker } from "./ColorPicker";
import easyWeedColors from "@/data/colors/print/easyWeed.json";

interface SidebarProps {
  enableProductSelection: boolean
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
  colors: ColorVariant[];
  selectedColor: ColorVariant | null;
  onColorSelect: (color: ColorVariant) => void;
  onUpdateText: (view: "front" | "back", id: string, updates: any) => void;
  aiGraphicsPrompt: string;
  aiEnabled: boolean
  setAiGraphicsPrompt: (value: string) => void;
  aiGraphicsResults: string[];
  aiGraphicsLoading: boolean;
  onGenerateAIGraphics: (prompt: string, refs: string[]) => Promise<void>;
  referenceImages: { name: string; src: string; file: File }[];
  setReferenceImages: (files: { name: string; src: string; file: File }[]) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  products,
  enableProductSelection,
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
  colors,
  selectedColor,
  onColorSelect,
  onUpdateText,
  aiEnabled,
  aiGraphicsPrompt,
  setAiGraphicsPrompt,
  aiGraphicsResults,
  aiGraphicsLoading,
  onGenerateAIGraphics,
  referenceImages,
  setReferenceImages
}) => {
  const { t, lang, setLang } = useTranslation();
  const [aiTopic, setAiTopic] = useState("");
  const [expandedTextId, setExpandedTextId] = useState<string | null>(null);

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
    <div className="bg-slate-950 text-white p-4 h-full overflow-x-scroll">
      {enableProductSelection && 
        <>
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

          {/* --- Color Picker --- */}
          {colors?.length > 0 && (
            <div className="mb-6">
              <ColorPicker
                colors={colors}
                selectedColor={selectedColor}
                onSelect={onColorSelect}
              />
            </div>
          )}

          <hr className="my-4 border-neutral-700" />
        </>
      }

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
            {texts[selectedView].map((text) => {
              const isExpanded = expandedTextId === text.id;
              return (
                <div key={text.id} className="bg-slate-800 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    {/* Editable text label */}
                    {isExpanded ? (
                      <input
                        type="text"
                        value={text.content}
                        onChange={(e) =>
                          onUpdateText(selectedView, text.id, {
                            content: e.target.value,
                          })
                        }
                        className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm text-white focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <span
                        className="text-sm flex-1"
                        style={{
                          fontFamily: text.fontFamily,
                          color: text.color,
                          fontSize: text.fontSize,
                          fontWeight: text.bold ? "bold" : "normal",
                          fontStyle: text.italic ? "italic" : "normal",
                          textAlign: text.align || "left",
                        }}
                      >
                        {text.content}
                      </span>
                    )}

                    <div className="flex gap-2 ml-2">
                      {/* ⚙️ Settings toggle */}
                      <button
                        onClick={() =>
                          setExpandedTextId(isExpanded ? null : text.id)
                        }
                        className="text-gray-300 hover:text-indigo-400 cursor-pointer"
                        title="Edit text"
                      >
                        •••
                      </button>

                      {/* 🗑️ Delete text */}
                      <button
                        onClick={() => onUpdateText(selectedView, text.id, { remove: true })}
                        className="text-red-500 hover:text-red-400 cursor-pointer"
                        title="Delete text"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* --- Settings panel --- */}
                  {isExpanded && (
                    <div className="mt-3 border-t border-slate-700 pt-3 space-y-2">
                      {/* Font Family */}
                      <div>
                        <label className="block text-xs mb-1">Font Family</label>
                        <select
                          value={text.fontFamily || "Roboto"}
                          onChange={(e) =>
                            onUpdateText(selectedView, text.id, {
                              fontFamily: e.target.value,
                            })
                          }
                          className="w-full p-1 bg-slate-900 border border-slate-600 rounded text-sm"
                        >
                          <option value="Roboto">Roboto</option>
                          <option value="Oswald">Oswald</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Lobster">Lobster</option>
                          <option value="Playfair Display">Playfair Display</option>
                          <option value="Poppins">Poppins</option>
                          <option value="Raleway">Raleway</option>
                          <option value="Source Sans Pro">Source Sans Pro</option>
                          <option value="Open Sans">Open Sans</option>
                        </select>
                      </div>

                      {/* Font Size */}
                      <div>
                        <label className="block text-xs mb-1">Font Size</label>
                        <input
                          type="number"
                          min={8}
                          max={100}
                          value={text.fontSize || 20}
                          onChange={(e) =>
                            onUpdateText(selectedView, text.id, {
                              fontSize: parseInt(e.target.value),
                            })
                          }
                          className="w-full p-1 bg-slate-900 border border-slate-600 rounded text-sm"
                        />
                      </div>

                      {/* Font Color (EasyWeed Vinyls) */}
                      <div>
                        <label className="block text-xs mb-1">Print Color (EasyWeed)</label>
                        <div className="flex flex-wrap gap-2">
                          {easyWeedColors.map((color: PrintColor) => {
                            const isSelected = text.print?.colorSlug === color.slug;
                            return (
                              <button
                                key={color.slug}
                                onClick={() =>
                                  onUpdateText(selectedView, text.id, {
                                    color: color.hex,
                                    print: {
                                      material: "easyWeed",
                                      colorSlug: color.slug,
                                      hex: color.hex,
                                    },
                                  })
                                }
                                title={color.label}
                                className={`w-7 h-7 rounded-full border-2 ${
                                  isSelected ? "border-indigo-400 scale-110" : "border-gray-400"
                                } transition`}
                                style={{ backgroundColor: color.hex }}
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* Bold / Italic / Align */}
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              onUpdateText(selectedView, text.id, {
                                bold: !text.bold,
                              })
                            }
                            className={`px-2 py-1 rounded ${
                              text.bold ? "bg-indigo-600" : "bg-slate-700"
                            }`}
                          >
                            <b>B</b>
                          </button>
                          <button
                            onClick={() =>
                              onUpdateText(selectedView, text.id, {
                                italic: !text.italic,
                              })
                            }
                            className={`px-2 py-1 rounded ${
                              text.italic ? "bg-indigo-600" : "bg-slate-700"
                            }`}
                          >
                            <i>I</i>
                          </button>
                        </div>

                        <div className="flex gap-2">
                          {["left", "center", "right"].map((align) => (
                            <button
                              key={align}
                              onClick={() =>
                                onUpdateText(selectedView, text.id, { align })
                              }
                              className={`px-2 py-1 rounded ${
                                text.align === align
                                  ? "bg-indigo-600"
                                  : "bg-slate-700"
                              }`}
                            >
                              {align === "left"
                                ? "⬅"
                                : align === "center"
                                ? "↔"
                                : "➡"}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
                  setNewText(""); // 🧹 clear the input
                  setShowTextInput(false); // optional: auto-hide input after adding
                }
              }}
            >
              {t("save")}
            </Button>

          </div>
        )}

        {/* --- AI Section --- */}
        {aiEnabled && 
        <>
          <hr className="my-4 border-neutral-700" />

          <h3 className="text-lg font-semibold">{t("aiIdeas")}</h3>

          {/* --- AI Graphics Section --- */}
          <h4 className="text-lg font-semibold mb-2 mt-4">{t("aiGraphics")}</h4>

          {import.meta.env.VITE_OPENAI_API_KEY?.trim() ? (
            <>
              <input
                type="text"
                value={aiGraphicsPrompt}
                onChange={(e) => setAiGraphicsPrompt(e.target.value)}
                placeholder={t("enterGraphicsIdea")}
                className="w-full p-2 mb-2 rounded border border-neutral-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <FileButton
                multiple={true}
                accept=".jpg, .jpeg, .png"
                files={referenceImages}
                callback={setReferenceImages}
              />

              <Button
                onClick={() =>
                  onGenerateAIGraphics(
                    aiGraphicsPrompt,
                    referenceImages.map((img) => img.src)
                  )
                }
              >
                {aiGraphicsLoading ? t("generating") : t("generate")}
              </Button>

              {aiGraphicsResults.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {aiGraphicsResults.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`AI Graphic ${i}`}
                      className="rounded shadow cursor-pointer hover:ring-2 hover:ring-indigo-500"
                      onClick={() =>
                        onAddImage(selectedView, [
                          {
                            id: crypto.randomUUID(),
                            name: `ai-graphic-${i + 1}`,
                            src: img,
                            x: 0,
                            y: 0,
                            width: 200,
                            height: 200,
                          },
                        ])
                      }
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="bg-yellow-700 text-yellow-100 text-sm p-3 rounded-md mb-3 border border-yellow-500 flex items-start gap-2">
              <span className="text-lg">⚠️</span>
              <span>
                {t("missingApiKey") ||
                  "Please set your OpenAI API key in the .env file to enable AI graphics."}
              </span>
            </div>
          )}

          {/* --- AI Slogan --- */}
          {!import.meta.env.VITE_OPENAI_API_KEY ? (
            <div className="bg-yellow-700 text-yellow-100 text-sm p-3 rounded-md mb-3 border border-yellow-500 flex items-start gap-2">
              <span className="text-lg">⚠️</span>
              <span>
                {t("missingApiKey") ||
                  "Please set your OpenAI API key in the .env file to enable AI ideas."}
              </span>
            </div>
            ) : (
            <>
              <h4 className="text-lg font-semibold mb-2 mt-4">{t("aiSlogan")}</h4>

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
            </>
          )}
        </>
        }

      </div>
    </div>
  );
};
