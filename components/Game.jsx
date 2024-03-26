import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

const GameScreen = () => {
  const [jumping, setJumping] = useState(false);

  const handleJump = () => {
    if (!jumping) {
      setJumping(true);
      // Implement jump animation or logic here
      setTimeout(() => {
        setJumping(false);
      }, 500); // Reset jumping state after 500 milliseconds (adjust as needed)
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/background.png')} style={styles.backgroundImage} />
      <Text style={styles.title}>Ur Dragon Game</Text>
      <View style={styles.gameArea}>
        <Image source={require('../assets/images/ur.png')} style={styles.dragon} />
        <Image source={require('../assets/images/rock.png')} style={styles.obstacle} />
        <TouchableOpacity style={styles.touchArea} onPress={handleJump}>
          {/* Touchable area to trigger jump */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white', // Adjust text color based on background
  },
  gameArea: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent', // Make game area transparent to show background
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Needed for positioning absolute elements
  },
  dragon: {
    position: 'absolute',
    bottom: jumping ? 200 : 100, // Adjust position based on jumping state
    width: 100,
    height: 100,
  },
  obstacle: {
    position: 'absolute',
    bottom: 0,
    width: 50,
    height: 50,
    left: 200,
  },
  touchArea: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    backgroundColor: 'transparent',
  },
});

export default GameScreen;
