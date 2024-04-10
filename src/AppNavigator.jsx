import React from 'react';
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenuScreen from './screens/MainMenu';
import OptionsScreen from './screens/OptionScreen';
import GameScreen from './screens/GameScreen';
import Realm from 'realm';
import DeathScreen from './screens/DeathScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  
  const [highScore, setHighScore] = useState(0);
let realm;

const HighScoreSchema = {
  name: 'HighScore',
  properties: {
    score: 'int',
  },
};

Realm.open({ schema: [HighScoreSchema] })
  .then((openedRealm) => {
    realm = openedRealm;
    const highScores = realm.objects('HighScore');
    if (highScores.length > 0) {
      setHighScore(highScores[0].score);
    }
  })
  .catch((error) => {
    console.log('Failed to open realm:', error);
  });
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainMenu" component={MainMenuScreen} options={{ headerShown: false }}/>
      <Stack.Screen
  name="Options"
  options={{ headerShown: false }}
  children={(props) => <OptionsScreen {...props} realm={realm} />}
/>
      <Stack.Screen
  name="Game"
  options={{ headerShown: false }}
  children={(props) => <GameScreen {...props} realm={realm} highScore={highScore} setHighScore={setHighScore} />}
/>
<Stack.Screen
  name="Death"
  options={{ headerShown: false }}
  children={(props) => <DeathScreen {...props} realm={realm} highScore={highScore}/>}
/>
    </Stack.Navigator>
  );
};

export default AppNavigator;
