import { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/zh-tw';
import 'moment/locale/ja';

import i18n from './i18n';

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

export { AppContext, AppProvider };
