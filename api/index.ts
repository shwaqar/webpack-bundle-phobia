import firebase from './firebase';

const COLLECTION = 'releases';

export function cleanUp() {
  return firebase.delete();
}

export function sendData(name: string, payload: object) {
  return firebase
    .database()
    .ref(`${COLLECTION}/${name}`)
    .set(payload);
}

export function fetchData() {
  return firebase
    .database()
    .ref(COLLECTION)
    .once('value')
    .then(snapshot => snapshot.val());
}
