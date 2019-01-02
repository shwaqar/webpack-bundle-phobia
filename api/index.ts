import firebaseInit from './firebase';
import findUp from 'find-up';
import fs from 'fs';
import { kebabCase } from 'lodash';

const CONFIGFILE_NAME = '.bundlephobia.json';

const configFilePath = findUp.sync(CONFIGFILE_NAME);

if (!configFilePath) {
  throw new Error(`Config file with name "${CONFIGFILE_NAME}" is required!`);
}

const configContent = fs.readFileSync(configFilePath, 'utf8');
const config = JSON.parse(configContent);

if (!config.project_name) {
  throw new Error(`Key with 'project_name' is required!`);
}
if (!config.db_url) {
  throw new Error(`Key with 'db_url' is required!`);
}
if (!config.key) {
  throw new Error(`Key with 'key' is required!`);
}

const firebase = firebaseInit(config.key, config.db_url);
const COLLECTION = kebabCase(config.project_name);

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
