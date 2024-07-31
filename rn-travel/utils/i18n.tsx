import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import indexEn from '../json/indexEn.json';
import configurationOptionEn from '../json/configurationOptionEn.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false
  },

  resources: {
    en: {
      index: indexEn,
      configurationOption: configurationOptionEn
    }
  }
});

export default i18n;
