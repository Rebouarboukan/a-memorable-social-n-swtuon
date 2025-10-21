
import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { DiaryEntry as DiaryEntryType } from '@/types/diary';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { IconSymbol } from './IconSymbol';

interface DiaryEntryProps {
  entry: DiaryEntryType;
  onLike: () => void;
  onComment: () => void;
  onDelete: () => void;
}

export const DiaryEntry: React.FC<DiaryEntryProps> = ({
  entry,
  onLike,
  onComment,
  onDelete,
}) => {
  const { colors } = useThemeContext();
  const { t } = useLanguage();

  const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.primary }]}>
      <View style={styles.header}>
        <View style={styles.authorInfo}>
          <Text style={[styles.authorAvatar, { color: colors.primary }]}>
            {entry.author.avatar}
          </Text>
          <View>
            <Text style={[styles.authorName, { color: colors.text }]}>
              {entry.author.name}
            </Text>
            <Text style={[styles.date, { color: colors.secondary }]}>
              {formattedDate}
            </Text>
          </View>
        </View>
        <Text style={[styles.mood, { fontSize: 24 }]}>{entry.mood}</Text>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{entry.title}</Text>

      <ScrollView style={styles.contentScroll} scrollEnabled={false}>
        <Text style={[styles.content, { color: colors.text }]}>{entry.content}</Text>
      </ScrollView>

      <View style={styles.actions}>
        <Pressable
          style={[styles.actionButton, { borderColor: colors.primary }]}
          onPress={onLike}
        >
          <IconSymbol name="heart" color={colors.primary} size={18} />
          <Text style={[styles.actionText, { color: colors.primary }]}>
            {entry.likes}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, { borderColor: colors.primary }]}
          onPress={onComment}
        >
          <IconSymbol name="bubble.right" color={colors.primary} size={18} />
          <Text style={[styles.actionText, { color: colors.primary }]}>
            {entry.comments.length}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, { borderColor: colors.accent }]}
          onPress={onDelete}
        >
          <IconSymbol name="trash" color={colors.accent} size={18} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
  },
  mood: {
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  contentScroll: {
    maxHeight: 120,
    marginBottom: 12,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
  },
});
