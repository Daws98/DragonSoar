import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';

const GameScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const [jumpAnim] = useState(new Animated.Value(0));
  const [jumping, setJumping] = useState(false);
  const [positionY, setPositionY] = useState(0);
  const obstaclePosition = useRef(new Animated.Value(screenWidth)).current; // Initial position of obstacle
   const [score, setScore] = useState(0);

  useEffect(() => {
    const scoreTimer = setInterval(() => {
      if (!jumping) {
        setScore(score => score + 1); // Increment score only if not jumping
      }
    }, 100); // Adjust the interval as needed for score increase speed
    return () => clearInterval(scoreTimer);
  }, [jumping]);

  const handleJump = () => {
    setJumping(true);
    Animated.timing(
      jumpAnim,
      {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }
    ).start(() => {
      // Reset the animation value after the jump is complete
      jumpAnim.setValue(0);
      setJumping(false);
    });
  };

  const jumpHeight = jumpAnim.interpolate({
    inputRange: [0, 0.5 ,1],
    outputRange: [0, -200, 0] // Adjust the height of the jump as needed
  });

  // Function to move the obstacle continuously from right to left
  const moveObstacle = () => {
    Animated.timing(obstaclePosition, {
      toValue: -100, // Move off screen to the left
      duration: 2000, // Duration for obstacle to cross the screen
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
            <Text style={styles.scoreText}>Score: {score}</Text>
      <View style={styles.gameArea}>
        {/* Scrolling background */}
        <Image
          source={require('../assets/images/background.png')}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          resizeMode="cover"
        />
        {/* Dragon */}
        <Animated.Image
          source={require('../assets/images/ur.png')}
          style={[styles.dragon, { bottom: positionY , transform: [{ translateY: jumpHeight }] }]}
        />
        {/* Obstacle */}
        <Animated.Image
          source={require('../assets/images/rock.png')}
          style={[styles.obstacle, { right: obstaclePosition }]}
        />
      </View>
      {/* Touchable area to trigger jump */}
      {!jumping && (
      <TouchableOpacity style={styles.touchArea} onPress={handleJump} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameArea: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  dragon: {
    position: 'absolute',
    width: 100,
    height: 100,
    bottom: 0,
    zIndex: 1, // Ensure dragon appears in front of obstacle
  },
  obstacle: {
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 0,
    zIndex: 0,
  },
  touchArea: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});

export default GameScreen;