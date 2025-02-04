import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en";
import pl from "./pl";

export type Resource = typeof en;

export const defaultNS = "shared";
export const defaultLng = "en";
export const resources = {
  en,
  pl,
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    lng: defaultLng,
    fallbackLng: defaultLng,
    returnNull: false,
    interpolation: {
      escapeValue: false,
    },
  })
  .then();
