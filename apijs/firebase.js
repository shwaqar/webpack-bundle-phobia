"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = __importStar(require("firebase/app"));
require("firebase/auth");
require("firebase/database");
exports.default = firebase.initializeApp({
    apiKey: 'AIzaSyCu2XevZ7guEjlgRCTKCER6y3vBwXfK3K4',
    databaseURL: 'https://webpack-bundle-phobia-cdcb6.firebaseio.com'
});
