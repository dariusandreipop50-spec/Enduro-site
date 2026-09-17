"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Language, translations } from "./translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const storageKey = "enduro-language";

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "ro" || value === "de" || value === "es";
}

function getByPath(language: Language, key: string): string {
  let value: unknown = translations[language];
  for (const part of key.split(".")) {
    if (!value || typeof value !== "object" || !(part in value)) return key;
    value = (value as Record<string, unknown>)[part];
  }
  return typeof value === "string" ? value : key;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    let preferred: Language = "en";

    if (isLanguage(saved)) {
      preferred = saved;
    } else {
      const browserLanguage = window.navigator.language.toLowerCase();
      if (browserLanguage.startsWith("ro")) preferred = "ro";
      else if (browserLanguage.startsWith("de")) preferred = "de";
      else if (browserLanguage.startsWith("es")) preferred = "es";
    }

    if (preferred !== "en") {
      const timer = window.setTimeout(() => setLanguageState(preferred), 0);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(storageKey, language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage: setLanguageState,
    t: (key: string) => getByPath(language, key),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
