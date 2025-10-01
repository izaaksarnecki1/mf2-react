import type { PostProcessorModule } from "i18next";
import MessageFormat from "@messageformat/core";

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

const compiledCache = new Map<
  string,
  (params: Record<string, unknown>) => string
>();

const MF2PostProcessor: PostProcessorModule = {
  name: "mf2",
  type: "postProcessor",
  process: (value: any, _key, options: any, translator: any) => {
    if (typeof value !== "string") return value;

    const lng: string | undefined = options?.lng || translator?.lang;
    const mf = getMf(lng);

    const cacheKey = `${lng || "en"}__${value}`;
    let fn = compiledCache.get(cacheKey);
    if (!fn) {
      fn = mf.compile(value);
      compiledCache.set(cacheKey, fn);
    }

    try {
      return fn({ ...options });
    } catch (_e) {
      return value;
    }
  },
};

export default MF2PostProcessor;
