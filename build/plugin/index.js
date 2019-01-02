"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const api_1 = require("../api");
const parser_1 = __importDefault(require("./parser"));
const chalk_1 = __importDefault(require("chalk"));
class BundlePhobiaWebpackPlugin {
    constructor(options) {
        this.name = options.name;
    }
    apply(compiler) {
        compiler.hooks.done.tapAsync('BundlePhobiaWebpackPlugin', (stats, cb) => {
            const messageMap = {
                noReleaseName: 'bundle-phobia-webpack-plugin: Release name must be defined.',
                storeSuccess: 'bundle-phobia-webpack-plugin: Release data stored in the database.'
            };
            if (!this.name) {
                console.log(chalk_1.default.red(messageMap.noReleaseName));
                cb();
                return;
            }
            api_1.sendData(this.name, parser_1.default(stats, this.name))
                .then(api_1.cleanUp)
                .then(() => {
                console.log(chalk_1.default.green(messageMap.storeSuccess));
                cb();
            });
        });
    }
}
module.exports = BundlePhobiaWebpackPlugin;
