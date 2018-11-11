import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCu2XevZ7guEjlgRCTKCER6y3vBwXfK3K4',
  authDomain: 'webpack-bundle-phobia-cdcb6.firebaseapp.com',
  databaseURL: 'https://webpack-bundle-phobia-cdcb6.firebaseio.com',
  projectId: 'webpack-bundle-phobia-cdcb6',
  storageBucket: 'webpack-bundle-phobia-cdcb6.appspot.com',
  messagingSenderId: '372008414841'
};

firebase.initializeApp(config);

export default firebase;

export const db = firebase.firestore();
