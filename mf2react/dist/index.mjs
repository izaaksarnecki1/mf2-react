// src/components/FormatMessage.tsx
import { MessageFormat } from "messageformat";

// src/utils/parser.tsx
import { jsx } from "react/jsx-runtime";
var defaultSlots = {
  bold: (children) => /* @__PURE__ */ jsx("strong", { children }),
  italic: (children) => /* @__PURE__ */ jsx("em", { children }),
  underline: (children) => /* @__PURE__ */ jsx("u", { children })
};
function parser({ parts }) {
  console.log(parts);
  const root = { name: "__root__", children: [] };
  const stack = [root];
  const push = (node) => stack[stack.length - 1]?.children.push(node);
  for (const part of parts) {
    if (part.type === "text") {
      push(part.value);
    } else if (part.type === "string") {
      push(part.value ?? "");
    } else if (part.type === "bidiIsolation") {
      push(part.value === "\u2068" ? "\u2068" : "\u2069");
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
        render ? render(wrapChildren(frame.children)) : wrapChildren(frame.children)
      );
    }
  }
  while (stack.length > 1) {
    const frame = stack.pop();
    stack[stack.length - 1]?.children.push(...frame.children);
  }
  return wrapChildren(root.children);
}
function wrapChildren(children) {
  return children.length === 1 ? children[0] : children;
}

// src/components/FormatMessage.tsx
function FormatMessage({ msg, input }) {
  const mf = new MessageFormat(["no"], msg);
  const parts = mf.formatToParts(input);
  return parser({ parts });
}
export {
  FormatMessage
};
//# sourceMappingURL=index.mjs.map