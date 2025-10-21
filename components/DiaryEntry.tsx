
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Modal, TextInput } from 'react-native';
import { DiaryEntry as DiaryEntryType } from '@/types/diary';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { IconSymbol } from './IconSymbol';

interface DiaryEntryProps {
  entry: DiaryEntryType;
  onLike: () => void;
  onComment: (comment: string) => void;
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
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleAddComment = () => {
    if (newComment.trim()) {
      onComment(newComment);
      setNewComment('');
    }
  };

  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.card }]}>
        {/* Header with user info */}
        <View style={styles.header}>
          <View style={styles.authorInfo}>
            <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
              <Text style={styles.authorAvatar}>{entry.author.avatar}</Text>
            </View>
            <View style={styles.userDetails}>
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

        {/* Title and content */}
        <View style={styles.contentSection}>
          <Text style={[styles.title, { color: colors.text }]}>{entry.title}</Text>
          <Text style={[styles.content, { color: colors.text }]} numberOfLines={3}>
            {entry.content}
          </Text>
        </View>

        {/* Action buttons - Instagram style */}
        <View style={styles.actions}>
          <Pressable
            style={[styles.actionButton, { display: 'contents' }]}
            onPress={onLike}
          >
            <View style={styles.actionButtonContent}>
              <IconSymbol name="heart" color={colors.primary} size={20} />
              <Text style={[styles.actionText, { color: colors.text }]}>
                {entry.likes}
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={[styles.actionButton, { display: 'contents' }]}
            onPress={() => setShowComments(true)}
          >
            <View style={styles.actionButtonContent}>
              <IconSymbol name="bubble.right" color={colors.primary} size={20} />
              <Text style={[styles.actionText, { color: colors.text }]}>
                {entry.comments.length}
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={[styles.actionButton, { display: 'contents' }]}
            onPress={onDelete}
          >
            <View style={styles.actionButtonContent}>
              <IconSymbol name="trash" color={colors.accent} size={20} />
            </View>
          </Pressable>
        </View>
      </View>

      {/* Comments Modal */}
      <Modal
        visible={showComments}
        transparent
        animationType="slide"
        onRequestClose={() => setShowComments(false)}
      >
        <View style={[styles.commentsModal, { backgroundColor: colors.background }]}>
          <View style={[styles.commentsHeader, { backgroundColor: colors.card, borderBottomColor: colors.secondary }]}>
            <Text style={[styles.commentsTitle, { color: colors.text }]}>
              Comments
            </Text>
            <Pressable onPress={() => setShowComments(false)}>
              <IconSymbol name="xmark" color={colors.text} size={24} />
            </Pressable>
          </View>

          <ScrollView style={styles.commentsList}>
            {entry.comments.length === 0 ? (
              <View style={styles.noComments}>
                <Text style={[styles.noCommentsText, { color: colors.secondary }]}>
                  No comments yet. Be the first!
                </Text>
              </View>
            ) : (
              entry.comments.map((comment) => (
                <View key={comment.id} style={[styles.commentItem, { borderBottomColor: colors.secondary }]}>
                  <View style={[styles.commentAvatar, { backgroundColor: colors.primary }]}>
                    <Text style={styles.commentAvatarText}>{comment.author.avatar}</Text>
                  </View>
                  <View style={styles.commentContent}>
                    <Text style={[styles.commentAuthor, { color: colors.text }]}>
                      {comment.author.name}
                    </Text>
                    <Text style={[styles.commentText, { color: colors.text }]}>
                      {comment.content}
                    </Text>
                    <Text style={[styles.commentDate, { color: colors.secondary }]}>
                      {new Date(comment.date).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>

          <View style={[styles.commentInput, { backgroundColor: colors.card, borderTopColor: colors.secondary }]}>
            <View style={[styles.inputWrapper, { borderColor: colors.primary }]}>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Add a comment..."
                placeholderTextColor={colors.secondary}
                value={newComment}
                onChangeText={setNewComment}
              />
              <Pressable
                onPress={handleAddComment}
                disabled={!newComment.trim()}
              >
                <IconSymbol
                  name="arrow.up.circle.fill"
                  color={newComment.trim() ? colors.primary : colors.secondary}
                  size={24}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.08)',
    elevation: 1,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 0,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorAvatar: {
    fontSize: 20,
  },
  userDetails: {
    flex: 1,
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
  contentSection: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopWidth: 0,
    gap: 24,
  },
  actionButton: {
    padding: 4,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  commentsModal: {
    flex: 1,
    paddingTop: 20,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  commentsList: {
    flex: 1,
    paddingHorizontal: 12,
  },
  noComments: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  noCommentsText: {
    fontSize: 14,
  },
  commentItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  commentAvatarText: {
    fontSize: 16,
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  commentText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  commentDate: {
    fontSize: 11,
  },
  commentInput: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 4,
  },
});
