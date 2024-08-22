import { createContext, useState, useEffect, ReactNode } from 'react';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import moment from 'moment';
import 'moment/locale/zh-tw';
import 'moment/locale/ja';

import spotKyotoJson from '../json/spotKyoto.json';

import indexEn from '../json/i18n/en/index.json';
import searchPlaceEn from '../json/i18n/en/searchPlace.json';
import configurationOptionEn from '../json/i18n/en/configurationOption.json';
import spotKyotoEn from '../json/i18n/en/spotKyoto.json';
import spotDetailEn from '../json/i18n/en/spotDetail.json';
import indexJa from '../json/i18n/ja/index.json';
import searchPlaceJa from '../json/i18n/ja/searchPlace.json';
import configurationOptionJa from '../json/i18n/ja/configurationOption.json';
import spotKyotoJa from '../json/i18n/ja/spotKyoto.json';
import spotDetailJa from '../json/i18n/ja/spotDetail.json';
import indexZhTw from '../json/i18n/zh-TW/index.json';
import searchPlaceZhTw from '../json/i18n/zh-TW/searchPlace.json';
import configurationOptionZhTw from '../json/i18n/zh-TW/configurationOption.json';
import spotKyotoZhTw from '../json/i18n/zh-TW/spotKyoto.json';
import spotDetailZhTw from '../json/i18n/zh-TW/spotDetail.json';

const spotJson = {
  ...{},
  ...spotKyotoJson
};

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
      configurationOption: configurationOptionEn,
      spotDetail: spotDetailEn,
      spot: spotKyotoEn,
    },

    ja: {
      index: indexJa,
      searchPlace: searchPlaceJa,
      configurationOption: configurationOptionJa,
      spotDetail: spotDetailJa,
      spot: spotKyotoJa
    },

    'zh-TW': {
      index: indexZhTw,
      searchPlace: searchPlaceZhTw,
      configurationOption: configurationOptionZhTw,
      spotDetail: spotDetailZhTw,
      spot: spotKyotoZhTw
    }
  }
});

const getObjectValue = (object: object, keyPath: string) => {
  return keyPath.split('.').reduce((acc: any, key) => {
    return acc && acc[key] !== undefined ? acc[key] : undefined;
  }, object);
}

const openUrl = async (url: string) => {
  const isValid = await Linking.canOpenURL(url);

  if (isValid) {
    await Linking.openURL(url);
  }
}

const getFloorName = (floor: number) => {
  if (floor > 0) {
    return i18n.t('spotDetail:floorSentence', { floor });
  }

  if (floor < 0) {
    return i18n.t('spotDetail:floorBasementSentence', { floor: -floor });
  }

  return '';
}

const storageKey = {
  language: 'travel-language',
  color: 'travel-color'
};

const AppContext = createContext({
  searchType: '',
  setSearchType: (type: string) => {},
  searchTravel: '',
  setSearchTravel: (travel: string) => {},
  spot: '',
  setSpot: (spot: string) => {},
  i18n,
  language: '',
  setLanguage: (language: string) => {},
  color: '',
  setColor: (color: string) => {},

  getStyle: () => {
    return {
      color: '',
      backgroundColor: '',
      card: ''
    };
  }
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');
  const [color, setColor] = useState('light');
  const [searchType, setSearchType] = useState('');
  const [searchTravel, setSearchTravel] = useState('');
  const [spot, setSpot] = useState('');

  useEffect(() => {
    try {
      (async () => {
        let valueList;

        valueList = await AsyncStorage.multiGet([
          storageKey.language,
          storageKey.color
        ]);

        if (valueList) {
          valueList.forEach(([key, value]) => {
            if (value) {
              if (key === storageKey.language) {
                setLanguage(value);
                i18n.changeLanguage(value);
                moment.locale(value);
              } else if (key === storageKey.color) {
                setColor(value);
              }
            }
          });
        }
      })();
    } catch {
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(storageKey.language, language);
      } catch {
      }
    })();
  }, [language]);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(storageKey.color, color);
      } catch {
      }
    })();
  }, [color]);

  const getStyle = () => {
    return color === 'dark' ? {
        color: 'white',
        backgroundColor: 'rgba(28, 27, 31, 1)',
        card: 'black'
      } : {
        color: 'black',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        card: 'white'
      }
  }

  return (
    <AppContext.Provider
      value={{
        searchType,
        setSearchType,
        searchTravel,
        setSearchTravel,
        spot,
        setSpot,
        i18n,
        language,
        setLanguage,
        color,
        setColor,
        getStyle
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export {
  spotJson,
  getObjectValue,
  openUrl,
  getFloorName,
  AppContext,
  AppProvider
};
