
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeContext } from '@/contexts/ThemeContext';

interface SeasonalBackgroundProps {
  children: React.ReactNode;
}

export const SeasonalBackground: React.FC<SeasonalBackgroundProps> = ({
  children,
}) => {
  const { colors, currentSeason } = useThemeContext();

  const gradientColors = {
    spring: [colors.background, colors.primary + '20'],
    summer: [colors.background, colors.secondary + '20'],
    autumn: [colors.background, colors.accent + '20'],
    winter: [colors.background, colors.secondary + '20'],
  };

  return (
    <LinearGradient
      colors={gradientColors[currentSeason]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
