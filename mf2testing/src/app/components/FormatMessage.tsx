"use client";
import { MessageFormat } from "messageformat";
import { ReactNode } from "react";
import { parser } from "../utils/Parser";
import { useLanguageStore } from "../store/useLanguageStore";

type FormatMessageProps = {
  msg: string;
  input: Record<string, string>; // Key value store for kv inserted to mf
};

export function FormatMessage({ msg, input }: FormatMessageProps): ReactNode {
  const { language, activeJson } = useLanguageStore();

  const mfmsg = activeJson.messages[msg];

  if (!mfmsg) {
    return <>{msg}</>;
  }

  const mf = new MessageFormat([language], mfmsg.message);

  const parts = mf.formatToParts(input);

  return parser({ parts });
}
