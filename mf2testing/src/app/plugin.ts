import type { PostProcessorModule, TOptions } from "i18next";
import { MessageFormat } from "messageformat";

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


const buildArgs = (options: TOptions): Record<string, unknown> => {
  const args: Record<string, unknown> = {};

  if (options) {
    Object.assign(args, options);

    const nested = (options as any).values;
    if (nested && typeof nested === "object") {
      Object.assign(args, nested);
    }
  }

  delete (args as any).lng;
  delete (args as any).postProcess;
  delete (args as any).ns;
  delete (args as any).keyPrefix;
  delete (args as any).defaultValue;
  delete (args as any).i18nDefaultValue;

  return args;
};

// Fallback for non-mf2
function mf2CurlyToAngle(input: string): string {
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

function partsToHtml(parts: any[], args: Record<string, unknown>): string {
  let out = "";

  for (const part of parts) {
    if (part.type === "markup") {
      const tag = tagAlias[part.name] || part.name;
      if (part.kind === "open") {
        out += `<${tag}>`;
      } else if (part.kind === "close") {
        out += `</${tag}>`;
      } else if (part.kind === "standalone") {
        out += `<${tag} />`;
      }
      continue;
    }

    // everything else, text, string, number
    if ("value" in part && part.value != null) {
      out += String(part.value);
      continue;
    }

    // fallback
    if (typeof part.source === "string") {
      const m = /^\$([A-Za-z][\w-]*)$/.exec(part.source.trim());
      if (m) {
        const varName = m[1];
        const v = args[varName];
        if (v != null) {
          out += String(v);
          continue;
        }
      }
      if (part.value != null) {
        out += String(part.value);
      }
    }
  }
  return out;
};

const compiledCache = new Map<string, MessageFormat>();

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
    const cacheKey = `${lng || "en"}__${value}`;

    let fn = compiledCache.get(cacheKey);

    if (!fn) {
      try {
        fn = new MessageFormat(lng, value);
        compiledCache.set(cacheKey, fn);
      } catch (err) {
        console.warn("[mf2react] MF2 parsing failed ", {lng, value, err});
        return mf2CurlyToAngle(value);
      }
    }

    const mfArgs = buildArgs(options || {});

    try {
      const parts = (fn as any).formatToParts(mfArgs);
      if (Array.isArray(parts)) {
        console.log("Parsed as parts")
        console.log("MF2 args", mfArgs);
        return partsToHtml(parts, mfArgs);
      }
      // fallback
      console.log("parsed as mf1")
      const out = (fn as any).format(mfArgs);
      return typeof out === "string" ? mf2CurlyToAngle(out) : out;
    } catch (err) {
      console.warn("[mf2react] MF2 formatting failed", { lng, value, mfArgs, err });
      return mf2CurlyToAngle(value);
    }
  },
};

export default MF2PostProcessor;
