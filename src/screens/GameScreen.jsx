import React, { useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sound from 'react-native-sound';

const GameScreen = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const [jumpAnim] = useState(new Animated.Value(0));
  const [jumping, setJumping] = useState(false);
  const [positionY, setPositionY] = useState(0);
  const [obstaclePositionX] = useState(new Animated.Value(screenWidth)); // Initial position of obstacle
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false); // State to track game over
  const jumpingRef = useRef(jumping);

   const jumpSound = useRef(new Sound('jump_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }));

  jumpSound.current.setVolume(1.0);

  useEffect(() => {
    const scoreTimer = setInterval(() => {
      if (!jumpingRef.current && !gameOver) {
        setScore((score) => score + 1);
      }
    }, 100);
  
    const moveObstacle = () => {
      Animated.timing(obstaclePositionX, {
        toValue: -100,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {
        obstaclePositionX.setValue(screenWidth);
        setTimeout(moveObstacle, Math.random() * 3000 + 2000);
      });

      obstaclePositionX.addListener(({ value }) => {
        // Check for collision
        if (!jumpingRef.current && value < 25 && value > -25) {
          setGameOver(true);
        }
      });
    };

  
    moveObstacle();
  
    return () => {
      clearInterval(scoreTimer);
      obstaclePositionX.stopAnimation();
    };
  }, [gameOver]);

  const handleJump = () => {
    if (!jumping) {
      jumpSound.current.play();
      setJumping(true);
      jumpAnim.setValue(0); // Reset the Animated.Value
      Animated.timing(jumpAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }).start(() => {
        setJumping(false);
      });
    }
  };
  

  const jumpHeight = jumpAnim.interpolate({
    inputRange: [0, 0.5 ,1],
    outputRange: [0, -200, 0] // Adjust the height of the jump as needed
  });

  const handleReturnToMenu = () => {
    navigation.navigate('MainMenu');
  };

  useEffect(() => {
    jumpingRef.current = jumping;
    const jumpCheckInterval = setInterval(() => {
      console.log("Jumping status:", jumping);
    }, 100);
  
    // Clear the interval when component unmounts or when game over
    return () => clearInterval(jumpCheckInterval);
  }, [jumping]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      {gameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <TouchableOpacity style={styles.menuButton} onPress={handleReturnToMenu}>
            <Text style={styles.menuButtonText}>Back to Menu</Text>
          </TouchableOpacity>
        </View>
      )}
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
        ref={(ref) => { this.obstacle = ref; }}
          source={require('../assets/images/rock.png')}
          style={[styles.obstacle, { bottom: 0, transform: [{ translateX: obstaclePositionX }] }]} // Move obstacle towards the dragon
        />
      </View>
      {/* Touchable area to trigger jump */}
      {!jumping && !gameOver && (
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
    width: 100, // Adjust size of obstacle as needed
    height: 100, // Adjust size of obstacle as needed
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
    zIndex: 2, // Ensure score appears in front of other elements
    color: 'white',
    fontSize: 20,
  },
  gameOverContainer: {
    position: 'absolute',
    top: '50%',
    zIndex: 2,
    alignItems: 'center',
  },
  gameOverText: {
    color: 'red',
    fontSize: 40,
  },
  menuButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default GameScreen;
