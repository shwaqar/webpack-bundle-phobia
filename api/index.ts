import firebaseInit from './firebase';
import findUp from 'find-up';
import fs from 'fs';
import { kebabCase } from 'lodash';

const CONFIGFILE_NAME = 'bundlephobia.json';
const SERVICE_KEY_FILE_NAME = 'servicekey.json';

const configFilePath = findUp.sync(CONFIGFILE_NAME);
const serviceKeyFilePath = findUp.sync(SERVICE_KEY_FILE_NAME);

if (!configFilePath) {
  throw new Error(`Config file with name "${CONFIGFILE_NAME}" is required!`);
}
if (!serviceKeyFilePath) {
  throw new Error(
    `Firebase service key file with name "${SERVICE_KEY_FILE_NAME}" is required!`
  );
}

const configContent = fs.readFileSync(configFilePath, 'utf8');
const serviceKeyContent = fs.readFileSync(serviceKeyFilePath, 'utf8');
const config = JSON.parse(configContent);
const serviceKey = JSON.parse(serviceKeyContent);

if (!config.project_name) {
  throw new Error(`Key with 'project_name' is required!`);
}
if (!config.db_url) {
  throw new Error(`Key with 'db_url' is required!`);
}

const firebase = firebaseInit(serviceKey, config.db_url);
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
