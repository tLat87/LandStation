import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RegistrationScreen } from '../screens/RegistrationScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MoodSelectionScreen } from '../screens/MoodSelectionScreen';
import { MoodCalendarScreen } from '../screens/MoodCalendarScreen';
import { RecommendedPlacesScreen } from '../screens/RecommendedPlacesScreen';
import { SavedPlacesScreen } from '../screens/SavedPlacesScreen';
import { MapScreen } from '../screens/MapScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { AboutAppScreen } from '../screens/AboutAppScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';

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