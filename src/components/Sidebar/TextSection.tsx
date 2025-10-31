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
                  }}
                >
                  {text.content}
                </span>
              )}

              <button
                onClick={() => setExpandedTextId(isExpanded ? null : text.id)}
                className="ml-2 text-gray-300 hover:text-indigo-400"
              >
                ⚙️
              </button>
            </div>

            {isExpanded && (
              <div className="mt-3 border-t border-slate-700 pt-3 space-y-2">
                <label className="block text-xs mb-1">Print Color</label>
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
            )}
          </div>
        );
      })}

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
