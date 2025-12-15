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

    const candidates = [
      (options as any).values,
      (options as any).replace,
      (options as any).interpolation?.defaultVariables,
    ];

    for (const c of candidates) {
      if (c && typeof c === "object") Object.assign(args, c);
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
  const renderPart = (part: any): string => {
    if (!part) return "";

    // handle markup conversion
    if (part.type === "markup") {
      const tag = tagAlias[part.name] || part.name;
      if (part.kind === "open") return `<${tag}>`;
      if (part.kind === "close") return `</${tag}>`;
      if (part.kind === "standalone") return `<${tag} />`;
      return "";
    }

    // plain text
    if (part.type === "text" && part.value != null) {
      return String(part.value);
    }

    // output may be in part.value
    if (part.value != null) {
      return String(part.value);
    }

    // output may be in parts
    if (Array.isArray(part.parts)) {
      return part.parts.map(renderPart).join("");
    }

    if (typeof part.source === "string") {
      const m = /^\$([A-Za-z][\w-]*)$/.exec(part.source.trim());
      if (m) {
        const v = args[m[1]!];
        return v != null ? String(v) : "";
      }
    }

    return "";
  };

  return parts.map(renderPart).join("");
}

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
        return partsToHtml(parts, mfArgs);
      }

      // if formattoparts isn't available, fallback to plain string formatting
      const out = (fn as any).format(mfArgs);
      return typeof out === "string" ? mf2CurlyToAngle(out) : out;
    } catch (err) {
      console.warn("[mf2react] MF2 formatting failed", { lng, value, mfArgs, err });
      return mf2CurlyToAngle(value);
    }
  },
};

export default MF2PostProcessor;
