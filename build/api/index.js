"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = __importDefault(require("./firebase"));
const find_up_1 = __importDefault(require("find-up"));
const fs_1 = __importDefault(require("fs"));
const lodash_1 = require("lodash");
const CONFIGFILE_NAME = 'bundlephobia.json';
const SERVICE_KEY_FILE_NAME = 'servicekey.json';
const configFilePath = find_up_1.default.sync(CONFIGFILE_NAME);
const serviceKeyFilePath = find_up_1.default.sync(SERVICE_KEY_FILE_NAME);
if (!configFilePath) {
    throw new Error(`Config file with name "${CONFIGFILE_NAME}" is required!`);
}
if (!serviceKeyFilePath) {
    throw new Error(`Firebase service key file with name "${SERVICE_KEY_FILE_NAME}" is required!`);
}
const configContent = fs_1.default.readFileSync(configFilePath, 'utf8');
const serviceKeyContent = fs_1.default.readFileSync(serviceKeyFilePath, 'utf8');
const config = JSON.parse(configContent);
const serviceKey = JSON.parse(serviceKeyContent);
if (!config.project_name) {
    throw new Error(`Key with 'project_name' is required!`);
}
if (!config.db_url) {
    throw new Error(`Key with 'db_url' is required!`);
}
const firebase = firebase_1.default(serviceKey, config.db_url);
const COLLECTION = lodash_1.kebabCase(config.project_name);
function cleanUp() {
    return firebase.delete();
}
exports.cleanUp = cleanUp;
function sendData(name, payload) {
    return firebase
        .database()
        .ref(`${COLLECTION}/${name}`)
        .set(payload);
}
exports.sendData = sendData;
function fetchData() {
    return firebase
        .database()
        .ref(COLLECTION)
        .once('value')
        .then(snapshot => snapshot.val());
}
exports.fetchData = fetchData;
