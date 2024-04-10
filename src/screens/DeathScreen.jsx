import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';


const DeathScreen = ({ score, highScore, setHighScore, navigation }) => {

  return (
    <ImageBackground
      source={require('../assets/images/mainmenu.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.gameOverText}>Game Over</Text>
        <Text style={styles.scoreText}>High Score: {highScore}</Text>
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


