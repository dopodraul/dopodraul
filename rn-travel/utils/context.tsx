import { createContext, useState, ReactNode } from 'react';

import i18n from './i18n';

const defaultLanguage = 'en';

const AppContext = createContext({
  i18n,
  language: defaultLanguage,
  setLanguage: (language: string) => {}
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(defaultLanguage);

  return (
    <AppContext.Provider
      value={{
        i18n,
        language,
        setLanguage
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export {AppContext, AppProvider};
