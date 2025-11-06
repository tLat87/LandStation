import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
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

  const userName = user?.name || 'User';
  const userAbout = user?.about || '';
  const userPhoto = user?.photo;

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

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout? You will need to register again to access your account.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            // Удаляем только данные пользователя, но сохраняем настроения и места
            // чтобы пользователь мог зарегистрироваться снова и увидеть свою историю
            await storage.deleteUser();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Registration' }],
            });
          },
        },
      ],
    );
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            // Второе подтверждение
            Alert.alert(
              'Confirm Deletion',
              'This will permanently delete all your data including your profile, mood entries, and saved places. Are you absolutely sure?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Delete Forever',
                  style: 'destructive',
                  onPress: async () => {
                    await storage.deleteAllUserData();
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Onboarding' }],
                    });
                  },
                },
              ],
            );
          },
        },
      ],
    );
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
            {userPhoto ? (
              <Image source={{ uri: userPhoto }} style={styles.profilePhoto} />
            ) : (
              <View style={styles.profilePhotoPlaceholder}>
                <Text style={styles.profilePhotoEmoji}>👤</Text>
              </View>
            )}
            <View style={styles.profileInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.profileName}>{userName}</Text>
              </View>
              {userAbout ? (
                <View style={styles.aboutContainer}>
                  <Text style={styles.profileAbout}>{userAbout}</Text>
                </View>
              ) : null}
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

        <Card style={styles.actionsCard}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleLogout}>
            <Text style={styles.actionButtonText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDeleteAccount}>
            <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
              Delete Account
            </Text>
          </TouchableOpacity>
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
    paddingBottom: 40,
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
  profilePhotoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    backgroundColor: colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.dark.border,
  },
  profilePhotoEmoji: {
    fontSize: 40,
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
  actionsCard: {
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: colors.dark.button,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF4444',
  },
  actionButtonText: {
    color: colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButtonText: {
    color: '#FF4444',
  },
});