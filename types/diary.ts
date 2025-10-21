
export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
  mood: string;
  likes: number;
  comments: DiaryComment[];
  author: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface DiaryComment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  date: Date;
  likes: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  entries: DiaryEntry[];
}
