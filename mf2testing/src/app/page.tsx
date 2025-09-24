"use client";
import { FormatMessage } from "./components/FormatMessage";
import { useLanguageStore } from "./store/useLangaugeStore";

export default function Home() {
  const { language, updateLanguage } = useLanguageStore();

  const switchToNorwegian = () => {
    updateLanguage("no");
  };

  const switchToEnglish = () => {
    updateLanguage("en");
  };

  return (
    <div className="m-2">
      <FormatMessage
        key={language}
        msg={"Welcome"}
        input={{ user: "Emilie", etternavn: "Hamang" }}
      />
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
