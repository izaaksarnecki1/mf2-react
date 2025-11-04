"use client";

import { I18nextProvider, type I18nextProviderProps } from "react-i18next";

type Props = React.PropsWithChildren<Pick<I18nextProviderProps, "i18n">>;

export default function I18nmf2Proivder({ i18n, children }: Props) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
