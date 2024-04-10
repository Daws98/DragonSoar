import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';


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
    <ImageBackground
      source={require('../assets/images/mainmenu.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.gameOverText}>Game Over</Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
        {newHighScore && <Text style={styles.highScoreText}>New Highscore!</Text>}
        <Button title="Main Menu" onPress={() => navigation.navigate('MainMenu')} />
      </View>
    </ImageBackground>
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
    color: 'white', // Set color to white
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white', // Set color to white
  },
  highScoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green', // You can adjust the color for the high score text as needed
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default DeathScreen;


