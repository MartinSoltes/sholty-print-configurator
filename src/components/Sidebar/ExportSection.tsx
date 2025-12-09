import React from "react";
import { useTranslation } from "@/context/TranslationContext";

interface ExportSectionProps {
  onExport: () => void;
}

export const ExportSection: React.FC<ExportSectionProps> = ({ onExport }) => {
    const { t } = useTranslation();
    
  return (
    <div className="mt-6">
      <hr className="my-4 border-neutral-700" />
      <h2 className="text-2xl font-semibold mb-4">{t("export")}</h2>
      <button
            onClick={onExport}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition text-nowrap w-full cursor-pointer"
          >
            {t("exportDesign")}
          </button>
    </div>
  );
};