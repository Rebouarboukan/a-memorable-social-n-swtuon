
import React, { createContext, useContext, useState, useCallback } from 'react';
import I18n, { setLanguage } from '@/utils/i18n';

type Language = 'en' | 'fa' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguageCode: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage_] = useState<Language>('en');

  const setLanguageCode = useCallback((lang: Language) => {
    setLanguage_(lang);
    setLanguage(lang);
  }, []);

  const t = useCallback((key: string) => {
    return I18n.t(key);
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguageCode,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
