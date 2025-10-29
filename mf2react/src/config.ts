import type { ThirdPartyModule } from "i18next";

const DEFAULT_KEEP = ["br", "strong", "em", "i", "u", "s", "code", "small"];

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export const MF2ReactPreset: ThirdPartyModule = {
  type: "3rdParty",
  init(i18n) {
    const existing = i18n.options.react || {}; // check which options are already chose
    const keep = existing.transKeepBasicHtmlNodesFor || []; //  if any, put them in keep, else create new list
    i18n.options.react = {
      transSupportBasicHtmlNodes:
        existing.transSupportBasicHtmlNodes !== undefined
          ? (existing.transSupportBasicHtmlNodes as boolean)
          : true,
      transKeepBasicHtmlNodesFor: unique([
        // merge the two lists
        ...DEFAULT_KEEP,
        ...(keep as string[]),
      ]),
      ...existing,
    };
  },
};

export default MF2ReactPreset;
