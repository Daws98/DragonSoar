import React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MusicProvider } from './utils/MusicContext';
import AppNavigator from './AppNavigator';
import Orientation from 'react-native-orientation-locker';

const App = () => {
  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <MusicProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </MusicProvider>
  );
};

export default App;
