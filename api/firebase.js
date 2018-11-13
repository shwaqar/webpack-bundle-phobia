const firebase = require('firebase/app');
require('firebase/database');

const app = firebase.initializeApp({
  databaseURL: 'https://webpack-bundle-phobia-cdcb6.firebaseio.com'
});

module.exports = app;
