const firebase = require('./firebase');

const COLLECTION = 'releases';

function sendData(name, payload) {
  return firebase
    .database()
    .ref(`${COLLECTION}/${name}`)
    .set(payload)
    .then(() => firebase.delete());
}

function fetchData() {
  return firebase
    .database()
    .ref(COLLECTION)
    .once('value')
    .then(snapshot => {
      firebase.delete();
      return snapshot.val();
    });
}

module.exports = {
  sendData,
  fetchData
};
