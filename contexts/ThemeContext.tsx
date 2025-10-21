
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Season, seasonThemes, getCurrentSeason } from '@/utils/seasonTheme';

interface ThemeContextType {
  currentSeason: Season;
  autoTheme: boolean;
  setAutoTheme: (auto: boolean) => void;
  setSeason: (season: Season) => void;
  colors: typeof seasonThemes.spring.colors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentSeason, setCurrentSeason] = useState<Season>(getCurrentSeason());
  const [autoTheme, setAutoTheme] = useState(true);

  useEffect(() => {
    if (autoTheme) {
      setCurrentSeason(getCurrentSeason());
    }
  }, [autoTheme]);

  const setSeason = useCallback((season: Season) => {
    setCurrentSeason(season);
    setAutoTheme(false);
  }, []);

  const colors = seasonThemes[currentSeason].colors;

  return (
    <ThemeContext.Provider
      value={{
        currentSeason,
        autoTheme,
        setAutoTheme,
        setSeason,
        colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
};
