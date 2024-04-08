/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';


AppRegistry.registerComponent(appName, () => App);
import TrackPlayer from 'react-native-track-player';

TrackPlayer.registerPlaybackService(() => require('./src/utils/services'));