import React, { useState } from "react";
import { Button } from "../ui/Button";
import { FileButton } from "../ui/FileButton";
import { useTranslation } from "@/context/TranslationContext";

interface Props {
  aiResults: string[];
  aiLoading: boolean;
  aiGraphicsPrompt: string;
  aiGraphicsResults: string[];
  aiGraphicsLoading: boolean;
  onGenerateAI: (topic: string) => Promise<void>;
  onGenerateAIGraphics: (prompt: string, refs: string[]) => Promise<void>;
  referenceImages: { name: string; src: string; file: File }[];
  setReferenceImages: (files: { name: string; src: string; file: File }[]) => void;
}

export const AiSection: React.FC<Props> = ({
  aiResults,
  aiLoading,
  aiGraphicsPrompt,
  aiGraphicsResults,
  aiGraphicsLoading,
  onGenerateAI,
  onGenerateAIGraphics,
  referenceImages,
  setReferenceImages,
}) => {
  const { t } = useTranslation();
  const [aiTopic, setAiTopic] = useState("");

  return (
    <div className="mt-6">
      <hr className="my-4 border-neutral-700" />
      <h3 className="text-lg font-semibold mb-2">{t("aiIdeas")}</h3>

      {/* --- Slogans --- */}
      <h4 className="text-md font-semibold mt-4 mb-2">{t("aiSlogan")}</h4>
      <input
        type="text"
        value={aiTopic}
        onChange={(e) => setAiTopic(e.target.value)}
        placeholder={t("enterTopic")}
        className="w-full p-2 mb-2 rounded border border-neutral-600 bg-slate-800 text-white"
      />
      <Button onClick={() => onGenerateAI(aiTopic)}>
        {aiLoading ? t("generating") : t("generate")}
      </Button>

      {aiResults.length > 0 && (
        <div className="mt-3 flex flex-col gap-2">
          {aiResults.map((text, i) => (
            <button
              key={i}
              className="text-left p-2 rounded bg-slate-800 hover:bg-indigo-600 transition"
            >
              {text}
            </button>
          ))}
        </div>
      )}

      {/* --- Graphics --- */}
      <h4 className="text-md font-semibold mt-3 mb-2">{t("aiGraphics")}</h4>

      <input
        type="text"
        value={aiGraphicsPrompt}
        onChange={(e) => setAiTopic(e.target.value)}
        placeholder={t("enterGraphicsIdea")}
        className="w-full p-2 mb-2 rounded border border-neutral-600 bg-slate-800 text-white"
      />
      <FileButton multiple files={referenceImages} callback={setReferenceImages} />

      <Button
        onClick={() =>
          onGenerateAIGraphics(aiGraphicsPrompt, referenceImages.map((f) => f.src))
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
              className="rounded shadow cursor-pointer hover:ring-2 hover:ring-indigo-500"
            />
          ))}
        </div>
      )}
    </div>
  );
};
