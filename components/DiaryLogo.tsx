
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DiaryLogoProps {
  size?: number;
  color?: string;
}

export const DiaryLogo: React.FC<DiaryLogoProps> = ({ size = 60, color = '#A0D6B4' }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.book, { borderColor: color }]}>
        <View style={[styles.spine, { backgroundColor: color }]} />
        <View style={[styles.pages, { borderLeftColor: color }]}>
          <Text style={[styles.line, { backgroundColor: color }]} />
          <Text style={[styles.line, { backgroundColor: color }]} />
          <Text style={[styles.line, { backgroundColor: color, width: '70%' }]} />
        </View>
      </View>
      <Text style={[styles.emoji, { fontSize: size * 0.4 }]}>📖</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  book: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderRadius: 8,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  spine: {
    width: '20%',
    height: '100%',
  },
  pages: {
    flex: 1,
    borderLeftWidth: 2,
    padding: '10%',
    justifyContent: 'space-around',
  },
  line: {
    height: '8%',
    borderRadius: 2,
  },
  emoji: {
    position: 'absolute',
  },
});
