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
  App: () => App,
  Button: () => Button
});
module.exports = __toCommonJS(index_exports);

// src/Button.tsx
var React = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var Button = ({ children }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { padding: "0.5rem 1rem" }, children });
};

// src/App.tsx
var import_messageformat = require("messageformat");
var App = () => {
  const msg = "Hello {$user}";
  const mf = new import_messageformat.MessageFormat(["en", "no"], msg);
  const result = mf.format();
  console.log(result);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  App,
  Button
});
//# sourceMappingURL=index.js.map