
import { useEffect, useState } from 'react';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface SeasonTheme {
  season: Season;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    card: string;
  };
  musicTrack: string;
  emoji: string;
}

export const seasonThemes: Record<Season, SeasonTheme> = {
  spring: {
    season: 'spring',
    colors: {
      primary: '#A0D6B4',
      secondary: '#B4D6A0',
      accent: '#D6C4A0',
      background: '#F8FFF8',
      text: '#2D5A3D',
      card: '#FFFFFF',
    },
    musicTrack: 'spring',
    emoji: '🌸',
  },
  summer: {
    season: 'summer',
    colors: {
      primary: '#FFD700',
      secondary: '#FFA500',
      accent: '#FF6B6B',
      background: '#FFFEF0',
      text: '#8B4513',
      card: '#FFFFFF',
    },
    musicTrack: 'summer',
    emoji: '☀️',
  },
  autumn: {
    season: 'autumn',
    colors: {
      primary: '#D2691E',
      secondary: '#CD853F',
      accent: '#FF8C00',
      background: '#FFF8F0',
      text: '#654321',
      card: '#FFFFFF',
    },
    musicTrack: 'autumn',
    emoji: '🍂',
  },
  winter: {
    season: 'winter',
    colors: {
      primary: '#B0E0E6',
      secondary: '#87CEEB',
      accent: '#4A90E2',
      background: '#F0F8FF',
      text: '#1C3A47',
      card: '#FFFFFF',
    },
    musicTrack: 'winter',
    emoji: '❄️',
  },
};

export const getCurrentSeason = (): Season => {
  const month = new Date().getMonth();

  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
};

export const useSeasonTheme = () => {
  const [theme, setTheme] = useState<SeasonTheme>(
    seasonThemes[getCurrentSeason()]
  );

  useEffect(() => {
    const season = getCurrentSeason();
    setTheme(seasonThemes[season]);
  }, []);

  return theme;
};
