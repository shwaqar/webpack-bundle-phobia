const parser = require('./parser');
const { sendData, auth, cleanUp } = require('../api');
const chalk = require('chalk');

class bundlePhobiaWebpackPlugin {
  constructor(options = {}) {
    this.name = options.name;
    this.credentials = options.credentials;
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync('bundlePhobiaWebpackPlugin', (stats, cb) => {
      const messageMap = {
        noReleaseName:
          'bundle-phobia-webpack-plugin: Release name must be defined.',
        noCredentials:
          'bundle-phobia-webpack-plugin: Credentials name must be defined.',
        storeSuccess:
          'bundle-phobia-webpack-plugin: Release data stored in the database.'
      };
      const errorMsg = !this.name
        ? messageMap.noReleaseName
        : messageMap.noCredentials;

      if (!this.name || !this.credentials) {
        console.log(chalk.red(errorMsg));
        cb();
        return;
      }

      auth(this.credentials)
        .then(() => sendData(this.name, parser(stats)))
        .then(cleanUp)
        .then(() => {
          console.log(chalk.green(messageMap.storeSuccess));
          cb();
        });
    });
  }
}

module.exports = bundlePhobiaWebpackPlugin;
