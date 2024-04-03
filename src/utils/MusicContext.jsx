import React, { createContext, useState, useEffect } from 'react';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';

const MusicContext = createContext();

const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      // Add a track to be played
      TrackPlayer.add({
        id: 'track',
        url: require('../assets/sounds/music.mp3'),
        title: 'Background Music',
        artist: 'Your Artist',
        loop: true,
      });

      TrackPlayer.setRepeatMode(RepeatMode.Track);

      // Start playing the track
      TrackPlayer.play();
      setIsPlaying(true);
    });

    return () => {
      // Stop and reset the player when the component unmounts
      TrackPlayer.stop();
      TrackPlayer.reset();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay }}>
      {children}
    </MusicContext.Provider>
  );
};

export { MusicContext, MusicProvider };