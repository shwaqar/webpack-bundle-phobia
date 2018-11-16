import firebase from './firebase';

const COLLECTION = 'releases';

export function auth({ email, password }: { email: string; password: string }) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function cleanUp() {
  return firebase
    .auth()
    .signOut()
    .then(() => firebase.delete());
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
