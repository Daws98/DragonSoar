import React, { useState } from 'react';
import { View, Text, Switch, Button, Alert } from 'react-native';

const OptionsScreen = () => {
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);

  const handleClearData = () => {
    // Implement logic to clear stored data (e.g., high scores)
    Alert.alert('Data Cleared', 'High scores and other data have been cleared.');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Options</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ marginRight: 10 }}>Sound Effects</Text>
        <Switch
          value={soundEffectsEnabled}
          onValueChange={newValue => setSoundEffectsEnabled(newValue)}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ marginRight: 10 }}>Music</Text>
        <Switch
          value={musicEnabled}
          onValueChange={newValue => setMusicEnabled(newValue)}
        />
      </View>

      <Button title="Clear Data" onPress={handleClearData} />
    </View>
  );
};

export default OptionsScreen;
