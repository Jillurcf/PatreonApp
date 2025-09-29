import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources
const resources = {
  enUS: {
    translation: {
      welcome: "Hello! How are you?",
      food: "Favorite Food",
      terms_agreements: "Terms of service",
    },
  },
  enUK: {
    translation: {
      welcome: "Hello! How are you doing?",
      food: "Favourite Food",
      terms_agreements: "Terms of service",
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: "enUS", // default language
  fallbackLng: "enUS",
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
