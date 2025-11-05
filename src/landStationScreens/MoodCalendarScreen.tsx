import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Share,
  Image,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Card } from '../landStationComponents/Card';
import { colors } from '../landStationConstants/colors';
import { storage } from '../landStationUtils/storage';
import { MoodEntry } from '../landStationTypes';
import { BACKGROUND_IMAGE } from '../landStationConstants/images';

interface MoodCalendarScreenProps {
  navigation: any;
}

export const MoodCalendarScreen: React.FC<MoodCalendarScreenProps> = ({
  navigation,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const today = new Date().toISOString().split('T')[0];

  const loadMoodEntries = async () => {
    const entries = await storage.getMoodEntries();
    setMoodEntries(entries);
  };

  useEffect(() => {
    loadMoodEntries();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadMoodEntries();
    });
    return unsubscribe;
  }, [navigation]);

  const markedDates: any = {};
  moodEntries.forEach((entry) => {
    markedDates[entry.date] = {
      marked: true,
      selectedColor: '#0066FF',
      textColor: '#FFFFFF',
    };
  });

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: true,
    };
  }

  const selectedMoodEntry = moodEntries.find((e) => e.date === selectedDate);

  const handleDateSelect = (day: any) => {
    setSelectedDate(day.dateString);
  };

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
      blurRadius={10}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>PLACE</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backText}>Mood calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addMoodButton}
          onPress={() => navigation.navigate('MoodSelection')}>
          <Text style={styles.addMoodText}>+ Add today's mood</Text>
        </TouchableOpacity>

        <Card style={styles.calendarCard}>
          <Calendar
            current={today}
            markedDates={markedDates}
            onDayPress={handleDateSelect}
            theme={{
              backgroundColor: '#FFFFFF',
              calendarBackground: '#FFFFFF',
              textSectionTitleColor: '#000000',
              selectedDayBackgroundColor: '#0066FF',
              selectedDayTextColor: '#FFFFFF',
              todayTextColor: '#0066FF',
              dayTextColor: '#000000',
              textDisabledColor: '#CCCCCC',
              dotColor: '#0066FF',
              selectedDotColor: '#FFFFFF',
              arrowColor: '#000000',
              monthTextColor: '#000000',
              textDayFontWeight: '400',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '600',
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
          />
        </Card>

        <Text style={styles.moodLabel}>
          {selectedDate === today ? "Today's mood:" : 'Selected date mood:'}
        </Text>

        {selectedMoodEntry ? (
          <Card style={styles.todayMoodCard}>
            <View style={styles.todayMoodContent}>
              <View style={styles.moodIconContainer}>
                <Text style={styles.moodIcon}>
                  {selectedMoodEntry.mood.emoji}
                </Text>
              </View>
              <Text style={styles.moodDate}>
                {new Date(selectedDate).toLocaleDateString('en-GB')}
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  try {
                    await Share.share({
                      message: `My mood on ${new Date(selectedDate).toLocaleDateString('en-GB')}: ${selectedMoodEntry.mood.emoji} ${selectedMoodEntry.mood.label}`,
                      title: 'My mood',
                    });
                  } catch (error) {
                    console.log('Error sharing:', error);
                  }
                }}>
                <Image source={require('../img/icons/share.png')} style={styles.shareIcon} />
              </TouchableOpacity>
            </View>
          </Card>
        ) : (
          <Card style={styles.noMoodCard}>
            <Text style={styles.noMoodText}>No mood recorded for this date</Text>
          </Card>
        )}

        <Text style={styles.privacyText}>
          All your moods and data are stored only on your device and never
          shared with anyone.
        </Text>
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
  content: {
    padding: 20,
    paddingTop: 60,
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    marginBottom: 20,
    fontWeight: '600',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: colors.dark.button,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  backIcon: {
    fontSize: 20,
    color: colors.dark.text,
    marginRight: 8,
  },
  backText: {
    fontSize: 16,
    color: colors.dark.text,
    fontWeight: '600',
  },
  addMoodButton: {
    backgroundColor: colors.dark.button,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  addMoodText: {
    color: colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
  calendarCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
  },
  moodLabel: {
    fontSize: 18,
    color: colors.dark.text,
    marginBottom: 12,
    fontWeight: '600',
  },
  todayMoodCard: {
    backgroundColor: colors.dark.button,
    marginBottom: 24,
  },
  todayMoodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moodIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.dark.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodIcon: {
    fontSize: 24,
  },
  moodDate: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: colors.dark.text,
    fontWeight: '600',
  },
  shareIcon: {
    width: 24,
    height: 24,
    tintColor: colors.dark.text,
  },
  privacyText: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  noMoodCard: {
    backgroundColor: colors.dark.card,
    marginBottom: 24,
  },
  noMoodText: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    padding: 16,
  },
});
