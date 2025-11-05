export interface User {
  id: string;
  name: string;
  about: string;
  photo: string | null;
  registrationDate?: string;
}

export interface Mood {
  id: string;
  emoji: string;
  label: string;
}

export interface Place {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  image: any; // string для URL или require() для локальных файлов
  description: string;
  isSaved?: boolean;
}

export interface MoodEntry {
  date: string;
  mood: Mood;
}

export interface Fact {
  id: string;
  text: string;
  image?: string;
}
