import i18next from "i18next"
import { initReactI18next } from 'react-i18next';

import en from "@/data/lang/en.json"
import fr from "@/data/lang/fr.json"

i18next.use(initReactI18next).init({
  lng: "en",
  debug: process.env.ENVIRONMENT !== "production",
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  }
});