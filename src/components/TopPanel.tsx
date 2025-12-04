import React from "react";
import OptionButton from "./ui/OptionButton";
import { useTranslation } from "@/context/TranslationContext";
import { Undo2, Redo2 } from "lucide-react";

interface TopPanelProps {
  views: { label: string; value: "front" | "back" }[];
  selectedView: "front" | "back";
  onViewSelect: (value: "front" | "back") => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const TopPanel: React.FC<TopPanelProps> = ({
    views,
    selectedView,
    onViewSelect,
    onUndo,
    onRedo,
    canUndo,
    canRedo,
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-slate-900 text-white p-4 flex items-center justify-between gap-4 sticky top-0 z-20">
      <div></div>

      <div className="flex flex-wrap items-center gap-4">
        {/* View Selection */}
        {views && (
          <div className="">
            {/* <h2 className="font-semibold me-2">{t("productSide")}</h2> */}
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

        <div className="flex gap-2 flex-wrap">
          {/* UNDO */}
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`relative group px-4 py-2 rounded-md border flex items-center justify-center ${
              canUndo
                ? "bg-slate-700 hover:bg-slate-600"
                : "bg-slate-900 opacity-50 cursor-not-allowed"
            }`}
          >
            <Undo2 size={20} />

            {/* Tooltip */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                            whitespace-nowrap bg-slate-800 text-white text-xs 
                            py-1 px-2 rounded opacity-0 group-hover:opacity-100 
                            transition pointer-events-none">
              {t("undo")}
            </div>
          </button>

          {/* REDO */}
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`relative group px-4 py-2 rounded-md border flex items-center justify-center ${
              canRedo
                ? "bg-slate-700 hover:bg-slate-600"
                : "bg-slate-900 opacity-50 cursor-not-allowed"
            }`}
          >
            <Redo2 size={20} />

            {/* Tooltip */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                            whitespace-nowrap bg-slate-800 text-white text-xs 
                            py-1 px-2 rounded opacity-0 group-hover:opacity-100 
                            transition pointer-events-none">
              {t("redo")}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};