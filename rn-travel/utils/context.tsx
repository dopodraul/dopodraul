import { createContext } from 'react';

import i18n from './i18n';

const defaultLanguage = 'en';

const AppContext = createContext({
  language: defaultLanguage,
  i18n
});

const AppProvider = ({ children }: any) => {
  return (
    <AppContext.Provider
      value={{
        language: defaultLanguage,
        i18n
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export {AppContext, AppProvider};
