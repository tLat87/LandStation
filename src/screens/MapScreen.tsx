import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { colors } from '../constants/colors';
import { places } from '../constants/data';
import { Place } from '../types';
import { BACKGROUND_IMAGE } from '../constants/images';

interface MapScreenProps {
  navigation: any;
  route: any;
}

export const MapScreen: React.FC<MapScreenProps> = ({ navigation, route }) => {
  const selectedPlace = route?.params?.place || places[0];
  const allPlaces = places;

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
});
