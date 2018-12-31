"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const find_up_1 = __importDefault(require("find-up"));
const fs_1 = __importDefault(require("fs"));
const KEYFILE_NAME = 'key.json';
const keyFilePath = find_up_1.default.sync(KEYFILE_NAME);
if (!keyFilePath) {
    throw new Error(`Key file with name "${KEYFILE_NAME}" is required!`);
}
const key = fs_1.default.readFileSync(keyFilePath, 'utf8');
exports.default = admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(key)),
    databaseURL: 'https://webpack-bundle-phobia-cdcb6.firebaseio.com'
});
