import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Share,
} from 'react-native';
import { Card } from '../landStationComponents/Card';
import { Button } from '../landStationComponents/Button';
import { GradientButton } from '../landStationComponents/GradientButton';
import { colors } from '../landStationConstants/colors';
import { facts } from '../landStationConstants/data';
import { BACKGROUND_IMAGE } from '../landStationConstants/images';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [currentFact] = useState(facts[0]);

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
      blurRadius={10}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>HOME</Text>
          {/* <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}>
            <Image source={require('../img/icons/settings.png')} style={styles.settingsIcon} />
          </TouchableOpacity> */}
        </View>

        <Card style={styles.factCard}>
          <View style={styles.factContent}>
            {currentFact.image && (
              <Image
                source={require('../img/onboard/1.png')}
                style={styles.factImage}
              />
            )}
            <Text style={styles.factText}>{currentFact.text}</Text>
          </View>
          <Button
            title="Share fact"
            onPress={async () => {
              try {
                await Share.share({
                  message: currentFact.text,
                  title: 'Interesting fact about British friendship',
                });
              } catch (error) {
                console.log('Error sharing:', error);
              }
            }}
            style={styles.shareButton}
          />
        </Card>

        <View style={styles.navigationButtons}>
          <Button
            title="Recomended place"
            onPress={() => navigation.navigate('RecommendedPlaces')}
            style={styles.navButton}
          />
          <Button
            title="Saved places"
            onPress={() => navigation.navigate('SavedPlaces')}
            style={styles.navButton}
          />
          <Button
            title="Mood calendar"
            onPress={() => navigation.navigate('MoodCalendar')}
            style={styles.navButton}
          />
          <Button
            title="About the app"
            onPress={() => navigation.navigate('AboutApp')}
            style={styles.navButton}
          />
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
  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    fontWeight: '600',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.dark.button,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    width: 20,
    height: 20,
    tintColor: colors.dark.text,
  },
  factCard: {
    marginBottom: 24,
  },
  factContent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  factImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  factText: {
    flex: 1,
    fontSize: 16,
    color: colors.dark.text,
    lineHeight: 22,
  },
  shareButton: {
    alignSelf: 'center',
  },
  navigationButtons: {
    gap: 16,
  },
  navButton: {
    marginBottom: 0,
  },
});
