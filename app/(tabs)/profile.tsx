
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDiary } from "@/contexts/DiaryContext";
import { DiaryEntry } from "@/components/DiaryEntry";
import { SeasonalBackground } from "@/components/SeasonalBackground";
import { IconSymbol } from "@/components/IconSymbol";

export default function ProfileScreen() {
  const { colors } = useThemeContext();
  const { t } = useLanguage();
  const { currentUser, entries, likeEntry, deleteEntry } = useDiary();

  const renderEntry = ({ item }: { item: any }) => (
    <DiaryEntry
      entry={item}
      onLike={() => likeEntry(item.id)}
      onComment={() => console.log("Comment on entry:", item.id)}
      onDelete={() => deleteEntry(item.id)}
    />
  );

  return (
    <SeasonalBackground>
      <View style={[styles.container, { backgroundColor: "transparent" }]}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View style={[styles.profileHeader, { backgroundColor: colors.card }]}>
            <Text style={[styles.avatar, { fontSize: 60 }]}>
              {currentUser?.avatar}
            </Text>
            <Text style={[styles.name, { color: colors.text }]}>
              {currentUser?.name}
            </Text>
            <Text style={[styles.bio, { color: colors.secondary }]}>
              {currentUser?.bio}
            </Text>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.primary }]}>
                  {entries.length}
                </Text>
                <Text style={[styles.statLabel, { color: colors.text }]}>
                  {t("entries")}
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.primary }]}>
                  {currentUser?.followers}
                </Text>
                <Text style={[styles.statLabel, { color: colors.text }]}>
                  Followers
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.primary }]}>
                  {currentUser?.following}
                </Text>
                <Text style={[styles.statLabel, { color: colors.text }]}>
                  Following
                </Text>
              </View>
            </View>
          </View>

          {/* Entries Section */}
          <View style={styles.entriesSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t("entries")}
            </Text>
            <FlatList
              data={entries}
              renderItem={renderEntry}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.entriesList}
            />
          </View>
        </ScrollView>
      </View>
    </SeasonalBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginBottom: 16,
  },
  avatar: {
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E8E8E8",
  },
  entriesSection: {
    paddingHorizontal: 12,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  entriesList: {
    paddingVertical: 8,
  },
});
