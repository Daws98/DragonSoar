import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DeathScreen = ({ score, highScore, setHighScore, navigation }) => {
  const [newHighScore, setNewHighScore] = useState(false);

  useEffect(() => {
    // Check if the current score is higher than the high score
    if (score > highScore) {
      setHighScore(score);
      setNewHighScore(true);
    }
  }, [score, highScore, setHighScore]);

  return (
    <View style={styles.container}>
      <Text style={styles.gameOverText}>Game Over</Text>
      <Text style={styles.scoreText}>Score: {score}</Text>
      {newHighScore && <Text style={styles.highScoreText}>New Highscore!</Text>}
      <Button title="Main Menu" onPress={() => navigation.navigate('MainMenu')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 20,
  },
  highScoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
  },
});

export default DeathScreen;
