import type { ReactNode } from "react";

import { MessageFormat } from "messageformat";
import { parser } from "../utils/parser";

type FormatMessageProps = {
  msg: string;
  input: Record<string, string>; // Key value store for kv inserted to mf
};

/**
 * Render a localized, markup-aware message as a React node.
 *
 * This component compiles the provided `msg` with `messageformat`,
 * converts it to an array of `MessagePart`s via `formatToParts(input)`, and
 * then turns those parts into React elements using the internal `parser`.
 *
 * Variables and ICU formats (e.g., plural/select) are handled by
 * `messageformat`. Bidi isolation markers are preserved.
 *
 * @example
 * // msg as a literal string:
 * <FormatMessage
 *   msg="Welcome, <bold>{name}</bold>!"
 *   input={{ name: "Name" }}
 * />
 */
export function FormatMessage({ msg, input }: FormatMessageProps): ReactNode {
  // NOTE: msg should be one of the message keys from a json file. msg arg should also be rename
  // then, read the actual message from the json file.
  const mf = new MessageFormat(["no"], msg);
  const parts = mf.formatToParts(input);

  return parser({ parts });
}
