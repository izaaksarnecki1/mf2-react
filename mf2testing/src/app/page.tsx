"use client";
import { useState } from "react";

import i18n from "../i18n";
import { Trans } from "react-i18next";

export default function Home() {
  const [count, setCount] = useState(1);

  const switchToNorwegian = () => {
    i18n.changeLanguage("no");
  };

  const switchToEnglish = () => {
    i18n.changeLanguage("en");
  };

  return (
    <div className="m-2">
      <div className="flex items-center gap-3">
        <button
          className="outline-2 p-2"
          onClick={() => setCount((c) => Math.max(0, c - 1))}
        >
          -
        </button>
        <span>value = {count}</span>
        <button
          className="outline-2 p-2"
          onClick={() => setCount((c) => c + 1)}
        >
          +
        </button>
      </div>

      <p className="mt-3">
        <Trans i18nKey="apples" values={{ value: count }} />
      </p>

      {/* <p>{t("apples", { value: 2 })}</p> */}
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
      <Trans i18nKey={"notifications"} values={{ name: "Izaak", count: 4}}/>
    </div>
  );
}
