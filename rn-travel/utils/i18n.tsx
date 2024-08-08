import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import indexEn from '../json/i18n/en/index.json';
import searchPlaceEn from '../json/i18n/en/searchPlace.json';
import configurationOptionEn from '../json/i18n/en/configurationOption.json';
import indexJa from '../json/i18n/ja/index.json';
import searchPlaceJa from '../json/i18n/ja/searchPlace.json';
import configurationOptionJa from '../json/i18n/ja/configurationOption.json';
import indexZhTw from '../json/i18n/zh-TW/index.json';
import searchPlaceZhTw from '../json/i18n/zh-TW/searchPlace.json';
import configurationOptionZhTw from '../json/i18n/zh-TW/configurationOption.json';

i18n.use(initReactI18next)
  .init({
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false
  },

  resources: {
    en: {
      index: indexEn,
      searchPlace: searchPlaceEn,
      configurationOption: configurationOptionEn
    },

    ja: {
      index: indexJa,
      searchPlace: searchPlaceJa,
      configurationOption: configurationOptionJa
    },

    'zh-TW': {
      index: indexZhTw,
      searchPlace: searchPlaceZhTw,
      configurationOption: configurationOptionZhTw
    }
  }
});

export default i18n;
