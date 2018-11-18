import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default firebase.initializeApp({
  apiKey: 'AIzaSyCu2XevZ7guEjlgRCTKCER6y3vBwXfK3K4',
  databaseURL: 'https://webpack-bundle-phobia-cdcb6.firebaseio.com'
});
