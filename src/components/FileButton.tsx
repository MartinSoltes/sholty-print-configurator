import React, { useState, useEffect, ChangeEvent } from "react";

export interface FileButtonProps {
  callback: (files: { name: string; src: string; file: File }[]) => void;
  multiple?: boolean;
  accept?: string;
  label?: string;
  useDataUrl?: boolean;
  files?: { name: string; src: string }[];
}

const FileButton: React.FC<FileButtonProps> = ({
  callback,
  multiple = false,
  accept = "image/*",
  label = "Vyberte súbor",
  useDataUrl = true,
  files = [],
}) => {
  const [displayLabel, setDisplayLabel] = useState(label);

  // Update label when file list changes
  useEffect(() => {
    if (!files || files.length === 0) {
      setDisplayLabel(label);
    } else if (files.length === 1) {
      setDisplayLabel(files[0].name || label);
    } else {
      setDisplayLabel(`${files.length} súborov vybraných`);
    }
  }, [files, label]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    try {
      if (useDataUrl) {
        // Convert each file to a base64 data URL
        const results = await Promise.all(
          selectedFiles.map(
            (file) =>
              new Promise<{ name: string; src: string; file: File }>(
                (resolve, reject) => {
                  const reader = new FileReader();
                  reader.onload = () =>
                    resolve({ name: file.name, src: reader.result as string, file });
                  reader.onerror = reject;
                  reader.readAsDataURL(file);
                }
              )
          )
        );
        callback(results);
      } else {
        // Use object URLs for faster preview
        const results = selectedFiles.map((file) => ({
          name: file.name,
          src: URL.createObjectURL(file),
          file,
        }));
        callback(results);
      }
    } catch (error) {
      console.error("Error reading files", error);
    }
  };

  return (
    <label
      className={`flex justify-center items-center w-full p-2 rounded-md border-2 border-neutral-500 shadow-sm
        hover:bg-indigo-500 hover:text-white hover:border-indigo-500
        focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-neutral-700
        transition-all duration-200 cursor-pointer ${
          displayLabel !== label
            ? "bg-indigo-600 active:border-indigo-600"
            : "bg-neutral-100 text-neutral-900 font-medium"
        }`}
      aria-label={label}
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
