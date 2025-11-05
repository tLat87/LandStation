import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RegistrationScreen } from '../landStationScreens/RegistrationScreen';
import { HomeScreen } from '../landStationScreens/HomeScreen';
import { MoodSelectionScreen } from '../landStationScreens/MoodSelectionScreen';
import { MoodCalendarScreen } from '../landStationScreens/MoodCalendarScreen';
import { RecommendedPlacesScreen } from '../landStationScreens/RecommendedPlacesScreen';
import { SavedPlacesScreen } from '../landStationScreens/SavedPlacesScreen';
import { MapScreen } from '../landStationScreens/MapScreen';
import { SettingsScreen } from '../landStationScreens/SettingsScreen';
import { AboutAppScreen } from '../landStationScreens/AboutAppScreen';
import { OnboardingScreen } from '../landStationScreens/OnboardingScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MoodSelection" component={MoodSelectionScreen} />
        <Stack.Screen name="MoodCalendar" component={MoodCalendarScreen} />
        <Stack.Screen
          name="RecommendedPlaces"
          component={RecommendedPlacesScreen}
        />
        <Stack.Screen name="SavedPlaces" component={SavedPlacesScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="AboutApp" component={AboutAppScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};