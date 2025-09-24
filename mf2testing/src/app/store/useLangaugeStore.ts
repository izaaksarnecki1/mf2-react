import { create } from "zustand";
import { TranslationFile } from "../types/Translation";
import { Language } from "../types/Language";
import en from "../translations/translations_en.json";

// export function setTranslationsPath(path: string): void {
//   translationsPath = path;

interface LanguageState {
  language: Language;
  activeJson: TranslationFile;
  updateLanguage: (lang: Language) => Promise<void>;
}

async function loadJson(lang: Language): Promise<TranslationFile> {
  try {
    const module = await await import(
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
   * @param lang string defining current lanugage.
   */
  updateLanguage: async (lang: Language) => {
    const json = await loadJson(lang);
    const fresh = JSON.parse(JSON.stringify(json));
    set(() => ({ language: lang, activeJson: fresh }));
  },
}));
