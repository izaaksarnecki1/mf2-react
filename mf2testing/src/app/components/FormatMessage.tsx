import { MessageFormat } from "messageformat";
import { ReactNode } from "react";
import { parser } from "../utils/Parser";
import { useLanguageStore } from "../store/useLangaugeStore";
import { Translation } from "../types/Translation";

type FormatMessageProps = {
  msg: string;
  input: Record<string, string>; // Key value store for kv inserted to mf
};

export function FormatMessage({ msg, input }: FormatMessageProps): ReactNode {
  const { language, activeJson } = useLanguageStore();

  // msg should be one of the message keys from a json file. msg arg should also be rename
  // then, read the actual message from the json file.
  const mf = new MessageFormat([language], msg);
  const parts = mf.formatToParts(input);

  return parser({ parts });
}
