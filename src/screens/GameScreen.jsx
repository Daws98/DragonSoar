import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import Sound from 'react-native-sound';

const GameScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const [jumpAnim] = useState(new Animated.Value(0));
  const [jumping, setJumping] = useState(false);
  const [positionY, setPositionY] = useState(0);
  const [obstaclePositionX] = useState(new Animated.Value(screenWidth));
  const [score, setScore] = useState(0);

  const jumpSound = useRef(new Sound('jump_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }));

  jumpSound.current.setVolume(1.0);

  useEffect(() => {
    const scoreTimer = setInterval(() => {
      if (!jumping) {
        setScore(score => score + 1);
      }
    }, 100);
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
      jumpAnim.setValue(0);
      setJumping(false);
    });
    jumpSound.current.play();
  };

  const jumpHeight = jumpAnim.interpolate({
    inputRange: [0, 0.5 ,1],
    outputRange: [0, -200, 0]
  });

  useEffect(() => {
    const moveObstacle = () => {
      Animated.timing(obstaclePositionX, {
        toValue: -100,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {
        obstaclePositionX.setValue(screenWidth);
        setTimeout(moveObstacle, Math.random() * 3000 + 2000);
      });
    };

    moveObstacle();

    return () => {
      obstaclePositionX.stopAnimation();
    };
  }, []);

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
          style={[styles.obstacle, { bottom: 0, transform: [{ translateX: obstaclePositionX }] }]}
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
    zIndex: 1,
  },
  obstacle: {
    position: 'absolute',
    width: 100,
    height: 100,
    zIndex: 0,
  },
  touchArea: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  scoreText: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 2,
    color: 'white',
    fontSize: 20,
  },
});

export default GameScreen;
