import { MessagePart } from "messageformat";
import { ReactNode } from "react";

type SlotMap = Record<string, (children: React.ReactNode) => React.ReactNode>;

const defaultSlots: SlotMap = {
  bold: (children) => <strong>{children}</strong>,
  italic: (children) => <em>{children}</em>,
  underline: (children) => <u>{children}</u>,
};

type ParserProps = {
  parts: MessagePart<never>[];
};

/**
 * Parses MessagePart[] array defined my messageformat.
 * Returns a ReactNode. The returned ReactNode is a built of each part provided in the parts parameter.
 * @param parts array of `MessagePart`s
 */
export function parser({ parts }: ParserProps): ReactNode {
  type Frame = { name: string; children: React.ReactNode[] };

  const root: Frame = { name: "__root__", children: [] };
  const stack: Frame[] = [root];

  const push = (node: React.ReactNode) =>
    stack[stack.length - 1]?.children.push(node);

  for (const part of parts) {
    if (part.type === "text") {
      push(part.value);
    } else if (part.type === "string") {
      push(part.value ?? "");
    } else if (part.type === "bidiIsolation") {
      push(part.value === "⁨" ? "\u2068" : "\u2069");
    } else if (part.type === "markup" && part.kind === "open") {
      stack.push({ name: part.name, children: [] });
    } else if (part.type === "markup" && part.kind === "close") {
      const frame = stack.pop();

      if (!frame || frame.name !== part.name) {
        push(frame ? frame.children : null);
        continue;
      }

      const render = defaultSlots[frame.name];
      push(
        render
          ? render(wrapChildren(frame.children))
          : wrapChildren(frame.children)
      );
    }
  }

  while (stack.length > 1) {
    const frame = stack.pop()!;
    stack[stack.length - 1]?.children.push(...frame.children);
  }

  return wrapChildren(root.children);
}

function wrapChildren(children: ReactNode[]) {
  return children.length === 1 ? children[0] : children;
}
