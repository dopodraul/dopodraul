import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import indexEn from '../json/indexEn.json';
import configurationOptionEn from '../json/configurationOptionEn.json';
import indexZhTw from '../json/indexZhTw.json';
import configurationOptionZhTw from '../json/configurationOptionZhTw.json';
import indexJa from '../json/indexJa.json';
import configurationOptionJa from '../json/configurationOptionJa.json';

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
    },

    ja: {
      index: indexJa,
      configurationOption: configurationOptionJa
    },

    'zh-TW': {
      index: indexZhTw,
      configurationOption: configurationOptionZhTw
    }
  }
});

export default i18n;
