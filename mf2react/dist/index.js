"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  FormatMessage: () => FormatMessage
});
module.exports = __toCommonJS(index_exports);

// src/components/FormatMessage.tsx
var import_messageformat = require("messageformat");

// src/utils/parser.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var defaultSlots = {
  bold: (children) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children }),
  italic: (children) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children }),
  underline: (children) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("u", { children })
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
  const mf = new import_messageformat.MessageFormat(["no"], msg);
  const parts = mf.formatToParts(input);
  return parser({ parts });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormatMessage
});
//# sourceMappingURL=index.js.map