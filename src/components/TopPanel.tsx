import React from "react";
import OptionButton from "./OptionButton";
import { useTranslation } from "@/context/TranslationContext";

interface TopPanelProps {
  views: { label: string; value: "front" | "back" }[];
  selectedView: "front" | "back";
  onViewSelect: (value: "front" | "back") => void;
  onExport: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const TopPanel: React.FC<TopPanelProps> = ({
    views,
    selectedView,
    onViewSelect,
    onExport,
    onUndo,
    onRedo,
    canUndo,
    canRedo,
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-slate-900 text-white p-4 flex items-center justify-center 2xl:justify-between gap-4 flex-wrap sticky top-0 z-20">
      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-2 md:mb-0">{t("productPreview")}</h2>
        <div className="flex gap-2">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`px-4 py-2 rounded-md border ${
              canUndo
                ? "bg-slate-700 hover:bg-slate-600"
                : "bg-slate-900 opacity-50 cursor-not-allowed"
            }`}
          >
            {t("undo")}
          </button>

          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`px-4 py-2 rounded-md border ${
              canRedo
                ? "bg-slate-700 hover:bg-slate-600"
                : "bg-slate-900 opacity-50 cursor-not-allowed"
            }`}
          >
            {t("redo")}
          </button>

          <button
            onClick={onExport}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {t("exportDesign")}
          </button>
        </div>
      </div>

      {/* View Selection */}
      {views && (
        <div className="flex items-center justify-between gap-2 w-full max-w-md">
          <h2 className="text-xl font-semibold">{t("productSide")}</h2>
          <div className="grid grid-cols-2 gap-2">
            {views.map((view, index) => (
              <OptionButton
                key={index}
                name="view"
                option={view}
                type="radio"
                checked={selectedView === view.value}
                onChange={(value) => onViewSelect(value as "front" | "back")}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};