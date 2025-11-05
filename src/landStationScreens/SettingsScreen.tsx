import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Card } from '../landStationComponents/Card';
import { colors } from '../landStationConstants/colors';
import { storage } from '../landStationUtils/storage';
import { User } from '../landStationTypes';
import { BACKGROUND_IMAGE } from '../landStationConstants/images';

interface SettingsScreenProps {
  navigation: any;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigation,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await storage.getUser();
      setUser(userData);
    };
    loadUser();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const userData = await storage.getUser();
      setUser(userData);
    });
    return unsubscribe;
  }, [navigation]);

  const userName = user?.name || 'Nick';
  const userAbout = user?.about || 'Lorem ipsum dolor hanmor';
  const userPhoto =
    user?.photo ||
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200';

  const calculateDaysActive = (regDate: string | undefined) => {
    if (!regDate) {
      return 0;
    }
    const registration = new Date(regDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - registration.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysActive = user?.registrationDate
    ? calculateDaysActive(user.registrationDate)
    : 0;

  const registrationDate = user?.registrationDate
    ? new Date(user.registrationDate).toLocaleDateString('en-GB')
    : new Date().toLocaleDateString('en-GB');

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
      blurRadius={10}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>SETTINGS</Text>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <Card style={styles.profileCard}>
          <Text style={styles.cardTitle}>My profile</Text>
          <View style={styles.profileContent}>
            <Image source={{ uri: userPhoto }} style={styles.profilePhoto} />
            <View style={styles.profileInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.profileName}>{userName}</Text>
              </View>
              <View style={styles.aboutContainer}>
                <Text style={styles.profileAbout}>{userAbout}</Text>
              </View>
            </View>
          </View>
        </Card>

        <Card style={styles.statsCard}>
          <Text style={styles.cardTitle}>Activity statistics</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>
                Number of days in the application
              </Text>
              <Text style={styles.statValue}>{daysActive}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Registration date</Text>
              <Text style={styles.statValue}>{registrationDate}</Text>
            </View>
          </View>
        </Card>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.dark.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backIcon: {
    fontSize: 24,
    color: colors.dark.text,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  profileCard: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 16,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    gap: 12,
  },
  nameContainer: {
    backgroundColor: colors.dark.background,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark.text,
  },
  aboutContainer: {
    backgroundColor: colors.dark.background,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  profileAbout: {
    fontSize: 14,
    color: colors.dark.text,
  },
  statsCard: {
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  statLabel: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
});