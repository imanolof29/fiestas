import i18n from "i18next"
import { initReactI18next } from "react-i18next";
import translationEs from "./locales/es.json"

const resources = {
    es: { translation: translationEs }
}

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "es",
    interpolation: {
        escapeValue: false,
    },
})

export default i18n