/**
 * LandStation App
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { AppNavigator } from './src/landStationNavigation/AppNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'light-content'}
        translucent
        backgroundColor="transparent"
      />
      <AppNavigator />
    </>
  );
}

export default App;
