import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { colors } from '../landStationConstants/colors';
import { places } from '../landStationConstants/data';
import { Place } from '../landStationTypes';
import { BACKGROUND_IMAGE } from '../landStationConstants/images';
import { Card } from '../landStationComponents/Card';

interface MapScreenProps {
  navigation: any;
  route: any;
}

export const MapScreen: React.FC<MapScreenProps> = ({ navigation, route }) => {
  const selectedPlace = route?.params?.place || places[0];
  const allPlaces = places;

  // Для Android показываем список мест вместо карты
  if (Platform.OS === 'android') {
    return (
      <ImageBackground
        source={BACKGROUND_IMAGE}
        style={styles.background}
        blurRadius={10}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Places Locations</Text>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}>
            {allPlaces.map((place) => (
              <Card key={place.id} style={styles.placeCard}>
                <Text style={styles.placeName}>{place.name}</Text>
                <View style={styles.coordinatesContainer}>
                  <Text style={styles.coordinatesLabel}>Coordinates:</Text>
                  <Text style={styles.coordinatesText}>
                    {place.coordinates.latitude}, {place.coordinates.longitude}
                  </Text>
                </View>
                <Text style={styles.placeDescription} numberOfLines={3}>
                  {place.description}
                </Text>
                <TouchableOpacity
                  style={styles.openButton}
                  onPress={() => {
                    const placeIndex = places.findIndex((p) => p.id === place.id);
                    if (placeIndex >= 0) {
                      navigation.navigate('RecommendedPlaces', {
                        initialIndex: placeIndex,
                      });
                    }
                  }}>
                  <Text style={styles.openButtonText}>View Details</Text>
                </TouchableOpacity>
              </Card>
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }

  // Для iOS показываем карту
  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
      blurRadius={10}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Map</Text>
        </View>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: selectedPlace.coordinates.latitude,
            longitude: selectedPlace.coordinates.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}>
          {allPlaces.map((place) => (
            <Marker
              key={place.id}
              coordinate={{
                latitude: place.coordinates.latitude,
                longitude: place.coordinates.longitude,
              }}
              title={place.name}
              description={place.description}
            />
          ))}
        </MapView>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.card,
    padding: 16,
    paddingTop: 60,
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
  map: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  placeCard: {
    marginBottom: 16,
  },
  placeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 12,
  },
  coordinatesContainer: {
    backgroundColor: colors.dark.button,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  coordinatesLabel: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    marginBottom: 4,
  },
  coordinatesText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark.text,
  },
  placeDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  openButton: {
    backgroundColor: colors.dark.button,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  openButtonText: {
    color: colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
