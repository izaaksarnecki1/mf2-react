import { ReactNode } from 'react';

type FormatMessageProps = {
    msg: string;
    input: Record<string, string>;
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
declare function FormatMessage({ msg, input }: FormatMessageProps): ReactNode;

export { FormatMessage };
