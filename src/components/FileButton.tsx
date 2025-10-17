import React, { useState, useEffect, ChangeEvent } from "react";
import { FileInfo } from "@/types";
import { useTranslation } from "@/context/TranslationContext";

interface FileButtonProps {
  /** Called whenever files are selected. */
  callback: (files: FileInfo[]) => void;
  /** Allow multiple file selection */
  multiple?: boolean;
  /** Accepted MIME types (default: images only) */
  accept?: string;
  /** Default button label */
  label?: string;
  /** If true, reads files as Base64; if false, creates blob URLs */
  useDataUrl?: boolean;
  /** Optional list of current files, used for label updates */
  files?: Pick<FileInfo, "name" | "src">[];
}

const FileButton: React.FC<FileButtonProps> = ({
  callback,
  multiple = false,
  accept = "image/*",
  label,
  useDataUrl = true,
  files = [],
}) => {
  const { t } = useTranslation();
  const defaultLabel = label || t("selectFile");
  const [displayLabel, setDisplayLabel] = useState(defaultLabel);

  // 🧠 Update label text when file list changes
  useEffect(() => {
    if (!files || files.length === 0) {
      setDisplayLabel(defaultLabel);
    } else if (files.length === 1) {
      setDisplayLabel(files[0].name || defaultLabel);
    } else {
      setDisplayLabel(`${files.length} ${t("filesSelected")}`);
    }
  }, [files, defaultLabel, t]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    try {
      let results: FileInfo[];

      if (useDataUrl) {
        // Convert to Base64 data URLs
        results = await Promise.all(
          selectedFiles.map(
            (file) =>
              new Promise<FileInfo>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () =>
                  resolve({
                    name: file.name,
                    src: reader.result as string,
                    file,
                  });
                reader.onerror = reject;
                reader.readAsDataURL(file);
              })
          )
        );
      } else {
        // Create object URLs for quick preview
        results = selectedFiles.map((file) => ({
          name: file.name,
          src: URL.createObjectURL(file),
          file,
        }));

        // ⚠️ Revoke URLs on unmount to avoid memory leaks
        results.forEach(({ src }) => {
          const url = src;
          setTimeout(() => URL.revokeObjectURL(url), 60_000);
        });
      }

      callback(results);
    } catch (error) {
      console.error("Error reading files", error);
    } finally {
      e.target.value = "";
    }
  };

  return (
    <label
      className={`flex justify-center items-center w-full p-2 rounded-md border-2 border-neutral-500 shadow-sm
        hover:bg-indigo-500 hover:text-white hover:border-indigo-500
        focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-neutral-700
        transition-all duration-200 cursor-pointer ${
          displayLabel !== defaultLabel
            ? "bg-indigo-600 active:border-indigo-600"
            : "bg-neutral-100 text-neutral-900 font-medium"
        }`}
      aria-label={defaultLabel}
    >
      <input
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
      />
      {displayLabel}
    </label>
  );
};

export default FileButton;
