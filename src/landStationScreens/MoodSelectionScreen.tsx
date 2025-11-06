import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import { Card } from '../landStationComponents/Card';
import { Button } from '../landStationComponents/Button';
import { colors } from '../landStationConstants/colors';
import { moods } from '../landStationConstants/data';
import { Mood } from '../landStationTypes';
import { storage } from '../landStationUtils/storage';
import { BACKGROUND_IMAGE } from '../landStationConstants/images';

interface MoodSelectionScreenProps {
  navigation: any;
}

export const MoodSelectionScreen: React.FC<MoodSelectionScreenProps> = ({
  navigation,
}) => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleContinue = async () => {
    if (selectedMood) {
      const today = new Date().toISOString().split('T')[0];
      await storage.saveMoodEntry({
        date: today,
        mood: selectedMood,
      });
      navigation.navigate('MoodCalendar');
    }
  };

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
      blurRadius={10}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Card style={styles.card}>
          <Text style={styles.title}>
            Choosing your mood for the day
            </Text>

          <View style={styles.moodsContainer}>
            <TouchableOpacity
              style={[
                styles.moodItem,
                selectedMood?.id === 'sad' && styles.moodItemSelected,
              ]}
              onPress={() => handleMoodSelect(moods[0])}>
              <Image source={require('../img/mood/bad.png')} style={styles.moodImage} />
            </TouchableOpacity>

            <View style={styles.bottomMoods}>
              <TouchableOpacity
                style={[
                  styles.moodItem,
                  selectedMood?.id === 'happy' && styles.moodItemSelected,
                ]}
                onPress={() => handleMoodSelect(moods[1])}>
              <Image source={require('../img/mood/good.png')} style={styles.moodImage} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.moodItem,
                  selectedMood?.id === 'calm' && styles.moodItemSelected,
                ]}
                onPress={() => handleMoodSelect(moods[2])}>
                <Image source={require('../img/mood/midl.png')} style={styles.moodImage} />
              </TouchableOpacity>
            </View>
          </View>

          {selectedMood && (
            <Button
              title="Continue"
              onPress={handleContinue}
              style={styles.button}
            />
          )}
          </Card>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    padding: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark.text,
    textAlign: 'center',
    marginBottom: 40,
  },
  moodsContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  moodItem: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  moodItemSelected: {
    backgroundColor: colors.dark.selected,
  },
  moodEmoji: {
    fontSize: 50,
  },
  bottomMoods: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    marginTop: 8,
  },
});
