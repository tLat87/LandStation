import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  Share,
} from 'react-native';
import { Card } from '../landStationComponents/Card';
import { colors } from '../landStationConstants/colors';
import { places } from '../landStationConstants/data';
import { Place } from '../landStationTypes';
import { storage } from '../landStationUtils/storage';
import { BACKGROUND_IMAGE } from '../landStationConstants/images';

const { width } = Dimensions.get('window');

interface RecommendedPlacesScreenProps {
  navigation: any;
  route?: any;
}

export const RecommendedPlacesScreen: React.FC<RecommendedPlacesScreenProps> = ({
  navigation,
  route,
}) => {
  const initialIndex = route?.params?.initialIndex || 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentPlace = places[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < places.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${currentPlace.name}\n\n${currentPlace.description}\n\nCoordinates: ${currentPlace.coordinates.latitude}, ${currentPlace.coordinates.longitude}`,
        title: currentPlace.name,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleMap = () => {
    navigation.navigate('Map', { place: currentPlace });
  };

  const handleSave = async () => {
    await storage.savePlace(currentPlace);
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

        <Card style={styles.card}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Recomended place</Text>
          </View>

          <Image
            source={
              typeof currentPlace.image === 'string'
                ? { uri: currentPlace.image }
                : currentPlace.image
            }
            style={styles.placeImage}
            resizeMode="cover"
          />

          <Text style={styles.placeName}>{currentPlace.name}</Text>

          <View style={styles.coordinatesContainer}>
            <Text style={styles.coordinatesText}>
              Coordinates: {currentPlace.coordinates.latitude},{' '}
              {currentPlace.coordinates.longitude}
            </Text>
          </View>

          <Text style={styles.description}>{currentPlace.description}</Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Image source={require('../img/icons/share.png')} style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleMap}>
              <Image source={require('../img/icons/map.png')} style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
              <Image source={require('../img/icons/saved.png')} style={styles.actionIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={handlePrevious}
              disabled={currentIndex === 0}>
              <Text style={styles.navIcon}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navButton}
              onPress={handleNext}
              disabled={currentIndex === places.length - 1}>
              <Text style={styles.navIcon}>→</Text>
            </TouchableOpacity>
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
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    marginBottom: 20,
    fontWeight: '600',
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  backButton: {
    marginRight: 12,
  },
  backIcon: {
    fontSize: 24,
    color: colors.dark.text,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark.text,
  },
  placeImage: {
    width: '100%',
    height: 250,
    borderRadius: 0,
  },
  placeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark.text,
    padding: 16,
    paddingBottom: 8,
  },
  coordinatesContainer: {
    backgroundColor: colors.dark.button,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  coordinatesText: {
    color: colors.dark.text,
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: colors.dark.text,
    lineHeight: 24,
    paddingHorizontal: 16,
    marginBottom: 24,
    textAlign: 'justify',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.dark.button,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: colors.dark.text,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingBottom: 16,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.dark.button,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    color: colors.dark.text,
  },
});
