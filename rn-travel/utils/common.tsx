import { createContext, useState, useEffect, ReactNode } from 'react';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import 'moment/locale/zh-tw';
import 'moment/locale/ja';

import spotKyotoJson from '../json/spotKyoto.json';
import spotOsakaJson from '../json/spotOsaka.json';
import spotTaiwanJson from '../json/spotTaiwan.json';

import indexEn from '../json/i18n/en/index.json';
import recentPlaceEn from '../json/i18n/en/recentPlace.json';
import searchPlaceEn from '../json/i18n/en/searchPlace.json';
import configurationOptionEn from '../json/i18n/en/configurationOption.json';
import spotDetailEn from '../json/i18n/en/spotDetail.json';
import spotKyotoEn from '../json/i18n/en/spotKyoto.json';
import spotOsakaEn from '../json/i18n/en/spotOsaka.json';
import spotTaiwanEn from '../json/i18n/en/spotTaiwan.json';
import indexJa from '../json/i18n/ja/index.json';
import recentPlaceJa from '../json/i18n/ja/recentPlace.json';
import searchPlaceJa from '../json/i18n/ja/searchPlace.json';
import configurationOptionJa from '../json/i18n/ja/configurationOption.json';
import spotDetailJa from '../json/i18n/ja/spotDetail.json';
import spotKyotoJa from '../json/i18n/ja/spotKyoto.json';
import spotOsakaJa from '../json/i18n/ja/spotOsaka.json';
import spotTaiwanJa from '../json/i18n/ja/spotTaiwan.json';
import indexZhTw from '../json/i18n/zh-TW/index.json';
import recentPlaceZhTw from '../json/i18n/zh-TW/recentPlace.json';
import searchPlaceZhTw from '../json/i18n/zh-TW/searchPlace.json';
import configurationOptionZhTw from '../json/i18n/zh-TW/configurationOption.json';
import spotDetailZhTw from '../json/i18n/zh-TW/spotDetail.json';
import spotKyotoZhTw from '../json/i18n/zh-TW/spotKyoto.json';
import spotOsakaZhTw from '../json/i18n/zh-TW/spotOsaka.json';
import spotTaiwanZhTw from '../json/i18n/zh-TW/spotTaiwan.json';

let spotJson = {};

const areaJson = {
  kyoto: spotKyotoJson,
  osaka: spotOsakaJson,
  taiwan: spotTaiwanJson
};

Object.values(areaJson).forEach((json) => {
  spotJson = {...spotJson, ...json};
});

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
      recentPlace: recentPlaceEn,
      searchPlace: searchPlaceEn,
      configurationOption: configurationOptionEn,
      spotDetail: spotDetailEn,

      spot: {
        ...{},
        ...spotKyotoEn,
        ...spotOsakaEn,
        ...spotTaiwanEn
      }
    },

    ja: {
      index: indexJa,
      recentPlace: recentPlaceJa,
      searchPlace: searchPlaceJa,
      configurationOption: configurationOptionJa,
      spotDetail: spotDetailJa,

      spot: {
        ...{},
        ...spotKyotoJa,
        ...spotOsakaJa,
        ...spotTaiwanJa
      }
    },

    'zh-TW': {
      index: indexZhTw,
      recentPlace: recentPlaceZhTw,
      searchPlace: searchPlaceZhTw,
      configurationOption: configurationOptionZhTw,
      spotDetail: spotDetailZhTw,

      spot: {
        ...{},
        ...spotKyotoZhTw,
        ...spotOsakaZhTw,
        ...spotTaiwanZhTw
      }
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

const getSpotName = (spot: string) => {
  let result = i18n.t(`spot:${spot}:name`);
  const station = getObjectValue(spotJson, `${spot}.station`);

  if (station === 'bus') {
    result += ' ' + i18n.t('spotDetail:busStation');
  } else if (station === 'train') {
    result += ' ' + i18n.t('spotDetail:trainStation');
  }

  return result;
}

const storageKey = {
  language: 'travel-language',
  color: 'travel-color',
  recent: 'travel-recent'
};

const AppContext = createContext({
  searchType: '',
  setSearchType: (type: string) => {},
  searchTravel: '',
  setSearchTravel: (travel: string) => {},
  recentSpot: '',
  setRecentSpot: (spot: string) => {},
  searchSpot: '',
  setSearchSpot: (spot: string) => {},
  i18n,
  language: '',
  setLanguage: (language: string) => {},
  color: '',
  setColor: (color: string) => {},
  recentList: [] as string[],
  addRecentSpot: (spot: string) => {},

  getSpotIcon: (spot: string, size: number) => {
    return <></>;
  },

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
  const [recentList, setRecentList] = useState<string[]>([]);
  const [searchType, setSearchType] = useState('');
  const [searchTravel, setSearchTravel] = useState('');
  const [recentSpot, setRecentSpot] = useState('');
  const [searchSpot, setSearchSpot] = useState('');

  const addRecentSpot = (spot: string) => {
    const newRecent = [ ...[], ...recentList ];
    const index = recentList.indexOf(spot);

    if (index !== -1) {
      newRecent.splice(index, 1);
    }

    newRecent.unshift(spot);

    if (newRecent.length > 20) {
      newRecent.pop();
    }

    setRecentList(newRecent);
  }

  const getSpotIcon = (input: string, size: number) => {
    const iconObj = {
      MaterialIcons,
      MaterialCommunityIcons
    };

    const icon = getObjectValue(spotJson, `${input}.icon`);
    const IconComponent = getObjectValue(iconObj, getObjectValue(icon, 'family'));
    const name = getObjectValue(icon, 'name');
    const color = getStyle().color;
    return <IconComponent name={name} size={size} color={color} />;
  }

  useEffect(() => {
    try {
      (async () => {
        let valueList;

        valueList = await AsyncStorage.multiGet([
          storageKey.language,
          storageKey.color,
          storageKey.recent
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
              } else if (key === storageKey.recent) {
                let recentStorage;

                try {
                  recentStorage = JSON.parse(value);
                } catch {
                }

                if (!Array.isArray(recentStorage)) {
                  recentStorage = [];
                }

                recentStorage = recentStorage.reduce((list, element) => {
                  if (
                    typeof element === 'string' &&
                    getObjectValue(spotJson, element) &&
                    list.indexOf(element) === -1
                  ) {
                    list.push(element);
                  }

                  return list;
                }, []);

                setRecentList(recentStorage);
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

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(storageKey.recent, JSON.stringify(recentList));
      } catch {
      }
    })();
  }, [recentList]);

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
        recentSpot,
        setRecentSpot,
        searchSpot,
        setSearchSpot,
        getSpotIcon,
        i18n,
        language,
        setLanguage,
        color,
        setColor,
        getStyle,
        recentList,
        addRecentSpot
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export {
  spotJson,
  areaJson,
  getObjectValue,
  openUrl,
  getFloorName,
  getSpotName,
  AppContext,
  AppProvider
};
