export const Languages = ["no", "en"] as const;
export type Language = (typeof Languages)[number];
