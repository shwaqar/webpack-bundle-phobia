"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = __importDefault(require("./firebase"));
const find_up_1 = __importDefault(require("find-up"));
const fs_1 = __importDefault(require("fs"));
const lodash_1 = require("lodash");
const CONFIGFILE_NAME = '.bundlephobia.json';
const configFilePath = find_up_1.default.sync(CONFIGFILE_NAME);
if (!configFilePath) {
    throw new Error(`Config file with name "${CONFIGFILE_NAME}" is required!`);
}
const configContent = fs_1.default.readFileSync(configFilePath, 'utf8');
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
const firebase = firebase_1.default(config.key, config.db_url);
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
