import { createContext, useState, ReactNode } from 'react';

import i18n from './i18n';

const AppContext = createContext({
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
