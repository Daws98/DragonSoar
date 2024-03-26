import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenuScreen from './components/MainMenu.jsx';
import OptionsScreen from './components/Options.jsx';
// import GameScreen from './components/Game.jsx';
// import DeathScreen from './components/Death.jsx';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainMenu" component={MainMenuScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Options" component={OptionsScreen} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Game" component={GameScreen} /> */}
      {/* <Stack.Screen name="Death" component={DeathScreen} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
