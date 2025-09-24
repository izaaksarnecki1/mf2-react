import type { MessagePart } from "messageformat";

type SlotMap = Record<string, (children: React.ReactNode) => React.ReactNode>;

const defaultSlots: SlotMap = {
  bold: (children) => <strong>{children}</strong>,
  italic: (children) => <em>{children}</em>,
};

type ParserProps = {
  parts: MessagePart<never>[];
  slots: SlotMap;
};
/**
 * Parses MessagePart[] array defined my messageformat.
 * Returns a
 * @param param0
 */
export function parseMessageParts({
  parts,
  slots = defaultSlots,
}: ParserProps): React.ReactNode {
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
      // Use the actual code points to keep source clean
      push(part.value === "⁨" ? "\u2068" : "\u2069");
    } else if (part.type === "markup" && part.kind === "open") {
      stack.push({ name: part.name, children: [] });
    } else if (part.type === "markup" && part.kind === "close") {
      const frame = stack.pop();
      if (!frame || frame.name !== part.name) {
        push(frame ? frame.children : null);
        continue;
      }
      const render = slots[frame.name];
      push(
        render
          ? render(wrapChildren(frame.children))
          : wrapChildren(frame.children)
      );
    }
  }

  while (stack.length > 1) {
    const frame = stack.pop()!; // theoretically might be undefined, but we know it will "always" have at least one element
    stack[stack.length - 1]?.children.push(...frame.children);
  }

  return wrapChildren(root.children);
}

function wrapChildren(children: React.ReactNode[]) {
  return children.length === 1 ? children[0] : children;
}
