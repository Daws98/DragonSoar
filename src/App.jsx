import React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MusicProvider } from './utils/MusicContext';
import AppNavigator from './AppNavigator';
import Orientation from 'react-native-orientation-locker';
import Realm from 'realm';

const HighScoreSchema = {
  name: 'HighScore',
  properties: {
    score: 'int',
  },
};

const App = () => {
  const [realm, setRealm] = useState(null);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  useEffect(() => {
    Realm.open({ schema: [HighScoreSchema] })
      .then((openedRealm) => {
        setRealm(openedRealm);
        const highScores = openedRealm.objects('HighScore');
        if (highScores.length > 0) {
          setHighScore(highScores[0].score);
        }
      })
      .catch((error) => {
        console.log('Failed to open realm:', error);
      });
  }, []);
  
  if (!realm) {
    return null;
  }

  return (
    <MusicProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </MusicProvider>
  );
};

export default App;
