import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenuScreen from './screens/MainMenu';
import OptionsScreen from './screens/OptionScreen';
import GameScreen from './screens/GameScreen';
// import DeathScreen from './screens/DeathScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainMenu" component={MainMenuScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Options" component={OptionsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Death" component={DeathScreen} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
