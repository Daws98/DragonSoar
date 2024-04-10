import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ImageBackground, Switch, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { MusicContext } from '../utils/MusicContext';
import Realm from 'realm';


const HighScoreSchema = {
  name: 'HighScore',
  properties: {
    score: 'int',
  },
};

let realm;

const OptionsScreen = ({ navigation }) => {
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const { togglePlay } = useContext(MusicContext);

  useEffect(() => {
    Realm.open({ schema: [HighScoreSchema] })
      .then((openedRealm) => {
        realm = openedRealm;
      })
      .catch((error) => {
        console.log('Failed to open realm:', error);
      });
  }, []);

  const handleClearData = () => {
    if (realm) { 
      realm.write(() => {
        const highScores = realm.objects('HighScore');
        if (highScores.length > 0) {
          highScores[0].score = 0;
        } else {
          realm.create('HighScore', { score: 0 });
        }
      });
    } else {
      console.log('Realm is not initialized.');
    }
  };

  const handleToggleMusic = () => {
    togglePlay();
    setMusicEnabled(prevState => !prevState);
  };

  const handleToggleSoundEffects = () => {
    setSoundEffectsEnabled(prevState => !prevState);
  };

  return (
    <ImageBackground
      source={require('../assets/images/mainmenu.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Options</Text>

        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Music</Text>
          <Switch
            value={musicEnabled}
            onValueChange={handleToggleMusic}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleClearData}
        >
          <Text style={styles.buttonText}>Clear Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    marginRight: 10,
    color: 'white',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default OptionsScreen;
