import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, MoodEntry, Place } from '../landStationTypes';

const KEYS = {
  USER: 'user',
  MOOD_ENTRIES: 'mood_entries',
  SAVED_PLACES: 'saved_places',
  ONBOARDING_COMPLETED: 'onboarding_completed',
};

export const storage = {
  // User
  async saveUser(user: User): Promise<void> {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
  },

  async getUser(): Promise<User | null> {
    const data = await AsyncStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  // Mood entries
  async saveMoodEntry(entry: MoodEntry): Promise<void> {
    const entries = await this.getMoodEntries();
    const existingIndex = entries.findIndex((e) => e.date === entry.date);
    if (existingIndex >= 0) {
      entries[existingIndex] = entry;
    } else {
      entries.push(entry);
    }
    await AsyncStorage.setItem(KEYS.MOOD_ENTRIES, JSON.stringify(entries));
  },

  async getMoodEntries(): Promise<MoodEntry[]> {
    const data = await AsyncStorage.getItem(KEYS.MOOD_ENTRIES);
    return data ? JSON.parse(data) : [];
  },

  async getMoodEntryByDate(date: string): Promise<MoodEntry | null> {
    const entries = await this.getMoodEntries();
    return entries.find((e) => e.date === date) || null;
  },

  // Saved places
  async savePlace(place: Place): Promise<void> {
    const places = await this.getSavedPlaces();
    if (!places.find((p) => p.id === place.id)) {
      places.push({ ...place, isSaved: true });
      await AsyncStorage.setItem(KEYS.SAVED_PLACES, JSON.stringify(places));
    }
  },

  async removePlace(placeId: string): Promise<void> {
    const places = await this.getSavedPlaces();
    const filtered = places.filter((p) => p.id !== placeId);
    await AsyncStorage.setItem(KEYS.SAVED_PLACES, JSON.stringify(filtered));
  },

  async getSavedPlaces(): Promise<Place[]> {
    const data = await AsyncStorage.getItem(KEYS.SAVED_PLACES);
    return data ? JSON.parse(data) : [];
  },

  async isPlaceSaved(placeId: string): Promise<boolean> {
    const places = await this.getSavedPlaces();
    return places.some((p) => p.id === placeId);
  },

  // Onboarding
  async setOnboardingCompleted(): Promise<void> {
    await AsyncStorage.setItem(KEYS.ONBOARDING_COMPLETED, 'true');
  },

  async isOnboardingCompleted(): Promise<boolean> {
    const data = await AsyncStorage.getItem(KEYS.ONBOARDING_COMPLETED);
    return data === 'true';
  },
};
