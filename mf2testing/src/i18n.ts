"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import MF2PostProcessor from "./app/plugin";

import en from "./locales/en/translation.json";
import no from "./locales/no/translation.json";
import MF2ReactPreset from "./app/config";

i18n
  .use(initReactI18next)
  .use(MF2PostProcessor)
  .use(MF2ReactPreset)
  .init({
    lng: "en",
    debug: true,
    fallbackLng: "en",
    postProcess: ["mf2"],
    resources: {
      en: { translation: en },
      no: { translation: no },
    },
    interpolation: {
      escapeValue: false, // done by react
    },
    react: {
      // the user should add all supported/needed html-tags supported by messageformat2
      transKeepBasicHtmlNodesFor: ["i", "em", "strong", "br", "u", "s", "code", "small"]
    }
  });

export default i18n;
