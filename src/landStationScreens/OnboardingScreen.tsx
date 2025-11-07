import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import { Button } from '../landStationComponents/Button';
import { colors } from '../landStationConstants/colors';
import { BACKGROUND_IMAGE } from '../landStationConstants/images';
import { storage } from '../landStationUtils/storage';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  navigation: any;
}

const screens = [
  {
    id: 1,
    title: 'Welcome to',
    titleHighlight: 'Land Bro Case UK Station!',
    body: "Hi! I'm Chloe, your guide and partner on this journey through the UK. We'll be discovering places that travel guides don't tell you about — places where true stories of friendship, inspiration and peace are born.",
    buttonText: 'Continue',
    image: require('../img/onboard/1.png'),
  },
  {
    id: 2,
    title: 'Choose your mood',
    titleHighlight: 'for the day',
    body: "How are you feeling today? Choose one of three moods — calm, active or social — and I'll show you places that suit you.",
    buttonText: 'Ok',
    image: require('../img/onboard/2.png'),
  },
  {
    id: 3,
    title: 'Your Map and',
    titleHighlight: 'Statistics',
    body: 'Save your favorite locations, mark your mood days, and come back to see how your life rhythm changes. The app will remember each day — your own archive of memories.',
    buttonText: 'Next',
    image: require('../img/onboard/3.png'),
  },
  {
    id: 4,
    title: "Let's start the",
    titleHighlight: 'adventure!',
    body: 'A thermos of tea, sneakers, and a bit of British humor are the perfect set for a trip with friends. Ready? Tap — and let\'s get to know the UK!',
    buttonText: 'Start',
    image: require('../img/onboard/4.png'),
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  navigation,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentScreen = screens[currentIndex];

  const handleNext = async () => {
    if (currentIndex < screens.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Последний экран - сохраняем, что онбординг пройден
      await storage.setOnboardingCompleted();
      navigation.replace('Registration');
    }
  };

  const handleSkip = async () => {
    await storage.setOnboardingCompleted();
    navigation.replace('Registration');
  };

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={styles.background} blurRadius={10}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.imageContainer}>
              <Image source={currentScreen.image} style={styles.onboardingImage} resizeMode="contain" />
            </View>

            <View style={styles.textContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{currentScreen.title}</Text>
                <View style={styles.highlightContainer}>
                  <Text style={styles.titleHighlight}>
                    {currentScreen.titleHighlight}
                  </Text>
                </View>
              </View>

              <Text style={styles.body}>{currentScreen.body}</Text>
            </View>

            <View style={styles.indicators}>
              {screens.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    index === currentIndex && styles.indicatorActive,
                  ]}
                />
              ))}
            </View>

            <Button
              title={currentScreen.buttonText}
              onPress={handleNext}
              style={styles.button}
            />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 60,
  },
  skipButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 1,
  },
  skipText: {
    color: colors.dark.textSecondary,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    minHeight: '100%',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  onboardingImage: {
    width: '100%',
    height: '100%',
    maxHeight: 400,
  },
  textContainer: {
    marginBottom: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  highlightContainer: {
    backgroundColor: colors.dark.button,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  titleHighlight: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  body: {
    fontSize: 16,
    color: colors.dark.text,
    lineHeight: 24,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.dark.textSecondary,
  },
  indicatorActive: {
    backgroundColor: colors.dark.button,
    width: 24,
  },
  button: {
    marginBottom: 0,
  },
});
