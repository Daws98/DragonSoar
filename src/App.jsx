import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MusicProvider } from './utils/MusicContext';
import AppNavigator from './AppNavigator';

const App = () => {
  return (
    <MusicProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </MusicProvider>
  );
};

export default App;
