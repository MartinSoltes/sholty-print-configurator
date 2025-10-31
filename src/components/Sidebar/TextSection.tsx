import React, { useState } from "react";
import { Button } from "../ui/Button";
import { ColorPicker } from "../ColorPicker";
import easyWeedColors from "@/data/colors/print/easyWeed.json";
import { useTranslation } from "@/context/TranslationContext";
import { TextItem, PrintColor } from "@/types";

interface Props {
  selectedView: "front" | "back";
  texts: { front: TextItem[]; back: TextItem[] };
  newText: string;
  setNewText: (value: string) => void;
  showTextInput: boolean;
  setShowTextInput: (value: boolean) => void;
  onAddText: (view: "front" | "back", content: string) => void;
  onUpdateText: (view: "front" | "back", id: string, updates: any) => void;
}

export const TextSection: React.FC<Props> = ({
  selectedView,
  texts,
  newText,
  setNewText,
  showTextInput,
  setShowTextInput,
  onAddText,
  onUpdateText,
}) => {
  const { t } = useTranslation();
  const [expandedTextId, setExpandedTextId] = useState<string | null>(null);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">{t("textSection")}</h3>

      {texts[selectedView].map((text) => {
        const isExpanded = expandedTextId === text.id;

        return (
          <div key={text.id} className="bg-slate-800 p-3 rounded-md mb-3">
            <div className="flex justify-between items-center">
              {isExpanded ? (
                <input
                  type="text"
                  value={text.content}
                  onChange={(e) =>
                    onUpdateText(selectedView, text.id, { content: e.target.value })
                  }
                  className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm text-white"
                />
              ) : (
                <span
                  className="text-sm flex-1"
                  style={{
                    color: text.color,
                    fontFamily: text.fontFamily,
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
                <button
                  onClick={() => setExpandedTextId(isExpanded ? null : text.id)}
                  className="text-gray-300 hover:text-indigo-400"
                  title={t("edit") || "Edit"}
                >
                  ⚙️
                </button>
                <button
                  onClick={() =>
                    onUpdateText(selectedView, text.id, { remove: true })
                  }
                  className="text-red-500 hover:text-red-400"
                  title={t("delete") || "Delete"}
                >
                  🗑️
                </button>
              </div>
            </div>

            {isExpanded && (
              <div className="mt-3 border-t border-slate-700 pt-3 space-y-3">
                {/* Font Size Slider */}
                <div>
                  <label className="block text-xs mb-1">Font Size: {text.fontSize}px</label>
                  <input
                    type="range"
                    min={8}
                    max={100}
                    step={1}
                    value={text.fontSize}
                    onChange={(e) =>
                      onUpdateText(selectedView, text.id, {
                        fontSize: parseInt(e.target.value),
                      })
                    }
                    className="w-full accent-indigo-500"
                  />
                </div>

                {/* Font Family */}
                <div>
                  <label className="block text-xs mb-1">Font Family</label>
                  <select
                    value={text.fontFamily || "Roboto"}
                    onChange={(e) =>
                      onUpdateText(selectedView, text.id, { fontFamily: e.target.value })
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
                    <option value="Open Sans">Open Sans</option>
                  </select>
                </div>

                {/* Color Picker */}
                <div>
                  <label className="block text-xs mb-1">{t("textColor")}</label>
                  <ColorPicker
                    colors={easyWeedColors as PrintColor[]}
                    selectedColor={text.print?.colorSlug || text.color}
                    onSelect={(color) =>
                      onUpdateText(selectedView, text.id, {
                        color: color.hex,
                        print: {
                          material: "easyWeed",
                          colorSlug: color.slug,
                          hex: color.hex,
                        },
                      })
                    }
                    variant="text"
                    size="small"
                  />
                </div>

                {/* Text Style Controls */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        onUpdateText(selectedView, text.id, { bold: !text.bold })
                      }
                      className={`px-2 py-1 rounded ${
                        text.bold ? "bg-indigo-600" : "bg-slate-700"
                      }`}
                    >
                      <b>B</b>
                    </button>
                    <button
                      onClick={() =>
                        onUpdateText(selectedView, text.id, { italic: !text.italic })
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
                          text.align === align ? "bg-indigo-600" : "bg-slate-700"
                        }`}
                      >
                        {align === "left" ? "⬅" : align === "center" ? "↔" : "➡"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Add New Text */}
      {!showTextInput && (
        <Button onClick={() => setShowTextInput(true)}>{t("addText")}</Button>
      )}

      {showTextInput && (
        <div className="mt-2 flex flex-col gap-2">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder={t("enterText")}
            className="w-full p-2 rounded border border-neutral-600 bg-slate-800 text-white"
          />
          <Button
            onClick={() => {
              if (newText.trim()) {
                onAddText(selectedView, newText.trim());
                setNewText("");
                setShowTextInput(false);
              }
            }}
          >
            {t("save")}
          </Button>
        </div>
      )}
    </div>
  );
};
