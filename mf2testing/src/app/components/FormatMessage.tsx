import { MessageFormat } from "messageformat";
import { ReactNode } from "react";
import { parser } from "../utils/Parser";

type FormatMessageProps = {
    msg : string,
    input: Record<string, string> // Key value store for kv inserted to mf
  };

export function FormatMessage({ msg, input }: FormatMessageProps): ReactNode {
  const mf = new MessageFormat(["no"], msg);
  const parts = mf.formatToParts(input);
  return parser({ mf, input });

}