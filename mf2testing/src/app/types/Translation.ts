export type TranslationFile = {
  translations: Translation[];
};

export type Translation = {
  messagename: {
    message: string;
    input: string[];
  };
};
