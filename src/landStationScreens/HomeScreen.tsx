import React, { useState, useEffect } from 'react';
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
import { storage } from '../landStationUtils/storage';
import { User } from '../landStationTypes';
import { BACKGROUND_IMAGE } from '../landStationConstants/images';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [currentFact] = useState(facts[0]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await storage.getUser();
      setUser(userData);
    };
    loadUser();
  }, []);

  const userName = user?.name || 'User';
  const userAbout = user?.about || '';
  const userPhoto = user?.photo;

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
      blurRadius={10}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>HOME</Text>

        <Card style={styles.profileCard}>
          <View style={styles.profileContent}>
            {userPhoto ? (
              <Image source={{ uri: userPhoto }} style={styles.profilePhoto} />
            ) : (
              <View style={styles.profilePhotoPlaceholder}>
                <Text style={styles.profilePhotoEmoji}>👤</Text>
              </View>
            )}
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userName}</Text>
              {userAbout ? (
                <Text style={styles.profileAbout}>{userAbout}</Text>
              ) : null}
            </View>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Settings')}>
              <Image source={require('../img/icons/settings.png')} style={styles.settingsIcon} />
            </TouchableOpacity>
          </View>
        </Card>

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
  sectionTitle: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    marginBottom: 20,
    fontWeight: '600',
  },
  profileCard: {
    marginBottom: 20,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profilePhotoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    backgroundColor: colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.dark.border,
  },
  profilePhotoEmoji: {
    fontSize: 32,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 4,
  },
  profileAbout: {
    fontSize: 14,
    color: colors.dark.textSecondary,
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
