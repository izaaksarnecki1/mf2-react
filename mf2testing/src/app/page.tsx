"use client";
import { FormatMessage } from "./components/FormatMessage";
import MF2PostProcessor from "./plugin";
import { useLanguageStore } from "./store/useLanguageStore";

import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

i18n
  .use(initReactI18next)
  .use(MF2PostProcessor)
  .init({
    lng: "en",
    debug: true,
    postProcess: ["mf2"],
    resources: {
      en: {
        translation: {
          apples:
            "{#bold}How many apples:{/bold} {value, plural, one {# apple} other {# apples}}",
        },
      },
    },
  });

export default function Home() {
  const { language, updateLanguage } = useLanguageStore();
  const { t } = useTranslation();

  const switchToNorwegian = () => {
    updateLanguage("no");
    i18n.changeLanguage("no");
  };

  const switchToEnglish = () => {
    updateLanguage("en");
    i18n.changeLanguage("en");
  };

  return (
    <div className="m-2">
      <FormatMessage
        key={language}
        msg={"Welcome"}
        input={{ user: "Emilie", etternavn: "Hamang" }}
      />
      <p>{t("apples", { value: 2 })}</p>
      <br></br>
      <div className="flex flex-auto gap-2">
        <button onClick={switchToNorwegian} className="outline-2 p-2">
          Norwegian
        </button>
        <button onClick={switchToEnglish} className="outline-2 p-2">
          English
        </button>
      </div>
      <br></br>
    </div>
  );
}
