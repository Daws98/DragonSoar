import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './layouts/AppNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;