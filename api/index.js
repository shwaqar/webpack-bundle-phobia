const firebase = require('./firebase');

const COLLECTION = 'releases';

function auth({ email, password }) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

function cleanUp() {
  return firebase
    .auth()
    .signOut()
    .then(() => firebase.delete());
}

function sendData(name, payload) {
  return firebase
    .database()
    .ref(`${COLLECTION}/${name}`)
    .set(payload);
}

function fetchData() {
  return firebase
    .database()
    .ref(COLLECTION)
    .once('value')
    .then(snapshot => snapshot.val());
}

module.exports = {
  sendData,
  fetchData,
  auth,
  cleanUp
};
