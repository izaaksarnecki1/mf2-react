import MessageFormat from "@messageformat/core";
import type { PostProcessorModule, TOptions } from "i18next";

const mflng = new Map<string, MessageFormat>();

const getMf = (lng?: string) => {
  const lang = lng || "en";
  let mf = mflng.get(lang);
  if (!mf) {
    mf = new MessageFormat(lang);
    mflng.set(lang, mf);
  }
  return mf;
};

const tagAlias: Record<string, string> = {
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
  em: "em",
};

export function mf2CurlyToAngle(input: string): string {
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

const compiledCache = new Map<
  string,
  (params: Record<string, unknown>) => string
>();

export const MF2PostProcessor: PostProcessorModule = {
  name: "mf2",
  type: "postProcessor",
  process: (
    value: string,
    _key: string | string[],
    options: TOptions,
    translator: any
  ) => {
    if (typeof value !== "string") return value;

    const lng: string = options?.lng || translator?.lang;
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
  },
};

export default MF2PostProcessor;
