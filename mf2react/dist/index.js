"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  MF2PostProcessor: () => MF2PostProcessor
});
module.exports = __toCommonJS(index_exports);

// src/plugin.ts
var import_core = __toESM(require("@messageformat/core"));
var mflng = /* @__PURE__ */ new Map();
var getMf = (lng) => {
  const lang = lng || "en";
  let mf = mflng.get(lang);
  if (!mf) {
    mf = new import_core.default(lang);
    mflng.set(lang, mf);
  }
  return mf;
};
var tagAlias = {
  bold: "strong",
  b: "strong",
  i: "em",
  italic: "em",
  br: "br",
  u: "u",
  s: "s",
  code: "code",
  small: "small",
  strong: "strong",
  em: "em"
};
function mf2CurlyToAngle(input) {
  input = input.replace(/\{#([A-Za-z][\w-]*)\s*\/\}/g, (_, t) => {
    const html = tagAlias[t] || t;
    return `<${html} />`;
  });
  input = input.replace(
    /\{#([A-Za-z][\w-]*)\}/g,
    (_, t) => `<${tagAlias[t] || t}>`
  );
  input = input.replace(
    /\{\/([A-Za-z][\w-]*)\}/g,
    (_, t) => `</${tagAlias[t] || t}>`
  );
  return input;
}
var compiledCache = /* @__PURE__ */ new Map();
var MF2PostProcessor = {
  name: "mf2",
  type: "postProcessor",
  process: (value, _key, options, translator) => {
    if (typeof value !== "string") return value;
    const lng = options?.lng || translator?.lang;
    const mf = getMf(lng);
    const cacheKey = `${lng || "en"}__${value}`;
    let fn = compiledCache.get(cacheKey);
    if (!fn) {
      fn = mf.compile(value);
      compiledCache.set(cacheKey, fn);
    }
    try {
      const out = fn({ ...options });
      return typeof out === "string" ? mf2CurlyToAngle(out) : out;
    } catch {
      return value;
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MF2PostProcessor
});
//# sourceMappingURL=index.js.map