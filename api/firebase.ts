import * as admin from 'firebase-admin';
import findUp from 'find-up';
import fs from 'fs';

const KEYFILE_NAME = 'key.json';

const keyFilePath = findUp.sync(KEYFILE_NAME);

if (!keyFilePath) {
  throw new Error(`Key file with name "${KEYFILE_NAME}" is required!`);
}

const key = fs.readFileSync(keyFilePath, 'utf8');

export default admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(key)),
  databaseURL: 'https://webpack-bundle-phobia-cdcb6.firebaseio.com'
});
