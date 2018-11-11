const parser = require('./parser');

class bundlePhobiaWebpackPlugin {
  apply(compiler) {
    compiler.hooks.done.tapAsync('bundlePhobiaWebpackPlugin', (stats, cb) => {
      // Send parsed data to firebase
      console.log(parser(stats));
      cb();
    });
  }
}

module.exports = bundlePhobiaWebpackPlugin;
