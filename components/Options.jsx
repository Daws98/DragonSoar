import React, { useState } from 'react';
import { View, Text, ImageBackground, Switch, Button, Alert, StyleSheet } from 'react-native';

const OptionsScreen = ({ navigation }) => {
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);

  const handleClearData = () => {
    // Implement logic to clear stored data (e.g., high scores)
    Alert.alert('Data Cleared', 'High scores and other data have been cleared.');
  };

  return (
    <ImageBackground
      source={require('../assets/images/mainmenu.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Options</Text>

        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Sound Effects</Text>
          <Switch
            value={soundEffectsEnabled}
            onValueChange={newValue => setSoundEffectsEnabled(newValue)}
          />
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Music</Text>
          <Switch
            value={musicEnabled}
            onValueChange={newValue => setMusicEnabled(newValue)}
          />
        </View>

        <Button title="Clear Data" onPress={handleClearData} />

        <Button title="Back" onPress={() => navigation.goBack()} />
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
});

export default OptionsScreen;
