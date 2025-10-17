import React, { createContext, useContext, useState, ReactNode } from "react";
import sk from "@/locales/sk.json";
import en from "@/locales/en.json";

type Lang = "sk" | "en";
const resources = { sk, en };

interface TranslationContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: keyof typeof sk) => string;
}

const TranslationContext = createContext<TranslationContextProps | null>(null);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("sk");
  const t = (key: keyof typeof sk) => resources[lang][key] || key;

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context)
    throw new Error("useTranslation must be used within a TranslationProvider");
  return context;
};
