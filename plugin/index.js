const parser = require('./parser');
const { sendData } = require('../api');
const chalk = require('chalk');

class bundlePhobiaWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync('bundlePhobiaWebpackPlugin', (stats, cb) => {
      if (!this.options.name) {
        console.log(
          chalk.red(
            'bundle-phobia-webpack-plugin: Release name must be defined.'
          )
        );
        cb();
        return;
      }

      sendData(this.options.name, parser(stats)).then(() => {
        console.log(
          chalk.green(
            'bundle-phobia-webpack-plugin: Release data stored in the database.'
          )
        );
        cb();
      });
    });
  }
}

module.exports = bundlePhobiaWebpackPlugin;
