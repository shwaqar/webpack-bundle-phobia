"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = __importDefault(require("./firebase"));
const COLLECTION = 'releases';
function cleanUp() {
    return firebase_1.default.delete();
}
exports.cleanUp = cleanUp;
function sendData(name, payload) {
    return firebase_1.default
        .database()
        .ref(`${COLLECTION}/${name}`)
        .set(payload);
}
exports.sendData = sendData;
function fetchData() {
    return firebase_1.default
        .database()
        .ref(COLLECTION)
        .once('value')
        .then(snapshot => snapshot.val());
}
exports.fetchData = fetchData;
