
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Platform,
  Modal,
  TextInput,
} from "react-native";
import { Stack } from "expo-router";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDiary } from "@/contexts/DiaryContext";
import { DiaryEntry } from "@/components/DiaryEntry";
import { DiaryLogo } from "@/components/DiaryLogo";
import { SeasonalBackground } from "@/components/SeasonalBackground";
import { SettingsBottomSheet } from "@/components/SettingsBottomSheet";
import { IconSymbol } from "@/components/IconSymbol";
import { audioManager } from "@/utils/audioManager";
import { seasonThemes } from "@/utils/seasonTheme";

export default function HomeScreen() {
  const { colors, currentSeason } = useThemeContext();
  const { t } = useLanguage();
  const { entries, addEntry, likeEntry, deleteEntry, currentUser, addComment } = useDiary();
  const [showSettings, setShowSettings] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [newEntryMood, setNewEntryMood] = useState("😊");
  const [showUserProfile, setShowUserProfile] = useState(false);

  const moods = ["😊", "😢", "😍", "🤔", "😴", "🤗", "😎", "🥳"];

  const handleMusicToggle = async (enabled: boolean) => {
    setMusicEnabled(enabled);
    if (enabled) {
      await audioManager.playSeasonalMusic(currentSeason);
    } else {
      await audioManager.stopMusic();
    }
  };

  const handleAddEntry = () => {
    if (newEntryTitle.trim() && newEntryContent.trim()) {
      const entry = {
        id: Math.random().toString(),
        title: newEntryTitle,
        content: newEntryContent,
        date: new Date(),
        mood: newEntryMood,
        likes: 0,
        comments: [],
        author: {
          id: "user1",
          name: "You",
          avatar: "👤",
        },
      };
      addEntry(entry);
      setNewEntryTitle("");
      setNewEntryContent("");
      setNewEntryMood("😊");
      setShowNewEntry(false);
    }
  };

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: colors.card }]}>
      <View style={styles.logoContainer}>
        <DiaryLogo size={50} color={colors.primary} />
        <View style={styles.titleContainer}>
          <Text style={[styles.appTitle, { color: colors.text }]}>
            {t("diary")}
          </Text>
          <Text style={[styles.seasonBadge, { color: colors.secondary }]}>
            {seasonThemes[currentSeason].emoji} {t(currentSeason)}
          </Text>
        </View>
      </View>
      <View style={styles.headerButtons}>
        <Pressable
          onPress={() => setShowUserProfile(true)}
          style={styles.headerButton}
        >
          <IconSymbol name="person.fill" color={colors.primary} size={24} />
        </Pressable>
        <Pressable
          onPress={() => setShowSettings(true)}
          style={styles.headerButton}
        >
          <IconSymbol name="gear" color={colors.primary} size={24} />
        </Pressable>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyEmoji, { fontSize: 60 }]}>📝</Text>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        {t("noEntries")}
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.secondary }]}>
        {t("welcomeMessage")}
      </Text>
    </View>
  );

  const renderEntry = useCallback(({ item }: { item: any }) => (
    <DiaryEntry
      entry={item}
      onLike={() => likeEntry(item.id)}
      onComment={(comment: string) => {
        addComment(item.id, comment);
      }}
      onDelete={() => deleteEntry(item.id)}
    />
  ), [likeEntry, deleteEntry, addComment]);

  return (
    <SeasonalBackground>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={[styles.container, { backgroundColor: "transparent" }]}>
        {renderHeader()}

        <FlatList
          data={entries}
          renderItem={renderEntry}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={[
            styles.listContent,
            Platform.OS !== "ios" && styles.listContentWithTabBar,
          ]}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        />

        <Pressable
          style={[styles.fab, { backgroundColor: colors.primary }]}
          onPress={() => setShowNewEntry(true)}
        >
          <IconSymbol name="plus" color={colors.card} size={28} />
        </Pressable>
      </View>

      {/* Settings Bottom Sheet */}
      <Modal
        visible={showSettings}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSettings(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowSettings(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <SettingsBottomSheet
              onClose={() => setShowSettings(false)}
              musicEnabled={musicEnabled}
              onMusicToggle={handleMusicToggle}
            />
          </Pressable>
        </Pressable>
      </Modal>

      {/* User Profile Modal */}
      <Modal
        visible={showUserProfile}
        transparent
        animationType="slide"
        onRequestClose={() => setShowUserProfile(false)}
      >
        <View style={[styles.profileModal, { backgroundColor: colors.background }]}>
          <View style={[styles.profileHeader, { backgroundColor: colors.card, borderBottomColor: colors.secondary }]}>
            <Text style={[styles.profileTitle, { color: colors.text }]}>
              {t("profile")}
            </Text>
            <Pressable onPress={() => setShowUserProfile(false)}>
              <IconSymbol name="xmark" color={colors.text} size={24} />
            </Pressable>
          </View>

          <View style={styles.profileContent}>
            <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
              <View style={[styles.profileAvatarLarge, { backgroundColor: colors.primary }]}>
                <Text style={styles.profileAvatarText}>{currentUser?.avatar}</Text>
              </View>
              <Text style={[styles.profileName, { color: colors.text }]}>
                {currentUser?.name}
              </Text>
              <Text style={[styles.profileBio, { color: colors.secondary }]}>
                {currentUser?.bio}
              </Text>

              <View style={styles.profileStats}>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: colors.text }]}>
                    {currentUser?.entries.length || 0}
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.secondary }]}>
                    Posts
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: colors.text }]}>
                    {currentUser?.followers || 0}
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.secondary }]}>
                    Followers
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: colors.text }]}>
                    {currentUser?.following || 0}
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.secondary }]}>
                    Following
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* New Entry Modal */}
      <Modal
        visible={showNewEntry}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNewEntry(false)}
      >
        <View style={[styles.newEntryModal, { backgroundColor: colors.background }]}>
          <View style={[styles.newEntryHeader, { backgroundColor: colors.card }]}>
            <Text style={[styles.newEntryTitle, { color: colors.text }]}>
              {t("newEntry")}
            </Text>
            <Pressable onPress={() => setShowNewEntry(false)}>
              <IconSymbol name="xmark" color={colors.text} size={24} />
            </Pressable>
          </View>

          <View style={styles.newEntryContent}>
            <TextInput
              style={[
                styles.titleInput,
                { color: colors.text, borderColor: colors.primary },
              ]}
              placeholder={t("writeYourThoughts")}
              placeholderTextColor={colors.secondary}
              value={newEntryTitle}
              onChangeText={setNewEntryTitle}
            />

            <TextInput
              style={[
                styles.contentInput,
                { color: colors.text, borderColor: colors.primary },
              ]}
              placeholder={t("writeYourThoughts")}
              placeholderTextColor={colors.secondary}
              value={newEntryContent}
              onChangeText={setNewEntryContent}
              multiline
              numberOfLines={6}
            />

            <View style={styles.moodSelector}>
              <Text style={[styles.moodLabel, { color: colors.text }]}>
                Mood:
              </Text>
              <View style={styles.moodGrid}>
                {moods.map((mood) => (
                  <Pressable
                    key={mood}
                    style={[
                      styles.moodButton,
                      newEntryMood === mood && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                    onPress={() => setNewEntryMood(mood)}
                  >
                    <Text style={styles.moodEmoji}>{mood}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.newEntryActions}>
              <Pressable
                style={[styles.cancelButton, { borderColor: colors.primary }]}
                onPress={() => setShowNewEntry(false)}
              >
                <Text style={[styles.cancelButtonText, { color: colors.primary }]}>
                  {t("cancel")}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.saveButton, { backgroundColor: colors.primary }]}
                onPress={handleAddEntry}
              >
                <Text style={[styles.saveButtonText, { color: colors.card }]}>
                  {t("save")}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SeasonalBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E8E8E8",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  titleContainer: {
    marginLeft: 12,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "PlayfairDisplay_700Bold",
  },
  seasonBadge: {
    fontSize: 12,
    marginTop: 2,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  listContent: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  listContentWithTabBar: {
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyEmoji: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    width: "100%",
  },
  newEntryModal: {
    flex: 1,
    paddingTop: 20,
  },
  newEntryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  newEntryTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  newEntryContent: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "600",
  },
  contentInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    textAlignVertical: "top",
  },
  moodSelector: {
    marginBottom: 16,
  },
  moodLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  moodButton: {
    width: "22%",
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  moodEmoji: {
    fontSize: 24,
  },
  newEntryActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: "auto",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  profileModal: {
    flex: 1,
    paddingTop: 20,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  profileContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  profileCard: {
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  profileAvatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  profileAvatarText: {
    fontSize: 40,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  profileBio: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
});
