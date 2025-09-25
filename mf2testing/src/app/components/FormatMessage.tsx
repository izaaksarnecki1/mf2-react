import { MessageFormat } from "messageformat";
import { ReactNode } from "react";
import { parser } from "../utils/Parser";

type FormatMessageProps = {
  msg: string;
  input: Record<string, string>; // Key value store for kv inserted to mf
};

export function FormatMessage({ msg, input }: FormatMessageProps): ReactNode {
  // msg should be one of the message keys from a json file. msg arg should also be rename
  // then, read the actual message from the json file.
  const mf = new MessageFormat(["no"], msg);
  const parts = mf.formatToParts(input);

  return parser({ parts });
}
