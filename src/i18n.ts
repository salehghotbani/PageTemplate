import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fa from './locales/fa.json';
import en from './locales/en.json';

const storageKey = 'page-template.language';

function initialLanguage() {
  try {
    return window.localStorage.getItem(storageKey) === 'en' ? 'en' : 'fa';
  } catch {
    return 'fa';
  }
}

i18n.on('languageChanged', (language) => {
  try {
    window.localStorage.setItem(storageKey, language);
  } catch {
    // Language switching still works when storage is unavailable.
  }
});

export const i18nReady = i18n.use(initReactI18next).init({
  resources: { fa: { translation: fa }, en: { translation: en } },
  supportedLngs: ['fa', 'en'],
  lng: initialLanguage(),
  fallbackLng: 'fa',
  interpolation: { escapeValue: false },
});

export default i18n;
