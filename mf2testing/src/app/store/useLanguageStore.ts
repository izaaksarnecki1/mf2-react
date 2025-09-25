import { create } from "zustand";
import { TranslationFile } from "../types/Translation";
import { Language } from "../types/Language";
import en from "../translations/translations_en.json";

interface LanguageState {
  language: Language;
  activeJson: TranslationFile;
  updateLanguage: (lang: Language) => Promise<void>;
}

async function loadJson(lang: Language): Promise<TranslationFile> {
  try {
    const module = await import(
      // hacky solution to import problem.
      /* webpackInclude: /translations_[a-z]+\.json$/ */
      "../translations/translations_" + lang + ".json"
    );
    return (module.default ?? module) as TranslationFile;
  } catch (e) {
    console.log(e);
    // falls back to english translations if file not found.
    return en as TranslationFile;
  }
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: "en",
  activeJson: en as TranslationFile,

  /**
   * Updates current language & changes which json files is loaded based on current language.
   * @param lang string defining current language.
   */
  updateLanguage: async (lang: Language) => {
    const json = await loadJson(lang);
    set(() => ({ language: lang, activeJson: json }));
  },
}));
