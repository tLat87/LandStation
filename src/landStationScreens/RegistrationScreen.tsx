import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Input } from '../landStationComponents/Input';
import { Button } from '../landStationComponents/Button';
import { Card } from '../landStationComponents/Card';
import { colors } from '../landStationConstants/colors';
import { launchImageLibrary } from 'react-native-image-picker';
import { storage } from '../landStationUtils/storage';
import { BACKGROUND_IMAGE } from '../landStationConstants/images';

interface RegistrationScreenProps {
  navigation: any;
}

export const RegistrationScreen: React.FC<RegistrationScreenProps> = ({
  navigation,
}) => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoPicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      (response) => {
        if (response.assets && response.assets[0]) {
          setPhoto(response.assets[0].uri || null);
        }
      },
    );
  };

  const handleContinue = async () => {
    // Разрешаем регистрацию с пустыми полями
    await storage.saveUser({
      id: Date.now().toString(),
      name: name.trim() || 'User',
      about: about.trim() || '',
      photo: photo,
      registrationDate: new Date().toISOString().split('T')[0],
    });
    // После регистрации переходим на главный экран
    // Пользователь может выйти через настройки и войти снова
    navigation.replace('Home');
  };

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
      blurRadius={10}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Card style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Registration</Text>
            <Text style={styles.subtitle}>All information is confidential</Text>
          </View>

          <TouchableOpacity
            style={styles.photoContainer}
            onPress={handlePhotoPicker}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoIcon}>👤</Text>
                <Text style={styles.photoText}>Add photo</Text>
              </View>
            )}
          </TouchableOpacity>

          <Input
            placeholder="Your name (optional)"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <Input
            placeholder="About me (optional)"
            value={about}
            onChangeText={setAbout}
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
          />

          <Button
            title="Continue"
            onPress={handleContinue}
            style={styles.button}
          />
        </Card>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  container: {
    marginVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.dark.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dark.card,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.dark.border,
  },
  photoIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  photoText: {
    color: colors.dark.border,
    fontSize: 14,
  },
  input: {
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 8,
  },
});
