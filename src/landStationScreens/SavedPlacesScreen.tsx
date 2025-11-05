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
import { colors } from '../landStationConstants/colors';
import { places } from '../landStationConstants/data';
import { storage } from '../landStationUtils/storage';
import { Place } from '../landStationTypes';
import { BACKGROUND_IMAGE } from '../landStationConstants/images';

interface SavedPlacesScreenProps {
  navigation: any;
}

export const SavedPlacesScreen: React.FC<SavedPlacesScreenProps> = ({
  navigation,
}) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);

  const loadSavedPlaces = async () => {
    const saved = await storage.getSavedPlaces();
    setSavedPlaces(saved.length > 0 ? saved : []);
  };

  useEffect(() => {
    loadSavedPlaces();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadSavedPlaces();
    });
    return unsubscribe;
  }, [navigation]);

  const handlePlacePress = (place: any) => {
    setSelectedPlace(place);
  };

  const handleBackToList = () => {
    setSelectedPlace(null);
  };

  const handleShare = async () => {
    if (!selectedPlace) return;
    try {
      await Share.share({
        message: `${selectedPlace.name}\n\n${selectedPlace.description}\n\nCoordinates: ${selectedPlace.coordinates.latitude}, ${selectedPlace.coordinates.longitude}`,
        title: selectedPlace.name,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleMap = () => {
    if (selectedPlace) {
      navigation.navigate('Map', { place: selectedPlace });
    }
  };

  if (selectedPlace) {
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
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackToList}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Saved places</Text>
          </View>

          <Card style={styles.detailCard}>
            <Image
              source={
                typeof selectedPlace.image === 'string'
                  ? { uri: selectedPlace.image }
                  : selectedPlace.image
              }
              style={styles.placeImage}
              resizeMode="cover"
            />
            <View style={styles.bookmarkContainer}>
              <Image source={require('../img/icons/saved.png')} style={styles.bookmarkIcon} />
            </View>

            <Text style={styles.placeName}>{selectedPlace.name}</Text>

            <View style={styles.coordinatesContainer}>
              <Text style={styles.coordinatesText}>
                Coordinates: {selectedPlace.coordinates.latitude},{' '}
                {selectedPlace.coordinates.longitude}
              </Text>
            </View>

            <Text style={styles.description}>{selectedPlace.description}</Text>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleShare}>
                <Image source={require('../img/icons/share.png')} style={styles.actionIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.mapButton]}
                onPress={handleMap}>
                <Image source={require('../img/icons/map.png')} style={styles.mapIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Image source={require('../img/icons/saved.png')} style={styles.actionIcon} />
              </TouchableOpacity>
            </View>
          </Card>
        </ScrollView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
      }}
      style={styles.background}
      blurRadius={10}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>SAVED PLACES</Text>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Saved places</Text>
        </View>

        {savedPlaces.map((place) => (
          <Card key={place.id} style={styles.placeCard}>
            <Image
              source={
                typeof place.image === 'string'
                  ? { uri: place.image }
                  : place.image
              }
              style={styles.placeImageSmall}
              resizeMode="cover"
            />
            <View style={styles.bookmarkBadge}>
              <Image source={require('../img/icons/saved.png')} style={styles.bookmarkIcon} />
            </View>
            <Text style={styles.placeNameSmall}>{place.name}</Text>
            <Button
              title="Open more"
              onPress={() => handlePlacePress(place)}
              style={styles.openButton}
            />
          </Card>
        ))}
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
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.dark.border,
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
  placeCard: {
    marginBottom: 20,
    padding: 0,
    overflow: 'hidden',
  },
  placeImageSmall: {
    width: '100%',
    height: 200,
  },
  bookmarkBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.dark.button,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkIcon: {
    width: 20,
    height: 20,
    tintColor: colors.dark.text,
  },
  placeNameSmall: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark.text,
    padding: 16,
    paddingBottom: 8,
  },
  openButton: {
    margin: 16,
    marginTop: 0,
  },
  detailCard: {
    padding: 0,
    overflow: 'hidden',
  },
  placeImage: {
    width: '100%',
    height: 250,
  },
  bookmarkContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.dark.button,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.dark.button,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapButton: {
    backgroundColor: colors.dark.text,
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: colors.dark.text,
  },
  mapIcon: {
    width: 24,
    height: 24,
    tintColor: colors.dark.button,
  },
});
