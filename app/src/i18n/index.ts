import _i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";

export const resources = {
  en: {
    translation: en,
  },
} as const;

// eslint-disable-next-line import/no-named-as-default-member
_i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export const i18n = _i18n;
