import { create } from "zustand";
import { Translation } from "../types/Translation";
import { Language } from "../types/Language";

interface LanguageState {
  language: string;
  activeJson: Translation | any;
  updateLanguage: (lang: Language) => void;
}

function loadJson(lang: Language): Translation {
  return {
    messagename: {
      message: "test",
      input: ["noe"],
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
    set((state) => ({ language: lang }));
    set((state) => ({ activeJson: loadJson(lang) }));
  },
}));
