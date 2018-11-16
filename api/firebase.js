const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

module.exports = firebase.initializeApp({
  apiKey: 'AIzaSyCu2XevZ7guEjlgRCTKCER6y3vBwXfK3K4',
  databaseURL: 'https://webpack-bundle-phobia-cdcb6.firebaseio.com'
});
