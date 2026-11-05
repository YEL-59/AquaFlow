import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en.json";
import bnTranslations from "./locales/bn.json";

const resources = {
  en: {
    translation: enTranslations,
  },
  bn: {
    translation: bnTranslations,
  },
};

const savedLanguage = typeof window !== "undefined" ? localStorage.getItem("aquaflow_lang") || "bn" : "bn";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

// Synchronize lang attribute on html tag
if (typeof document !== "undefined") {
  document.documentElement.lang = savedLanguage;
}

i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("aquaflow_lang", lng);
    document.documentElement.lang = lng;
  }
});

export default i18n;
