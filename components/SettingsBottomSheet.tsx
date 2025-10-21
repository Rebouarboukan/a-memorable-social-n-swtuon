
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Switch,
} from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Season, seasonThemes } from '@/utils/seasonTheme';
import { IconSymbol } from './IconSymbol';

interface SettingsBottomSheetProps {
  onClose: () => void;
  musicEnabled: boolean;
  onMusicToggle: (enabled: boolean) => void;
}

export const SettingsBottomSheet: React.FC<SettingsBottomSheetProps> = ({
  onClose,
  musicEnabled,
  onMusicToggle,
}) => {
  const { colors, currentSeason, setSeason, autoTheme, setAutoTheme } =
    useThemeContext();
  const { language, setLanguageCode, t } = useLanguage();

  const languages: Array<{ code: 'en' | 'fa' | 'es' | 'fr'; name: string }> = [
    { code: 'en', name: 'English' },
    { code: 'fa', name: 'فارسی' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
  ];

  const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter'];

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          {t('settings')}
        </Text>
        <Pressable onPress={onClose}>
          <IconSymbol name="xmark" color={colors.text} size={24} />
        </Pressable>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Language Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('language')}
          </Text>
          <View style={styles.languageGrid}>
            {languages.map((lang) => (
              <Pressable
                key={lang.code}
                style={[
                  styles.languageButton,
                  {
                    backgroundColor:
                      language === lang.code ? colors.primary : colors.background,
                    borderColor: colors.primary,
                  },
                ]}
                onPress={() => setLanguageCode(lang.code)}
              >
                <Text
                  style={[
                    styles.languageButtonText,
                    {
                      color:
                        language === lang.code ? colors.card : colors.text,
                    },
                  ]}
                >
                  {lang.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Theme Section */}
        <View style={styles.section}>
          <View style={styles.themeHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t('theme')}
            </Text>
            <View style={styles.autoThemeToggle}>
              <Text style={[styles.autoThemeText, { color: colors.text }]}>
                {t('autoTheme')}
              </Text>
              <Switch
                value={autoTheme}
                onValueChange={setAutoTheme}
                trackColor={{ false: colors.background, true: colors.primary }}
              />
            </View>
          </View>

          {!autoTheme && (
            <View style={styles.seasonGrid}>
              {seasons.map((season) => (
                <Pressable
                  key={season}
                  style={[
                    styles.seasonButton,
                    {
                      backgroundColor:
                        currentSeason === season
                          ? seasonThemes[season].colors.primary
                          : colors.background,
                      borderColor: seasonThemes[season].colors.primary,
                    },
                  ]}
                  onPress={() => setSeason(season)}
                >
                  <Text style={styles.seasonEmoji}>
                    {seasonThemes[season].emoji}
                  </Text>
                  <Text
                    style={[
                      styles.seasonName,
                      {
                        color:
                          currentSeason === season ? colors.card : colors.text,
                      },
                    ]}
                  >
                    {t(season)}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Music Section */}
        <View style={styles.section}>
          <View style={styles.musicHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t('music')}
            </Text>
            <Switch
              value={musicEnabled}
              onValueChange={onMusicToggle}
              trackColor={{ false: colors.background, true: colors.primary }}
            />
          </View>
          <Text style={[styles.musicStatus, { color: colors.secondary }]}>
            {musicEnabled ? t('musicOn') : t('musicOff')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  languageButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  languageButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  themeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  autoThemeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  autoThemeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  seasonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  seasonButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  seasonEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  seasonName: {
    fontSize: 12,
    fontWeight: '600',
  },
  musicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  musicStatus: {
    fontSize: 12,
    marginTop: 8,
  },
});
