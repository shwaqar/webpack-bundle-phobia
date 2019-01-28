"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const api_1 = __importDefault(require("../api"));
const parser_1 = __importDefault(require("./parser"));
const chalk_1 = __importDefault(require("chalk"));
class BundlePhobiaWebpackPlugin {
    constructor(options) {
        this.name = options.name;
        try {
            this.api = new api_1.default();
        }
        catch (_a) {
            this.api = null;
        }
    }
    apply(compiler) {
        compiler.hooks.done.tapAsync('BundlePhobiaWebpackPlugin', (stats, cb) => {
            const messageMap = {
                noReleaseName: 'bundle-phobia-webpack-plugin: Release name must be defined.',
                storeSuccess: 'bundle-phobia-webpack-plugin: Release data stored in the database.',
                apiFailed: 'bundle-phobia-webpack-plugin: Firebase initialization failed!'
            };
            if (!this.name) {
                console.log(chalk_1.default.red(messageMap.noReleaseName));
                cb();
                return;
            }
            if (!this.api) {
                console.log(chalk_1.default.red(messageMap.apiFailed));
                cb();
                return;
            }
            this.api
                .sendData(this.name, parser_1.default(stats, this.name))
                .then(() => this.api.cleanUp())
                .then(() => {
                console.log(chalk_1.default.green(messageMap.storeSuccess));
                cb();
            });
        });
    }
}
module.exports = BundlePhobiaWebpackPlugin;
