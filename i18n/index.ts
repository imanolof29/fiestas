import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEs from "./locales/es.json"
import translationEu from "./locales/eu.json"
import * as Localization from "expo-localization";
import * as SecureStore from 'expo-secure-store';

const resources = {
    es: { translation: translationEs },
    eu: { translation: translationEu }
}


const initI18n = async () => {
    let savedLanguage = await SecureStore.getItem("language");

    if (!savedLanguage) {
        savedLanguage = Localization.locale;
    }

    i18n.use(initReactI18next).init({
        compatibilityJSON: "v3",
        resources,
        lng: savedLanguage,
        fallbackLng: "es",
        interpolation: {
            escapeValue: false,
        },
    });
};

initI18n();

export default i18n;
