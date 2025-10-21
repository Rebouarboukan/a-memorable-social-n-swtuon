
import React, { createContext, useContext, useState, useCallback } from 'react';
import { DiaryEntry, User } from '@/types/diary';

interface DiaryContextType {
  entries: DiaryEntry[];
  currentUser: User | null;
  addEntry: (entry: DiaryEntry) => void;
  deleteEntry: (id: string) => void;
  updateEntry: (id: string, entry: DiaryEntry) => void;
  likeEntry: (id: string) => void;
  addComment: (entryId: string, comment: string) => void;
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export const DiaryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: '1',
      title: 'My First Memory',
      content: 'Today was a beautiful day. The weather was perfect and I felt at peace.',
      date: new Date(),
      mood: '😊',
      likes: 5,
      comments: [],
      author: {
        id: 'user1',
        name: 'You',
        avatar: '👤',
      },
    },
  ]);

  const [currentUser] = useState<User>({
    id: 'user1',
    name: 'You',
    avatar: '👤',
    bio: 'Living life one memory at a time',
    followers: 42,
    following: 28,
    entries: entries,
  });

  const addEntry = useCallback((entry: DiaryEntry) => {
    setEntries((prev) => [entry, ...prev]);
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const updateEntry = useCallback((id: string, updatedEntry: DiaryEntry) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? updatedEntry : entry))
    );
  }, []);

  const likeEntry = useCallback((id: string) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, likes: entry.likes + 1 } : entry
      )
    );
  }, []);

  const addComment = useCallback((entryId: string, comment: string) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              comments: [
                ...entry.comments,
                {
                  id: Math.random().toString(),
                  author: currentUser,
                  content: comment,
                  date: new Date(),
                  likes: 0,
                },
              ],
            }
          : entry
      )
    );
  }, [currentUser]);

  return (
    <DiaryContext.Provider
      value={{
        entries,
        currentUser,
        addEntry,
        deleteEntry,
        updateEntry,
        likeEntry,
        addComment,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = () => {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error('useDiary must be used within DiaryProvider');
  }
  return context;
};
