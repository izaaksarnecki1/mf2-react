import { Language } from "./Language";

export type Translation = {
  message: string;
  inputs: string[];
};

export type TranslationMap = Record<string, Translation>;

export type TranslationFile = {
  locale: Language;
  messages: TranslationMap;
};
