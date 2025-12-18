import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/context/TranslationContext";

export type FontItem =
  | string
  | {
      value: string;
      label?: string;
      previewText?: string;
    };

interface Props {
  label?: string;
  fonts: FontItem[];
  selectedFont: string | null;
  onSelect: (value: string, item: FontItem) => void;
  size?: "small" | "medium" | "large";
  placeholder?: string;
}

const getValue = (f: FontItem) => (typeof f === "string" ? f : f.value);
const getLabel = (f: FontItem) => (typeof f === "string" ? f : f.label ?? f.value);
const getPreview = (f: FontItem) =>
  typeof f === "string" ? f : f.previewText ?? getLabel(f);

export const FontSelect: React.FC<Props> = ({
  label,
  fonts,
  selectedFont,
  onSelect,
  size = "medium",
  placeholder,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const labelText = label || t("fontFamily");

  const sizeClasses =
    size === "small"
      ? "text-xs p-1"
      : size === "large"
      ? "text-base p-2"
      : "text-sm p-1.5";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = selectedFont || "";
  const selectedItem = fonts.find((f) => getValue(f) === selected) ?? null;

  return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`w-full bg-slate-900 border border-slate-600 rounded text-left ${sizeClasses}`}
          style={{ fontFamily: selected || undefined }}
        >
          {selectedItem ? getLabel(selectedItem) : placeholder || t("select")}
        </button>

        {open && (
          <div className="absolute z-50 mt-1 w-full max-h-56 overflow-auto bg-slate-900 border border-slate-600 rounded">
            {fonts.map((f) => {
              const value = getValue(f);
              const isSelected = value === selectedFont;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    onSelect(value, f);
                    setOpen(false);
                  }}
                  className={`w-full px-2 py-1 text-left hover:bg-slate-700 ${
                    isSelected ? "bg-slate-800" : ""
                  }`}
                  style={{ fontFamily: value }}
                  title={getLabel(f)}
                >
                  {getPreview(f)}
                </button>
              );
            })}
          </div>
        )}
      </div>
  );
};
