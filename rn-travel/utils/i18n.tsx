import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

const defaultNS = 'index';

i18n.use(initReactI18next)
  .use(HttpBackend)
  .init({
  lng: 'en',
  fallbackLng: 'en',
  defaultNS,

  ns: [
    defaultNS,
    'searchPlace',
    'configurationOption'
  ],

  interpolation: {
    escapeValue: false
  },

  backend: {
    loadPath: '../json/i18n/{{lng}}/{{ns}}.json'
  }
});

export default i18n;
