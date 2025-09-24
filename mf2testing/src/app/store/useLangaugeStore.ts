import { create } from "zustand";
import { TranslationFile } from "../types/Translation";
import { Language } from "../types/Language";

interface LanguageState {
  language: Language;
  activeJson: TranslationFile;
  updateLanguage: (lang: Language) => void;
}

function loadJson(lang: Language): TranslationFile {
  return {
    locale: "en",
    messages: {
      Welcome: {
        message: "test",
        inputs: ["test"],
      },
    },
  };
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: "en",
  activeJson: loadJson("en"),
  /**
   * Updates current language, changes which json files is loaded based on current language.
   * @param lang string defining current lanugage.
   */
  updateLanguage: (lang: Language) => {
    set(() => ({ language: lang, activeJson: loadJson(lang) }));
  },
}));
