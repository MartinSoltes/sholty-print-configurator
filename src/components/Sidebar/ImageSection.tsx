import React from "react";
import { FileButton } from "../ui/FileButton";
import { Button } from "../ui/Button";
import { useTranslation } from "@/context/TranslationContext";
import { DesignImage, ImageItem } from "@/types";

interface Props {
  selectedView: "front" | "back";
  images: { front: ImageItem[]; back: ImageItem[] };
  onAddImage: (view: "front" | "back", files: DesignImage[]) => void;
}

export const ImageSection: React.FC<Props> = ({ selectedView, images, onAddImage }) => {
  const { t } = useTranslation();

  const handleFileChange = (files: { name: string; src: string; file: File }[]) => {
    const prepared = files.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      src: file.src,
      file: file.file,
      x: 0,
      y: 0,
      width: 150,
      height: 150,
    }));
    onAddImage(selectedView, prepared);
  };

  return (
    <div className="mb-4">
      <h2 className="text-2xl font-semibold mb-2">
        {selectedView === "front" ? t("frontPrint") : t("backPrint")}
      </h2>
      <h3 className="text-lg font-semibold mb-1">{t("logoOrImage")}</h3>

      {images[selectedView].length > 0 && (
        <div className="flex flex-col gap-2 overflow-y-auto mb-2">
          {images[selectedView].map((img) => (
            <div key={img.id} className="bg-slate-800 p-2 rounded flex items-center gap-2">
              <img src={img.src} alt={img.name} className="w-10 h-10 object-cover rounded" />
              <span className="text-sm">{img.name}</span>
            </div>
          ))}
        </div>
      )}

      <FileButton
        multiple
        useDataUrl={false}
        files={images[selectedView]}
        accept=".png, .jpg, .jpeg, .svg"
        callback={handleFileChange}
      />

      {!images[selectedView].length && (
        <p className="text-sm text-center italic">{t("selectImagesHint")}</p>
      )}
    </div>
  );
};